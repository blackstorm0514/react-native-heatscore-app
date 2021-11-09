import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupDetailScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [success, setSuccess] = useState(false);

    const onNextButtonPressed = () => {
        setSuccess(true);
    }

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="Profile" />
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
                                value={username}
                                onChangeText={setUsername}
                            />
                        </Layout>
                        <Layout style={[styles.boxLayout, { flexDirection: 'row', marginTop: 0, paddingHorizontal: 0 }]}>
                            <Layout style={[styles.boxLayout, { flex: 1 }]}>
                                <Text>First Name</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='John'
                                    value={firstname}
                                    onChangeText={setFirstName}
                                />
                            </Layout>
                            <Layout style={[styles.boxLayout, { flex: 1 }]}>
                                <Text>Last Name</Text>
                                <Input
                                    style={styles.formInput}
                                    status='control'
                                    placeholder='Doe'
                                    value={lastname}
                                    onChangeText={setLastName}
                                />
                            </Layout>
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text>Email</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='jone.doe@gmail.com'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text>Create a Password</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Create a Password'
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                            />
                        </Layout>
                        <Layout style={styles.boxLayout}>
                            <Text>Confirm Password</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Confirm Password'
                                value={passwordConfirm}
                                secureTextEntry
                                onChangeText={setPasswordConfirm}
                            />
                        </Layout>
                    </View>
                    <Button
                        style={styles.nextButton}
                        size='large'
                        onPress={onNextButtonPressed}>
                        N E X T
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
            </View>
        </KeyboardAvoidingView>
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
        marginBottom: 30
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
        paddingTop: 120,
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
    }
});
