import React, { useEffect, useState } from "react";
import { Image } from "react-native";

const ScaledImage = ({ uri, width: propsWidth, height: propsHeight }) => {
    if (!uri) return null;
    let isMounted = false;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        isMounted = true;
        Image.getSize(uri, (width, height) => {
            if (propsWidth && !propsHeight) {
                const realWidth = propsWidth > width ? width : propsWidth;
                isMounted && setWidth(realWidth);
                isMounted && setHeight(height * (realWidth / width));
            } else if (!propsWidth && propsHeight) {
                const realHeight = propsHeight > height ? height : propsHeight;
                isMounted && setWidth(width * (realHeight / height));
                isMounted && setHeight(realHeight);
            } else {
                isMounted && setWidth(width);
                isMounted && setHeight(height);
            }
        }, () => { isMounted = false });
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