import React from 'react';
import { RangeDatepickerShowcase } from './range-datepicker-showcase.component';
import { rangeDatepickerShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const RangeDatepickerScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <RangeDatepickerShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={rangeDatepickerShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
