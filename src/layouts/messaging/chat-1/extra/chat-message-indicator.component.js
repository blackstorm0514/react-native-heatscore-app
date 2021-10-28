import React from 'react';
import { StyleSheet, TransformsStyle, View, ViewProps, ViewStyle } from 'react-native';

export const ChatMessageIndicator = (props) => {

    const { style, ...viewProps } = props;
    const flatStyle = StyleSheet.flatten(style);

    const transformsStyle = {
        transform: [
            { rotate: props.reverse ? `90deg` : `-90deg` },
            // @ts-ignore
            { translateY: flatStyle.width / 2 },
        ],
    };

    const viewStyle = {
        // @ts-ignore
        borderLeftWidth: flatStyle.width,
        // @ts-ignore
        borderRightWidth: flatStyle.width,
        // @ts-ignore
        borderBottomWidth: flatStyle.height,
        borderBottomColor: flatStyle.backgroundColor,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        backgroundColor: 'transparent',
    };

    return (
        <View
            {...viewProps}
            style={[style, viewStyle, transformsStyle]}
        />
    );
};
