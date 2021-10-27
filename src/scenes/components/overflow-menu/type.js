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

const defaultOverflowMenu = {
    title: 'Default',
    props: {
        data: defaultMenuItems,
    },
};

const withIcons = {
    title: 'Icon',
    props: {
        data: withIconMenuItems,
    },
};

const withDisabledItem = {
    title: 'Disabled items',
    props: {
        data: withDisabledItemMenuItems,
    },
};

const styledBackdropOverflowMenu = {
    title: 'Styled backdrop',
    props: {
        data: withIconMenuItems,
        backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultOverflowMenu,
        withDisabledItem,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        withIcons,
    ],
};

const backdropSection = {
    title: 'Backdrop',
    items: [
        styledBackdropOverflowMenu,
    ],
};

export const overflowMenuShowcase = {
    title: 'Overflow Menu',
    sections: [
        defaultSection,
        accessoriesSection,
        backdropSection,
    ],
};

export const overflowMenuSettings = [
    {
        propertyName: 'appearance',
        value: 'default',
    },
    {
        propertyName: 'appearance',
        value: 'noDivider',
    },
    {
        propertyName: 'placement',
        value: 'left',
    },
    {
        propertyName: 'placement',
        value: 'left start',
    },
    {
        propertyName: 'placement',
        value: 'left end',
    },
    {
        propertyName: 'placement',
        value: 'top',
    },
    {
        propertyName: 'placement',
        value: 'top start',
    },
    {
        propertyName: 'placement',
        value: 'top end',
    },
    {
        propertyName: 'placement',
        value: 'right',
    },
    {
        propertyName: 'placement',
        value: 'right start',
    },
    {
        propertyName: 'placement',
        value: 'right end',
    },
    {
        propertyName: 'placement',
        value: 'bottom',
    },
    {
        propertyName: 'placement',
        value: 'bottom start',
    },
    {
        propertyName: 'placement',
        value: 'bottom end',
    },
];
