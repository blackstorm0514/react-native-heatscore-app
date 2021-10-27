import React from 'react';
import {
    TopNavigationAction,
} from '@ui-kitten/components';
import { ArrowIosBackIcon, MenuIcon, MoreVerticalIcon, StarIcon } from '../../../components/icons';


export const BackAction = (props) => (
    <TopNavigationAction
        {...props}
        icon={ArrowIosBackIcon}
    />
);

export const RightAction = (props) => (
    <>
        <TopNavigationAction
            {...props}
            icon={StarIcon}
        />
        <TopNavigationAction
            {...props}
            icon={MenuIcon}
        />
    </>
);
