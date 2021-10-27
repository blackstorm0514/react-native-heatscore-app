import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StarIcon } from '../../../components/icons';
import { Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    }
});

const captionRender = ({ style }) => {
    return (
        <View style={styles.captionContainer}>
            {StarIcon(styles.captionIcon)}
            <Text style={style}>Place your text</Text>
        </View>
    )
}

const defaultInput = {
    title: 'Default',
    props: {},
};

const disabledInput = {
    title: 'Disabled',
    props: {
        disabled: true,
    },
};

const iconInput = {
    title: 'Icon',
    props: {
        accessoryRight: StarIcon,
    },
};

const labelInput = {
    title: 'Label',
    props: {
        label: 'Place your text',
    },
};

const captionInput = {
    title: 'Caption',
    props: {
        caption: captionRender,
    },
};

const stateSection = {
    title: 'State',
    items: [
        defaultInput,
        disabledInput,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        iconInput,
        labelInput,
        captionInput,
    ],
};

export const inputShowcase = {
    title: 'Input',
    sections: [
        stateSection,
        accessoriesSection,
    ],
};

export const inputSettings = [
    {
        propertyName: 'status',
        value: 'primary',
    },
    {
        propertyName: 'status',
        value: 'success',
    },
    {
        propertyName: 'status',
        value: 'info',
    },
    {
        propertyName: 'status',
        value: 'warning',
    },
    {
        propertyName: 'status',
        value: 'danger',
    },
    {
        propertyName: 'status',
        value: 'basic',
    },
    {
        propertyName: 'status',
        value: 'control',
    },
    {
        propertyName: 'size',
        value: 'small',
    },
    {
        propertyName: 'size',
        value: 'medium',
    },
    {
        propertyName: 'size',
        value: 'large',
    },
];
