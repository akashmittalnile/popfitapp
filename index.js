/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
// import { PlaybackService } from './src/services';

// // This needs to go right after you register the main component of your app
// // AppRegistry.registerComponent(...)
// TrackPlayer.registerPlaybackService(() => PlaybackService);

// import store from "./src/store";

// store.subscribe(()=>console.log(store.getState()));

//register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
