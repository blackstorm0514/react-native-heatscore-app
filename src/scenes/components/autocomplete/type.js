import { CustomOptionsAutocompleteItem } from './autocomplete-examples';
import { StarIcon } from '../../../components/icons';

const defaultData = [
    { id: 1, title: 'Star Wars', releaseYear: 1977 },
    { id: 2, title: 'Back to the Future', releaseYear: 1985 },
    { id: 3, title: 'The Matrix', releaseYear: 1999 },
    { id: 4, title: 'Inception', releaseYear: 2010 },
    { id: 5, title: 'Interstellar', releaseYear: 2014 },
];

const defaultAutocomplete = {
    title: 'Default',
    props: {
        placeholder: 'Place your text',
        data: defaultData,
    },
};

const disabledAutocomplete = {
    title: 'Disabled',
    props: {
        ...defaultAutocomplete.props,
        disabled: true,
    },
};

const labelAutocomplete = {
    title: 'Label',
    props: {
        ...defaultAutocomplete.props,
        label: 'Movies',
    },
};

const captionAutocomplete = {
    title: 'Caption',
    props: {
        ...defaultAutocomplete.props,
        caption: 'You should watch at least one',
    },
};

const captionIconAutocomplete = {
    title: 'Caption Icon',
    props: {
        ...captionAutocomplete.props,
        captionIcon: StarIcon,
    },
};

const iconAutocomplete = {
    title: 'Icon',
    props: {
        ...defaultAutocomplete.props,
        accessoryRight: StarIcon,
    },
};

const renderItemAutocomplete = {
    title: 'Render Item',
    props: {
        ...defaultAutocomplete.props,
        renderItem: CustomOptionsAutocompleteItem,
    },
};

const placeholderDataAutocomplete = {
    title: 'Placeholder Data',
    props: {
        ...defaultAutocomplete.props,
        placeholder: '123 for no results',
        placeholderData: [{ title: 'No Results 🙀' }],
    },
};

const defaultSection = {
    items: [
        defaultAutocomplete,
        disabledAutocomplete,
    ],
};

const accessoriesSection = {
    title: 'Accessories',
    items: [
        iconAutocomplete,
        labelAutocomplete,
        // captionAutocomplete,
        // captionIconAutocomplete,
    ],
};

const settingsSection = {
    title: 'Settings',
    items: [
        renderItemAutocomplete,
        placeholderDataAutocomplete,
    ],
};

export const autocompleteShowcase = {
    title: 'Autocomplete',
    sections: [
        defaultSection,
        accessoriesSection,
        settingsSection,
    ],
};

export const autocompleteSettings = [
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
        value: 'basic',
    },
    {
        propertyName: 'status',
        value: 'control',
    },
    {
        propertyName: 'size',
        value: 'small',
    },
    {
        propertyName: 'size',
        value: 'medium',
    },
    {
        propertyName: 'size',
        value: 'large',
    },
];
