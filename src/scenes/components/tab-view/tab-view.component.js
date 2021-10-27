import React from 'react';
import { StyleSheet } from 'react-native';
import { TabViewShowcase } from './tab-view-showcase.component';
import { tabViewShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const TabViewScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <TabViewShowcase
            {...props}
            style={[styles.component, props.style]}
        />
    );

    return (
        <ShowcaseContainer
            showcase={tabViewShowcase}
            renderItem={renderItem}
            onBackPress={() => navigation.goBack()}
        />
    );
};

const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
});

