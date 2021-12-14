import React from "react";
import { Image } from "react-native";
import defaultTeam from '../assets/images/default_team.png';

export default function TeamLogoImage({ image_id, style, size }) {
    return (
        <Image
            source={image_id ? { uri: `https://assets.b365api.com/images/team/m/${image_id}.png` } : defaultTeam}
            style={[style, { width: size, height: size, resizeMode: 'contain' }]}
        />
    )
}