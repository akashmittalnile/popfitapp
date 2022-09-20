import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginSignUp from '../Screens/loginSignup/LoginSignUp';
import SignUp from '../Screens/loginSignup/SignUp';
import Login from '../Screens/loginSignup/Login';
import MobileNo from '../Screens/loginSignup/MobileNo';
import VerificationCode from '../Screens/loginSignup/VerificationCode';

import DrawerMain1 from './DrawerMain1';
import Home from '../Screens/Dasboard/Home';
import TrainingDetail from '../Screens/training/TrainingDetail';
import EmailVerification from '../Screens/loginSignup/Verifications/EmailVerification';


const LoginMain = (props) => {

    useEffect(() => {
    }, []);

    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator
        screenOptions={{ headerShown: false}}
        >
           
            <Stack.Screen options={{ headerShown: false }} name="LoginSignUp" component={LoginSignUp} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            <Stack.Screen options={{ headerShown: false }} name="MobileNo" component={MobileNo} />
            <Stack.Screen options={{ headerShown: false }} name="VerificationCode" component={VerificationCode} />
            <Stack.Screen options={{ headerShown: false }} name="EmailVerification" component={EmailVerification} />
            <Stack.Screen options={{ headerShown: false }} name='DrawerMain1' component={DrawerMain1} />
             


        </Stack.Navigator>

    )
}




export default LoginMain;