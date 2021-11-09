import React, { useRef, useState } from 'react';
import { Text, Icon, Button, Layout } from '@ui-kitten/components';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import CodeInput from 'react-native-confirmation-code-input';


export default function SignupWithPhoneScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const phoneInput = useRef(null);

    const onSendVerificationButtonPress = () => {
        setSentCode(true);
    }

    const onVerifyCodePress = () => {

    }

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="SignupHome" />
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
                            <Text>Enter Phone Number</Text>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={phoneNumber}
                                defaultCode="CA"
                                layout="first"
                                onChangeText={(text) => { setPhoneNumber(text); }}
                                onChangeFormattedText={(text) => { setFormattedPhoneNumber(text); }}
                                autoFocus
                                withDarkTheme
                                containerStyle={styles.phoneContainerStyle}
                                textContainerStyle={styles.phoneTextContainerStyle}
                                textInputStyle={styles.phoneTextInputStyle}
                                codeTextStyle={styles.phoneCodeTextStyle}
                                flagButtonStyle={styles.phoneFlagButtonStyle}
                                withShadow
                                placeholder=" "
                            />
                        </View>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='large'
                        onPress={onSendVerificationButtonPress}>
                        N E X T
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
                                secureTextEntry
                                activeColor='#999'
                                inactiveColor='#555'
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={50}
                                onFulfill={(isValid) => { console.log(isValid) }}
                                containerStyle={{ marginTop: 0 }}
                                codeInputStyle={{ borderWidth: 1.5 }}
                            />
                            <TouchableOpacity activeOpacity={0.8}>
                                <Text style={styles.resendCode}>Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='large'
                        onPress={onVerifyCodePress}>
                        N E X T
                    </Button>
                </Layout>}
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    layoutContainer: {
        backgroundColor: '#151515',
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    headerContainer: {
        marginTop: 40,
        justifyContent: 'center',
    },
    helloLabel: {
        fontSize: 32,
        lineHeight: 32,
        color: '#E10032',
        alignSelf: 'center'
    },
    verifyMessageLabel: {
        marginTop: 20,
        fontSize: 18
    },
    phoneInputContainer: {
        marginTop: 20
    },
    phoneContainerStyle: {
        width: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: '#202020'
    },
    phoneTextContainerStyle: {
        backgroundColor: '#202020',
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
        marginBottom: 30
    },
    resendCode: {
        marginTop: 30,
        color: '#E10032',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
