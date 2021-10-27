const defaultButtonGroup = {
    title: 'Default',
    props: {},
};

const giantButtonGroup = {
    title: 'Giant',
    props: {
        size: 'giant',
    },
};

const largeButtonGroup = {
    title: 'Large',
    props: {
        size: 'large',
    },
};

const mediumButtonGroup = {
    title: 'Medium',
    props: {
        size: 'medium',
    },
};

const smallButtonGroup = {
    title: 'Small',
    props: {
        size: 'small',
    },
};

const tinyButtonGroup = {
    title: 'Tiny',
    props: {
        size: 'tiny',
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultButtonGroup,
    ],
};

const sizeSection = {
    title: 'Size',
    items: [
        giantButtonGroup,
        largeButtonGroup,
        mediumButtonGroup,
        smallButtonGroup,
        tinyButtonGroup,
    ],
};

export const buttonGroupShowcase = {
    title: 'Button Group',
    sections: [
        defaultSection,
        sizeSection,
    ],
};

export const buttonGroupSettings = [
    {
        propertyName: 'appearance',
        value: 'filled',
    },
    {
        propertyName: 'appearance',
        value: 'outline',
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
