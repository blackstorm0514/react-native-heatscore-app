import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeBottomNavigation } from '../components/home-bottom-navigation.component';
import { AuthNavigator } from './auth.navigator';
import { NewsNavigator } from './news.navigator';
import { ScoresNavigator } from './scores.navigator';
import MainScreen from '../app/main';
// import WebViewComponent from '../layout/webview.component';

const BottomTab = createBottomTabNavigator();

const initialTabRoute = 'Scores';

const navigatorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const TabBarVisibilityOptions = ({ route }) => {
    return { tabBarVisible: true };
};

const screenOption = { headerShown: false };

export const AppNavigator = () => (
    <NavigationContainer theme={navigatorTheme}>
        <BottomTab.Navigator
            screenOptions={TabBarVisibilityOptions}
            initialRouteName={initialTabRoute}
            tabBar={props => <HomeBottomNavigation {...props} />}>
            <BottomTab.Screen name='Scores'
                component={ScoresNavigator}
                options={screenOption} />
            <BottomTab.Screen name='News'
                component={NewsNavigator}
                options={screenOption} />
            <BottomTab.Screen name='Score Card'
                component={MainScreen}
                options={screenOption} />
            <BottomTab.Screen name='Auth'
                component={AuthNavigator}
                options={screenOption} />
        </BottomTab.Navigator>
    </NavigationContainer>
);