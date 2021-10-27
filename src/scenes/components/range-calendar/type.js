const now = new Date();

const defaultCalendar = {
    props: {
        min: new Date(now.getFullYear() - 12, 0, 1),
        max: new Date(now.getFullYear() + 12, 0, 1),
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultCalendar,
    ],
};

export const calendarShowcase = {
    title: 'Range Calendar',
    sections: [
        defaultSection,
    ],
};
