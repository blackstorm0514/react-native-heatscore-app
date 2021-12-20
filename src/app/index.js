import React, { useEffect } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { notifications } from 'react-native-firebase';
import { createNavigationContainerRef } from '@react-navigation/native';

import AppLoading from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { SplashImage } from '../components/splash-image.component';
import { AppNavigator } from '../navigation/app.navigator';
import { Theming } from '../services/theme.service';
import { VectorIconsPack } from './vector-icons-pack';
import { store, persistor } from '../redux/store';
import { ApiService } from '../services/api.service';
import { CheckPermissionAndReturnFcmToken } from '../libs/fcm_utils';

export const navigationRef = createNavigationContainerRef();

const defaultConfig = {
    userToken: null,
    mapping: 'eva',
    theme: 'dark',
};

const App = ({ userToken }) => {
    const [mappingContext, currentMapping] = Theming.useMapping(appMappings, defaultConfig.mapping);
    const [themeContext, currentTheme] = Theming.useTheming(appThemes, defaultConfig.mapping, defaultConfig.theme);

    const sendFcmToken = async () => {
        try {
            const fcmToken = await CheckPermissionAndReturnFcmToken();
            if (fcmToken) {
                await ApiService.post('/notifications/register', { token: fcmToken });
            }
        }
        catch (error) {
            console.warn('Error', error);
        };
    }

    const navigate = (name, params = null) => {
        navigationRef.current?.navigate(name, params);
    }

    const foregroundNotificationsListener = () => {
        notifications().onNotification((notification) => {
            // console.log(notification)
            notification.android.setChannelId("HeatScore");
            notification.android.setSmallIcon("ic_notification");
            notification.android.setColor("#b90000")
            notifications().displayNotification(notification);
        });

        // get notification data when notification is clicked when app is in foreground
        const notificationOpenedListener = notifications().onNotificationOpened((notificationData) => {
            const data = notificationData.notification.data;
            switch (data.type) {
                case 'game_start':
                case 'game_end':
                    navigate('Scores', { screen: 'EventDetail', params: { event: JSON.parse(data.event) } })
                    break;
                default:
            }
        });

        // get notification data when notification is clicked to open app when app is in background
        notifications().getInitialNotification()
            .then((notificationData) => {
                const data = notificationData.notification.data;
                switch (data.type) {
                    case 'game_start':
                    case 'game_end':
                        setTimeout(() => navigate('Scores', { screen: 'EventDetail', params: { event: JSON.parse(data.event) } }),
                            2000);
                        break;
                    default:
                }
            });

        return () => {
            messageListener();
            notificationOpenedListener();
        }
    }

    useEffect(() => {
        sendFcmToken();
        return foregroundNotificationsListener();
    }, []);

    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack, VectorIconsPack]} />
            <AppearanceProvider>
                <ApplicationProvider {...currentMapping} theme={currentTheme}>
                    <Theming.MappingContext.Provider value={mappingContext}>
                        <Theming.ThemeContext.Provider value={themeContext}>
                            <SafeAreaProvider>
                                <AppNavigator />
                            </SafeAreaProvider>
                        </Theming.ThemeContext.Provider>
                    </Theming.MappingContext.Provider>
                </ApplicationProvider>
            </AppearanceProvider>
        </React.Fragment>
    );
};

const Splash = ({ loading }) => (
    <SplashImage
        loading={loading}
        source={require('../assets/images/image-splash.png')}
    />
);

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppLoading
                initialConfig={defaultConfig}
                placeholder={Splash}>
                {props => <App {...props} />}
            </AppLoading>
        </PersistGate>
    </Provider>
);
