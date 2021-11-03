import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
    Button,
    CheckBox,
    Datepicker,
    Divider,
    Input,
    StyleService,
    Text,
    useStyleSheet,
    Icon
} from '@ui-kitten/components';
import { ImageOverlay } from '../../../components/image-overlay.component';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import {
    ArrowForwardIconOutline,
    FacebookIcon,
    GoogleIcon,
    HeartIconFill, PhoneIcon
} from '../../../components/icons';

export default ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [termsAccepted, setTermsAccepted] = React.useState(false);
    const [smsCode, setSMSCode] = React.useState();
    const [smsCodeVisible, setSMSCodeVisible] = React.useState(false);

    const styles = useStyleSheet(themedStyles);

    const onSignUpButtonPress = () => {
        navigation && navigation.goBack();
    };

    const onSignInButtonPress = () => {
        navigation && navigation.navigate('SignIn');
    };

    const renderCheckboxLabel = React.useCallback(
        (evaProps) => (
            <Text {...evaProps} style={styles.termsCheckBoxText}>
                By creating an account, I agree to the Ewa Terms of\nUse and Privacy
                Policy
            </Text>
        ),
        []
    );

    const onSMSCodeIconPress = () => {
        setSMSCodeVisible(!smsCodeVisible);
    };

    const renderIconSMS = (props) => (
        <TouchableWithoutFeedback onPress={onSMSCodeIconPress}>
            <Icon {...props} name='lock' />
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageOverlay
                style={styles.headerContainer}
                source={require('./assets/image-background.jpg')}>
                <Button
                    style={styles.evaButton}
                    appearance='ghost'
                    status='control'
                    size='large'
                    accessoryLeft={HeartIconFill}>
                    HeatScore
                </Button>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signInLabel} category='h4' status='control'>
                        SIGN UP
                    </Text>
                    <Button
                        style={styles.signInButton}
                        appearance='ghost'
                        status='control'
                        size='giant'
                        accessoryLeft={ArrowForwardIconOutline}
                        onPress={onSignInButtonPress}>
                        Sign In
                    </Button>
                </View>
            </ImageOverlay>
            <View style={styles.socialAuthContainer}>
                <Text style={styles.socialAuthHintText}>
                    Sign with a social account
                </Text>
                <View style={styles.socialAuthButtonsContainer}>
                    <Button
                        appearance='ghost'
                        size='giant'
                        status='basic'
                        accessoryLeft={GoogleIcon}
                    />
                    <Button
                        appearance='ghost'
                        size='giant'
                        status='basic'
                        accessoryLeft={FacebookIcon}
                    />
                </View>
            </View>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category='h5'>
                    OR
                </Text>
                <Divider style={styles.divider} />
            </View>
            <Text style={styles.phoneSignLabel}>
                Sign up with Phone
            </Text>
            <View style={[styles.container, styles.formContainer]}>
                <Input
                    status='control'
                    placeholder='Phone Number'
                    accessoryRight={PhoneIcon}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Input
                    style={styles.formInput}
                    status='control'
                    placeholder='SMS Code'
                    secureTextEntry={!smsCodeVisible}
                    accessoryRight={renderIconSMS}
                    value={smsCode}
                    onChangeText={setSMSCode}
                />
                <Text
                    style={styles.smsCaptionLabel}
                    appearance='hint'>
                    Within a minute you should receive
                    an SMS with the code
                </Text>
                <CheckBox
                    style={styles.termsCheckBox}
                    checked={termsAccepted}
                    onChange={(checked) => setTermsAccepted(checked)}>
                    {renderCheckboxLabel}
                </CheckBox>
            </View>
            <Button
                style={styles.signUpButton}
                size='large'
                onPress={onSignUpButtonPress}>
                SIGN UP
            </Button>
        </KeyboardAvoidingView >
    );
};

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        minHeight: 216,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 44,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    socialAuthContainer: {
        marginTop: 24,
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    formContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    evaButton: {
        // maxWidth: 72,
        paddingHorizontal: 0,
    },
    signInLabel: {
        flex: 1,
    },
    signInButton: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 0,
    },
    signUpButton: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    socialAuthIcon: {
        tintColor: 'text-basic-color',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 52,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    phoneSignLabel: {
        alignSelf: 'center',
        marginTop: 8,
    },
    formInput: {
        marginTop: 16,
    },
    termsCheckBox: {
        marginTop: 20,
    },
    termsCheckBoxText: {
        fontSize: 11,
        lineHeight: 14,
        color: 'text-hint-color',
        marginLeft: 10,
    },
    smsCaptionLabel: {
        textAlign: 'left',
        paddingHorizontal: 32,
    },
});
