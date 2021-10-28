import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement, useTheme } from '@ui-kitten/components';

export const ClockIcon = () => {
    const theme = useTheme();
    return (
        <Icon
            width='24'
            height='24'
            fill={theme['text-hint-color']}
            name='clock-outline'
        />
    );
};

export const HeartIcon = (style) => (
    <Icon {...style} name='heart' />
);

export const MessageCircleIcon = (style) => (
    <Icon {...style} name='message-circle-outline' />
);
