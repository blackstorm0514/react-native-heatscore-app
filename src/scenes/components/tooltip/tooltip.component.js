import React from 'react';
import { TooltipShowcase } from './tooltip-showcase.component';
import { tooltipSettings, tooltipShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const TooltipScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <TooltipShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={tooltipShowcase}
            settings={tooltipSettings}
            renderItem={renderItem}
            onBackPress={() => navigation.goBack()}
        />
    );
};

