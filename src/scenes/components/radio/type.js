const checkedRadio = {
    title: 'Checked',
    props: {
        checked: true,
    },
};

const uncheckedRadio = {
    title: 'Unchecked',
    props: {
        checked: false,
    },
};

const disabledCheckedRadio = {
    title: 'Disabled Checked',
    props: {
        checked: true,
        disabled: true,
    },
};

const disabledUncheckedRadio = {
    title: 'Disabled Unchecked',
    props: {
        checked: false,
        disabled: true,
    },
};

const rightTextRadio = {
    title: 'Right Text',
    props: {
        children: 'Place your text',
    },
};

const leftTextRadio = {
    title: 'Left Text',
    props: {
        style: { flexDirection: 'row-reverse' },
        children: 'Place your text',
    },
};

const textDisabledRadio = {
    title: 'Text Disabled',
    props: {
        disabled: true,
        children: 'Place your text',
    },
};

const stateSection = {
    title: 'State',
    items: [
        checkedRadio,
        uncheckedRadio,
        disabledCheckedRadio,
        disabledUncheckedRadio,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        rightTextRadio,
        leftTextRadio,
        textDisabledRadio,
    ],
};

export const radioShowcase = {
    title: 'Radio',
    sections: [
        stateSection,
        accessoriesSection,
    ],
};

export const radioSettings = [
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
    {
        propertyName: 'checked',
        value: true,
    },
];
