import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker } from '@ui-kitten/components';


export const DatepickerShowcase = (props) => {

    const [date, setDate] = React.useState(null);

    return (
        <Datepicker
            {...props}
            style={[styles.datepicker, props.style]}
            date={date}
            onSelect={setDate}
        />
    );
};

const styles = StyleSheet.create({
    datepicker: {
        width: 200,
    },
});

