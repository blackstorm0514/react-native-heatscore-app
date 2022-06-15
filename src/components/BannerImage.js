import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CloseIcon } from '../libs/icons';

const BannerImage = ({ uri, width, height, onClickBanner, onCloseBanner }) => {
    if (!uri) return null;
    return (
        <View style={{
            height: height,
            width: width,
            alignItems: 'flex-end'
        }}>
            <Image
                source={{ uri }}
                style={{
                    flex: 1,
                    width: width,
                    height: height,
                    position: 'absolute',
                    resizeMode: 'stretch'
                }}
                onPress={() => console.log("fff")}
            />
            <TouchableOpacity onPress={() => console.log("rew")} >
                <CloseIcon style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
    );
}

export default BannerImage

const styles = StyleSheet.create({
    closeIcon: {
        height: 30,
        width: 30,
        tintColor: '#FFF'
    },
})