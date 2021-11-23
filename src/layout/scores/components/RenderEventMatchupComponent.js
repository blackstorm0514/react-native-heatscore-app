import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ImageOverlay } from '../../../components/image-overlay.component';
import OverlayImage from '../../../assets/images/image-splash.png';
import WebView from 'react-native-webview';

export default class RenderEventMatchupComponent extends Component {
    render() {

        return (
            <ImageOverlay
                style={styles.container}
                source={OverlayImage}>
                {/* <WebView
                    source={{ uri: 'http://app.heatscore.co:8080/soccer/4090101?lang=en' }}
                /> */}
            </ImageOverlay>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});
