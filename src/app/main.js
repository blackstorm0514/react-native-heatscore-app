import React from 'react';
import { StyleSheet } from 'react-native';
import {
    ApplicationProvider,
    Button,
    Icon,
    IconRegistry,
    Layout,
    Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { WebView } from 'react-native-webview';

const HeartIcon = (props) => (
    <Icon {...props} name='heart' />
);

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <Layout style={styles.container}>
                {/* <WebView
                    source={{ uri: 'http://dev.payperwin.com' }}
                    style={styles.webview}
                /> */}
            </Layout>
        </ApplicationProvider>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    webview: {
        marginTop: 0
    }
});
