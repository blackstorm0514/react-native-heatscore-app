import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Alert, BackHandler } from 'react-native';
import ProfileSettingComponent from './components/ProfileSettingComponent';
import { TopNavigation, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducer';
import { AppStorage } from '../../../services/app-storage.service';
import { GoogleLogOut } from '../../../services/google.service';

class ProfileScreen extends PureComponent {

    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('Scores'); return true; }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    renderTitle = () => {
        return <Text style={styles.titleText}>My Account</Text>
    }

    logOutAction = () => {
        Alert.alert(
            "Log out from Heatscore",
            "Are you sure you want to log out from HeatScore?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        const { setUserAction } = this.props;
                        AppStorage.removeToken(null).then(() => setUserAction(null));
                        GoogleLogOut();
                    },
                },
                { text: "No", },
            ]
        );
    }

    render() {
        const { navigation, user } = this.props;
        return (
            <ScrollView style={styles.container}>
                <TopNavigation
                    title={this.renderTitle}
                />
                {!user && <ProfileSettingComponent
                    style={[styles.profileSetting, styles.section]}
                    title='Sign In'
                    navigateAction={() => navigation.navigate('SignIn')}
                />}
                {!user && <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Create Account'
                    navigateAction={() => navigation.navigate('SignUp')}
                />}
                {user && <ProfileSettingComponent
                    style={[styles.profileSetting, styles.section]}
                    title='Log out'
                    navigateAction={this.logOutAction}
                />}
                {user && <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Account Details'
                    navigateAction={() => { }}
                />}
                <ProfileSettingComponent
                    style={[styles.profileSetting, styles.section]}
                    title='Edition'
                    value="US - English"
                    disabled={user == null}
                    navigateAction={() => { }}
                />
                <ProfileSettingComponent
                    style={styles.profileSetting}
                    title='Favourites'
                    disabled={user == null}
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

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { setUserAction: actions.setUserAction })(ProfileScreen);

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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderColor: '#222',
        borderBottomWidth: 1,
    },
    section: {
        marginTop: 24,
    },
});
