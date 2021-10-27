import React from 'react';
import { RadioGroupShowcase } from './radio-group-showcase.component';
import { radioGroupShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const RadioGroupScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <RadioGroupShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={radioGroupShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
