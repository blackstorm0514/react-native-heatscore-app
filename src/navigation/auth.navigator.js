import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../layout/auth/profile/ProfileScreen';
import FavoritesScreen from '../layout/auth/favorites/FavoritesScreen';

const Stack = createStackNavigator();

const initialRoute = "Favorites";
export const AuthNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Favorites' component={FavoritesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};
