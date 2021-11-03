import React from 'react';
import { BottomNavigation, ThemeProvider } from '@ui-kitten/components';
import { Theming } from '../services/theme.service';
import { StyleSheet } from 'react-native';

export const BrandBottomNavigation = (props) => {
    const brandTheme = Theming.useTheme('brand');

    return (
        <ThemeProvider theme={brandTheme}>
            <BottomNavigation {...props} />
        </ThemeProvider>
    );
};
