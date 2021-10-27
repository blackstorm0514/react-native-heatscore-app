import React from 'react';
import { AutocompleteShowcase } from './autocomplete-showcase.component';
import { autocompleteSettings, autocompleteShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const AutocompleteScreen = ({ navigation }) => {

    const renderItem = (props) => (
        <AutocompleteShowcase {...props} />
    );

    return (
        <ShowcaseContainer
            showcase={autocompleteShowcase}
            settings={autocompleteSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
