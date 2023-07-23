import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMTocken();
    }
}

export const GetFCMTocken = async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log(fcmtoken, 'old');
    if (!fcmtoken) {
        messaging()
            .registerDeviceForRemoteMessages() // no-op on Android and if already registered
            .then(() => messaging().getToken())
            .then(async token => {
                await AsyncStorage.setItem('fcmtoken', token);
                console.log('new token', token);
            })
            .catch(err => console.log(err, 'erro get fcm tocken'));
    }
};

export const NotificationListen = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log('Notification caused app to open from quit state:', remoteMessage?.notification);
        });

    messaging().onMessage(async remoteMessage => {
        const {notification} = remoteMessage;
        console.log('Notification on froground state.......', remoteMessage);
        // Alert.alert(notification?.title ?? 'Tytle', notification?.body ?? 'Body');
        // ToastAndroid.show(notification?.body ?? 'Body', ToastAndroid.LONG);
        ToastAndroid.showWithGravityAndOffset(notification?.body ?? 'Body', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });
};
