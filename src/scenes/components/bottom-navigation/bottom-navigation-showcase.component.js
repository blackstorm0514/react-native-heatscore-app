import React from 'react';
import {
    BottomNavigation,
} from '@ui-kitten/components';

export const BottomNavigationShowcase = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            {...props}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
        />
    );
};
