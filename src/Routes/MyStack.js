import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import {View ,StyleSheet,ActivityIndicator,SafeAreaView,ImageBackground ,Text, Platform} from 'react-native';
 import Splash from '../Screens/loginSignup/Splash';
 import DrawerMain1 from './DrawerMain1';
 import LoginMain from './LoginMain';
 

const MyStack =(props) => {
    
     const [showSplash , setShowSplash ]  = useState(true);
    const  [isSignedIn, setisSignedIn]=useState(false);
     
     const getAllValues = async() => {
         //const user = await AsyncStorage.getItem("Logedin");
        
        setShowSplash(false);
        console.log(user);
         if (user){
          console.log(user);
         // setShowSplash(false);
          setisSignedIn(true);
         }
         else{
          setisSignedIn(false);
         // setShowSplash(false);
          console.log("error");
         }
         
         
    }
    useEffect(()=> {  
    const timeout = setTimeout(async () => {
            getAllValues();
              },3000);  
    },[]);
    
     
if(showSplash){
        return <Splash/> 
    }
   
return (
        isSignedIn ?
        (
            < LoginMain />
        )
    :
        (
          < DrawerMain1/>
        )
    );
 }
export default MyStack ;




 