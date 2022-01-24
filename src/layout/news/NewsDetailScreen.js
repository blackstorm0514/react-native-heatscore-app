import React, { useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';
import { LoadingIndicator } from '../scores/components/LoadingIndicator';

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
            <WebView source={{ uri: uri }} renderLoading={() => <LoadingIndicator style={styles.loadingIndicator} />} />
        </Layout>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    loadingIndicator: {
        height: 100,
        justifyContent: 'center'
    },
});

