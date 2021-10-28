const giantAvatar = {
    title: 'Giant',
    props: {
        size: 'giant',
    },
};

const largeAvatar = {
    title: 'Large',
    props: {
        size: 'large',
    },
};

const mediumAvatar = {
    title: 'Medium',
    props: {
        size: 'medium',
    },
};

const smallAvatar = {
    title: 'Small',
    props: {
        size: 'small',
    },
};

const tinyAvatar = {
    title: 'Tiny',
    props: {
        size: 'tiny',
    },
};

const roundAvatar = {
    title: 'Round',
    props: {
        shape: 'round',
    },
};

const roundedAvatar = {
    title: 'Rounded',
    props: {
        shape: 'rounded',
    },
};

const squareAvatar = {
    title: 'Square',
    props: {
        shape: 'square',
    },
};

const shapeSection = {
    title: 'Shape',
    items: [
        roundAvatar,
        roundedAvatar,
        squareAvatar,
    ],
};

const sizeSection = {
    title: 'Size',
    items: [
        giantAvatar,
        largeAvatar,
        mediumAvatar,
        smallAvatar,
        tinyAvatar,
    ],
};

export const avatarShowcase = {
    title: 'Avatar',
    sections: [
        sizeSection,
        shapeSection,
    ],
};
