import React from 'react';
import { IconShowcase } from './icon-showcase.component';
import { iconSettings, iconShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const IconScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <IconShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={iconShowcase}
            settings={iconSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

