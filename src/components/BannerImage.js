import React, { useEffect, useState, Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from "react-native";
import { CloseIcon } from '../libs/icons';

var uri = "https://images.freeimages.com/images/large-previews/84f/canadian-flag-1444866.jpg"

class BannerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onVisitBanner = () => {
        console.log("visit banner", this.props)
        // this.setState({ visible: false });
    }

    onCloseBanner = () => {
        this.setState({ visible: false });
    }

    render() {
        const { visible } = this.state;
        const { width, height } = this.props;
        const deviceHeight = Platform.OS === 'ios' ? height + 40 : height;

        return visible ? (
            <SafeAreaView style={{
                height: deviceHeight,
                width: width,
                alignItems: 'flex-end'
            }}>
                <TouchableOpacity onPress={() => this.onVisitBanner()}
                    style={{
                        flex: 1,
                        position: 'absolute',
                    }}>
                    <Image
                        source={{ uri }}
                        style={{
                            flex: 1,
                            width: width,
                            height: deviceHeight,
                            resizeMode: 'stretch'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onCloseBanner()} >
                    <CloseIcon style={[styles.closeIcon, { marginTop: Platform.OS === 'ios' ? 20 : 30 }]} />
                </TouchableOpacity>
            </SafeAreaView>
        ) : null;
    }
};

export default BannerImage;

const styles = StyleSheet.create({
    closeIcon: {
        height: 30,
        width: 30,
        tintColor: '#FFF',
        marginRight: 20
    },
})