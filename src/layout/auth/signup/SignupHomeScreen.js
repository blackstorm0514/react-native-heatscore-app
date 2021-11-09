import React, { PureComponent } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TopNavigationComponent } from './components/TopNavigationComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function SignupHomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TopNavigationComponent navigation={navigation} backPosition="Profile" />
            <Layout level="1" style={styles.layoutContainer}>
                <Text style={styles.titleText}>Create Free Account</Text>
                <Text style={styles.offerText}>How would you like to an account?</Text>
                <Layout style={styles.boxContainer}>
                    <Layout style={styles.boxLeftContainer}>
                        <Text style={styles.withText}>
                            With    <FontAwesome5Icon
                                name="phone-alt"
                                size={18} color='#fff' />
                        </Text>
                        <Text style={styles.phoneText}>Phone Number</Text>
                    </Layout>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SignupPhone')}>
                        <FontAwesome5Icon
                            name="chevron-right"
                            size={24} color='white' />
                    </TouchableOpacity>
                </Layout>
                <Layout style={styles.boxContainer}>
                    <Layout style={styles.boxLeftContainer}>
                        <Text style={styles.withText}>
                            With    <FontAwesome5Icon
                                name="facebook-square"
                                size={18} color='#fff' />
                        </Text>
                        <Text style={styles.phoneText}>Facebook</Text>
                    </Layout>
                    <TouchableOpacity activeOpacity={0.8}>
                        <FontAwesome5Icon
                            name="chevron-right"
                            size={24} color='white' />
                    </TouchableOpacity>
                </Layout>
                <Layout style={styles.boxContainer}>
                    <Layout style={styles.boxLeftContainer}>
                        <Text style={styles.withText}>
                            With    <FontAwesome5Icon
                                name="google"
                                size={18} color='#fff' />
                        </Text>
                        <Text style={styles.phoneText}>Google</Text>
                    </Layout>
                    <TouchableOpacity activeOpacity={0.8}>
                        <FontAwesome5Icon
                            name="chevron-right"
                            size={24} color='white' />
                    </TouchableOpacity>
                </Layout>
                <Text style={styles.haveAccountText}>Already have an account?  <Text style={styles.loginText}>Login</Text></Text>
            </Layout>
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
        fontSize: 20,
        marginVertical: 16
    },
    boxContainer: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#444',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
        shadowColor: '#999',
        shadowOpacity: 0.8,
        shadowRadius: 5
    },
    boxLeftContainer: {
        backgroundColor: '#000'
    },
    withText: {
        color: '#FFF',
        fontSize: 16
    },
    phoneText: {
        color: '#E10032',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 4,
    },
    haveAccountText: {
        color: 'white',
        fontSize: 16,
        marginTop: 24,
    },
    loginText: {
        color: '#E10032',
        fontWeight: '700'
    }
});
