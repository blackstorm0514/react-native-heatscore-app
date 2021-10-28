import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { StarIcon } from '../../../components/icons';

const now = new Date();

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

const defaultDatepicker = {
    title: 'Default',
    props: {},
};

const iconDatepicker = {
    title: 'Icon',
    props: {
        ...defaultDatepicker.props,
        accessoryRight: StarIcon,
    },
};

const labelDatepicker = {
    title: 'Label',
    props: {
        ...defaultDatepicker.props,
        label: 'Date of Birth',
    },
};

const captionDatepicker = {
    title: 'Caption',
    props: {
        ...defaultDatepicker.props,
        caption: captionRender,
    },
};

const boundsDatepicker = {
    title: 'Date Bounds',
    props: {
        ...defaultDatepicker.props,
        min: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        max: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
    },
};

const backdropDatepicker = {
    title: 'Backdrop',
    props: {
        ...defaultDatepicker.props,
        backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultDatepicker,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        iconDatepicker,
        labelDatepicker,
        captionDatepicker,
    ],
};

const settingsSection = {
    title: 'Settings',
    items: [
        boundsDatepicker,
        backdropDatepicker,
    ],
};

export const datepickerShowcase = {
    title: 'Datepicker',
    sections: [
        defaultSection,
        accessoriesSection,
        settingsSection,
    ],
};
