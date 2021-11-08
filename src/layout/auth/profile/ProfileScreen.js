import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProfileSettingComponent from './components/ProfileSettingComponent';
import { TopNavigation, Text } from '@ui-kitten/components';

export default class ProfileScreen extends PureComponent {

    renderTitle = () => {
        return <Text style={styles.titleText}>My Account</Text>
    }

    render() {
        const { navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                <TopNavigation
                    title={this.renderTitle}
                />
                <ProfileSettingComponent
                    style={[styles.profileSetting, styles.section]}
                    title='Sign In'
                    navigateAction={() => { }}
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Create Account'
                    navigateAction={() => { }}
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Account Details'
                    navigateAction={() => { }}
                />
                <ProfileSettingComponent
                    style={[styles.profileSetting, styles.section]}
                    title='Edition'
                    value="US - English"
                    navigateAction={() => { }}
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Favourites'
                    navigateAction={() => navigation.navigate('Favorites')}
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Version'
                    value="1.0.0"
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Feedback'
                    navigateAction={() => { }}
                />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    profileSetting: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'black',
        borderColor: '#222',
        borderBottomWidth: 1,
    },
    section: {
        marginTop: 24,
    },
    doneButton: {
        marginHorizontal: 24,
        marginTop: 24,
    },
});
