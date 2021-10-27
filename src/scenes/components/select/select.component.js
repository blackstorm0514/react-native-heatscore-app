import React from 'react';
import { SelectShowcase } from './select-showcase.component';
import { MultiselectShowcase } from './multiselect-showcase.component';
import { selectSettings, selectShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const SelectScreen = ({ navigation }) => {

    const renderItem = (props) => {
        return props.multiSelect ? <MultiselectShowcase {...props} /> : <SelectShowcase {...props} />
    };

    return (
        <ShowcaseContainer
            showcase={selectShowcase}
            settings={selectSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};
