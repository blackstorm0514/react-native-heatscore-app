import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, ListProps, StyleType } from '@ui-kitten/components';
import { ChatMessageContent } from './chat-message-content.component';
import { ChatMessageGroup } from './chat-message-group.component';
import { ChatMessage } from './chat-message.component';
import { ChatService } from './chat.service';
import { Message } from './data';

export const Chat = (props) => {

    const listRef = React.useRef();
    let contentHeight = 0;

    const { followEnd, contentContainerStyle, data, ...listProps } = props;

    const scrollToEnd = (params) => {
        listRef.current.scrollToEnd({ offset: contentHeight, ...params });
    };

    const scrollToIndex = (params) => {
        listRef.current.scrollToIndex(params);
    };

    const scrollToOffset = (params) => {
        listRef.current.scrollToOffset(params);
    };

    const onContentSizeChange = (width, height) => {
        contentHeight = height;

        props.followEnd && setTimeout(scrollToEnd, 0);

        listProps.onContentSizeChange && listProps.onContentSizeChange(width, height);
    };

    const renderMessageContent = (message, style) => (
        <ChatMessageContent style={style.container}>
            {message}
        </ChatMessageContent>
    );

    const renderMessage = (message) => (
        <ChatMessage
            style={styles.message}
            message={message}>
            {renderMessageContent}
        </ChatMessage>
    );

    const renderMessageGroup = (info) => (
        <ChatMessageGroup
            style={styles.group}
            data={info.item}
            renderItem={renderMessage}
        />
    );

    return (
        <List
            ref={listRef}
            {...listProps}
            data={chatService.createMessageGroups(data)}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            onContentSizeChange={onContentSizeChange}
            renderItem={renderMessageGroup}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'flex-end',
    },
    group: {
        marginVertical: 8,
    },
    message: {
        marginVertical: 4,
    },
});
