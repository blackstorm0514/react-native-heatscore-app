import React from 'react';
import { Theming } from '../services/theme.service';

export const ThemedIcon = (props) => {

    const themeContext = React.useContext(Theming.ThemeContext);
    const { light, dark, ...iconProps } = props;

    return themeContext.isDarkMode() ? dark(iconProps) : light(iconProps);
};
