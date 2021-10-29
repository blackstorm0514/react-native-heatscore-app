import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class WebViewComponent extends Component {
    render() {
        return <WebView source={{ uri: 'https://demo-livematchpro.statscore.com/en/soccer?configId=60dc694d4321eaff1879f0cf&eventId=4090101' }} />;
    }
}

export default WebViewComponent;