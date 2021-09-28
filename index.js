/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

AppRegistry.registerComponent(appName, () => App);

const onTapNotificationInClosed = async () => {
  setTimeout(async () => {
    const notifData = await messaging().getInitialNotification();
    console.log(notifData, 'FIRST MEAN KILLED STATE');
  }, 4000);
};

const onTapNotificationInBackground = async () => {
  messaging().onNotificationOpenedApp(messages => {
    if (messages) {
      console.log(messages, 'SECOND SWITCHED TO ANOTHER SCREEN ');
    }
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

notifee.createChannel({
  id: 'someId',
  name: 'some name',
  lights: false,
  vibration: true,
  importance: AndroidImportance.DEFAULT,
});
console.log(
  '\n\n\n FROM INDEX',
  'Background notification ***********************',
);
onTapNotificationInClosed();
onTapNotificationInBackground();
