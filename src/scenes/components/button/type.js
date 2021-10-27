import React from 'react';
import { StarIcon } from '../../../components/icons';

const defaultButton = {
    title: 'Default',
    props: {},
};

const disabledButton = {
    title: 'Disabled',
    props: {
        disabled: true,
    },
};

const leftIconButton = {
    title: 'Left Icon',
    props: {
        accessoryLeft: StarIcon,
    },
};

const rightIconButton = {
    title: 'Right Icon',
    props: {
        accessoryLeft: StarIcon,
        style: {
            flexDirection: 'row-reverse',
        },
    },
};

const disabledIconButton = {
    title: 'Disabled',
    props: {
        accessoryLeft: StarIcon,
        disabled: true,
    },
};

const giantButton = {
    title: 'Giant',
    props: {
        accessoryLeft: StarIcon,
        size: 'giant',
    },
};

const largeButton = {
    title: 'Large',
    props: {
        accessoryLeft: StarIcon,
        size: 'large',
    },
};

const mediumButton = {
    title: 'Medium',
    props: {
        accessoryLeft: StarIcon,
        size: 'medium',
    },
};

const smallButton = {
    title: 'Small',
    props: {
        accessoryLeft: StarIcon,
        size: 'small',
    },
};

const tinyButton = {
    title: 'Tiny',
    props: {
        accessoryLeft: StarIcon,
        size: 'tiny',
    },
};
const textSection = {
    title: 'Text',
    items: [
        defaultButton,
        disabledButton,
    ],
};

const iconSection = {
    title: 'Icon',
    items: [
        leftIconButton,
        rightIconButton,
        disabledIconButton,
    ],
};

const sizeSection = {
    title: 'Size',
    items: [
        giantButton,
        largeButton,
        mediumButton,
        smallButton,
        tinyButton,
    ],
};

export const buttonShowcase = {
    title: 'Button',
    sections: [
        textSection,
        iconSection,
        sizeSection,
    ],
};

export const buttonSettings = [
    {
        propertyName: 'appearance',
        value: 'filled',
    },
    {
        propertyName: 'appearance',
        value: 'outline',
    },
    {
        propertyName: 'appearance',
        value: 'ghost',
    },
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
        value: 'control',
    },
    {
        propertyName: 'status',
        value: 'basic',
    },
];

