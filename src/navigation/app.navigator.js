import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeBottomNavigation } from '../components/home-bottom-navigation.component';
import { AuthNavigator } from './auth.navigator';
import MainScreen from '../app/main';
import WebViewComponent from '../layout/webview.component';

const BottomTab = createBottomTabNavigator();

const initialTabRoute = 'Auth';

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

export const AppNavigator = () => (
    <NavigationContainer theme={navigatorTheme}>
        <BottomTab.Navigator
            screenOptions={TabBarVisibilityOptions}
            initialRouteName={initialTabRoute}
            tabBar={props => <HomeBottomNavigation {...props} />}>
            <BottomTab.Screen name='Scores'
                initialParams={{ url: 'http://app.heatscore.co/soccer/4090101' }}
                component={WebViewComponent}
                options={{ headerShown: false }} />
            <BottomTab.Screen name='News'
                initialParams={{ url: 'https://demo-livematchpro.statscore.com/en/soccer?configId=60dc694d4321eaff1879f0cf&eventId=4284014' }}
                component={WebViewComponent}
                options={{ headerShown: false }} />
            <BottomTab.Screen name='Score Card'
                component={MainScreen}
                options={{ headerShown: false }} />
            <BottomTab.Screen name='Auth'
                component={AuthNavigator}
                options={{ headerShown: false }} />
        </BottomTab.Navigator>
    </NavigationContainer>
);