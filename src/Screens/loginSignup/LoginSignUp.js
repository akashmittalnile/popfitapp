import React, { useState, useEffect } from 'react'
import { View, TouchableHighlight, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, ActivityIndicator,SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';





const LoginSignUp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  setIsLoading(true);
  setIsLoading(false);
  }, [])
  
 
  const gotoHome = () => {
    AsyncStorage.setItem("Logedin", JSON.stringify("App overview open successfully!!!"));
    props.navigation.navigate("DrawerMain1")
  }
  const gotoLogin = () => {
    props.navigation.replace("Login")
  }
  const gotoSignup = () => {
    props.navigation.navigate("MobileNo")
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black'
    }} >
    <ScrollView style={{ backgroundColor: '#272727' }} >
      {!isLoading ?
        (
          <View>
            <View style={{
              height: 100,
              marginHorizontal: 80, justifyContent: "center", alignItems: 'center', marginTop: 80

            }}>
              <Image source={require('../assets/logo1.png')}
                style={{
                  height: 100,
                  width: 200,
                  resizeMode: 'contain'
                }}
              />
            </View>

            <BackgroundImage source={require('../assets/roundedRectangle1.png')} style={{ marginTop: 150, marginHorizontal: 30, height: 170, overflow: 'hidden', borderRadius: 20 }}>

              <View style={{
                height: 200
              }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

                  <TouchableOpacity onPress={() => { gotoLogin() }}>

                    <View style={{ marginTop: 35, borderRadius: 25, width: 170, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 16, color: 'white', }}>Login</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { gotoSignup() }}>
                    <View style={{ marginTop: 20, borderRadius: 25, width: 170, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 16, color: 'white', }}>Signup</Text>
                    </View>
                  </TouchableOpacity>

                </View>

              </View>
            </BackgroundImage>

          </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </ScrollView>
    </SafeAreaView>
  )
}

export default LoginSignUp;
