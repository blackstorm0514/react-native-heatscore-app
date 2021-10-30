import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import MainScreen from '../app/main';
import WebViewComponent from '../layout/webview.component';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialTabRoute = 'News';

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
                component={MainScreen}
                options={{ headerShown: false }} />
        </BottomTab.Navigator>
    </NavigationContainer>
);