import React from 'react';
import { Layout, Tab, Text } from '@ui-kitten/components';
import { StarIcon } from '../../../components/icons';

const titleBottomNavigation = {
    props: {
        children: [
            <Tab title='Tab 1'>
                <Layout>
                    <Text>Tab 1</Text>
                </Layout>
            </Tab>,
            <Tab title='Tab 2'>
                <Layout>
                    <Text>Tab 2</Text>
                </Layout>
            </Tab>,
            <Tab title='Tab 3'>
                <Layout>
                    <Text>Tab 3</Text>
                </Layout>
            </Tab>,
        ],
    },
};

const iconBottomNavigation = {
    props: {
        children: [
            <Tab icon={StarIcon}>
                <Layout>
                    <Text>Tab 1</Text>
                </Layout>
            </Tab>,
            <Tab icon={StarIcon}>
                <Layout>
                    <Text>Tab 2</Text>
                </Layout>
            </Tab>,
            <Tab icon={StarIcon}>
                <Layout>
                    <Text>Tab 3</Text>
                </Layout>
            </Tab>,
        ],
    },
};

const iconTitleBottomNavigation = {
    props: {
        children: [
            <Tab icon={StarIcon} title='Tab 1'>
                <Layout>
                    <Text>Tab 1</Text>
                </Layout>
            </Tab>,
            <Tab icon={StarIcon} title='Tab 2'>
                <Layout>
                    <Text>Tab 2</Text>
                </Layout>
            </Tab>,
            <Tab icon={StarIcon} title='Tab 3'>
                <Layout>
                    <Text>Tab 3</Text>
                </Layout>
            </Tab>,
        ],
    },
};

const titleSection = {
    title: 'Title',
    items: [
        titleBottomNavigation,
    ],
};

const iconSection = {
    title: 'Icon',
    items: [
        iconBottomNavigation,
    ],
};

const iconTitleSection = {
    title: 'Icon Title',
    items: [
        iconTitleBottomNavigation,
    ],
};

export const tabViewShowcase = {
    title: 'Tab View',
    sections: [
        titleSection,
        iconSection,
        iconTitleSection,
    ],
};
