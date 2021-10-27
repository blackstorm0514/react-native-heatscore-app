import React from 'react';
import { Radio } from '@ui-kitten/components';

export const RadioShowcase = (props) => {

    const [checked, setChecked] = React.useState(props.checked);

    return (
        <Radio
            {...props}
            checked={checked}
            onChange={setChecked}
        >
            {props.children}
        </Radio>
    );
};
