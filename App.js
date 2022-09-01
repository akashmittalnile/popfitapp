 
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigation from './src/Routes/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated'
import Home from './src/Screens/Dasboard/Home';
import LoginSignUp from './src/Screens/loginSignup/LoginSignUp';


const App = (props) => {
  return (
    <AppNavigation />
  )
}

export default App
