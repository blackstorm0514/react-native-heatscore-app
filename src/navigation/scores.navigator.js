import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsListScreen from '../layout/news/NewsListScreen';
// import NewsDetailScreen from '../layout/news/NewsDetailScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export const ScoresNavigator = () => (
    <Stack.Navigator initialRouteName="AllScores">
        <Stack.Screen name='AllScores' component={NewsListScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name='LeagueScores' component={NewsDetailScreen} options={{
            headerShown: true, title: 'Show News Detail',
            headerStyle: styles.header,
            headerTintColor: "white"
        }} /> */}
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
    }
});
