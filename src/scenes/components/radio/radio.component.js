import React from 'react';
import { RadioShowcase } from './radio-showcase.component';
import { radioSettings, radioShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const RadioScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <RadioShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={radioShowcase}
            settings={radioSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
