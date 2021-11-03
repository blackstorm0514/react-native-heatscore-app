import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';


class WebViewComponent extends Component {
    render() {
        const { route: { params: { url } } } = this.props;
        return <WebView
            source={{ uri: url }}
            automaticallyAdjustContentInsets={true}
        />;
    }
}

export default WebViewComponent;