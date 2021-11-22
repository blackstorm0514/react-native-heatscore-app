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
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            loading: false,
            chats: [],
            room_id: null,
            messagesListener: null,
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
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    const data = {
                        createdAt: new Date(firebaseData.createdAt),
                        ...firebaseData
                    };

                    return data;
                });
                this.setState({ loading: false, chats: messages });
            });

        this.setState({ loading: true, messagesListener: newMessagesListener });
    }

    handleSend = (messages) => {
        const { room_id } = this.state;
        const message = messages[0];
        if (message && message.user == null) {
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

    onLoadEarlier = () => {

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
        const { loading, chats } = this.state;
        const { user } = this.props;

        return (
            <View style={styles.container}>
                {/* {loading && <LoadingIndicator style={styles.loadingIndicator} />} */}
                <GiftedChat
                    messages={chats}
                    onSend={message => this.handleSend(message)}
                    alwaysShowSend
                    user={user}
                    placeholder="Send a message..."
                    scrollToBottom={true}
                    renderDay={this.renderChatDay}
                    renderMessage={this.renderChatItem}
                    renderSend={this.renderSendButton}
                    renderComposer={this.renderComposer}
                    renderInputToolbar={this.renderInputToolbar}
                    renderLoading={() => <LoadingIndicator style={styles.loadingIndicator} />}
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
