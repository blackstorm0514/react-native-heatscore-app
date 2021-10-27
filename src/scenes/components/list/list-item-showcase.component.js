import React from 'react';
import {
    CheckBox,
    CheckBoxProps,
    ListItem,
    ListItemElement,
    ListItemProps,
    StyleType,
} from '@ui-kitten/components';
import { StarIcon } from '../../../components/icons';

const AccessoryElement = (style) => {
    const [checked, setChecked] = React.useState(true);

    const onChange = (nextChecked) => {
        setChecked(nextChecked);
    };

    return (
        <CheckBox
            checked={checked}
            onChange={onChange}
        />
    );
};

export const ListItemShowcase = (props) => (
    <ListItem {...props} />
);

export const ListItemIconShowcase = (props) => (
    <ListItem accessoryLeft={StarIcon} {...props} />
);

export const ListItemAccessoryShowcase = (props) => (
    <ListItem {...props} accessoryRight={AccessoryElement} />
);

export const ListItemIconAccessoryShowcase = (props) => (
    <ListItem {...props} accessoryLeft={StarIcon}
        accessoryRight={(style) => AccessoryElement(style)} />
);
