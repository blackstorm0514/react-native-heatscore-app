import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../layout/auth/profile/ProfileScreen';
import FavoritesScreen from '../layout/auth/favorites/FavoritesScreen';
import { AuthSignupNavigator } from './auth.signu.navigator';

const Stack = createStackNavigator();

const initialRoute = "Profile";
export const AuthNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={AuthSignupNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};
