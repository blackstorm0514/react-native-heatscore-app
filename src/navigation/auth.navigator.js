import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../layout/auth/profile/ProfileScreen';
import FavoritesScreen from '../layout/auth/favorites/FavoritesScreen';
import AddFavoritesScreen from '../layout/auth/favorites/AddFavoritesScreen';
import { AuthSignupNavigator } from './auth.signup.navigator';
import SigninScreen from '../layout/auth/signin/SigninScreen';

const Stack = createStackNavigator();

const initialRoute = "Profile";
export const AuthNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AddFavorite' component={AddFavoritesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={AuthSignupNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SigninScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};
