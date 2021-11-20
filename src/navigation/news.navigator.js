import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsListScreen from '../layout/news/NewsListScreen';
import NewsDetailScreen from '../layout/news/NewsDetailScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const screenOption = { headerShown: false };

export const NewsNavigator = () => (
    <Stack.Navigator initialRouteName="AllNews">
        <Stack.Screen name='AllNews' component={NewsListScreen} options={screenOption} />
        <Stack.Screen name='NewsDetail' component={NewsDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);
