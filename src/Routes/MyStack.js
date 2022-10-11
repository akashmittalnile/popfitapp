import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, StyleSheet, ActivityIndicator, SafeAreaView, ImageBackground, Text, Platform } from 'react-native';
import Splash from '../Screens/loginSignup/Splash';
import DrawerMain1 from './DrawerMain1';
import LoginMain from './LoginMain';
import { useSelector, useDispatch } from 'react-redux';
// import { incrementCounter } from '../Redux/actions/UpdateCounter';

const MyStack = (props) => {

    const [showSplash, setShowSplash] = useState(true);
    const [isSignedIn, setisSignedIn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
       
        const timeout = setTimeout(async () => {
            getAllValues();
            // GetShippingProducts();
        }, 3000);
    }, []);

    
    const getAllValues = async () => {
        const user = await AsyncStorage.getItem("Logedin");

        setShowSplash(false);
        console.log(user);
        if (user) {
            console.log(user);
            // setShowSplash(false);

            // await GetShippingProducts();

            setisSignedIn(true);
           
        }
        else {
            setisSignedIn(false);
            // setShowSplash(false);
            console.log("error_Mystack");
        }


    }



    if (showSplash) {
        return <Splash />
    }

    return (
        isSignedIn ?
            (
                < LoginMain />
            )
            :
            (
                < DrawerMain1 />
            )
    );
}
export default MyStack;




