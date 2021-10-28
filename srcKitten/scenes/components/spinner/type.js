const giantSpinner = {
    title: 'Giant',
    props: {
        size: 'giant',
    },
};

const largeSpinner = {
    title: 'Large',
    props: {
        size: 'large',
    },
};

const mediumSpinner = {
    title: 'Medium',
    props: {
        size: 'medium',
    },
};

const smallSpinner = {
    title: 'Small',
    props: {
        size: 'small',
    },
};

const tinySpinner = {
    title: 'Tiny',
    props: {
        size: 'tiny',
    },
};

const primarySpinner = {
    title: 'Primary',
    props: {
        status: 'primary',
    },
};

const successSpinner = {
    title: 'Success',
    props: {
        status: 'success',
    },
};

const infoSpinner = {
    title: 'Info',
    props: {
        status: 'info',
    },
};

const warningSpinner = {
    title: 'Warning',
    props: {
        status: 'warning',
    },
};

const dangerSpinner = {
    title: 'Danger',
    props: {
        status: 'danger',
    },
};

const basicSpinner = {
    title: 'Basic',
    props: {
        status: 'basic',
    },
};

const controlSpinner = {
    title: 'Control',
    props: {
        status: 'control',
    },
};

const sizeSection = {
    title: 'Size',
    items: [
        giantSpinner,
        largeSpinner,
        mediumSpinner,
        smallSpinner,
        tinySpinner,
    ],
};

const statusSection = {
    title: 'Status',
    items: [
        primarySpinner,
        successSpinner,
        infoSpinner,
        warningSpinner,
        dangerSpinner,
        basicSpinner,
        controlSpinner,
    ],
};

export const spinnerShowcase = {
    title: 'Spinner',
    sections: [
        sizeSection,
        statusSection,
    ],
};

export const spinnerSettings = [
    {
        propertyName: 'animating',
        value: true,
    },
    {
        propertyName: 'animating',
        value: false,
    },
];

