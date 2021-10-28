import React from 'react';
import { BackAction, RightAction } from './top-navigation-action-showcase.component';
const rightControlsTopNavigation = {
    props: {
        title: 'Title',
        subtitle: 'Subtitle',
        accessoryLeft: BackAction,
        accessoryRight: RightAction,
    },
};

const leftControlTopNavigation = {
    props: {
        title: 'Title',
        subtitle: 'Subtitle',
        accessoryLeft: BackAction,
    },
};

const subtitleTopNavigation = {
    props: {
        title: 'Title',
        subtitle: 'Subtitle',
    },
};

const titleTopNavigation = {
    props: {
        title: 'Title',
    },
};

const rightControlsSection = {
    title: 'Right Controls',
    items: [
        rightControlsTopNavigation,
    ],
};

const leftControlSection = {
    title: 'Left Control',
    items: [
        leftControlTopNavigation,
    ],
};

const subtitleSection = {
    title: 'Subtitle',
    items: [
        subtitleTopNavigation,
    ],
};

const titleSection = {
    title: 'Title',
    items: [
        titleTopNavigation,
    ],
};

export const topNavigationShowcase = {
    title: 'Top Navigation',
    sections: [
        titleSection,
        subtitleSection,
        leftControlSection,
        rightControlsSection,
    ],
};

export const topNavigationSettings = [
    {
        propertyName: 'appearance',
        value: 'default',
    },
    {
        propertyName: 'appearance',
        value: 'control',
    },
    {
        propertyName: 'alignment',
        value: 'start',
    },
    {
        propertyName: 'alignment',
        value: 'center',
    },
];
