import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Button, Text, List, Icon, Input } from '@ui-kitten/components';
import { chats } from './chat';
import { LoadingIndicator } from './LoadingIndicator';
import { format } from 'date-fns';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import { PaperPlaneIcon } from '../../../components/icons';

class RenderChatItem extends PureComponent {
    render() {
        const { chat } = this.props;
        const { user, date, content } = chat;
        const time_str = format(new Date(date), "MMM d, hh:mm aaa");
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
                    <Text style={styles.chatContent}>{user}: <Text style={{ color: 'white', fontWeight: '100' }}>{content}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const keyboardOffset = (height) => Platform.select({
    android: 0,
    ios: height,
});

export default class RenderEventChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            chats: null,
        }
    }

    renderChatItem = ({ item }) => {
        return <RenderChatItem chat={item} />
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator style={styles.loadingIndicator} />}
                {!loading && <List
                    style={styles.list}
                    data={chats}
                    renderItem={this.renderChatItem}
                    contentContainerStyle={{
                        justifyContent: 'flex-end',
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                    }}
                />}
                <KeyboardAvoidingView
                    style={styles.messageInputContainer}
                    offset={keyboardOffset}>
                    <Input
                        style={styles.messageInput}
                        placeholder='Message...'
                        value={''}
                        onChangeText={() => { }}
                        status="basic"
                        accessoryRight={<Button
                            appearance='ghost'
                            style={[styles.iconButton, styles.sendButton]}
                            accessoryLeft={PaperPlaneIcon}
                            disabled={false}
                            onPress={() => []}
                            size="medium"
                            status="basic"
                        />}
                    />

                </KeyboardAvoidingView>
            </View>
        )
    }
}


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
        fontSize: 18,
        marginTop: 6,
        color: 'orange',
        fontWeight: 'bold'
    },
    messageInputContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#222',
        flexDirection: 'row'
    },
    messageInput: {
        marginHorizontal: 8,
        marginVertical: 0,
        fontSize: 16,
        backgroundColor: '#444',
        borderRadius: 4,
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
