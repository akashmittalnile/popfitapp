
import React, { useState, useEffect } from 'react'
import { View, Text, LogBox, Platform } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigation from './src/Routes/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated'
import Home from './src/Screens/Dasboard/Home';
import LoginSignUp from './src/Screens/loginSignup/LoginSignUp';
//import { requestUserPermission, notificationListner, createChannel, notificationListne } from './src/Screens/notificationServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import ForegroundHandler from './src/Screens/ForegroundHandler';
// import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';
import modifyCounterReducer from './src/Redux/reducers/modifyCounter';
import store from "./src/store";
import { StripeProvider } from '@stripe/stripe-react-native';
 

const App = (props) => {

   

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey('pk_test_51LogMKSI9r7oyTnGwG3IdAXSeadXKDKkwWBixJRfQEIqSC3bl2p7mGWz3q9APkpZoFf0uQcC3ZTPrjOz7GKmWGzQ00YSHiUXTR'); // fetch key from your server here
  //   setPublishableKey(key);
  // };
  // LogBox.ignoreLogs([
  //   "ViewPropTypes will be removed",
  //   "ColorPropType will be removed",
  //   ])
  LogBox.ignoreAllLogs()
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('foreground message', JSON.stringify(remoteMessage));
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification)
  //     );
  //   });

  //   return unsubscribe;
  // }, []);
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
  }
  async function requestUserPermissionIos() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    
     
    // requestUserPermission();
    // notificationListner()
    NotificationManagerAndroid.createChannel();
    NotificationManagerAndroid.configure();
    try {
      if (Platform.OS == 'android') {
        requestUserPermission();
      } else {
        requestUserPermissionIos();
      }
      // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
      //  console.log('the bedge number is===',num)
      // });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const { messageId } = remoteMessage;
        const data = remoteMessage.notification
        if (Platform.OS === 'android') {
          //  var notificationCount = AsyncStorage.getItem('notification');
          // let a = JSON.parse(notificationCount);
          console.log('aaaaaaa->>>>>>>>>>', notificationCount)
          if (notificationCount) {
            notificationCount = +1;
          } else {
            notificationCount = 1;
          }
          AsyncStorage.setItem("notification", JSON.stringify(notificationCount));
          NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
        }
        else {
          NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const { data, messageId } = remoteMessage;
      const { Title, notificationText, subText } = data;
      if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(Title, notificationText, subText, messageId);
      }
      else {
        NotificationManagerIOS.showNotification(messageId, Title, notificationText, data, {})
        // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
        //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
        // })
      }
    });





  }, [])
  return (
    <>
      <Provider store={store}>
        <StripeProvider
          publishableKey="pk_test_51LpuUGHSmonu9QOMZ3kCDTDCWWflMSt29FZoPoe0Z2n8RqlewqKIYDIZ9gnMWX7UvvVMMGjgjAVgUnn7ncfeoQY100nPkmMIZB"
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <AppNavigation />
        </StripeProvider>
      </Provider>

    </>
  )
}

export default App
