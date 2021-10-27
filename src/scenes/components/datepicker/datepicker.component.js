import React from 'react';
import { DatepickerShowcase } from './datepicker-showcase.component';
import { datepickerShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const DatepickerScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <DatepickerShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={datepickerShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
