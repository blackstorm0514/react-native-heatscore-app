import React from 'react';
import { Toggle } from '@ui-kitten/components';

export const ToggleShowcase = (props) => {

    const [checked, setChecked] = React.useState(props.checked);

    return (
        <Toggle
            {...props}
            checked={checked}
            onChange={setChecked}
        >
            {props.children}
        </Toggle>
    );
};
