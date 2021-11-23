import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Button, Text, List, Icon, Input } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';
import { format } from 'date-fns';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { InputToolbar, Actions, Composer, Send, LoadEarlier } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MESSAGE_LIMIT = 20;

class RenderChatItem extends PureComponent {
    render() {
        const { chat } = this.props;
        const { user, createdAt, text } = chat;
        const time_str = format(new Date(createdAt.seconds * 1000), "MMM d, hh:mm aaa");
        return (
            <TouchableOpacity style={styles.chatItemContainer}
                activeOpacity={0.7}>
                <FeatherIcon
                    size={30}
                    color='#ddd'
                    name='user'
                />
                <View style={styles.chatContentContainer}>
                    <Text style={styles.chatTime}>{time_str}</Text>
                    <Text style={styles.chatContent}>{user.username}: <Text style={{ color: 'white', fontWeight: '100' }}>{text}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class RenderEventChatComponent extends Component {
    constructor(props) {
        super(props);
        const event_id = props.event ? props.event.event_id : null;
        this.state = {
            event_id: event_id,
            loadingEarlier: false,
            earlierChatsAvailable: true,
            recentChats: [],
            oldChats: [],
            room_id: null,
            messagesListener: null,
            lastVisible: null
        }
    }

    componentDidMount() {
        const { event_id } = this.state;
        if (event_id) {
            firestore()
                .collection('ROOMS')
                .where('event_id', '==', event_id)
                .get()
                .then((res) => {
                    if (res && res.size == 0) {
                        firestore()
                            .collection('ROOMS')
                            .add({ event_id: event_id })
                            .then(res => {
                                const room_id = res.id;
                                this.setState({ room_id: room_id });
                                this.getChatLogs(room_id);
                            })
                    } else if (res.size > 0) {
                        const room_id = res.docs[0].id
                        this.setState({ room_id: room_id });
                        this.getChatLogs(room_id);
                    } else {
                        console.log('Error,', res);
                    }
                })
                .catch(error => {
                    console.warn(error);
                })

        }
    }

    getChatLogs = (room_id) => {
        const { messagesListener } = this.state;
        if (messagesListener) return;
        let newMessagesListener = firestore()
            .collection('ROOMS')
            .doc(room_id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .limit(MESSAGE_LIMIT)
            .onSnapshot(querySnapshot => {
                const chats = querySnapshot.docs.map(snapshot => {
                    return snapshot.data();
                });
                const { recentChats } = this.state;
                if (recentChats.length > 0) {
                    const newRecentChats = [];
                    for (let i = 0; i < chats.length; i++) {
                        if (chats[i]._id === recentChats[0]._id) {
                            break;
                        }
                        newRecentChats.push(chats[i]);
                    }
                    this.setState({ recentChats: [...newRecentChats, ...recentChats] });
                } else {
                    this.setState({
                        recentChats: chats,
                        earlierChatsAvailable: chats.length >= MESSAGE_LIMIT,
                        lastVisible: querySnapshot.docs[chats.length - 1]
                    });
                }
            });

        this.setState({ messagesListener: newMessagesListener });
    }

    onLoadEarlier = () => {
        const { earlierChatsAvailable, oldChats, recentChats, room_id, lastVisible } = this.state;
        if (!earlierChatsAvailable || !room_id) {
            this.setState({ earlierChatsAvailable: false });
            return;
        }

        this.setState({ isLoadingEarlier: true });
        firestore()
            .collection('ROOMS')
            .doc(room_id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisible)
            .limit(MESSAGE_LIMIT)
            .get()
            .then(querySnapshot => {
                const chats = querySnapshot.docs.map(snapshot => {
                    return snapshot.data()
                });
                if (chats.length === 0) {
                    this.setState({ earlierChatsAvailable: false, isLoadingEarlier: false });
                } else {
                    this.setState({
                        oldChats: [...oldChats, ...chats],
                        isLoadingEarlier: false,
                        lastVisible: querySnapshot.docs[chats.length - 1]
                    });
                }
            })
            .catch(error => {
                console.warn(error);
                this.setState({ isLoadingEarlier: false });
            });
    }

    renderLoadEarlier = (props) => {
        const { earlierChatsAvailable } = this.state;
        if (!earlierChatsAvailable) return null;
        return (
            <LoadEarlier {...props}
                containerStyle={{ backgroundColor: '#000' }}
                wrapperStyle={{ borderRadius: 0, backgroundColor: '#000' }}
            />
        )
    }

    handleSend = (messages) => {
        const { room_id } = this.state;
        const { user } = this.props;
        const message = messages[0];
        if (message && user == null) {
            Toast.show('Please login to send message.');
            return;
        }
        if (message && room_id) {
            firestore()
                .collection('ROOMS')
                .doc(room_id)
                .collection('MESSAGES')
                .add({
                    _id: message._id,
                    createdAt: new Date(),
                    text: message.text,
                    user: message.user
                })
        }
    }

    componentWillUnmount() {
        const { messagesListener } = this.state;
        if (messagesListener) messagesListener();
    }

    renderChatItem = ({ currentMessage }) => {
        return <RenderChatItem chat={currentMessage} />
    }

    renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: '#111',
                paddingTop: 6,
            }}
            primaryStyle={{ alignItems: 'center' }}
        />
    );

    renderChatDay = () => {
        return null;
    }

    renderComposer = (props) => (
        <Composer
            {...props}
            textInputStyle={styles.messageInput}
        />
    );

    renderSendButton = (props) => {
        return (
            <Send
                {...props}
                disabled={!props.text}
                containerStyle={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 4,
                    backgroundColor: '#444',
                    borderRadius: 22
                }}
            >
                <Ionicons name='arrow-up' color='white' size={28} />
            </Send>
        )
    }

    render() {
        const { recentChats, oldChats, loadingEarlier } = this.state;
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={[...recentChats, ...oldChats]}
                    onSend={message => this.handleSend(message)}
                    alwaysShowSend
                    user={user ? user : { username: 'Anonymous' }}
                    placeholder="Send a message..."
                    scrollToBottom={true}
                    renderDay={this.renderChatDay}
                    renderMessage={this.renderChatItem}
                    renderSend={this.renderSendButton}
                    renderComposer={this.renderComposer}
                    renderInputToolbar={this.renderInputToolbar}
                    renderLoading={() => <LoadingIndicator style={styles.loadingIndicator} />}
                    isLoadingEarlier={loadingEarlier}
                    loadEarlier
                    onLoadEarlier={this.onLoadEarlier}
                    renderLoadEarlier={this.renderLoadEarlier}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(RenderEventChatComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingIndicator: {
        flex: 1
    },
    list: {
        backgroundColor: '#111',
    },
    chatItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    userIcon: {
        width: 30, height: 30
    },
    chatContentContainer: {
        marginHorizontal: 20
    },
    chatTime: {
        color: '#888',
        fontSize: 14,
    },
    chatContent: {
        fontSize: 14,
        marginTop: 6,
        color: 'orange',
        fontWeight: 'bold'
    },
    messageInput: {
        marginHorizontal: 0,
        marginVertical: 0,
        fontSize: 16,
        backgroundColor: '#222',
        borderRadius: 4,
        paddingLeft: 10
    },
    sendButton: {
        marginRight: 4,
        alignSelf: 'flex-end',
    },
    iconButton: {
        width: 24,
        height: 24,
    },
});
