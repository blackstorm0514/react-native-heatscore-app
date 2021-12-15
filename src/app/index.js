import React, { useEffect } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

import AppLoading from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { SplashImage } from '../components/splash-image.component';
import { AppNavigator } from '../navigation/app.navigator';
import { Theming } from '../services/theme.service';
import { VectorIconsPack } from './vector-icons-pack';
import { store, persistor } from '../redux/store';
import { ApiService } from '../services/api.service';

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
            // await messaging().registerDeviceForRemoteMessages();
            // const token = await messaging().getToken();

            // await ApiService.post('/notifications/register', { token });

            // messaging().onMessage((message) => {
            //     console.log(message);
            // })
            // messaging().setBackgroundMessageHandler(async (message) => {
            //     console.log(message);
            // })
        } catch (err) {
            console.log(err.response.data);
            return;
        }
    };

    useEffect(() => {
        sendFcmToken();
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
