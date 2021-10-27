import React from 'react';
import { StatusBar as RNStatusBar, } from 'react-native';
import { styled } from '@ui-kitten/components';

// @styled('StatusBar');

export const StatusBar = (props) => {
    const { eva, ...statusBarProps } = this.props;

    return (
        <RNStatusBar
            {...eva.style}
            {...statusBarProps}
        />
    );
}
