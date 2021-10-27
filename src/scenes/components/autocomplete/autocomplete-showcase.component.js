import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Autocomplete,
    AutocompleteElement,
    AutocompleteItem,
} from '@ui-kitten/components';

export const AutocompleteShowcase = (props) => {
    const [value, setValue] = React.useState(props.value);
    const [data, setData] = React.useState(props.data);

    const onSelect = (index) => {
        setValue(props.data[index].title);
    };

    const RenderComponent = props.renderItem;

    const onChangeText = (query) => {
        const visibleData = props.data.filter((item) => {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });

        setValue(query);
        setData(visibleData);
    };

    const renderOption = (item, index) => (
        <AutocompleteItem key={index} title={item.title} />
    );

    return (
        <Autocomplete
            {...props}
            style={styles.autocomplete}
            value={value}
            onChangeText={onChangeText}
            onSelect={onSelect}
        >
            {data.map(RenderComponent || renderOption)}
        </Autocomplete>
    );
};

const styles = StyleSheet.create({
    autocomplete: {
        minWidth: 192,
    },
});
