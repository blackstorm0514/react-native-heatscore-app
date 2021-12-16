import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { messaging } from 'react-native-firebase';

messaging().onMessage((message) => {
    console.log(message);
})
messaging().setBackgroundMessageHandler(async (message) => {
    console.log(message);
})

AppRegistry.registerComponent(appName, () => App);
