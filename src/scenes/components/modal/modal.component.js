import React from 'react';
import { ModalShowcase } from './modal-showcase.component';
import { modalShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const ModalScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <ModalShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={modalShowcase}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

