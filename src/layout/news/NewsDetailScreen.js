import React, { useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

const NewsDetailScreen = (props) => {
    const { route: { params: { uri } } } = props;

    const backAction = () => {
        const { navigation } = props;
        navigation.navigate('AllNews')
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
        }
    }, [])

    return (
        <Layout style={styles.container}>
            <WebView source={{ uri: uri }} />
        </Layout>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

