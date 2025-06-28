/**
 * @format
 */

import { patchConsole } from './log-bridge-project/client/log-bridge'
patchConsole('[App]');
import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
enableScreens();
AppRegistry.registerComponent(appName, () => App);
