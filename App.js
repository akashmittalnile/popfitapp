
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
//import ForegroundHandler from './src/Screens/ForegroundHandler';
import { createStores, combineReducers } from "redux";
import { Provider } from 'react-redux';
import modifyCounterReducer from './src/Redux/reducers/modifyCounter';
import store from "./src/store";


// const rootReducer = combineReducers({
//   modifyCount: modifyCounterReducer
// });

// const store = createStores(rootReducer);

const App = (props) => {
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
        {/* <ForegroundHandler /> */}
        <AppNavigation />

      </Provider>

    </>
  )
}

export default App
