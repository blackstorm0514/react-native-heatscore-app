import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigationShowcase } from './top-navigation-showcase.component';
import { topNavigationSettings, topNavigationShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const TopNavigationScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <TopNavigationShowcase
            {...props}
            style={[styles.component, props.style]}
        />
    );

    return (
        <ShowcaseContainer
            showcase={topNavigationShowcase}
            settings={topNavigationSettings}
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

