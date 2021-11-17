import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ValidateFields } from '../../../services/validator.service';
import { ApiService } from '../../../services/api.service';

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

export default class SignupDetailScreen extends PureComponent {
    constructor(props) {
        super(props);
        const { route: { params } } = props;
        const { phone } = params;
        this.state = {
            phone: phone,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirm: '',
            success: false,
            submitting: false,
            error: errorOject
        }
    }

    changeField = (field, value) => {
        const { error } = this.state;
        const newError = { ...error };
        this.setState({ [field]: value, error: newError });

    }

    onSubmit = () => {
        const { username, firstname, lastname, email, password, passwordConfirm, phone } = this.state;
        const result = ValidateFields({ username, firstname, lastname, email, password, passwordConfirm });
        console.log(result);
        if (result != true) {
            this.setState({ error: { ...errorOject, ...result } });
            return;
        }
        this.setState({ error: errorOject, submitting: true });

        ApiService.post('/auth/signup', { username, firstname, lastname, email, password, passwordConfirm, phone })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this.setState({ submitting: false, success: true });
                } else {
                    this.setState({ submitting: false, error: { ...errorOject, ...error } });
                }
            })
            .catch((error) => {
                console.warn(error);
                this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
            });
    }

    render() {
        const { navigation } = this.props;
        const { username, firstname, lastname, email, password, passwordConfirm, success, error, submitting } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="Profile" />
                <KeyboardAvoidingView>
                    {!success && <Layout level="1" style={styles.layoutContainer}>
                        <View>
                            <Text style={styles.titleText}>Few More Details</Text>
                            <Text style={styles.offerText}>We just need a few more details to complete your account setup. Only your username will be displayed publicly.</Text>
                            <Layout style={styles.boxLayout}>
                                <Text>Username (min 6 characters)</Text>
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
                                    <Text>First Name</Text>
                                    <Input
                                        style={styles.formInput}
                                        status='control'
                                        placeholder='John'
                                        placeholderTextColor="#888"
                                        value={firstname}
                                        onChangeText={(text) => this.setState({ firstname: text })}
                                    />
                                    {error && error.firstname && <Text style={styles.errorText}>{error.firstname}</Text>}
                                </Layout>
                                <Layout style={[styles.boxLayout, { flex: 1 }]}>
                                    <Text>Last Name</Text>
                                    <Input
                                        style={styles.formInput}
                                        status='control'
                                        placeholder='Doe'
                                        placeholderTextColor="#888"
                                        value={lastname}
                                        onChangeText={(text) => this.setState({ lastname: text })}
                                    />
                                    {error && error.lastname && <Text style={styles.errorText}>{error.lastname}</Text>}
                                </Layout>
                            </Layout>
                            <Layout style={styles.boxLayout}>
                                <Text>Email</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='jone.doe@gmail.com'
                                    placeholderTextColor="#888"
                                    value={email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                                {error && error.email && <Text style={styles.errorText}>{error.email}</Text>}
                            </Layout>
                            <Layout style={styles.boxLayout}>
                                <Text>Create a Password</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='Create a Password'
                                    placeholderTextColor="#888"
                                    value={password}
                                    secureTextEntry
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                                {error && error.password && <Text style={styles.errorText}>{error.password}</Text>}
                            </Layout>
                            <Layout style={styles.boxLayout}>
                                <Text>Confirm Password</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='Confirm Password'
                                    placeholderTextColor="#888"
                                    value={passwordConfirm}
                                    secureTextEntry
                                    onChangeText={(text) => this.setState({ passwordConfirm: text })}
                                // accessoryRight={}
                                />
                                {error && error.passwordConfirm && <Text style={styles.errorText}>{error.passwordConfirm}</Text>}
                            </Layout>
                        </View>
                        {error && error.server && <Text style={styles.errorText}>{error.server}</Text>}
                        <Button
                            style={styles.nextButton}
                            size='large'
                            accessoryLeft={submitting ? LoadingIndicator : null}
                            onPress={this.onSubmit}>
                            {submitting ? null : 'N E X T'}
                        </Button>
                    </Layout>}
                    {success && <Layout level="1" style={styles.layoutContainer}>
                        <View style={styles.completeContainer}>
                            <Ionicons size={120} color='#E10032' name='checkmark-circle-outline' />
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
            </SafeAreaView>
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
        justifyContent: 'space-between'
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
    nextButton: {
        alignSelf: 'baseline',
        width: '100%',
        backgroundColor: '#E10032',
        borderColor: '#E10032',
        color: 'white',
        marginBottom: 30,
        marginTop: 15,
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
    completeContainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    youareInText: {
        marginTop: 10,
        color: '#aaa',
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    accountCompletedText: {
        color: 'white',
        fontSize: 20,
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
