import React from 'react';
import { CheckBoxShowcase } from './checkbox-showcase.component';
import { checkboxSettings, checkboxShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const CheckBoxScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <CheckBoxShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={checkboxShowcase}
            settings={checkboxSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
