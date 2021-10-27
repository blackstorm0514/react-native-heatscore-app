const checkedCheckBox = {
    title: 'Checked',
    props: {
        checked: true,
    },
};

const uncheckedCheckBox = {
    title: 'Unchecked',
    props: {
        checked: false,
    },
};

const indeterminateCheckBox = {
    title: 'Indeterminate',
    props: {
        indeterminate: true,
    },
};

const disabledCheckBox = {
    title: 'Disabled Checked',
    props: {
        checked: true,
        disabled: true,
    },
};

const disabledUncheckedCheckBox = {
    title: 'Disabled Unchecked',
    props: {
        disabled: true,
    },
};

const rightTextCheckBox = {
    title: 'Right Text',
    props: {
        children: 'Place your text',
    },
};

const leftTextCheckBox = {
    title: 'Left Text',
    props: {
        style: { flexDirection: 'row-reverse' },
        children: 'Place your text',
    },
};

const textDisabledCheckBox = {
    title: 'Disabled Text',
    props: {
        disabled: true,
        children: 'Place your text',
    },
};

const stateSection = {
    title: 'State',
    items: [
        checkedCheckBox,
        uncheckedCheckBox,
        indeterminateCheckBox,
        disabledCheckBox,
        disabledUncheckedCheckBox,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        rightTextCheckBox,
        leftTextCheckBox,
        textDisabledCheckBox,
    ],
};

export const checkboxShowcase = {
    title: 'CheckBox',
    sections: [
        stateSection,
        accessoriesSection,
    ],
};

export const checkboxSettings = [
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
