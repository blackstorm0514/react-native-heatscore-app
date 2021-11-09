import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupHomeScreen from '../layout/auth/signup/SignupHomeScreen';

const Stack = createStackNavigator();

const initialRoute = "SignupHome";
export const AuthSignupNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='SignupHome' component={SignupHomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};
