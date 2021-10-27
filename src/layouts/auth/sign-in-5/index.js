import React, { ReactElement } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
    Button,
    Input,
    StyleService,
    Tab,
    TabView,
    Text,
    useStyleSheet,
    Icon,
} from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { EmailIcon, PhoneIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';

export default ({ navigation }) => {

    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [smsCode, setSMSCode] = React.useState();
    const [smsCodeVisible, setSMSCodeVisible] = React.useState(false);

    const styles = useStyleSheet(themedStyles);

    const onSignInButtonPress = () => {
        navigation && navigation.goBack();
    };

    const onSignUpButtonPress = () => {
        navigation && navigation.navigate('SignUp4');
    };

    const onPasswordIconPress = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSMSCodeIconPress = () => {
        setSMSCodeVisible(!smsCodeVisible);
    };

    const renderIconPassword = (props) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...props} name='lock' />
        </TouchableWithoutFeedback>
    );

    const renderIconSMS = (props) => (
        <TouchableWithoutFeedback onPress={onSMSCodeIconPress}>
            <Icon {...props} name='lock' />
        </TouchableWithoutFeedback>
    );

    const renderTabEmailTitle = React.useCallback(evaProps => (
        <Text
            {...evaProps}
            style={styles.tabTitle}>
            EMAIL
        </Text>
    ), []);

    const renderTabSMSTitle = React.useCallback(evaProps => (
        <Text
            {...evaProps}
            style={styles.tabTitle}>
            SMS
        </Text>
    ), []);

    return (
        <KeyboardAvoidingView>
            <ImageOverlay
                style={styles.container}
                source={require('./assets/image-background.jpg')}>
                <View style={styles.headerContainer}>
                    <Text
                        style={styles.helloLabel}
                        status='control'>
                        Sign In
                    </Text>
                    <Text
                        style={styles.signInLabel}
                        category='s1'
                        status='control'>
                        Sign in to your account with Email or SMS
                    </Text>
                </View>
                <TabView
                    style={styles.tabView}
                    tabBarStyle={styles.tabBar}
                    indicatorStyle={styles.tabViewIndicator}
                    selectedIndex={selectedTabIndex}
                    onSelect={setSelectedTabIndex}>
                    <Tab
                        title={renderTabEmailTitle}>
                        <View style={styles.tabContentContainer}>
                            <Input
                                status='control'
                                placeholder='Email'
                                accessoryRight={EmailIcon}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Password'
                                secureTextEntry={!passwordVisible}
                                accessoryRight={renderIconPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </Tab>
                    <Tab
                        title={renderTabSMSTitle}>
                        <View>
                            <View style={styles.tabContentContainer}>
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
                            </View>
                            <Text
                                style={styles.smsCaptionLabel}
                                appearance='hint'>
                                within a minute you should receive
                                an SMS with the code
                            </Text>
                        </View>
                    </Tab>
                </TabView>
                <Button
                    style={styles.signInButton}
                    size='giant'
                    onPress={onSignInButtonPress}>
                    SIGN IN
                </Button>
                <Button
                    style={styles.signUpButton}
                    appearance='ghost'
                    status='control'
                    onPress={onSignUpButtonPress}>
                    Don't have an account? Sign Up
                </Button>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        minHeight: 216,
        paddingHorizontal: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helloLabel: {
        fontSize: 26,
        lineHeight: 32,
    },
    signInLabel: {
        marginTop: 8,
        textAlign: 'center',
    },
    tabView: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: 'transparent',
    },
    tabViewIndicator: {
        backgroundColor: 'text-control-color',
    },
    tabTitle: {
        color: 'text-control-color',
    },
    tabContentContainer: {
        padding: 16,
    },
    formInput: {
        marginTop: 16,
    },
    smsCaptionLabel: {
        textAlign: 'center',
        paddingHorizontal: 32,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
});

