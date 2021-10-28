import React from 'react';
import { CardBody, CardCustomHeader, CardDefaultHeader, CardFooter } from './card-examples';

const defaultCard = {
    props: {
        children: <CardBody />,
    },
};

const defaultSection = {
    title: 'Default',
    items: [
        defaultCard,
    ],
};

const cardDefaultHeader = {
    props: {
        children: <CardBody />,
        header: CardDefaultHeader,
    },
};

const cardDefaultHeaderSection = {
    title: 'Header',
    items: [
        cardDefaultHeader,
    ],
};

const cardCustomHeader = {
    props: {
        children: <CardBody />,
        header: CardCustomHeader,
    },
};

const cardCustomHeaderSection = {
    title: 'Custom Header',
    items: [
        cardCustomHeader,
    ],
};

const footerCard = {
    props: {
        children: <CardBody />,
        footer: CardFooter,
    },
};

const footerSection = {
    title: 'Footer',
    items: [
        footerCard,
    ],
};

const headerFooterCard = {
    props: {
        children: <CardBody />,
        header: CardDefaultHeader,
        footer: CardFooter,
    },
};

const headerFooterSection = {
    title: 'Header & Footer',
    items: [
        headerFooterCard,
    ],
};

export const cardShowcase = {
    title: 'Card',
    sections: [
        defaultSection,
        cardDefaultHeaderSection,
        cardCustomHeaderSection,
        footerSection,
        headerFooterSection,
    ],
};

export const cardSettings = [
    {
        propertyName: 'appearance',
        value: 'outline',
    },
    {
        propertyName: 'appearance',
        value: 'filled',
    },
    {
        propertyName: 'status',
        value: 'basic',
    },
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
];
