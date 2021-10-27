import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputShowcase = (props) => {

    const [value, setValue] = React.useState(null);

    return (
        <Input
            {...props}
            value={value}
            onChangeText={setValue}
            placeholder='Place your Text'
        />
    );
};
