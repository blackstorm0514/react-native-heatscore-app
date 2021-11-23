import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'

export default class RenderEventMatchupComponent extends Component {
    render() {

        return (
            <View style={styles.container}>
                <AutoHeightWebView
                    source={{ uri: 'http://app.heatscore.co:8080/soccer/4090101?lang=en' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },

});
