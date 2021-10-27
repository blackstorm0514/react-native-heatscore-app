import React from 'react';
import { OverflowMenuShowcase } from './overflow-menu-showcase.component';
import { overflowMenuSettings, overflowMenuShowcase, OverflowMenuPropsCustom } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const OverflowMenuScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <OverflowMenuShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={overflowMenuShowcase}
            settings={overflowMenuSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

