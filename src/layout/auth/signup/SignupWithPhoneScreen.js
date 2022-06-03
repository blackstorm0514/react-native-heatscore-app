import React, { PureComponent, useState } from 'react';
import { Text, Icon, Button, Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, BackHandler } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import CodeInput from 'react-native-confirmation-code-input';
import { phoneVerify } from '../../../redux/services';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='control' />
    </View>
);

class SignupWithPhoneForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            formattedPhoneNumber: '',
            error: null,
            sentCode: false,
            submitting: false,
            verify_code: ''
        };
        this._Mounted = false;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => { navigation.navigate('SignupHome'); return true; }
        );
        this._Mounted = true;
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._Mounted = false;
    }

    onSendVerificationCode = () => {
        const { formattedPhoneNumber, submitting } = this.state;
        if (submitting) return;

        const isValid = isValidNumber(formattedPhoneNumber);
        if (!isValid) {
            this._Mounted && this.setState({ error: "Phone number is not valid. Please input again." });
            return;
        }
        this._Mounted && this.setState({ error: null, submitting: true });
        phoneVerify({ phone: formattedPhoneNumber, step: 1 })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this._Mounted && this.setState({ sentCode: true, submitting: false });
                } else {
                    this._Mounted && this.setState({ error: error, submitting: false });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ error: "Cannot send verification code. Please try again later.", submitting: false });
            })
    }

    onVerifyCode = () => {
        const { navigation } = this.props;
        const { submitting, verify_code, formattedPhoneNumber } = this.state;
        if (submitting) return;
        if (!verify_code) {
            this._Mounted && this.setState({ error: 'Please input 6 digit verification code.' });
            return;
        }
        this._Mounted && this.setState({ error: null, submitting: true });
        phoneVerify({ verify_code: verify_code, step: 2, phone: formattedPhoneNumber })
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this._Mounted && this.setState({ submitting: false });
                    navigation.navigate("SignupDetail", { phone: formattedPhoneNumber });
                } else {
                    this._Mounted && this.setState({ error: error, submitting: false });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ error: "Cannot verify code. Please try again later.", submitting: false });
            })
    }

    render() {
        const { phoneNumber, error, sentCode, submitting } = this.state;
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView>
                {!sentCode && <Layout style={styles.layoutContainer}>
                    <View style={styles.headerContainer}>
                        <Text
                            style={styles.helloLabel}
                            status='control'>
                            CREATE ACCOUNT
                        </Text>
                        <Text
                            style={styles.verifyMessageLabel}
                            category='s1'
                            status='control'>
                            A confirmation code will be sent to your mobile for verification.
                        </Text>
                        <View style={styles.phoneInputContainer}>
                            <Text style={styles.formLabel}>Enter Phone Number</Text>
                            <PhoneInput
                                value={phoneNumber}
                                defaultCode="CA"
                                layout="first"
                                onChangeText={(text) => { this._Mounted && this.setState({ phoneNumber: text }) }}
                                onChangeFormattedText={(text) => { this._Mounted && this.setState({ formattedPhoneNumber: text }) }}
                                autoFocus
                                withDarkTheme
                                containerStyle={styles.phoneContainerStyle}
                                textContainerStyle={styles.phoneTextContainerStyle}
                                textInputStyle={styles.phoneTextInputStyle}
                                codeTextStyle={styles.phoneCodeTextStyle}
                                flagButtonStyle={styles.phoneFlagButtonStyle}
                                withShadow
                                placeholder=" "
                                disableArrowIcon
                                textInputProps={{
                                    selectionColor: '#aaa',
                                    textContentType: 'telephoneNumber',
                                    dataDetectorTypes: 'phoneNumber',
                                    keyboardType: 'phone-pad',
                                    maxLength: 14
                                }}
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                        </View>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='small'
                        accessoryLeft={submitting ? LoadingIndicator : null}
                        onPress={this.onSendVerificationCode}>
                        {submitting ? null : () => <Text style={styles.nextButtonText}>N E X T</Text>}
                    </Button>
                </Layout>}
                {sentCode && <Layout style={styles.layoutContainer}>
                    <View style={styles.headerContainer}>
                        <Text
                            style={styles.helloLabel}
                            status='control'>
                            CREATE ACCOUNT
                        </Text>
                        <Text
                            style={[styles.verifyMessageLabel, { alignSelf: 'center' }]}
                            category='s1'
                            status='control'>
                            Please enter your verification code
                        </Text>
                        <View style={styles.phoneInputContainer}>
                            <CodeInput
                                codeLength={6}
                                // secureTextEntry
                                activeColor='#999'
                                inactiveColor='#555'
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={50}
                                onFulfill={(verify_code) => { this._Mounted && this.setState({ verify_code }) }}
                                containerStyle={{ marginTop: 0 }}
                                codeInputStyle={{ borderWidth: 1.5 }}
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                            <TouchableOpacity activeOpacity={0.8} onPress={this.onSendVerificationCode}>
                                <Text style={styles.resendCode}>Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='small'
                        accessoryLeft={submitting ? LoadingIndicator : null}
                        onPress={this.onVerifyCode}>
                        {submitting ? null : () => <Text style={styles.nextButtonText}>N E X T</Text>}
                    </Button>
                </Layout>}
            </KeyboardAvoidingView>
        )
    }
}

export default class SignupWithPhoneScreen extends PureComponent {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="SignupHome" />
                <SignupWithPhoneForm {...this.props} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    layoutContainer: {
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    headerContainer: {
        marginTop: 40,
        justifyContent: 'center',
    },
    helloLabel: {
        fontSize: 24,
        lineHeight: 32,
        color: '#E10032',
        alignSelf: 'center'
    },
    formLabel: {
        fontSize: 12
    },
    verifyMessageLabel: {
        marginTop: 20,
        fontSize: 14
    },
    phoneInputContainer: {
        marginTop: 20
    },
    phoneContainerStyle: {
        width: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: '#151515'
    },
    phoneTextContainerStyle: {
        backgroundColor: '#151515',
        margin: 0,
        padding: 0,
        color: 'white'
    },
    phoneTextInputStyle: {
        color: 'white',
        padding: 0,
        margin: 0,
    },
    phoneCodeTextStyle: {
        color: 'white'
    },
    phoneFlagButtonStyle: {
        color: 'white',
        borderColor: '#333',
        borderRightWidth: 1,
    },
    nextButton: {
        alignSelf: 'baseline',
        width: '100%',
        backgroundColor: '#E10032',
        borderColor: '#E10032',
        color: 'white',
        marginBottom: 20
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#E10032',
        fontSize: 16,
        marginTop: 20,
    },
    resendCode: {
        marginTop: 30,
        color: '#E10032',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
