import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Spinner } from '@ui-kitten/components';

export const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='giant' status='basic' />
    </View>
);

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
})