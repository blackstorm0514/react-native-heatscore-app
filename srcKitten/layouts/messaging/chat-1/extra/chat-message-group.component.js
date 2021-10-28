import * as React from 'react';
import { View, ViewProps } from 'react-native';

export const ChatMessageGroup = (props) => {

    const { data, renderItem, ...viewProps } = props;

    const renderMessage = (item, key) => {
        // @ts-ignore
        return React.cloneElement(renderItem(item), { key });
    };

    return (
        <View
            {...viewProps}>
            {data.map(renderMessage)}
        </View>
    );
};
