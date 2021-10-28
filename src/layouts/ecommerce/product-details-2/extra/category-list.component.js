import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Button, ListProps } from '@ui-kitten/components';

export const CategoryList = (props) => {

    const { style, data, ...viewProps } = props;

    const renderItem = (item, index) => (
        <Button
            key={index}
            style={styles.item}
            size='tiny'>
            {item}
        </Button>
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
        borderRadius: 16,
        marginHorizontal: 4,
    },
});
