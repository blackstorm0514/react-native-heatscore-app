import React, { useEffect, useState } from "react";
import { Image } from "react-native";

const ScaledImage = ({ uri, width: propsWidth, height: propsHeight }) => {
    if (!uri) return null;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            if (propsWidth && !propsHeight) {
                const realWidth = propsWidth > width ? width : propsWidth;
                setWidth(realWidth);
                setHeight(height * (realWidth / width));
            } else if (!propsWidth && propsHeight) {
                const realHeight = propsHeight > height ? height : propsHeight;
                setWidth(width * (realHeight / height));
                setHeight(realHeight);
            } else {
                setWidth(width);
                setHeight(height);
            }
        }, () => { });
    }, [uri]);

    return (
        <Image
            source={{ uri }}
            style={{
                height: height,
                width: width,
                marginVertical: 4
            }}
        />
    );
}

export default ScaledImage