import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TopNavigationComponent } from '../signup/components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import { ValidateFields } from '../../../services/validator.service';
import { AppStorage } from '../../../services/app-storage.service';
import { actions } from '../../../redux/reducer';
import { connect } from 'react-redux';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleConfigure } from '../../../services/google.service';
import { signIn, signInGoogle } from '../../../redux/services';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='control' />
    </View>
);

const errorOject = {
    email: null,
    server: null
}

class SignInForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: errorOject,
            submitting: false,
        }
    }

    changeField = (field, value) => {
        this.setState({ [field]: value });
    }

    onSignInButtonPressed = () => {
        const { email, password } = this.state;
        const { navigation, setUserAction } = this.props;
        const result = ValidateFields({ email });
        if (result != true) {
            this.setState({ error: { ...errorOject, ...result } });
            return;
        }
        this.setState({ error: errorOject, submitting: true });
        signIn(email, password)
            .then(({ data }) => {
                const { success, error, user, accessToken } = data;
                if (success) {
                    this.setState({ submitting: false });
                    setUserAction(user);
                    AppStorage.setToken(accessToken).then(() => navigation.navigate('Profile'));
                } else {
                    this.setState({ submitting: false, error: { ...errorOject, ...error } });
                }
            })
            .catch((error) => {
                console.warn(error);
                this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
            });
    }

    onGoogleSignIn = async () => {
        const { setUserAction, navigation } = this.props;
        this.setState({ submitting: true });

        GoogleSignin.configure(GoogleConfigure);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = userInfo;

            signInGoogle(idToken)
                .then(({ data }) => {
                    const { success, error, user, accessToken } = data;
                    if (success) {
                        this.setState({ submitting: false });
                        setUserAction(user);
                        AppStorage.setToken(accessToken).then(() => navigation.navigate('Profile'));
                    } else {
                        this.setState({ submitting: false, error: { ...errorOject, ...error } });
                    }
                })
                .catch((error) => {
                    console.warn(error);
                    this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // alert("You cancelled the sign in.");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert("Google sign in operation is in process");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert("Play Services not available");
            } else {
                alert("Something unknown went wrong with Google sign in. " + error.message);
            }
            this.setState({ submitting: false });
        }
    }

    render() {
        const { email, password, error, submitting } = this.state;

        return (
            <KeyboardAvoidingView>
                <Layout level="1" style={styles.layoutContainer}>
                    <View>
                        <Text style={styles.titleText}>SIGN IN</Text>
                        <Layout style={styles.boxLayout}>
                            <Text>Email</Text>
                            <Input
                                style={styles.formInput}
                                placeholder='jone.doe@gmail.com'
                                placeholderTextColor="#888"
                                value={email}
                                onChangeText={(text) => this.changeField('email', text)}
                            />
                            {error && error.email && <Text style={styles.errorText}>{error.email}</Text>}
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text>Password</Text>
                            <Input
                                style={styles.formInput}
                                placeholder='Password'
                                placeholderTextColor="#888"
                                value={password}
                                secureTextEntry
                                onChangeText={(text) => this.changeField('password', text)}
                            />
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Text style={styles.forgotPasswordText}>Forgot password</Text>
                            </TouchableOpacity>
                        </Layout>
                        {error && error.server && <Text style={styles.errorText}>{error.server}</Text>}
                    </View>
                    <Button
                        style={styles.signInButton}
                        size='large'
                        accessoryLeft={submitting ? LoadingIndicator : null}
                        onPress={this.onSignInButtonPressed}>
                        {submitting ? null : 'SIGN  IN'}
                    </Button>

                    <View style={styles.socialAuthContainer}>
                        <Text style={styles.socialAuthHintText}>OR</Text>
                        <View style={styles.socialAuthButtonsContainer}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <GoogleSigninButton
                                    // style={{ width: 200, height: 50 }}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Light}
                                    onPress={() => this.onGoogleSignIn()}
                                    disabled={submitting} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity activeOpacity={0.8}>
                                <FontAwesome color='red' name='google-plus-official' size={50} />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Layout>
            </KeyboardAvoidingView>
        );
    }
}

class SigninScreen extends PureComponent {
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="Profile" />
                <SignInForm {...this.props} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    layoutContainer: {
        flex: 1,
        backgroundColor: '#151515',
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    titleText: {
        color: '#E10032',
        alignSelf: 'center',
        fontSize: 32,
        textTransform: 'uppercase'
    },
    offerText: {
        color: '#FFF',
        fontSize: 16,
        marginVertical: 16
    },
    signInButton: {
        alignSelf: 'baseline',
        width: '100%',
        backgroundColor: '#E10032',
        borderColor: '#E10032',
        color: 'white',
        marginTop: 30
    },
    boxLayout: {
        backgroundColor: '#151515',
        color: 'white',
        paddingHorizontal: 10,
        marginTop: 15
    },
    formInput: {
        marginTop: 6,
        backgroundColor: '#151515',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    forgotPasswordText: {
        color: "#1D2FFF",
        alignSelf: 'flex-end',
        marginTop: 10,
        fontSize: 18
    },
    socialAuthContainer: {
        marginTop: 20,
        marginBottom: 30
    },
    socialAuthButtonsContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // paddingHorizontal: 90
        alignItems: 'center'
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
        color: 'white',
        fontSize: 20
    },
    errorText: {
        color: '#E10032',
        fontSize: 12,
        marginTop: 4,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(null, { setUserAction: actions.setUserAction })(SigninScreen);