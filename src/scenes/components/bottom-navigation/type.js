import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigationTab } from '@ui-kitten/components';
import { StarIcon } from '../../../components/icons';

const styles = StyleSheet.create({
    customIcons: {
        marginTop: 10,
    }
})

const titleBottomNavigation = {
    props: {
        children: [
            <BottomNavigationTab title='Tab 1' />,
            <BottomNavigationTab title='Tab 2' />,
            <BottomNavigationTab title='Tab 3' />,
        ],
    },
};

const iconBottomNavigation = {
    props: {
        children: [
            <BottomNavigationTab icon={StarIcon} />,
            <BottomNavigationTab icon={StarIcon} />,
            <BottomNavigationTab icon={StarIcon} />,
        ],
    },
};

const iconTitleBottomNavigation = {
    props: {
        children: [
            <BottomNavigationTab style={styles.customIcons} icon={StarIcon} title='Tab 1' />,
            <BottomNavigationTab style={styles.customIcons} icon={StarIcon} title='Tab 2' />,
            <BottomNavigationTab style={styles.customIcons} icon={StarIcon} title='Tab 3' />,
        ],
    },
};

const titleSection = {
    title: 'Title',
    items: [
        titleBottomNavigation,
    ],
};

const iconSection = {
    title: 'Icon',
    items: [
        iconBottomNavigation,
    ],
};

const iconTitleSection = {
    title: 'Icon Title',
    items: [
        iconTitleBottomNavigation,
    ],
};

export const bottomNavigationShowcase = {
    title: 'Bottom Navigation',
    sections: [
        titleSection,
        iconSection,
        iconTitleSection,
    ],
};

export const bottomNavigationSettings = [
    {
        propertyName: 'appearance',
        value: 'noIndicator',
        description: 'No Indicator',
    },
];