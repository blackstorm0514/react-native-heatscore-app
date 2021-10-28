
const leftTitleToggle = {
    title: 'Right Text',
    props: {
        children: 'Place your text',
    },
};

const rightTitleToggle = {
    title: 'Left Text',
    props: {
        style: { flexDirection: 'row-reverse' },
        children: 'Place your text',
    },
};

const disabledTitleToggle = {
    title: 'Text Disabled',
    props: {
        children: 'Place your text',
        disabled: true,
    },
};

const checkedToggle = {
    title: 'Checked',
    props: {
        checked: true,
    },
};

const uncheckedToggle = {
    title: 'Unchecked',
    props: {
        checked: false,
    },
};

const disabledUncheckedToggle = {
    title: 'Disabled Unchecked',
    props: {
        checked: false,
        disabled: true,
    },
};

const disabledCheckedToggle = {
    title: 'Disabled Checked',
    props: {
        checked: true,
        disabled: true,
    },
};

const titleSection = {
    title: 'Title',
    items: [
        leftTitleToggle,
        rightTitleToggle,
        disabledTitleToggle,
    ],
};

const stateSection = {
    title: 'State',
    items: [
        checkedToggle,
        uncheckedToggle,
        disabledCheckedToggle,
        disabledUncheckedToggle,
    ],
};

export const toggleShowcase = {
    title: 'Toggle',
    sections: [
        stateSection,
        titleSection,
    ],
};

export const toggleSettings = [
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
