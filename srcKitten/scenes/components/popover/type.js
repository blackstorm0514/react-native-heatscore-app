const defaultPopover = {
    title: 'Default',
    props: {},
};

const fullWidthPopover = {
    title: 'Full Width',
    props: {
        fullWidth: true,
    },
};

const styledBackdropPopover = {
    title: 'Styled Backdrop',
    props: {
        backdropStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
};

const defaultSection = {
    items: [
        defaultPopover,
        fullWidthPopover,
    ],
};

const backdropSection = {
    title: 'Backdrop',
    items: [
        styledBackdropPopover,
    ],
};


export const popoverShowcase = {
    title: 'Popover',
    sections: [
        defaultSection,
        backdropSection,
    ],
};

export const popoverSettings = [
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
