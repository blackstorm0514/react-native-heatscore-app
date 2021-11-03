import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsListScreen from '../layout/news/list';
import NewsDetailScreen from '../layout/news/NewsDetailScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export const NewsNavigator = () => (
    <Stack.Navigator initialRouteName="AllNews">
        <Stack.Screen name='AllNews' component={NewsListScreen} options={{ headerShown: false }} />
        <Stack.Screen name='NewsDetail' component={NewsDetailScreen} options={{
            headerShown: true, title: 'Show News Detail',
            headerStyle: styles.header,
            headerTintColor: "white"
        }} />
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
    }
});
