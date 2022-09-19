import React, { useState, useEffect, useRef } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Keyboard, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import axios from 'axios';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textinput from '../CommonTextInput/TextInput/Index';
import * as yup from 'yup';
import { Formik } from 'formik';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Login = (props) => {

  const firstCodeRef = useRef();
  const secondCodeRef = useRef();
  const thirdCodeRef = useRef();
  const forthCodeRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [otp1, setotp1] = useState('');
  const [otp2, setotp2] = useState('');
  const [otp3, setotp3] = useState('');
  const [otp4, setotp4] = useState('');
  const [alertMsg, setAlertMsg] = useState("");
  const [msg, setMsgAlert] = useState(false);
  const [phnnumber, setphnnumber] = useState();

  const [alertpsswdMsg, setAlertpsswdMsg] = useState("");
  const [msgpsswd, setMsgpsswdAlert] = useState(false);

  const [LoginWithNumberPopup, setLoginWithNumberPopup] = useState(false);
  const [LoginSendotp, setLoginSendotp] = useState(false);
  const [mobileNumber, setmobileNumber] = useState("")

  const [password, setpasssword] = useState("");
  const [email, setEmail] = useState("");

  const [ForgotPassword, setForgotPassword] = useState(false);
  const [forgetOtp, setforgetOtp] = useState("");
  const [forgotSendotp, setforgotSendotp] = useState(false);
  const [ChangePasword, setChangePasword] = useState(false);

  const gotoSignUp = () => {
    props.navigation.navigate("MobileNo")
  }

  // const gotoHome = () => {
  //   AsyncStorage.setItem("Logedin", JSON.stringify("User login successfully!!!"));
  //   props.navigation.navigate("DrawerMain1")
  // }

  //   const gotohomescreen = () => {
  // setLoginSendotp(!LoginSendotp)
  //     props.navigation.replace("Home")
  //   }

  const onSubmitLoginAPi = async () => {
    // if (!email.trim() || !password.trim()) {
    //   alert("Email or Password is invalid");
    //   return;
    // }
    try {
      const response = await axios.post(`${API.LOGIN}`, {
        email,
        password,
      });
      console.log("afryrtunu6:::", email, password);

      if(response.data.status==1){
        console.log("..........................", response.data.success.token);
        const userToken = response.data.success.token;
        AsyncStorage.setItem('authToken', userToken);
        const userProfiles = response.data.success.token;
        await AsyncStorage.setItem("userView", userProfiles);
        props.navigation.navigate("DrawerMain1");
      }
      else{
        Alert.alert("User email and password is not matched, Please Check Again! ",response.data.message);
      }
    }
    catch (error) {
      console.log("error??????", error);
      Alert.alert(error);
    }
  };

  const ForgetAPI = async (values) => {
    const phndata = {
      phone_number: values.phoneNumber
    }
    setphnnumber(values.phoneNumber)

    // setForgotPassword(true)

    console.log(".......userInputdata", phndata);
    try {
      const response = await axios.post(`${API.FORGOT_PASSWORD}`, phndata)
      console.log("responseforget ::::", response.data);
      // console.log("forget_OTP ::::", response.data.code);
      setforgetOtp(response.data.code);
      if (response.data.status != 0) {

        //forget psswd otp verified modal open
        setForgotPassword(false)
        setforgotSendotp(true)

        // codeotp: response.data.code, 
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error.response.data.message);
      setIsLoading(false);
    }

  };

  const Validation = () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    if (otp.length < 4) {
      // Alert.alert('Invalid Otp');
    } else return true;
  };

  const VerifyOtp = async () => {

    if (Validation()) {
      setIsLoading(true);

      try {
        const otp = otp1 + otp2 + otp3 + otp4;
        const data = {
          phone_number: phnnumber,
          otp: otp,
        }
        console.log("...VerifyOtp", data);
        axios({
          url: API.VERIFY_OTP,
          method: 'POST',
          data: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
          }
        })

          .then(function (response) {
            console.log("...VerifyOtp", data);
            console.log("responseVerify_forgetpsswd :", response.data);
            if (response.data.status == 1) {
              //alert("otp matched!!");
              setforgotSendotp(false);
              // setforgotSendotp(true)
              setLoginSendotp(false);
              setChangePasword(true);
              setIsLoading(false);
            }
            else {
              setAlertMsg(response.data.message);
              console.log("....alertmsg", response.data.message);
              setMsgAlert(true);
              setIsLoading(false);
            }
          })



      } catch (error) {

        console.log("error:", error.response.data.message);
        setIsLoading(false);

      }

    };
  };

  // const Loginwithmobile = async (values) => {

  //    const data={
  //     phone_number :values.phoneNumber1
  //    }


  //   // setLoginWithNumberPopup(true)


  //   console.log(".......userInputdata", data);
  //   try {
  //     const response = await axios.post(`${API.MOBILE_NO_VERIFY}`, data)
  //     console.log("responsemobileotplogin ::::", response.data);
  //     if (response.data.status == 1) {

  //       setLoginWithNumberPopup(false)
  //       setLoginSendotp(true)

  //       // codeotp: response.data.code, 
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("error:", error.response.data.message);
  //     setIsLoading(false);
  //   }

  // };
  // const LoginVerifyOtp = async (values) => {

  //   if (Validation()) {
  //     // setIsLoading(true);
  //     setLoginSendotp(true)
  //     try {
  //       const otp = otp1 + otp2 + otp3 + otp4;
  //       const data = {
  //         phone_number: phnnumber,
  //         otp: otp,
  //       }

  //       axios({
  //         url: API.VERIFY_OTP,
  //         method: 'POST',
  //         data: data,
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'multipart/form-data',
  //           'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
  //         }
  //       })

  //         .then(function (response) {
  //           console.log("responseVerify_forgetpsswd :", response.data);
  //           if (response.data.status == 1) {
  //             setLoginSendotp(false)
  //             alert("hello home page")
  //             props.navigation.replace("Home")
  //             // setIsLoading(false);
  //           }
  //           else {
  //             setAlertMsg(response.data.message);
  //             console.log("....alertmsg", response.data.message);
  //             setMsgAlert(true);
  //             // setIsLoading(false);
  //           }
  //         })



  //     } catch (error) {

  //       console.log("error:", error.response.data.message);
  //       setIsLoading(false);

  //     }

  //   };
  // };

  const ChangeAPI = async (values) => {
    const data = {
      new_password: values.password,
      confirm_new_password: values.cfm_password
    };
    console.log(".......userInputdata", data);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.CHANGE_PSWD}`, data);
      console.log("inputdata...", response.data);
      console.log("Response_ChangepsswdAPI ::::", response.data.status);
      if (response.data.status != 0) {
        setChangePasword(false);
        alert('Password changed successfully');
        console.log("User_change_psswd_successfully...>>>", response.data.message);
        setIsLoading(false)
      }
      else {
        setAlertpsswdMsg(response.data.message);
        setMsgpsswdAlert(true);
        setIsLoading(false)
      }
    }
    catch (error) {
      console.log("Countryerror:", error.response.data.message);
      setIsLoading(false)
    }


  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
    }} >
      {!isLoading ?
        (<View>
          <ScrollView>
            <BackgroundImage source={require('../assets/ellipse4.png')} style={{ height: 280, }}>
              <BackgroundImage source={require('../assets/ellipse.png')} style={{ height: 274, }}>
                <View style={{ height: 80, backgroundColor: '#272727', justifyContent: 'center' }}>
                  <View style={{ height: 120, marginTop: 160, alignItems: 'center', }}>
                    <Image source={require('../assets/logo3.png')}
                      style={{ height: 80, position: 'absolute', width: 140, }} />
                  </View>
                </View>
              </BackgroundImage>
            </BackgroundImage>
            <View style={{ marginHorizontal: 20, height: 230, marginTop: 40, flexDirection: 'column' }}>
              <Text style={{ marginLeft: 30, textAlign: 'left', fontSize: 16, color: 'black', }}>
                Username</Text>
              <View style={{
                width: '130%',
                justifyContent: 'center',
                alignContent: 'center',
                fontSize: 18,
              }}
              >
                <Textinput
                  placeholder="Enter Email"
                  value={email}
                  //editable={!isLoading}
                  onChangeText={(text) => setEmail(text)}
                  autoCorrect={false}
                  autoCapitalize='none'
                  fontWeight='normal'
                  placeholderTextColor='#D7D7D7'
                  style={{
                    width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                    fontSize: 11
                  }} />
              </View>
              <Text style={{ marginTop: 25, marginLeft: 30, textAlign: 'left', fontSize: 16, color: 'black', }}>
                Password</Text>
              <View style={{
                width: '130%',
                justifyContent: 'center',
                alignContent: 'center',
                fontSize: 18,
              }}
              >
                <Textinput
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={(text) => setpasssword(text)}
                  autoCapitalize='none'
                  autoCorrect={false}
                  fontWeight='normal'
                  placeholderTextColor='#D7D7D7'
                  secureTextEntry={true}
                  isPass={false}
                  style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black", fontSize: 11 }} />
              </View>
              <TouchableOpacity onPress={() => { setForgotPassword(true) }}>
                <Text style={{ marginTop: 10, marginRight: 25, textAlign: 'right', fontSize: 12, color: 'black', }}>
                  Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { onSubmitLoginAPi() }}>
                <View style={{ marginTop: 30, borderRadius: 25, width: 200, height: 50, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white', }}>Login</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { setLoginWithNumberPopup(true) }}>
                <View style={{ marginTop: 20, borderRadius: 25, width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: '#424242' }}>Login via OTP</Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <View style={{ marginTop: 15, width: "100%", height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: "row" ,}}>
              <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'black', justifyContent: 'center', }}>Don't have an accout </Text>

              <TouchableOpacity
                onPress={() => { gotoSignUp() }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffcc00', textDecorationLine: 'underline' }}> Sign up </Text>
              </TouchableOpacity>

              <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'black', justifyContent: 'center' }}>?</Text>


            </View>
            {/* Login with Mobile no. */}
            {LoginWithNumberPopup ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={LoginWithNumberPopup}
                onRequestClose={() => {
                  setLoginWithNumberPopup(false);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>
                  {/* <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(140, 141, 142, 0.7)',justifyContent: 'flex-end',
               alignItems: 'center',}} onPress={()=>setForgotPassword(!ForgotPassword)}> */}
                  <View
                    style={{
                      // marginTop: 450,
                      // margin: 10,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //paddingTop: 40,
                      width: "99%",
                      justifyContent: "flex-end",
                      alignItems: 'center',
                      // alignSelf:"flex-end",
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 6,
                    }}>

                    <Formik
                      initialValues={{
                        phoneNumber1: '',
                      }}
                      onSubmit={values => Loginwithmobile(values)}
                      validationSchema={yup.object().shape({
                        phoneNumber1: yup
                          .string()
                          .required('Please, Enter the valid mobile number'),
                      })}
                    >
                      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View style={{
                          backgroundColor: 'white',
                          // height: 250,
                          borderWidth: 1,
                          borderColor: "white",
                          width: "95%",
                          padding: 5,
                          marginTop: 20,
                          marginHorizontal: 15,
                          borderRadius: 20,
                          marginBottom: 10,
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}>

                          <Text style={{ marginTop: 15, marginHorizontal: 31, textAlign: 'center', fontSize: 14, color: 'black', width: 300 }}>Please Enter Your Registered Mobile Number</Text>


                          <View style={{
                            borderRadius: 40,
                            marginTop: 30,
                            height: 45,
                            width: 310,
                            shadowColor: '#11032586',
                            backgroundColor: 'white',
                            borderColor: "#D7D7D7",
                            borderWidth: 1,
                          }}>
                            <TextInput placeholder="Enter Mobile Number"
                              fontWeight='normal'
                              maxLength={10}
                              keyboardType='number-pad'
                              placeholderTextColor='#D7D7D7'
                              value={values.phoneNumber1}
                              onChangeText={handleChange('phoneNumber1')}
                              onBlur={() => setFieldTouched('phoneNumber1')}
                              style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black" }}
                            />
                            {
                              touched.phoneNumber1 && errors.phoneNumber1 &&
                              <Text style={{ fontSize: 14, color: '#FF0D10', paddingLeft: 10, marginTop: 5 }}>{errors.phoneNumber1}</Text>
                            }
                          </View>

                          <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 50 }}>
                            <TouchableOpacity onPress={() => {
                              handleSubmit()


                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Send OTP</Text>

                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      )}
                    </Formik>

                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Verified Login OTP */}
            {LoginSendotp ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={LoginSendotp}
                onRequestClose={() => {
                  setLoginSendotp(false);
                  //  setforgotSendotp(!forgotSendotp);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>
                  <View
                    style={{
                      // margin: 10,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //paddingTop: 40,
                      width: "99%",
                      justifyContent: "flex-end",
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>
                    <View style={{
                      backgroundColor: 'white',
                      // height: 250,
                      width: "95%",
                      padding: 5,
                      marginHorizontal: 10,
                      marginTop: 20,
                      marginHorizontal: 15,
                      borderRadius: 10,
                      marginBottom: 20,
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                      <View style={{ marginHorizontal: 30, backgroundColor: "white", }}>
                        <Text style={{ marginTop: 15, textAlign: 'center', fontSize: 14, color: 'black', }}>Please enter verification code received in your registered mobile number</Text>
                      </View>

                      <View style={{
                        flexDirection: "row",
                        height: 70, marginLeft: 20, width: "60%", justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: 10
                      }}>

                        <View style={{
                          borderTopLeftRadius: 30, borderBottomLeftRadius: 30, width: 50, borderWidth: 1, borderColor: '#ffcc00',
                          height: 50,
                          backgroundColor: 'white'
                        }}>
                          <TextInput
                            ref={firstCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 16,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',
                            }}
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                secondCodeRef.current.focus();
                              } else {
                                firstCodeRef.current.focus();
                              }
                              setotp1(text);
                            }}
                            keyboardType='number-pad'
                            onSubmitEditing={() => secondCodeRef.current.focus()}
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                        }}>
                          <TextInput
                            ref={secondCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                thirdCodeRef.current.focus();
                              } else {
                                firstCodeRef.current.focus();
                              }
                              setotp2(text);
                            }}
                            onSubmitEditing={() => thirdCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                        }}>
                          <TextInput
                            ref={thirdCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                forthCodeRef.current.focus();
                              } else {
                                secondCodeRef.current.focus();
                              }
                              setotp3(text);
                            }}
                            onSubmitEditing={() => forthCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00', borderBottomRightRadius: 30, borderTopRightRadius: 30
                        }}>
                          <TextInput
                            ref={forthCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 14,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                Keyboard.dismiss();
                              } else {
                                thirdCodeRef.current.focus();
                              }
                              setotp4(text);
                            }}
                            onSubmitEditing={() => forthCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>

                      </View>

                      <View style={{ height: 30 }}>
                        {
                          msg ?
                            (<View style={{ justifyContent: "center", marginHorizontal: 40, marginTop: 5 }}><Text style={{ color: "red", fontSize: 15, }}>{alertMsg}</Text></View>)
                            :
                            (null)
                        }
                      </View>
                      <View style={{ marginLeft: 30, marginBottom: 1, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { LoginVerifyOtp() }}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Validdate OTP & Login</Text>

                          </View>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}

            {/* forgot password  */}
            {ForgotPassword ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={ForgotPassword}
                onRequestClose={() => {
                  setForgotPassword(false);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>

                  <View
                    style={{
                      // margin: 10,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //paddingTop: 40,
                      width: "99%",
                      justifyContent: "flex-end",
                      alignItems: 'center',

                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>

                    <Formik
                      initialValues={{
                        phoneNumber: '',
                      }}
                      onSubmit={values => ForgetAPI(values)}
                      validationSchema={yup.object().shape({
                        phoneNumber: yup
                          .string()
                          .required('Please, Enter the valid mobile number'),
                      })}
                    >
                      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View style={{
                          backgroundColor: 'white',
                          // height: 250,
                          width: "95%",
                          padding: 5,

                          marginTop: 20,
                          marginHorizontal: 15,
                          borderRadius: 20,
                          marginBottom: 10,
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}>

                          <Text style={{ marginTop: 15, marginHorizontal: 31, textAlign: 'center', fontSize: 14, color: 'black', width: 300 }}>Please Enter Your Registered Mobile Number</Text>


                          <View style={{
                            borderRadius: 40,
                            marginTop: 30,
                            height: 45,
                            width: 310,
                            shadowColor: '#11032586',
                            backgroundColor: 'white',
                            borderColor: "#D7D7D7",
                            borderWidth: 1,
                          }}>
                            <TextInput placeholder="Enter Mobile Number"
                              fontWeight='normal'
                              maxLength={10}
                              keyboardType='number-pad'
                              placeholderTextColor='#D7D7D7'
                              value={values.phoneNumber}
                              onChangeText={handleChange('phoneNumber')}
                              onBlur={() => setFieldTouched('phoneNumber')}
                              style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black" }}
                            />
                            {
                              touched.phoneNumber && errors.phoneNumber &&
                              <Text style={{ fontSize: 14, color: '#FF0D10', paddingLeft: 10, marginTop: 5 }}>{errors.phoneNumber}</Text>
                            }
                          </View>

                          <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 50 }}>
                            <TouchableOpacity onPress={() => {
                              handleSubmit()
                              // ForgetAPI(values);

                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Reset Password</Text>

                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      )}
                    </Formik>

                  </View>
                </View>
              </Modal>
            ) : null}
            {/* Verified forgot OTP */}
            {forgotSendotp ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={forgotSendotp}
                onRequestClose={() => {
                  setforgotSendotp(false);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>
                  <View
                    style={{
                      // margin: 10,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //paddingTop: 40,
                      width: "99%",
                      justifyContent: "flex-end",
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>
                    <View style={{
                      backgroundColor: 'white',
                      // height: 250,
                      width: "95%",
                      padding: 5,
                      marginHorizontal: 10,
                      marginTop: 20,
                      marginHorizontal: 15,
                      borderRadius: 10,
                      marginBottom: 20,
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                      <View style={{ marginHorizontal: 30, backgroundColor: "white", }}>
                        <Text style={{ marginTop: 15, textAlign: 'center', fontSize: 14, color: 'black', }}>Please enter verification code received in your registered mobile number <Text style={{ fontSize: 14, color: 'red', }}>OTP: {forgetOtp}</Text></Text>

                      </View>

                      <View style={{
                        flexDirection: "row",
                        height: 70, marginLeft: 20, width: "60%", justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: 10
                      }}>

                        <View style={{
                          borderTopLeftRadius: 30, borderBottomLeftRadius: 30, width: 50, borderWidth: 1, borderColor: '#ffcc00',
                          height: 50,
                          backgroundColor: 'white'
                        }}>
                          <TextInput
                            ref={firstCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 16,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',
                            }}
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                secondCodeRef.current.focus();
                              } else {
                                firstCodeRef.current.focus();
                              }
                              setotp1(text);
                            }}
                            keyboardType='number-pad'
                            onSubmitEditing={() => secondCodeRef.current.focus()}
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                        }}>
                          <TextInput
                            ref={secondCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                thirdCodeRef.current.focus();
                              } else {
                                firstCodeRef.current.focus();
                              }
                              setotp2(text);
                            }}
                            onSubmitEditing={() => thirdCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                        }}>
                          <TextInput
                            ref={thirdCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                forthCodeRef.current.focus();
                              } else {
                                secondCodeRef.current.focus();
                              }
                              setotp3(text);
                            }}
                            onSubmitEditing={() => forthCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>
                        <View style={{
                          width: 50,
                          height: 50,
                          backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00', borderBottomRightRadius: 30, borderTopRightRadius: 30
                        }}>
                          <TextInput
                            ref={forthCodeRef}
                            style={{
                              flex: 1, fontSize: 20,
                              color: 'black',
                              marginLeft: 14,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',

                            }}
                            placeholder=''
                            placeholderTextColor="#d3d3d3"
                            onChangeText={text => {
                              if (text.length == 1) {
                                Keyboard.dismiss();
                              } else {
                                thirdCodeRef.current.focus();
                              }
                              setotp4(text);
                            }}
                            onSubmitEditing={() => forthCodeRef.current.focus()}
                            keyboardType='number-pad'
                            maxLength={1}
                          />
                        </View>

                      </View>

                      <View style={{ height: 30 }}>
                        {
                          msg ?
                            (<View style={{ justifyContent: "center", marginHorizontal: 40, marginTop: 5 }}><Text style={{ color: "red", fontSize: 15, }}>{alertMsg}</Text></View>)
                            :
                            (null)
                        }
                      </View>
                      <View style={{ marginLeft: 30, marginBottom: 1, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
                        <TouchableOpacity onPress={() => {
                          VerifyOtp()

                        }}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Reset Password</Text>

                          </View>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}

            {/* fogot with Mobile no. change Password */}
            {ChangePasword ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={ChangePasword}
                onRequestClose={() => {
                  // ChangePasword = false;
                  setChangePasword(false);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>
                  <View
                    style={{
                      // margin: 10,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //paddingTop: 40,
                      width: "99%",
                      // justifyContent: "flex-end",
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>
                    <Formik
                      initialValues={{

                        password: '',
                        cfm_password: '',


                      }}
                      onSubmit={values => ChangeAPI(values)}

                      validationSchema={yup.object().shape({
                        password: yup
                          .string()
                          .required('Please enter new password.')
                          .min(8, 'Your password is too short.'),

                        cfm_password: yup
                          .string()
                          .required('Confirm password is required')
                          .oneOf([yup.ref('password')], 'Your passwords do not match.')
                      })}
                    >
                      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                        <View style={{
                          // marginHorizontal: 15,
                          borderRadius: 20,
                          backgroundColor: 'white',
                          width: "80%",

                          marginBottom: 10,
                          // alignItems: 'center',
                          justifyContent: "center",
                          flexDirection: 'column',
                          padding: 1,
                          // marginTop: 20,
                          // borderColor: "#bbbaba",
                          // borderWidth: 1,
                          // height: 300,
                          // width: 330
                        }}>
                          <Text style={{ marginHorizontal: 31, marginTop: 20, textAlign: 'center', fontSize: 16, color: 'black', fontWeight: "bold" }}>Change Password</Text>

                          <View style={{
                            marginTop: 26, alignItems: 'center',
                            justifyContent: "center", backgroundColor: 'white',
                          }}>
                            <View style={{
                              borderRadius: 25,
                              margin: 10,
                              shadowColor: '#11032586',
                              backgroundColor: 'white',
                              height: 45,
                              width: "100%",
                              borderColor: "#bbbaba",
                              borderWidth: 1,
                              marginTop: 14,
                              alignItems: 'center',
                              justifyContent: "center",
                            }}>


                              <TextInput
                                placeholder="New Password****"
                                fontWeight='normal'

                                autoCapitalize='none'
                                placeholderTextColor='#D7D7D7'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                style={{ width: '80%', justifyContent: 'center', alignItems: 'center', color: "black", paddingLeft: 1 }} />
                              {
                                touched.password && errors.password &&
                                <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, }}>{errors.password}</Text>
                              }
                              {
                                msgpsswd ?
                                  (<View style={{ justifyContent: "center", marginHorizontal: 20, }}><Text style={{ color: "red", fontSize: 12, }}>{alertpsswdMsg}</Text></View>)
                                  :
                                  (null)
                              }
                            </View>

                            <View style={{
                              borderRadius: 25,
                              margin: 10,
                              shadowColor: '#11032586',
                              backgroundColor: 'white',
                              height: 45,
                              width: "100%",
                              borderColor: "#bbbaba",
                              borderWidth: 1,
                              marginTop: 14,
                              justifyContent: "center",
                              alignItems: 'center',
                            }}>


                              <TextInput
                                placeholder="Confirm Password****"
                                fontWeight='normal'

                                autoCapitalize='none'
                                placeholderTextColor='#D7D7D7'
                                value={values.cfm_password}
                                onChangeText={handleChange('cfm_password')}
                                onBlur={() => setFieldTouched('cfm_password')}
                                style={{ width: '80%', justifyContent: 'center', alignItems: 'center', color: "black", paddingLeft: 1 }}
                              />
                              {touched.cfm_password && errors.cfm_password &&
                                <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, }}>{errors.cfm_password}</Text>
                              }
                            </View>

                          </View>

                          <View style={{ marginLeft: 85, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
                            <TouchableOpacity onPress={() => {
                              handleSubmit();
                              // ChangeAPI()

                            }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Save Password</Text>

                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      )}
                    </Formik>

                  </View>
                </View>
              </Modal>
            ) : null}
          </ScrollView>
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}

export default Login;
