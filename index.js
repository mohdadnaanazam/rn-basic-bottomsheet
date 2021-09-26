/**
 * @format
 */

import 'react-native-gesture-handler';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AppRegistry, Platform, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
