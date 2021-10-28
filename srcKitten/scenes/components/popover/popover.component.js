import React from 'react';
import { PopoverShowcase } from './popover-showcase.component';
import { popoverSettings, popoverShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const PopoverScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <PopoverShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={popoverShowcase}
            settings={popoverSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

