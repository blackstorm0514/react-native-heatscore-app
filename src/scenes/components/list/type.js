import React from 'react';
import {
    ListItemAccessoryShowcase,
    ListItemIconAccessoryShowcase,
    ListItemIconShowcase,
    ListItemShowcase,
} from './list-item-showcase.component';

const data = new Array(42).fill({
    title: 'Title',
    description: 'Description',
});

const renderListItem = (info) => (
    <ListItemShowcase {...info.item} />
);

const renderIconListItem = (info) => (
    <ListItemIconShowcase {...info.item} />
);

const renderAccessoryListItem = (info) => (
    <ListItemAccessoryShowcase {...info.item} />
);

const renderIconAccessoryListItem = (info) => (
    <ListItemIconAccessoryShowcase {...info.item} />
);

export const defaultList = {
    props: {
        data: data,
        renderItem: renderListItem,
    },
};

export const defaultSection = {
    title: 'Default',
    items: [
        defaultList,
    ],
};

export const listShowcase = {
    title: 'List',
    sections: [
        defaultSection,
    ],
};

export const listSettings = [
    {
        propertyName: 'renderItem',
        value: renderIconListItem,
        description: 'icon',
    },
    {
        propertyName: 'renderItem',
        value: renderAccessoryListItem,
        description: 'accessory',
    },
    {
        propertyName: 'renderItem',
        value: renderIconAccessoryListItem,
        description: 'icon accessory',
    },
];
