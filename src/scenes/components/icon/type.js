const defaultIcon = {
  title: 'Default',
  props: {},
};

const zoomIcon = {
  title: 'Zoom',
  props: {
    animation: 'zoom',
  },
};

const pulseIcon = {
  title: 'Pulse',
  props: {
    animation: 'pulse',
  },
};

const shakeIcon = {
  title: 'Shake',
  props: {
    animation: 'shake',
  },
};

const infiniteExample = {
  title: 'Infinite',
  props: {
    animation: 'shake',
    animationConfig: {
      cycles: -1,
    },
  },
};

const defaultSection = {
  title: 'Default',
  items: [
    defaultIcon,
  ],
};

const animationSection = {
  title: 'Animations',
  items: [
    zoomIcon,
    pulseIcon,
    shakeIcon,
  ],
};

const infiniteSection = {
  title: 'Infinite Animation',
  items: [
    infiniteExample,
  ],
};

export const iconShowcase = {
  title: 'Icon',
  sections: [
    defaultSection,
    animationSection,
    infiniteSection,
  ],
};

export const iconSettings = [
  {
    propertyName: 'pack',
    value: 'eva',
  },
  {
    propertyName: 'pack',
    value: 'ant',
  },
  {
    propertyName: 'pack',
    value: 'feather',
  },
  {
    propertyName: 'pack',
    value: 'font-awesome',
  },
  {
    propertyName: 'pack',
    value: 'material',
  },
  {
    propertyName: 'pack',
    value: 'material-community',
  },
];
