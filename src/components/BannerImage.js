import React, { useEffect, useState, Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions, Linking } from "react-native";
import { CloseIcon } from '../libs/icons';
import { getBanner, visitBanner } from '../redux/services';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class BannerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            where: 'first',
            height: screenHeight,
            bannerURL: '',
            uri: ''
        }
    }

    componentDidMount = () => {
        getBanner()
            .then(({ data }) => {
                const { success, bannerSetting } = data;
                if (success) {
                    const { link, imageData } = bannerSetting;
                    if (imageData == "") {
                        this.setState({ visible: false });
                    } else {
                        this.setState({ bannerURL: link, uri: imageData });
                    }
                } else {
                    this.setState({ visible: false });
                }
            })
            .catch((error) => {
                this.setState({ visible: false });
            });
    }

    setHeight = () => {
        if (this.state.where == 'first') {
            this.setState({ height: 60 });
        } else {
            this.setState({ visible: false });
        }
    };

    visitBanner = () => {
        const { bannerURL } = this.state;
        Linking.openURL(bannerURL);
        visitBanner();
    }

    onVisitBanner = () => {
        this.setHeight();
        this.setState({ where: 'second' });
        this.visitBanner();
    }

    onCloseBanner = () => {
        this.setHeight();
        this.setState({ where: 'second' });
    }

    render() {
        const { visible, height, uri } = this.state;
        const deviceHeight = Platform.OS === 'ios' ? height + 40 : height;

        return visible ? (
            <SafeAreaView style={{
                height: deviceHeight,
                width: screenWidth,
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
                            width: screenWidth,
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