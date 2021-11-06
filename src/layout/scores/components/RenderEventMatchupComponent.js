import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { PlusOutlineIcon } from '../../../components/icons';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ImageOverlay } from '../../../components/image-overlay.component';
import OverlayImage from '../../../assets/images/image-splash.png';

export default class RenderEventMatchupComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ImageOverlay
                style={styles.container}
                source={OverlayImage}>
                <AutoHeightWebView
                    source={{ uri: 'http://app.heatscore.co:8080/soccer/4090101?lang=en' }}
                />
            </ImageOverlay>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});
