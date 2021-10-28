import React from 'react';
import { Avatar } from '@ui-kitten/components';

export const AvatarShowcase = (props) => (
    <Avatar
        {...props}
        source={require('../../../assets/images/image-app-icon.png')}
    />
);
