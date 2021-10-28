import React from 'react';
import { StarIcon } from '../../../components/icons';

const defaultMenuItems = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
];

const withIconMenuItems = [
    {
        title: 'Item 1',
        accessoryLeft: StarIcon,
    },
    {
        title: 'Item 2',
        accessoryLeft: StarIcon,
    },
    {
        title: 'Item 3',
        accessoryLeft: StarIcon,
    },
];

const withDisabledItemMenuItems = [
    {
        title: 'Item 1',
        accessoryLeft: StarIcon,
    },
    {
        title: 'Item 2',
        accessoryLeft: StarIcon,
        disabled: true,
    },
    {
        title: 'Item 3',
        accessoryLeft: StarIcon,
    },
];

const withGroupsMenuItems = [
    {
        title: 'Item 1',
        accessoryLeft: StarIcon,
    },
    {
        title: 'Item 2',
        accessoryLeft: StarIcon,
        subItems: [
            {
                title: 'Item 21',
                accessoryLeft: StarIcon,
                disabled: true,
            },
            {
                title: 'Item 22',
                accessoryLeft: StarIcon,
            },
            {
                title: 'Item 23',
                accessoryLeft: StarIcon,
            },
        ],
    },
    {
        title: 'Item 3',
        accessoryLeft: StarIcon,
    },
];

const defaultMenu = {
    title: 'Default',
    props: {
        data: defaultMenuItems,
    },
};

const withIconsMenu = {
    title: 'Icon',
    props: {
        data: withIconMenuItems,
    },
};

const withDisabledItemMenu = {
    title: 'Disabled Item',
    props: {
        data: withDisabledItemMenuItems,
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultMenu,
        withIconsMenu,
        withDisabledItemMenu,
    ],
};

const withGroupsMenu = {
    title: 'Groups',
    props: {
        data: withGroupsMenuItems,
    },
};

const withGroupsSection = {
    title: 'With Groups',
    items: [
        withGroupsMenu,
    ],
};

export const menuShowcase = {
    title: 'Menu',
    sections: [
        defaultSection,
        withGroupsSection,
    ],
};

export const menuSettings = [
    {
        propertyName: 'appearance',
        value: 'default',
    },
    {
        propertyName: 'appearance',
        value: 'noDivider',
    },
];
