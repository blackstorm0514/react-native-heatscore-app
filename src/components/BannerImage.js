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

        return visible ? (
            <SafeAreaView style={{
                height: height,
                width: width,
                alignItems: 'flex-end',
                marginTop: Platform.OS === 'ios' ? 40 : 0
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
                            height: height,
                            resizeMode: 'stretch'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onCloseBanner()} >
                    <CloseIcon style={styles.closeIcon} />
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
        marginTop: 30,
        marginRight: 20
    },
})