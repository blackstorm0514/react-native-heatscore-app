import React, { PureComponent } from 'react';
import { Text, Layout, List } from '@ui-kitten/components';
import { StyleSheet, BackHandler, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleConfigure } from '../../../services/google.service';

export default class SignupHomeScreen extends PureComponent {
    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('Profile'); return true; }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    renderLoginLink = () => {
        const { navigation } = this.props;
        return (
            <View style={styles.haveAccountContainer}>
                <Text style={styles.haveAccountText}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.8}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>

        )
    }

    renderHeader = () => {
        return <>
            <Text style={styles.titleText}>Create Free Account</Text>
            <Text style={styles.offerText}>How would you like to an account?</Text>
        </>
    }

    renderItem = ({ item }) => {
        const { navigation } = this.props;
        if (item == 'phone') {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SignupPhone')}>
                    <Layout style={styles.boxContainer}>
                        <Layout style={styles.boxLeftContainer}>
                            <Text style={styles.withText}>
                                With    <FontAwesome5Icon
                                    name="phone-alt"
                                    size={14} color='#fff' />
                            </Text>
                            <Text style={styles.phoneText}>Phone Number</Text>
                        </Layout>
                        <FontAwesome5Icon
                            name="chevron-right"
                            size={20} color='white' />
                    </Layout>
                </TouchableOpacity>
            )
        }
        if (item == 'google') {
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={this.configureGoogleSignUp}>
                    <Layout style={styles.boxContainer}>
                        <Layout style={styles.boxLeftContainer}>
                            <Text style={styles.withText}>
                                With    <FontAwesome5Icon
                                    name="google"
                                    size={14} color='#fff' />
                            </Text>
                            <Text style={styles.phoneText}>Google</Text>
                        </Layout>
                        <FontAwesome5Icon
                            name="chevron-right"
                            size={20} color='white' />
                    </Layout>
                </TouchableOpacity>

            )
        }
    }

    configureGoogleSignUp = async () => {
        const { navigation } = this.props;
        GoogleSignin.configure(GoogleConfigure);

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken, user: { email, familyName: lastname, givenName: firstname, name: username } } = userInfo;

            navigation.navigate('SignupDetail', { googleIdToken: idToken, email, firstname, lastname, username });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // alert("You cancelled the sign up.");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert("Google sign up operation is in process");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert("Play Services not available");
            } else {
                alert("Something unknown went wrong with Google sign up." + error.message);
            }
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="Profile" />
                <List style={styles.layoutContainer}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderLoginLink}
                    renderItem={this.renderItem}
                    data={['phone', 'google']}
                />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    layoutContainer: {
        backgroundColor: '#121212',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    titleText: {
        color: '#E10032',
        alignSelf: 'center',
        fontSize: 24,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    offerText: {
        color: '#FFF',
        fontSize: 16,
        marginVertical: 16,
        textAlign: 'center'
    },
    boxContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#444',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#080808',
        padding: 16,
        shadowColor: '#999',
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    boxLeftContainer: {
        backgroundColor: '#000'
    },
    withText: {
        color: '#FFF',
        fontSize: 14
    },
    phoneText: {
        color: '#E10032',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 4,
    },
    haveAccountContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    haveAccountText: {
        color: 'white',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: '#E10032',
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 10
    }
});
