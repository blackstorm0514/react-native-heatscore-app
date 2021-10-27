import React from 'react';
import { Icon, IconProps, Input } from '@ui-kitten/components';

const DEFAULT_ICON = 'star';

export const IconShowcase = (props) => {

    const iconRef = React.useRef();
    const [currentIcon, setCurrentIcon] = React.useState(DEFAULT_ICON);
    let inputValue = DEFAULT_ICON;

    React.useEffect(() => {
        const animationTimeout = setTimeout(startAnimation, 500);
        return () => clearTimeout(animationTimeout);
    });

    const onInputChangeText = (text) => {
        inputValue = text;
    };

    const onInputBlur = () => {
        // @ts-ignore
        iconRef.current.startAnimation();
        setCurrentIcon(inputValue.length > 0 ? inputValue : DEFAULT_ICON);
    };

    const startAnimation = () => {
        // @ts-ignore
        iconRef.current.startAnimation();
    };

    const renderIcon = (style) => (
        <Icon
            {...props}
            {...style}
            ref={iconRef}
            name={currentIcon}
        />
    );

    return (
        <Input
            style={{ flex: 1 }}
            placeholder='Type icon name'
            autoCapitalize='none'
            autoCorrect={false}
            caption='Unfocus to change icon'
            captionIcon={renderIcon}
            accessoryRight={renderIcon}
            onChangeText={onInputChangeText}
            onBlur={onInputBlur}
        />
    );
};
