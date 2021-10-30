import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';


class WebViewComponent extends Component {
    render() {
        // console.log(this.props)
        const { route: { params: { url } } } = this.props;
        return <WebView source={{ uri: url }} />;
    }
}

export default WebViewComponent;