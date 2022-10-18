import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableHighlight, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, ActivityIndicator, StatusBar, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
// import { BackgroundImage } from 'react-native-elements/dist/config';
// import LinearGradient from 'react-native-linear-gradient';
// import style from '../../Routes/style';
import { API } from '../../Routes/Urls';
// import PhoneInput from "react-native-phone-number-input";
import { SvgCssUri, Rect, Circle, SvgUri } from 'react-native-svg';
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

// react-native-country-picker-modal

const MobileNo = (props) => {

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {

  //     Mypicker();

  //   });
  //   return unsubscribe;
  // }, [props, navigation]);


  const [flag, setFlag] = useState('http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg ');
  const [code, setcode] = useState('+1');
  //ISOCode PAss on SignUp Screen
  const [code1, setcode1] = useState('')
  AsyncStorage.setItem('Country_code', code1);
  console.log("......store", code1);

  const [isvisuable, setisvisuable] = useState(false)
  // const firstCodeRef = useRef();
  const lastdigitRef = useRef();

  const [alertVisibility, setAlertVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  //const phoneInput = useRef(null);
  const PHONE_NO_REGEX = /^[0-9\- ]{10,12}$/

  const gotoLogin = () => {
    props.navigation.navigate("Login")
  }
  const countryselect = (cod) => {
    setcode('+' + cod.callingCode.toString())
    var unc = ''
    console.log('the cca=>', unc)
    setIsLoading(true);
    const url = "http://purecatamphetamine.github.io/country-flag-icons/3x2/" + cod.cca2 + ".svg"
    // setFlag(unc) //cca2
    console.log('URL==>', url)
    setFlag(url) //cca2
    setIsLoading(false);
    console.log('My flage is', url)
    console.log("CCA.....", cod.cca2)

    setcode1(cod.cca2)
  }
  const Mypicker = () => {
    return (
      <CountryPicker
        withEmoji
        withCallingCode
        onSelect={(cod) => countryselect(cod)}
        //withAlphaFilter
        withFlagButton
        theme={DARK_THEME}
        visible={true}
        onClose={() => { setisvisuable(false) }}

      />
    )
  }


  const getMobileNumber = async (values) => {

    const phone_number = values.phoneNumber;
    AsyncStorage.setItem("phnNumber", phone_number);
    const country_code = code;
    console.log("country_code.................", code);
    if (phone_number == "") {
      setIsLoading(true);
      setAlertVisibility(true);
      return;
    }
    try {
      const response = await axios.post(`${API.MOBILE_NO_VERIFY}`, { phone_number, country_code });
      console.log(":::::::::Mobile_Response>>>", response.data);
      // Alert.alert("Your OTP is ",response.data.country_code);
      props.navigation.navigate("VerificationCode", {
        Countrycode: response.data.country_code,
        codeotp: response.data.code,
        phone: phone_number,
      })
      setAlertVisibility(false);
      setIsLoading(false);
    }
    catch (error) {

      console.log("......error.........", error.response.data);
      setIsLoading(false);
      setAlertVisibility(false);
    }

  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#272727' }} >
        {!isLoading ?
          (
            <View>
              <View style={{
                height: 800, marginTop: 30,
              }}>
                <Formik
                  initialValues={{
                    phoneNumber: '',
                  }}
                  onSubmit={values => getMobileNumber(values)}
                  validationSchema={yup.object().shape({
                    phoneNumber: yup
                      .string()
                      .matches(PHONE_NO_REGEX, { message: "Please, Enter the valid mobile number ", excludeEmptyString: true })
                      .required('Phone number is a required field'),


                  })}
                >
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                    <View style={{ height: 200 }}>
                      <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 19, color: 'white', }}>What's Your Mobile Number?</Text>


                      <View style={{ height: 70, marginTop: 40, }} >

                        <View style={{ flexDirection: 'row', width: 290, alignItems: 'center', borderRadius: 30, marginTop: 10, alignSelf: 'center', backgroundColor: "white", }}>

                          <View style={{ width: 120, height: 49, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, zIndex: 999, }}>
                            {isvisuable ?
                              Mypicker()
                              : null
                            }
                            <View style={{ position: 'absolute', height: 49, backgroundColor: "white", alignItems: 'center', zIndex: 999, flexDirection: 'row', width: 130, borderRadius: 30, padding: 10 }}>
                              <TouchableOpacity onPress={() => { setisvisuable(true) }}
                                style={{ width: 50, height: 27, flexDirection: 'row', alignItems: 'center' }}>
                                <SvgCssUri
                                  width="100%"
                                  height="100%"
                                  uri={flag}
                                />
                                <Image style={{ width: 12, height: 12, }} source={"white" == '#fff' ? require('../assets/arrow-point-to-down.png') : require('../assets/arrow-point-to-down.png')} />
                              </TouchableOpacity>
                              <ScrollView style={{ left: 5 }}>
                                <Text style={{ color: "black", fontWeight: 'bold', alignSelf: 'flex-end', marginLeft: 10 }}>{code}</Text>
                              </ScrollView>
                            </View>
                          </View>
                          <View style={{ paddingLeft: 8, backgroundColor: "white", height: 49, width: 170, borderRadius: 30 }}>
                            <TextInput
                              ref={lastdigitRef}
                              style={{
                                height: 45,
                                // width: '100%',
                                borderRadius: 10,
                                color: "black",
                                paddingLeft: 10,
                                paddingRight: 10,
                                top: 2,
                                borderRadius: 30
                              }}
                              // onChangeText={text => {
                              //   setphoneNumber(text);
                              // }}
                              placeholder={'Phone Number'}
                              placeholderTextColor="#8F93A0"
                              value={values.phoneNumber}
                              onSubmitEditing={() => lastdigitRef.current.focus()}
                              onChangeText={handleChange('phoneNumber')}
                              onBlur={() => setFieldTouched('phoneNumber')}
                              keyboardType="number-pad"
                              maxLength={10}

                            />
                          </View>
                        </View>
                        {
                          touched.phoneNumber && errors.phoneNumber &&
                          <Text style={{ fontSize: 14, color: '#FF0D10', paddingLeft: 80, marginTop: 15 }}>{errors.phoneNumber}</Text>
                        }
                      </View>



                      <View style={{
                        height: 200, marginTop: 50
                      }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                          <TouchableOpacity Alert_Visibility={alertVisibility} onPress={() => {
                            handleSubmit()
                          }}
                            disabled={!isValid}>
                            <View style={{ marginTop: 30, borderRadius: 50, width: 150, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white', }}>Next</Text>
                            </View>
                          </TouchableOpacity>

                          <View style={{ marginTop: 15,   width: "100%", height: 40, alignItems: 'center', justifyContent: 'center' , flexDirection:"row"}}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white',justifyContent: 'center' ,}}>Already have an account </Text>
                            
                              <TouchableOpacity  
                              onPress={() => { gotoLogin() }}>
                                <Text style={{   textAlign: 'center', fontSize: 14, color: '#ffcc00',textDecorationLine: 'underline'}}> Login </Text>
                              </TouchableOpacity>
                              
                              <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white',justifyContent: 'center'}}>?</Text>
                           

                          </View>

                        </View>

                      </View>

                    </View>

                  )}
                </Formik>


              </View>

            </View>)
          :
          (<View style={{
            flex: 1, justifyContent: "center", alignItems: "center",
            //  marginTop: 400 
          }}>
            <ActivityIndicator size="large" color="#ffcc00" />
          </View>)}

      </ScrollView>
    </>
  )
}

export default MobileNo;
