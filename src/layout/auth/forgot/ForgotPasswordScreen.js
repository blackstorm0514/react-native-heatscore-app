import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, BackHandler } from 'react-native';
import { TopNavigationComponent } from '../signup/components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import { ValidateFields } from '../../../services/validator.service';
import { AppStorage } from '../../../services/app-storage.service';
import { actions } from '../../../redux/reducer';
import { connect } from 'react-redux';
import { changePassword } from '../../../redux/services';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='control' />
    </View>
);

const errorOject = {
    email: null,
    password: null,
    passwordConfirm: null,
    server: null
}

class ForgotPasswordForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            error: errorOject,
            submitting: false,
        }
        this._Mounted = false;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
    }

    changeField = (field, value) => {
        this._Mounted && this.setState({ [field]: value });
    }

    onSubmitButtonPressed = () => {
        const { email, password, passwordConfirm } = this.state;
        const { setSuccess } = this.props;
        const result = ValidateFields({ email, password, passwordConfirm });
        if (result != true) {
            this._Mounted && this.setState({ error: { ...errorOject, ...result } });
            return;
        }
        this._Mounted && this.setState({ error: errorOject, submitting: true });
        changePassword({ email, password })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this._Mounted && this.setState({ submitting: false });
                    setSuccess();
                } else {
                    this._Mounted && this.setState({ submitting: false, error: { ...errorOject, ...error } });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
            });
    }

    render() {
        const { email, password, passwordConfirm, error, submitting } = this.state;

        return (
            <KeyboardAvoidingView>
                <Layout level="1" style={styles.layoutContainer}>
                    <View>
                        <Text style={styles.titleText}>Reset Password</Text>
                        <Layout style={styles.boxLayout}>
                            <Text style={styles.formLabel}>Email</Text>
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
                            <Text style={styles.formLabel}>Password</Text>
                            <Input
                                style={styles.formInput}
                                placeholder='Password'
                                placeholderTextColor="#888"
                                value={password}
                                secureTextEntry
                                onChangeText={(text) => this.changeField('password', text)}
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
                                onChangeText={(text) => this.changeField('passwordConfirm', text)}
                            />
                            {error && error.passwordConfirm && <Text style={styles.errorText}>{error.passwordConfirm}</Text>}
                        </Layout>
                        {error && error.server && <Text style={styles.errorText}>{error.server}</Text>}
                    </View>
                    <Button
                        style={styles.submitButton}
                        size='small'
                        accessoryLeft={submitting ? LoadingIndicator : null}
                        onPress={this.onSubmitButtonPressed}>
                        {submitting ? null : () => <Text style={styles.submitButtonText}>S U B M I T</Text>}
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        );
    }
}

class ForgotPasswordScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        }
        this._Mounted = false;
    }

    componentDidMount() {
        this._Mounted = true;
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('SignIn'); return true; }
        );
    }

    componentWillUnmount() {
        this._Mounted = false;
        this.backHandler.remove();
    }

    render() {
        const { navigation } = this.props;
        const { success } = this.state;

        return (
            <View style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="SignIn" />
                {!success && <ForgotPasswordForm {...this.props} setSuccess={() => this._Mounted && this.setState({ success: true })} />}
                {success && <Layout level="1" style={styles.layoutContainer}>
                    <View style={styles.completeContainer}>
                        <Ionicons size={120} color='#E10032' name='checkmark-circle-outline' />
                        <Text style={styles.accountCompletedText}>Your request has been submitted. You will receive a confirmation email</Text>
                    </View>
                    <Button
                        style={styles.submitButton}
                        size='large'
                        onPress={() => navigation.navigate('SignIn')}>
                        C O N T I N U E
                    </Button>
                </Layout>}
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
        fontSize: 24,
        textTransform: 'uppercase'
    },
    submitButton: {
        alignSelf: 'baseline',
        width: '100%',
        backgroundColor: '#E10032',
        borderColor: '#E10032',
        color: 'white',
        marginTop: 20,
        paddingVertical: 6,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxLayout: {
        backgroundColor: '#151515',
        color: 'white',
        paddingHorizontal: 10,
        marginTop: 15
    },
    formLabel: {
        fontSize: 12
    },
    formInput: {
        marginTop: 6,
        backgroundColor: '#151515',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#999'
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
});

export default ForgotPasswordScreen;