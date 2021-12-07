import React from 'react';
import { Image } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FontAwesome5IconProvider = (name) => ({
    toReactElement: ({ style: { width, height, tintColor, ...otherStyle } }) => {
        return (
            <FontAwesome5Icon style={otherStyle} size={width} color={tintColor} name={name} />
        )
    },
});

const FontAwesomeIconProvider = (name) => ({
    toReactElement: ({ style: { width, height, tintColor, ...otherStyle } }) => {
        return (
            <FontAwesomeIcon style={otherStyle} size={width} color={tintColor} name={name} />
        )
    },
});

const FeatherIconProvider = (name) => ({
    toReactElement: ({ style: { width, height, tintColor, ...otherStyle } }) => {
        return (
            <FeatherIcon style={otherStyle} size={width} color={tintColor} name={name} />
        )
    },
});

const EvilIconProvider = (name) => ({
    toReactElement: ({ style: { width, height, tintColor, ...otherStyle } }) => {
        return (
            <EvilIcon style={otherStyle} size={width} color={tintColor} name={name} />
        )
    },
});

const IoniconProvider = (name) => ({
    toReactElement: ({ style: { width, height, tintColor, ...otherStyle } }) => {
        return (
            <Ionicon style={otherStyle} size={width} color={tintColor} name={name} />
        )
    },
});

export const VectorIconsPack = {
    name: 'vector',
    icons: {
        'football': FontAwesome5IconProvider('football-ball'),
        'news': FontAwesomeIconProvider('newspaper-o'),
        'clipboard': FeatherIconProvider('clipboard'),
        'user': FeatherIconProvider('user'),
        'refresh': IoniconProvider('refresh'),
        'bell': FontAwesomeIconProvider('bell-o')
    },
};
