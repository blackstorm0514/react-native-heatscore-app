import React from 'react';
import { ToggleShowcase } from './toggle-showcase.component';
import { toggleSettings, toggleShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const ToggleScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <ToggleShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={toggleShowcase}
            settings={toggleSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
