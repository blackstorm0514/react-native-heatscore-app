import React from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ChatMessageContent = (props) => {

    const { style, children, ...viewProps } = props;

    const renderAttachment = () => (
        <Image
            style={styles.attachmentImage}
            source={children.attachment.source}
        />
    );

    const renderText = () => (
        <Text
            style={styles.text}
            status='control'>
            {children.text}
        </Text>
    );

    return (
        <View
            {...viewProps}
            style={[styles.container, style]}>
            {children.text && renderText()}
            {children.attachment && renderAttachment()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        minHeight: 48,
        minWidth: 48,
        maxWidth: 276,
        borderRadius: 4,
        padding: 8,
    },
    text: {
        margin: 12,
    },
    attachmentImage: {
        width: 64,
        height: 64,
        borderRadius: 4,
    },
});
