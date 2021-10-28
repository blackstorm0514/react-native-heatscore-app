import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ListProps, Text } from '@ui-kitten/components';

export const DetailsList = (props) => {

    const { style, data, ...viewProps } = props;

    const renderItem = (item, index) => (
        <View
            key={index}
            style={styles.item}>
            <Text
                appearance='hint'
                category='s2'>
                {item.title}
            </Text>
            <Text category='s1'>
                {item.description}
            </Text>
        </View>
    );

    return (
        <View
            {...viewProps}
            style={[styles.container, style]}>
            {data.map(renderItem)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    item: {
        alignItems: 'center',
        marginHorizontal: 16,
    },
});
