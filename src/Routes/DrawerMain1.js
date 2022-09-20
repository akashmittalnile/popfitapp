import React, { useEffect } from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView} from 'react-native';
import MyTabBar from './MyTabBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerrender from './CustomDrawerrender';
import LoginMain from './LoginMain';
import LoginSignUp from '../Screens/loginSignup/LoginSignUp';
 
const DrawerMain1 = (props) => {
  const Drawer = createDrawerNavigator();
     return(
      <Drawer.Navigator 
      initialRouteName="MyTabBar"
      headerMode={null}
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerrender {...props} />}
      >
      
     
      <Drawer.Screen name="MyTabBar" component={MyTabBar} />
      
      <Drawer.Screen name="LoginMain" component={LoginMain} />
        
      
      
    </Drawer.Navigator>
     );
  }


export default DrawerMain1;
