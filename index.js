import { AppRegistry } from 'react-native';
import App from './src/app';
// import App from './srcKitten/app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
