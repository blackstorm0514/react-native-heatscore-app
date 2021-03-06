import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupHomeScreen from '../layout/auth/signup/SignupHomeScreen';
import SignupWithPhoneScreen from '../layout/auth/signup/SignupWithPhoneScreen';
import SignupDetailScreen from '../layout/auth/signup/SignupDetailScreen';

const Stack = createStackNavigator();

const initialRoute = "SignupHome";
export const AuthSignupNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='SignupHome' component={SignupHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupPhone" component={SignupWithPhoneScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupDetail" component={SignupDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};
