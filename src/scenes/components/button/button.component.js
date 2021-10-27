import React from 'react';
import { ButtonShowcase } from './button-showcase.component';
import { buttonSettings, buttonShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const ButtonScreen = ({ navigation }) => (
    <ShowcaseContainer
        showcase={buttonShowcase}
        settings={buttonSettings}
        renderItem={ButtonShowcase}
        onBackPress={navigation.goBack}>
    </ShowcaseContainer>
);

