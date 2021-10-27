import React from 'react';
import { StyleSheet } from 'react-native';
import { InputShowcase } from './input-showcase.component';
import { inputSettings, inputShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const InputScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <InputShowcase
            style={styles.component}
            {...props}
        />
    );

    return (
        <ShowcaseContainer
            showcase={inputShowcase}
            settings={inputSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
});
