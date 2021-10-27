import React from 'react';
import { StyleSheet } from 'react-native';
import { LayoutShowcase } from './layout-showcase.component';
import { layoutSettings, layoutShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const LayoutScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <LayoutShowcase
            {...props}
            style={[styles.component, props.style]}
        />
    );

    return (
        <ShowcaseContainer
            showcase={layoutShowcase}
            settings={layoutSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

const styles = StyleSheet.create({
    component: {
        flex: 1,
        height: 256,
    },
});

