import React, { useEffect, useState, Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions } from "react-native";
import { CloseIcon } from '../libs/icons';

const uri = "https://images.freeimages.com/images/large-previews/84f/canadian-flag-1444866.jpg"
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class BannerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            where: 'first',
            height: screenHeight,
        }
    }

    componentDidMount = () => {
        
    }

    setHeight = () => {
        if (this.state.where == 'first') {
            this.setState({ height: 60 });
        } else {
            this.setState({ visible: false });
        }
    };

    visitBanner = () => {

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
        const { visible, height } = this.state;
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