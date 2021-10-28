import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListElement, ListProps, Text } from '@ui-kitten/components';

export const CategoryList = (props) => {

    const { hint, ...listProps } = props;

    return (
        <React.Fragment>
            <Text
                style={styles.hint}
                category='s1'>
                {hint}
            </Text>
            <List
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                {...listProps}
            />
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    hint: {
        margin: 16,
    },
});
