import React, {useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

function Screen() {
  useEffect(async () => {
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log(token);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId: 'someId',
        },
      });
    });

    return unsubscribe;
  }, []);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => console.log('SUCCESS :'))
      .catch(console.error);
  }, []);

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={async () => {
          await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
              channelId: 'someId',
            },
          });
        }}
      />
    </View>
  );
}

export default Screen;
