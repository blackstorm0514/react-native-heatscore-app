import React from 'react';
import {
    Button,
    Popover,
    Text,
} from '@ui-kitten/components';

export const PopoverShowcase = (props) => {
    const [visible, setVisible] = React.useState(false);

    const togglePopover = () => {
        setVisible(!visible);
    };

    const renderPopoverContent = () => {
        return <Text>Hi! I'm Popover!</Text>;
    };

    const renderToggleButton = () => (
        <Button onPress={togglePopover}>TOGGLE POPOVER</Button>
    );

    return (
        <Popover
            {...props}
            visible={visible}
            anchor={renderToggleButton}
            onBackdropPress={togglePopover}
        >
            {renderPopoverContent()}
        </Popover>
    );
};
