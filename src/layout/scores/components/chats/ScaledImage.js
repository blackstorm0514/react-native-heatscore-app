import React, { Component, PropTypes } from "react";
import { Image } from "react-native";

export default class ScaledImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: { uri: this.props.uri },
            width: 0,
            height: 0,
        };
    }

    UNSAFE_componentWillMount() {
        const { uri, width: propsWidth, height: propsHeight } = this.props;
        Image.getSize(uri, (width, height) => {
            if (propsWidth && !propsHeight) {
                const realWidth = propsWidth > width ? width : propsWidth;
                this.setState({
                    width: realWidth,
                    height: height * (realWidth / width)
                });
            } else if (!propsWidth && propsHeight) {
                const realHeight = propsHeight > height ? height : propsHeight;
                this.setState({
                    width: width * (realHeight / height),
                    height: realHeight
                });
            } else {
                this.setState({ width: width, height: height });
            }
        });
    }

    render() {
        const { source, width, height } = this.state;
        return (
            <Image
                source={source}
                style={{
                    height: height,
                    width: width,
                    marginVertical: 4
                }}
            />
        );
    }
}
