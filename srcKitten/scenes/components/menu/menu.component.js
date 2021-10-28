import React from 'react';
import { MenuShowcase } from './menu-showcase.component';
import { menuSettings, menuShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const MenuScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <MenuShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={menuShowcase}
            settings={menuSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
