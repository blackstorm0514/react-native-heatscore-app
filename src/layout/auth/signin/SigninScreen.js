import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TopNavigationComponent } from '../signup/components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SigninScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignInButtonPressed = () => {
    }

    return (
        <View style={styles.container}>
            <TopNavigationComponent navigation={navigation} backPosition="Profile" />
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
                                onChangeText={setEmail}
                            />
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text>Password</Text>
                            <Input
                                style={styles.formInput}
                                placeholder='Password'
                                placeholderTextColor="#888"
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                            />
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Text style={styles.forgotPasswordText}>Forgot password</Text>
                            </TouchableOpacity>
                        </Layout>
                    </View>
                    <Button
                        style={styles.signInButton}
                        size='large'
                        onPress={onSignInButtonPressed}>
                        SIGN  IN
                    </Button>

                    <View style={styles.socialAuthContainer}>
                        <Text style={styles.socialAuthHintText}>
                            OR
                        </Text>
                        <View style={styles.socialAuthButtonsContainer}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <MaterialIcons color='blue' name='facebook' size={50} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <FontAwesome color='red' name='google-plus-official' size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Layout>
            </KeyboardAvoidingView>
        </View>
    );
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
        marginTop: 40,
        marginBottom: 20
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 90
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 24,
        color: 'white',
        fontSize: 20
    },
});
