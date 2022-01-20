import React, { PureComponent, useState } from 'react';
import { Text, Layout, Button, Input, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, BackHandler, SafeAreaView } from 'react-native';
import { TopNavigationComponent } from '../signup/components/TopNavigationComponent';
import { KeyboardAvoidingView } from '../../../components/keyboard-avoiding-view';
import { ValidateFields } from '../../../services/validator.service';
import { updateProfile } from '../../../redux/services';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducer';
import Toast from 'react-native-simple-toast';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='control' />
    </View>
);

const errorOject = {
    username: null,
    firstname: null,
    lastname: null,
    password: null,
    passwordConfirm: null,
    server: null
};

class AccountDetailForm extends PureComponent {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            password: '',
            passwordConfirm: '',
            submitting: false,
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
        const { username, firstname, lastname, password, passwordConfirm } = this.state;
        const { user, setUserAction } = this.props;
        const result = ValidateFields({ username, firstname, lastname, password, passwordConfirm });
        if (result != true) {
            this._Mounted && this.setState({ error: { ...errorOject, ...result } });
            return;
        }
        this._Mounted && this.setState({ error: errorOject, submitting: true });
        const profileObj = { username, firstname, lastname, password };
        if (password) {
            delete profileObj.passwordConfirm;
        }
        updateProfile(profileObj)
            .then(({ data }) => {
                const { success, error } = data;
                if (success) {
                    this._Mounted && this.setState({ submitting: false });
                    setUserAction({ ...user, ...profileObj });
                    Toast.show('Profile successfully updated.');
                } else {
                    this._Mounted && this.setState({ submitting: false, error: { ...errorOject, ...error } });
                }
            })
            .catch((error) => {
                this._Mounted && this.setState({ submitting: false, error: { ...errorOject, server: 'Cannot post data. Please try again later.' } });
            });
    }

    render() {
        const { username, firstname, lastname, password, passwordConfirm, error, submitting } = this.state;
        return (
            <KeyboardAvoidingView>
                <Layout level="1" style={styles.layoutContainer}>
                    <View>
                        <Text style={styles.titleText}>Edit Account Details</Text>
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
                            <Text style={styles.formLabel}>Create a Password</Text>
                            <Input
                                style={styles.formInput}
                                status='control'
                                placeholder='Create a Password'
                                placeholderTextColor="#888"
                                value={password}
                                secureTextEntry
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
                        {submitting ? null : () => <Text style={styles.nextButtonText}>S U B M I T</Text>}
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        );
    }
};

class AccountDetailScreen extends PureComponent {
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
        const { navigation, user, setUserAction } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigationComponent navigation={navigation} backPosition="Profile" />
                <AccountDetailForm {...this.props}
                    user={user}
                    setUserAction={setUserAction} />
            </SafeAreaView>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { setUserAction: actions.setUserAction })(AccountDetailScreen);

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
