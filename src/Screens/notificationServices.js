import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}
const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken, "the old token")
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("the new generated token", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log("error raised in fcm token", error);
        }
    }
}
export const notificationListner = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:', remoteMessage.notification,);

    });

    //foreground
    messaging.onMessage(async remoteMessage => {
        console.log('Notification caused app to open from backgrund state:', remoteMessage.notification);
    })
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}
export const createChannel = () => {
    const channel = new firebase.notifications.Android.channel(
        'channelId',
        'channelName',
        firebase.notifications.Android.Importance.Max,
    ).setDescription('Description');
    firebase.notifications().android.createChannel(channel);
};
//*Foreground Notification
const notificationListne = () => {
    firebase.notifications().onNotification((notofication) => {
        const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
        })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId('channelId')
            .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(localNotification)
            .catch((err) => console.log(err))
    })
}