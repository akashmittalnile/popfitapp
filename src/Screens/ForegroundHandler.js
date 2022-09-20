import PushNotification from "react-native-push-notification";
import messaging, { firebase } from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging.onMessage((remoteMessage) => {
            console.log("hanle in foreground", remoteMessage)
            const { notification, messageId } = remoteMessage

            PushNotification.localNotification({
                channelId: "your-channel-id",
                id: messageId,
                body: 'android body',
                title: 'android notification',
                soundName: 'default',
                vibrate: true,
                playSound: true

            })
        })
        return unsubscribe
    }, [])
    return null
}
export default ForegroundHandler