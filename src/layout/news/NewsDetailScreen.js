import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

export default ({ navigation, route }) => {
    const { params: { uri } } = route;
    return (
        <Layout style={styles.container}>
            <WebView source={{ uri: uri }} />
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

