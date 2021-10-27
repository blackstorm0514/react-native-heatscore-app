import React from 'react';
import { CalendarShowcase } from './calendar-showcase.component';
import { calendarShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const CalendarScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <CalendarShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={calendarShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
