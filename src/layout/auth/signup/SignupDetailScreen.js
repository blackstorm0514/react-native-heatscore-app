import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ValidateFields } from '../../../services/validator.service';
import { GoogleLogOut } from '../../../services/google.service';
import { signUp } from '../../../redux/services';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='control' />
    </View>
);

const errorOject = {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    passwordConfirm: null,
    server: null
};

class SignupDetailForm extends PureComponent {
    constructor(props) {
        super(props);
        const { route: { params } } = props;
        const { phone, facebookIdToken, googleIdToken, email, firstname, lastname, username } = params;
        this.state = {
            phone: phone,
            username: username ? username : '',
            firstname: firstname ? firstname : '',
            lastname: lastname ? lastname : '',
            email: email ? email : '',
            password: '',
            passwordConfirm: '',
            success: false,
            submitting: false,
            editable: (facebookIdToken || googleIdToken) ? false : true,
            error: errorOject
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    changeField = (field, value) => {
        this._Mounted && this.setState({ [field]: value });
    }

    onSubmit = () => {
        const { username, firstname, lastname, email, password, passwordConfirm, phone } = this.state;
        const result = ValidateFields({ username, firstname, lastname, email, password, passwordConfirm }, { tags: ['register'] });
        if (result != true) {
            this._Mounted && this.setState({ error: { ...errorOject, ...result } });
            return;
        }
        this._Mounted && this.setState({ error: errorOject, submitting: true });

        signUp({ username, firstname, lastname, email, password, passwordConfirm, phone })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this._Mounted && this.setState({ submitting: false, success: true });

                    GoogleLogOut();
                } else {
                    this._Mounted && this.setState({ submitting: false, error: { ...errorOject, ...error } });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
            });
    }

    render() {
        const { navigation } = this.props;
        const { username, firstname, lastname, email, password, passwordConfirm, success, error, submitting, editable } = this.state;
        return (
            <KeyboardAvoidingView>
                {!success && <Layout level="1" style={styles.layoutContainer}>
                    <View>
                        <Text style={styles.titleText}>Few More Details</Text>
                        <Text style={styles.offerText}>We just need a few more details to complete your account setup. Only your username will be displayed publicly.</Text>
                        <Layout style={styles.boxLayout}>
                            <Text style={styles.formLabel}>Username (min 6 characters)</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='John Doe'
                                placeholderTextColor="#888"
                                value={username}
                                onChangeText={(text) => this.changeField('username', text)}
                            />
                            {error && error.username && <Text style={styles.errorText}>{error.username}</Text>}
                        </Layout>
                        <Layout style={[styles.boxLayout, { flexDirection: 'row', marginTop: 0, paddingHorizontal: 0 }]}>
                            <Layout style={[styles.boxLayout, { flex: 1 }]}>
                                <Text style={styles.formLabel}>First Name</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='John'
                                    placeholderTextColor="#888"
                                    value={firstname}
                                    onChangeText={(text) => this.changeField('firstname', text)}
                                />
                                {error && error.firstname && <Text style={styles.errorText}>{error.firstname}</Text>}
                            </Layout>
                            <Layout style={[styles.boxLayout, { flex: 1 }]}>
                                <Text style={styles.formLabel}>Last Name</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='Doe'
                                    placeholderTextColor="#888"
                                    value={lastname}
                                    onChangeText={(text) => this.changeField('lastname', text)}
                                />
                                {error && error.lastname && <Text style={styles.errorText}>{error.lastname}</Text>}
                            </Layout>
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text style={styles.formLabel}>Email</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='jone.doe@gmail.com'
                                placeholderTextColor="#888"
                                value={email}
                                onChangeText={(text) => this.changeField('email', text.replace(/\s/g, ''))}
                                disabled={!editable}
                            />
                            {error && error.email && <Text style={styles.errorText}>{error.email}</Text>}
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text style={styles.formLabel}>Create a Password</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Create a Password'
                                placeholderTextColor="#888"
                                value={password}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={(text) => this.changeField('password', text.replace(/\s/g, ''))}
                            />
                            {error && error.password && <Text style={styles.errorText}>{error.password}</Text>}
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text style={styles.formLabel}>Confirm Password</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Confirm Password'
                                placeholderTextColor="#888"
                                value={passwordConfirm}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={(text) => this.changeField('passwordConfirm', text.replace(/\s/g, ''))}
                            />
                            {error && error.passwordConfirm && <Text style={styles.errorText}>{error.passwordConfirm}</Text>}
                        </Layout>
                    </View>
                    {error && error.server && <Text style={styles.errorText}>{error.server}</Text>}
                    <Button
                        style={styles.nextButton}
                        size='small'
                        accessoryLeft={submitting ? LoadingIndicator : null}
                        onPress={this.onSubmit}>
                        {submitting ? null : () => <Text style={styles.nextButtonText}>N E X T</Text>}
                    </Button>
                </Layout>}
                {success && <Layout level="1" style={styles.layoutContainer}>
                    <View style={styles.completeContainer}>
                        <Ionicons size={100} color='#E10032' name='checkmark-circle-outline' />
                        <Text style={styles.youareInText}>You're in</Text>
                        <Text style={styles.accountCompletedText}>Your account has been completed. You will receive a confirmation email</Text>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='large'
                        onPress={() => navigation.navigate('Profile')}>
                        C O N T I N U E
                    </Button>
                </Layout>}
            </KeyboardAvoidingView>
        );
    }
};

export default class SignupDetailScreen extends PureComponent {
    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('SignupHome'); return true; }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigationComponent navigation={navigation}
                    backPosition="Profile"
                    isSignout />
                <SignupDetailForm {...this.props} />
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
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 30,
        paddingTop: 30,
        justifyContent: 'space-between'
    },
    titleText: {
        color: '#E10032',
        alignSelf: 'center',
        fontSize: 24,
        textTransform: 'uppercase'
    },
    offerText: {
        color: '#FFF',
        fontSize: 14,
        marginVertical: 16
    },
    nextButton: {
        alignSelf: 'baseline',
        width: '100%',
        backgroundColor: '#E10032',
        borderColor: '#E10032',
        color: 'white',
        marginBottom: 30,
        marginTop: 15,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxLayout: {
        backgroundColor: '#121212',
        color: 'white',
        paddingHorizontal: 10,
        marginTop: 15
    },
    formLabel: {
        fontSize: 12
    },
    formInput: {
        marginTop: 6,
        backgroundColor: '#121212',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#999'
    },
    completeContainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    youareInText: {
        marginTop: 10,
        color: '#aaa',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    accountCompletedText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
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
