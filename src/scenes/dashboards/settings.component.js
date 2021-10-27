import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/dashboards/settings';

export const SettingsScreen = ({ navigation }) => {

    const renderBackAction = () => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={navigation.goBack}
        />
    );

    return (
        <SafeAreaLayout
            style={styles.container}
            insets='top'>
            <TopNavigation
                title='Settings'
                accessoryLeft={renderBackAction}
            />
            <Divider />
            <ContentView />
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
