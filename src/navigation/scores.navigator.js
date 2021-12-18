import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScoresScreen from '../layout/scores/ScoresScreen';
import EventDetailScreen from '../layout/scores/EventDetailScreen';
import RoundLeagueScreen from '../layout/scores/RoundLeagueScreen';

const Stack = createStackNavigator();

export const ScoresNavigator = () => (
    <Stack.Navigator initialRouteName="AllScores">
        <Stack.Screen name='AllScores' component={ScoresScreen} options={{ headerShown: false, unmountOnBlur: true, }} />
        <Stack.Screen name='EventDetail' component={EventDetailScreen} options={{ headerShown: false, unmountOnBlur: true, }} />
        <Stack.Screen name='RoundLeague' component={RoundLeagueScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);
