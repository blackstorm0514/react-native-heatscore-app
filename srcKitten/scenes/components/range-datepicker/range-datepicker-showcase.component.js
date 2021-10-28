import React from 'react';
import { StyleSheet } from 'react-native';
import {
    RangeDatepicker,
} from '@ui-kitten/components';


export const RangeDatepickerShowcase = (props) => {

    const [range, setRange] = React.useState({});

    return (
        <RangeDatepicker
            {...props}
            style={styles.rangeDatepicker}
            range={range}
            onSelect={setRange}
        />
    );
};

const styles = StyleSheet.create({
    rangeDatepicker: {
        width: 200,
    },
});

