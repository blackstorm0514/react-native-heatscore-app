import React from 'react';
import {
    Button,
    ButtonElement,
    IndexPath,
    OverflowMenu,
    MenuItem,
} from '@ui-kitten/components';

export const OverflowMenuShowcase = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const toggleMenu = () => {
        setVisible(!visible);
    };

    const onSelect = (index) => {
        setSelectedIndex(index);
        toggleMenu();
    };

    const renderButton = () => (
        <Button onPress={toggleMenu}>TOGGLE MENU</Button>
    );

    const renderData = props.data.map((el, index) => (
        <MenuItem key={index} {...el} />
    ));

    return (
        <OverflowMenu
            {...props}
            visible={visible}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            onBackdropPress={toggleMenu}
            anchor={renderButton}
        >
            {renderData}
        </OverflowMenu>
    );
};
