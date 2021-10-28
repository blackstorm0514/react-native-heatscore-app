import React from 'react';
import { RangeCalendarShowcase } from './range-calendar-showcase.component';
import { calendarShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const RangeCalendarScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <RangeCalendarShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={calendarShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
