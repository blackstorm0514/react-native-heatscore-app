import { StarIcon } from '../../../components/icons';

const defaultTooltip = {
    title: 'Default',
    props: {},
};

const iconTooltip = {
    title: 'With Icon',
    props: {
        accessoryLeft: StarIcon,
    },
};

const backdropTooltip = {
    title: 'Styled backdrop',
    props: {
        backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultTooltip,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        iconTooltip,
    ],
};

const backdropSection = {
    title: 'Backdrop',
    items: [
        backdropTooltip,
    ],
};


export const tooltipShowcase = {
    title: 'Tooltip',
    sections: [
        defaultSection,
        accessoriesSection,
        backdropSection,
    ],
};

export const tooltipSettings = [
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
