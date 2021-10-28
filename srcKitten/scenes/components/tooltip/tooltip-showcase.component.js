import React from 'react';
import {
    Button,
    Tooltip,
} from '@ui-kitten/components';

export const TooltipShowcase = (props) => {
    const [visible, setVisible] = React.useState(false);

    const toggleTooltip = () => {
        setVisible(!visible);
    };

    const renderToggleButton = () => (
        <Button onPress={toggleTooltip}>TOGGLE TOOLTIP</Button>
    );

    return (
        <Tooltip
            {...props}
            visible={visible}
            onBackdropPress={toggleTooltip}
            anchor={renderToggleButton}
        >
            Hi! I am Tooltip!
        </Tooltip>
    );
};
