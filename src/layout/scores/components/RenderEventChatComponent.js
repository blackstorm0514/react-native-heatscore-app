import React, { Component, createRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GiftedChat, InputToolbar, Actions, Composer, Send, LoadEarlier } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Modalize } from 'react-native-modalize';
import GifScroller from './chats/GifScroller';
import { CloseIcon } from '../../../libs/icons';
import { v4 as uuidv4 } from 'uuid';
import ChatInformModal from './chats/ChatInformModal';
import RenderChatItem from './chats/RenderChatItem';
import ReportChat from './chats/ReportChat';
import { actions } from '../../../redux/reducer';
import CustomInputToolbar from './chats/CustomInputToolbar';

const MESSAGE_LIMIT = 20;

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
            lastVisible: null,
            gifSearch: '',
            chatReport: null,
            chatReply: null,
        }

        this.gifModalizeRef = createRef(null);
        this.reportModalizeRef = createRef(null);
        this.giftedChatRef = createRef(null);
        this.replyModalRef = createRef(null);
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
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
                                this._Mounted && this.setState({ room_id: room_id });
                                this.getChatLogs(room_id);
                            })
                    } else if (res.size > 0) {
                        const room_id = res.docs[0].id
                        this._Mounted && this.setState({ room_id: room_id });
                        this.getChatLogs(room_id);
                    } else {
                    }
                })
                .catch(error => {
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
                    if (newRecentChats.length) {
                        this._Mounted && this.setState({ recentChats: [...newRecentChats, ...recentChats] });
                        this.giftedChatRef.current?.scrollToBottom();
                    }
                } else {
                    this._Mounted && this.setState({
                        recentChats: chats,
                        earlierChatsAvailable: chats.length >= MESSAGE_LIMIT,
                        lastVisible: querySnapshot.docs[chats.length - 1]
                    });
                }
            });

        this._Mounted && this.setState({ messagesListener: newMessagesListener });
    }

    onLoadEarlier = () => {
        const { earlierChatsAvailable, oldChats, recentChats, room_id, lastVisible } = this.state;
        if (!earlierChatsAvailable || !room_id) {
            this._Mounted && this.setState({ earlierChatsAvailable: false });
            return;
        }

        this._Mounted && this.setState({ isLoadingEarlier: true });
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
                    this._Mounted && this.setState({ earlierChatsAvailable: false, isLoadingEarlier: false });
                } else {
                    this._Mounted && this.setState({
                        oldChats: [...oldChats, ...chats],
                        isLoadingEarlier: false,
                        lastVisible: querySnapshot.docs[chats.length - 1]
                    });
                }
            })
            .catch(error => {
                this._Mounted && this.setState({ isLoadingEarlier: false });
            });
    }

    renderLoadEarlier = (props) => {
        const { earlierChatsAvailable } = this.state;
        if (!earlierChatsAvailable) return null;
        return (
            <LoadEarlier {...props}
                containerStyle={{ backgroundColor: '#121212' }}
                wrapperStyle={{ borderRadius: 0, backgroundColor: '#121212' }}
            />
        )
    }

    handleSend = (messages) => {
        const { room_id, chatReply } = this.state;
        const { user, addChatItemAction, suspendTillText } = this.props;
        const date = new Date();
        if (suspendTillText && date.getTime() < new Date(suspendTillText).getTime()) {
            this.setState({ chatReply: null });
            return Alert.alert(
                'Timeout!',
                'Try to slow down how often you\'re sending messages to make the chat a better experience.',
                [{ text: 'ACCEPT' }]
            )
        }
        const message = messages[0];
        if (message && user == null) {
            this.setState({ chatReply: null });
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
                    createdAt: date,
                    text: message.text,
                    user: message.user,
                    chatReply: chatReply ? chatReply : null,
                });
            this.setState({ chatReply: null });
        }
        this.setState({ chatReply: null });
        addChatItemAction({ type: 'text' });
    }

    onGIFSelect = (url) => {
        const { room_id } = this.state;
        const { user, addChatItemAction, suspendTillImage } = this.props;
        const date = new Date();
        if (suspendTillImage && date.getTime() < new Date(suspendTillImage).getTime()) {
            return Alert.alert(
                'Timeout!',
                'You can post up to 2 GIFs every 5 minutes. Please try again later.',
                [{ text: 'ACCEPT' }]
            )
        }
        if (url && room_id) {
            firestore()
                .collection('ROOMS')
                .doc(room_id)
                .collection('MESSAGES')
                .add({
                    _id: uuidv4(),
                    createdAt: date,
                    image: url,
                    user: user
                })
        }
        this.onCloseModal();
        addChatItemAction({ type: 'image' });
    }

    componentWillUnmount() {
        const { messagesListener } = this.state;
        if (messagesListener) messagesListener();
        this._Mounted = false;
    }

    renderChatItem = ({ currentMessage }) => {
        return <RenderChatItem chat={currentMessage}
            onSelectReply={this.onSelectReply}
            onSelectReport={this.onSelectReport} />
    }

    renderInputToolbar = (props) => (
        <CustomInputToolbar
            {...props}
            containerStyle={{
                backgroundColor: '#111',
            }}
            primaryStyle={{
                alignItems: 'center',
                marginBottom: 4,
                paddingTop: 4
            }}
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
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 4,
                    backgroundColor: '#444',
                    borderRadius: 22
                }}
            >
                <Ionicons name='arrow-up' color='white' size={20} />
            </Send>
        )
    }

    renderActions = (props) => {
        const { user } = this.props;
        return (
            <Actions
                {...props}
                containerStyle={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 6
                }}
                icon={() => (
                    <MaterialIcons
                        size={24}
                        name="gif"
                        color="#ddd"
                    />
                )}
                onPressActionButton={() => {
                    if (user) {
                        this.gifModalizeRef.current?.open();
                    } else {
                        Toast.show('Please login to send message.');
                        return;
                    }
                }}
            />
        )
    }

    onCloseModal = () => {
        this.gifModalizeRef.current?.close();
    }

    customClearIcon = () => {
        const { gifSearch } = this.state;
        return gifSearch ? <TouchableOpacity activeOpacity={0.8} onPress={() => this._Mounted && this.setState({ gifSearch: '' })}>
            <CloseIcon style={styles.searchIcon} />
        </TouchableOpacity> : null
    }

    renderModalHeader = () => {
        const { gifSearch } = this.state;
        return (
            <View style={styles.modalHeader}>
                <Input
                    style={styles.searchInput}
                    placeholder='Search ...'
                    placeholderTextColor="#888"
                    value={gifSearch}
                    onChangeText={(search) => this._Mounted && this.setState({ gifSearch: search })}
                    accessoryRight={this.customClearIcon}
                />
                <Button style={styles.searchButton}
                    onPress={this.onCloseModal}
                    size='large'>Close</Button>
            </View>
        )
    }

    onSelectReport = async (chatReport) => {
        // this._Mounted && await this.setState({ chatReport })
        // this.reportModalizeRef.current?.open();
    }

    onSelectReply = (chatReply) => {
        this._Mounted && this.setState({ chatReply });
    }

    renderAccessory = () => {
        const { chatReply } = this.state;
        if (!chatReply) return null;
        const { user, text, image } = chatReply;
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 5, backgroundColor: 'green' }}></View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'green', paddingLeft: 10, paddingTop: 2, fontSize: 12 }}>{user.username}</Text>
                    <Text style={{ color: 'gray', paddingLeft: 10, paddingTop: 2, fontSize: 12 }} numberOfLines={1}>{text ? text : (image ? 'image' : '')}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => this.setState({ chatReply: null })}>
                        <Ionicons name='close' color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onCloseReport = async () => {
        this._Mounted && await this.setState({ chatReport: null })
        this.reportModalizeRef.current?.close();
    }

    render() {
        const { recentChats, oldChats, loadingEarlier, gifSearch, chatReply, chatReport } = this.state;
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <ChatInformModal />
                <GiftedChat
                    ref={this.giftedChatRef}
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
                    renderActions={this.renderActions}
                    renderAccessory={chatReply ? this.renderAccessory : null}
                    renderLoading={() => <LoadingIndicator style={styles.loadingIndicator} />}
                    isLoadingEarlier={loadingEarlier}
                    loadEarlier
                    onLoadEarlier={this.onLoadEarlier}
                    renderLoadEarlier={this.renderLoadEarlier}
                    listViewProps={{
                        style: { marginBottom: 10 },
                        showsVerticalScrollIndicator: false
                    }}
                />
                <Modalize
                    ref={this.gifModalizeRef}
                    HeaderComponent={this.renderModalHeader}
                    scrollViewProps={{ showsVerticalScrollIndicator: true }}
                    adjustToContentHeight={true}>
                    <GifScroller
                        inputText={gifSearch}
                        handleGifSelect={this.onGIFSelect}
                        onSelectReport={this.onSelectReport}
                    />
                </Modalize>
                <Modalize
                    ref={this.reportModalizeRef}
                    scrollViewProps={{ showsVerticalScrollIndicator: true }}
                    adjustToContentHeight={true}>
                    <ReportChat chatReport={chatReport}
                        onCloseReport={this.onCloseReport} />
                </Modalize>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    suspendTillText: state.suspendTillText,
    suspendTillImage: state.suspendTillImage,
});

export default connect(mapStateToProps, { addChatItemAction: actions.addChatItemAction })(RenderEventChatComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    loadingIndicator: {
        flex: 1
    },
    list: {
        backgroundColor: '#121212',
    },
    messageInput: {
        marginHorizontal: 0,
        marginVertical: 0,
        fontSize: 14,
        backgroundColor: '#222',
        borderRadius: 4,
        paddingLeft: 10,
        color: 'white',
        paddingVertical: 3,
    },
    sendButton: {
        marginRight: 4,
        alignSelf: 'flex-end',
    },
    iconButton: {
        width: 20,
        height: 20,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    modalHeader: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: '#111',
        flexDirection: 'row'
    },
    searchInput: {
        marginTop: 6,
        backgroundColor: '#000',
        borderWidth: 0,
        borderRadius: 6,
        flex: 1,
        tintColor: '#FFF'
    },
    searchButton: {
        backgroundColor: '#111',
        borderColor: '#111',
        color: 'white',
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 4,
        tintColor: '#FFF'
    },
});
