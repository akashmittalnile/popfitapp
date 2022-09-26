import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, FlatList, SafeAreaView } from 'react-native'
import axios from 'axios';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../../Redux/actions/UpdateCounter';

const Splash = (props) => {

  // useEffect(() => {
  //   setTimeout(() => {
  //     // props.navigation.navigate("LoginSignUp");
  //     //props.navigation.navigate("DrawerMain1");
  //   }, 3000)
  // }, [])
  const dispatch = useDispatch();
    
  useEffect(() => {
  
    const GetShippingProducts = async () => {
      const usertkn = await AsyncStorage.getItem("authToken");
      //  setIsLoading(true)
      try {
        const response = await axios.get(`${API.NOTIFICATION}`, { headers: { "Authorization": ` ${usertkn}` } });
        let data = response.data.data.length;
        console.log('incrementCounter _Splash', data
        );
        dispatch(incrementCounter(parseInt(data)));
        // AsyncStorage.setItem("notification", JSON.stringify(data));
        if (response?.data?.status == '1') {
          // setIsLoading(false)
          // setNoti(response.data.data);
        }
      }
      catch (error) {
        // alert("SPLASH error", error);
        // setIsLoading(false)
        //  console.log("ShippingProductserror:::", error);

      }

    };
    setTimeout(() => {
      GetShippingProducts();
    }, 3000)
    

  }, [incrementCounter])



  return (
    <SafeAreaView style={{
      flex: 1,
      width: "100%",
      height: "100%", flexGrow: 1, backgroundColor: 'black'
    }} >

      <View style={{ height: "100%", backgroundColor: 'red' }}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: "100%", width: '50%', backgroundColor: '#e7bd16', flexDirection: 'column' }}></View>
          <View style={{
            height: "100%", width: '50%', backgroundColor: '#272727',
            flexDirection: 'column'
          }}></View>


          <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
            <TouchableOpacity   >
              <View style={{

                borderRadius: 10, height: 128, width: 270, marginLeft: -21,
              }}>

                <Image source={require('../assets/splashLogo.png')}

                />

              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Splash;
