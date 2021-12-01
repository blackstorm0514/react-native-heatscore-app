import React, { PureComponent } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

export default class NewsDetailScreen extends PureComponent {
    render() {
        const { route } = this.props;
        const { params: { uri } } = route;

        return (
            <Layout style={styles.container}>
                <WebView source={{ uri: uri }} />
            </Layout>
        );
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    backAction = () => {
        const { navigation } = this.props;
        navigation.navigate('AllNews')
        return true;
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

