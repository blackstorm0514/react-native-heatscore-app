import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../layout/auth/sign-in';
import SignUpScreen from '../layout/auth/sign-up';

const Stack = createStackNavigator();

export const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);
