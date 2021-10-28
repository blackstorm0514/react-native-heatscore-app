import moment from 'moment';
import { CalendarViewModes, NativeDateService } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import { DateFnsService } from '@ui-kitten/date-fns';
import { CalendarCustomItem } from './calendar-custom-item.component';

const now = new Date();

const defaultCalendar = {
    props: {
        withFooter: true,
    },
};

const momentCalendar = {
    props: {
        date: moment(),
        dateService: new MomentDateService(),
    },
};

const dateFnsCalendar = {
    props: {
        date: now,
        dateService: new DateFnsService(),
    },
};

const startViewCalendar = {
    props: {
        startView: CalendarViewModes.MONTH,
    },
};

const minMaxCalendar = {
    props: {
        min: new Date(now.getFullYear(), now.getMonth(), 15),
        max: new Date(now.getFullYear(), now.getMonth() + 1, 15),
    },
};

const boundingCalendar = {
    props: {
        ...defaultCalendar.props,
        boundingMonth: false,
    },
};

const customItemCalendar = {
    props: {
        ...defaultCalendar.props,
        renderDay: CalendarCustomItem,
    },
};

const customTitlesCalendar = {
    props: {
        ...defaultCalendar.props,
        title: (date) => {
            return 'MODE';
        },
        todayTitle: (date) => {
            return 'TODAY';
        },
    },
};

const filterCalendar = {
    props: {
        ...defaultCalendar.props,
        filter: (date) => {
            return date.getDay() !== 0 && date.getDay() !== 6;
        },
    },
};

const mondayCalendar = {
    props: {
        ...defaultCalendar.props,
        dateService: new NativeDateService('en', {
            startDayOfWeek: 1,
        }),
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultCalendar,
    ],
};

const momentSection = {
    title: 'Moment',
    items: [
        momentCalendar,
    ],
};

const dateFnsSection = {
    title: 'Date FNS',
    items: [
        dateFnsCalendar,
    ],
};

const startViewSection = {
    title: 'Start View',
    items: [
        startViewCalendar,
    ],
};

const minMaxSection = {
    title: 'Date Bounds',
    items: [
        minMaxCalendar,
    ],
};

const boundingMonthSection = {
    title: 'Bounding Month',
    items: [
        boundingCalendar,
    ],
};

const customItemSection = {
    title: 'Custom Day',
    items: [
        customItemCalendar,
    ],
};

const customTitlesSection = {
    title: 'Custom Titles',
    items: [
        customTitlesCalendar,
    ],
};

const filterSection = {
    title: 'Filter',
    items: [
        filterCalendar,
    ],
};

const startDayOfWeekSection = {
    title: 'Start Day of Week',
    items: [
        mondayCalendar,
    ],
};

export const calendarShowcase = {
    title: 'Calendar',
    sections: [
        defaultSection,
        // startDayOfWeekSection,
        // customItemSection,
        // momentSection,
        // dateFnsSection,
        // startViewSection,
        // minMaxSection,
        // boundingMonthSection,
        // filterSection,
        // customTitlesSection,
    ],
};
