import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeBottomNavigation } from '../components/home-bottom-navigation.component';
import { navigationRef } from '../app';
import { AuthNavigator } from './auth.navigator';
import { NewsNavigator } from './news.navigator';
import { ScoresNavigator } from './scores.navigator';
import ScoreCardScreen from '../layout/scorecard/ScoreCardScreen';
import FeedScreen from '../layout/feed/FeedScreen';
import BannerImage from '../components/BannerImage';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    <NavigationContainer theme={navigatorTheme} ref={navigationRef}>
        <BannerImage
            width={screenWidth}
            height={60}
        />
        <BottomTab.Navigator
            screenOptions={TabBarVisibilityOptions}
            initialRouteName={initialTabRoute}
            tabBar={props => <HomeBottomNavigation {...props} />}>
            <BottomTab.Screen name='Scores'
                component={ScoresNavigator}
                options={{ headerShown: false }} />
            <BottomTab.Screen name='News'
                component={NewsNavigator}
                options={screenOption} />
            <BottomTab.Screen name='Score Card'
                component={ScoreCardScreen}
                options={screenOption} />
            {/* <BottomTab.Screen name='Feed'
                component={FeedScreen}
                options={screenOption} /> */}
            <BottomTab.Screen name='Auth'
                component={AuthNavigator}
                options={screenOption} />
        </BottomTab.Navigator>
    </NavigationContainer>
);