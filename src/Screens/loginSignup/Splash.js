import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, FlatList, SafeAreaView } from 'react-native'
import axios from 'axios';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, CartCounter } from '../../Redux/actions/UpdateCounter';

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
        let count = response.data.length
        let notidata = 0;
        for (let i = 0; i <= count; i++) {
          if (response.data.data[i].is_read == 0) {
            notidata = notidata + 1

          }
        }
        dispatch(incrementCounter(parseInt(notidata)));
        // AsyncStorage.setItem("notification", JSON.stringify(data));
        // if (response?.data?.status == '1') {
        //   // setIsLoading(false)
        //   // setNoti(response.data.data);
        // }
      }
      catch (error) {
        // Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
        // alert("SPLASH error", error);
        // setIsLoading(false)
        // console.log("Splash_error:::", error);

      }

    };
    const Cartproducts = async () => {
      const usertkn = await AsyncStorage.getItem("authToken");
      // console.log(".....usertoken.....GetShippingProducts...", producttoken);

      // setIsLoading(true)
      try {
        const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
          'headers': { "Authorization": ` ${usertkn}` }
        },
        );
        // console.log("", response);
        // console.log("ResponseShippingProducts(product) ::::", response.data.data);
        // setproductdata(response.data.data);
        let cartdata = response?.data?.data?.length;
        console.log("cartdataReducer_splash.....:", cartdata);
        dispatch(CartCounter(parseInt(cartdata)));
        //  setuseraddress(response.data.address_lists);
        //   setSubtotal(response.data.sub_total);
        //   setTax(response.data.tax);
        //   setcoupon(response.data.coupon_price);
        //   setshipping_cost(response.data.shipping_cost);
        //   setTotal(response.data.amount);
        // setIsLoading(false);
      }
      catch (error) {
        Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
        // console.log("Cartproducts_splash:::", error.response.data.message);
        // setIsLoading(false)
      }

    };
    setTimeout(() => {
      GetShippingProducts();
      Cartproducts()
    }, 3000)


  }, [incrementCounter, CartCounter])



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

                borderRadius: 10, height: 128, width: 260, justifyContent: 'center',  backgroundColor: '#272727',
              }}>

                <Image resizeMode="contain"
                source={require('../assets/layerCenter1.png')}
                  style={{
                    width: 200,
                    height: 160, alignSelf: 'center',top:-30,left:-4
                  }}
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
