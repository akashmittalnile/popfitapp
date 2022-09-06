import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, FlatList } from 'react-native'


const Splash = (props) => {

  useEffect(() => {
    setTimeout(() => {
        // props.navigation.navigate("LoginSignUp");
         //props.navigation.navigate("DrawerMain1");
    }, 3000)
}, [])
  
   
 
  return (


    <View style={{ height: "100%", backgroundColor: 'red' }}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: "100%", width: '50%', backgroundColor: '#e7bd16', flexDirection: 'column' }}></View>
        <View style={{
          height: "100%", width: '50%', backgroundColor: '#272727',
          flexDirection: 'column'
        }}></View>

 
      <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
      <TouchableOpacity   >
          <View style={{
           
            borderRadius: 10, height: 128, width: 270 ,marginLeft :-21,
          }}>

            <Image source={require('../assets/splashLogo.png')}
            
            />

          </View>
          </TouchableOpacity>
        </View>
       
      </View>
    </View>

  )
}

export default Splash;
