import React from 'react';
import { IndexPath, Menu, MenuElement, MenuItem, MenuGroup } from '@ui-kitten/components';

export const MenuShowcase = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const onSelect = (index) => {
        setSelectedIndex(index.row);
    };

    const renderData = props.data.map((el, index) => (
        el.subItems ? (
            <MenuGroup key={index}>
                {el.subItems.map((el, index) => (
                    <MenuItem key={index} {...el} />
                ))}
            </MenuGroup>
        ) : <MenuItem key={index} {...el} />
    ));

    return (
        <Menu
            {...props}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
        >
            {renderData}
        </Menu>
    );
};
