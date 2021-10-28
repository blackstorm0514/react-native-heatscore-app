import React from 'react';
import {
    CheckBox,
} from '@ui-kitten/components';

export const CheckBoxShowcase = (props) => {
    const [checked, setChecked] = React.useState(props.checked);
    const [indeterminate, setIndeterminate] = React.useState(
        props.indeterminate
    );

    const onChange = (isChecked, isIndeterminate) => {
        setChecked(isChecked);
        setIndeterminate(isIndeterminate);
    };

    return (
        <CheckBox
            {...props}
            checked={checked}
            indeterminate={indeterminate}
            onChange={onChange}
        >
            {props.children}
        </CheckBox>
    );
};
