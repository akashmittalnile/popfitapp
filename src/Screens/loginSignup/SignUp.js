import React, { useState, useEffect, useRef} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, SafeAreaView, Modal, Button, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import style from '../../Routes/style';
import SuccessfullyRegistered from '../PopUpScreens/SuccessfullyRegistered';
import * as yup from 'yup';
import { Formik } from 'formik';
import MenuFieldState from '../../Screens/Menuinput/State/index';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Textinput from '../CommonTextInput/TextInput/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarModal from './CalendarModal';
import moment from 'moment';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Signup = (props, navigation) => {

  const [RegisteredPopUp, setRegisteredPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [calmodal, setcalmodal] = useState(false);
  const [userbirthday, setbirthday] = useState("");
  // console.log("modal calendar::", calmodal);
  const [msg, setMsg] = useState(false);
  const [msgcountry, setMsgCountry] = useState(false);
  const [Countryitems, setCountryitems] = useState([]);
  const [opencountry, setopencountry] = useState(false);
  const [valuecountry, setvaluecountry] = useState('');

  const [openstate, setOpenstate] = useState(false);
  const [valuestate, setValuestate] = useState();
  const [Stateitems, setStateitems] = useState([]);

  const [Cityitems, setCityitems] = useState([]);
  const [opencity, setOpencity] = useState(false);
  const [valuecity, setValuecity] = useState();

  const [alertVisibility, setAlertVisibility] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [AlertMsg, setAlertMsg] = useState("");
  const [Msg, setMsgAlert] = useState(false);

  const gotoLogin = () => {
    setRegisteredPopUp(false);
    props.navigation.navigate("Login")
  }
  const [ischecked, setChecked] = React.useState("");
  const emailInput = useRef(null);

  //routefrom Email verification
  // console.log("props.route.params.signup", props.route.params);
  // const { emailreturn } = props.route.params;

  const [emaildata, setEmaildata] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log('====================================');
  // console.log(phoneNumber);
  // console.log('====================================');
  // console.log("props.route.params.sinup::", props.route.params.userNumber)
  //  const userNmbr = props.route.params.userNumber

  const calendarmodalclose = (selectedDate) => {
    setMsg(false)
    setcalmodal(false);

    setbirthday(moment(selectedDate).format("YYYY-MM-DD"))
    // console.log('====================================');
    // console.log(selectedDate);
    // console.log("....", userbirthday);

    // console.log('====================================');
  }

  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      setIsLoading(true);
      setIsLoading(false);
      setMsgAlert(false)
      // get()
      // var str = userNmbr;
      // setPhoneNumber(str)
      getphoneno()
    });
    return unsubscribe;
  }, []);

  const getphoneno = async () => {
    const PhoneNumber = await AsyncStorage.getItem("phnNumber");
    setPhoneNumber(PhoneNumber)
    // console.log("StoredPhoneno......", PhoneNumber);
  }
  // const get = async () => {
  //   const value = await AsyncStorage.getItem('EnterEmailstore');
  //   setEmaildata(value);
  //   console.log("getitem:::", value);
  // }
  // const EmailVerify = async (values) => {
  //   const email = values.email
  //   console.log(":email::::::::::", email);

  //   if (values.email.length >= 5) {
  //     await AsyncStorage.setItem('EnterEmailstore', values.email);

  //     setIsLoading(true);
  //     setAlertVisibility(true);

  //     try {
  //       const response = await axios.post(`${API.EMAIL_VERIFY}`, { email });
  //       console.log("response ::::", response.data);
  //       setIsLoading(false)

  //       if (response.data.status == true) {
  //         console.log(".......statsus", response.data.status);
  //         props.navigation.navigate("EmailVerification", {
  //           code: response.data.code,
  //           Email: email
  //         });

  //         setIsLoading(false);
  //         setAlertVisibility(false);
  //       }
  //       else {
  //         setAlertMsg(response.data.Message);
  //         setMsgAlert(true);
  //         setIsLoading(false);
  //       }
  //     }
  //     catch (error) {
  //       // console.log("emailerror:", error.response.data.message);
  //       setIsLoading(false);
  //       setAlertVisibility(false);
  //     }
  //   };
  // };
  const FormUpdate = async (values) => {

    // Alert.alert('Hi')
    // console.log('====================================');
    // console.log('FormUpdate', userbirthday);
    // console.log('====================================');

    // if (userbirthday == '') {
    //   setMsg(true)
    //   return
    // }
    // else {
    //   setMsg(false)
    // }

    const data = {
      first_name: values?.first_Name,
      last_name: values?.last_Name,
      username: values?.type_your_username,
      dob: userbirthday,
      email: values?.email,
      phone: phoneNumber,
      address_1: values?.address1,
      address_2: values?.address2,
      country_code: valuecountry,
      state: valuestate,
      city: valuecity,
      // address: values?.address_type,
      address: "",
      zipcode: values?.zip_code,
      about_us: ischecked,
      password: values?.password,
      c_password: values?.cfm_password,
    };
    // console.log(".......userInputdata", data);
    setIsLoading(true);
    axios({
      url: API.SIGN_UP,
      method: 'POST',
      data: data,

    })
      .then(function (response) {
        console.log("responsesignup :", response?.data);
        if (response.data.status == 1) {
          setRegisteredPopUp(true);
          setIsLoading(false);
        }
        else {
          // setIsLoading(false);
          Alert.alert('All the fields are required *','Fill correctly')
        }

      })
      .catch(function (error) {
        Alert.alert('Try again later', error.response.data.message)
        // console.log("Signup_error:", error);
        setIsLoading(false);
      })
  };

  //console.log("valuecountry..........", valuecountry);

  const SelectCountry = async () => {

    // console.log("valuecountryInner..........", valuecountry);
    // const country_code = valuecountry;
    setLoading(true)
    try {
      const response = await axios.get(`${API.GET_COUNTRY}`);
      // console.log("Countryresponse ::::", response.data.data);
      setCountryitems(response.data.data)
      // console.log(setCountryitems);
      // setIsLoading(false)
      // setLoading(false)
      if (response.data.status == 1) {
        // console.log(".......statsus", response.data.status);

        setIsLoading(false);
        setLoading(false)
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        setIsLoading(false);
        setLoading(false)
      }
    }
    catch (error) {
      Alert.alert('Country not found','Something went wrong !')
      // console.log("Countryerror:", error.response.data.message);
      setIsLoading(false);
      setAlertVisibility(false);
      setLoading(false)
    }
  };

  const SelectState = async () => {

    // console.log("valuestate_id>:::", valuecountry);
    const country_id = valuecountry;
    // console.log("state.....", country_id);
    setLoading(true)
    try {
      const response = await axios.post(`${API.SIGIN_SELECT_STATE}`, { country_id });
      // console.log("responseState:::::", response.data.data);

      // setIsLoading(false)

      if (response.data.status == 1) {
        // console.log(".......Response_State_status", response.data.status);
        setStateitems(response.data.data)
        setIsLoading(false);
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        setIsLoading(false);
      }
    }
    catch (error) {
      Alert.alert('State not found','Something went wrong !')
      // console.log("emailerror:", error.response.data.message);
      setIsLoading(false);
      setAlertVisibility(false);
    }
  };

  const SelectCity = async () => {

    // console.log("valuestate_id>>>>", valuestate);
    const state_id = valuestate;
    // console.log("state.....", state_id);
    setLoading(true)
    try {
      const response = await axios.post(`${API.SELECT_CITY}`, { state_id });
      // console.log("responseCity ::::", response.data.data);

      // setIsLoading(false)

      if (response.data.status == 1) {
        // console.log(".......Response_State_status", response.data.status);
        setCityitems(response.data.data)
        setIsLoading(false);
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        setIsLoading(false);
      }
    }
    catch (error) {
      Alert.alert('City not found','Something went wrong !')
      // console.log("emailerror:", error.response.data.message);
      setIsLoading(false);
      setAlertVisibility(false);
    }
  };

  const gotologin_signuppage = () => {
    props.navigation.navigate("LoginSignUp")
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
    }} >
      <ScrollView nestedScrollEnabled={true} horizontal={false}
        style={{ backgroundColor: '#383838' }} >
        {!isLoading ?
          (
            <View>
              <View style={style.navigationBarColor1}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: "center",
                  marginLeft: 10,
                }}>
                  <TouchableOpacity onPress={() => { gotologin_signuppage() }}>
                    <Image
                      source={require('../assets/leftArrowWhite.png')}
                      style={{
                        width: 25,
                        height: 20,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={style.BasicDetailsheader}>
                  <Text style={{ textAlign: 'justify', fontSize: 20, color: 'white' }}>Please Enter Your Basic Details</Text>
                </View>
              </View>

              <Formik
                initialValues={{
                  first_Name: '',
                  last_Name: '',
                  birthday: '',
                  type_your_username: '',
                  email: '',
                  address1: '',
                  address2: '',
                  zip_code: '',
                  country: '',
                  state: '',
                  city: '',
                  address_type: '',
                  password: '',
                  cfm_password: '',

                }}
                onSubmit={values => FormUpdate(values)}

                validationSchema={yup.object().shape({
                  first_Name: yup
                    .string()
                    .required('Enter first name *'),
                  last_Name: yup
                    .string()
                    .required('Enter last name *'),
                  birthday: yup
                    .string(),
                  type_your_username: yup
                    .string()
                    // .min(4, "Username  must be at least 4 characters")
                    .required('Set any userName *'),
                  email: yup
                    .string()
                    .email()
                    .required('Enter valid email id *'),
                  address1: yup
                    .string(),
                  address2: yup
                    .string(),
                  zip_code: yup
                    .string()
                    .min(5, "ZIP code minimum length 5-digits and maximum 9-digits")
                    .max(9, "ZIP code minimum length 5-digits and maximum 9-digits")
                    .required('Enter Pin Code *'),
                  country: yup
                    .string(),
                  state: yup
                    .string(),
                  city: yup
                    .string(),
                  address_type: yup
                    .string(),
                  password: yup
                    .string()
                    .required('Please enter password *')
                    .min(8, 'Your password is too short minimum 8 characters *'),
                    // .max(16, 'Your password should not  be more then   *'),
                  cfm_password: yup
                    .string()
                    .required('Confirm password is required *')
                    .oneOf([yup.ref('password')], 'Your passwords do not match.')
                })}
              >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <View style={{
                    height: 1500, justifyContent: "flex-start", alignItems: "center", paddingTop: 10
                  }}>
                    <View style={{ flexDirection: 'row', borderRadius: 25, height: 50, marginHorizontal: 33, }}>
                      <View style={{ flexDirection: 'column' }}>

                        <View style={{
                          borderRadius: 25, flexDirection: 'row',
                          height: 50,
                          width: 170,
                          shadowColor: '#11032586',
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',

                        }}
                        >
                          <Image source={require('../assets/user.png')}
                            style={{
                              width: 30,
                              height: 30, alignSelf: 'center',
                            }} />

                          <TextInput
                            placeholder="First Name"
                            placeholderTextColor='#8F93A0'
                            value={values.first_Name}

                            style={{ width: '70%', paddingLeft: 10, color: "black" }}
                            onChangeText={handleChange('first_Name')}
                            onBlur={() => setFieldTouched('first_Name')}

                          />

                        </View>

                        {touched.first_Name && errors.first_Name &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, marginTop: 6 }}>{errors.first_Name}</Text>
                        }
                      </View>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{
                          borderRadius: 25, marginLeft: 10, flexDirection: 'row',
                          height: 50,
                          width: 170,
                          shadowColor: '#11032586',
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',

                        }}
                        >
                          <Image source={require('../assets/user.png')}
                            style={{
                              width: 30,
                              height: 30, alignSelf: 'center',
                            }} />
                          <TextInput
                            value={values.last_Name}
                            style={{ width: '70%', paddingLeft: 10, color: "black" }}
                            onChangeText={handleChange('last_Name')}

                            onBlur={() => setFieldTouched('last_Name')}
                            placeholder="Last Name"
                            placeholderTextColor='#8F93A0'
                          />
                        </View>
                        {touched.last_Name && errors.last_Name &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, marginTop: 6 }}>{errors.last_Name}</Text>
                        }
                      </View>
                    </View>

                    <CalendarModal
                      visibleModal={calmodal}
                      onClose={(selectedDate) => { calendarmodalclose(selectedDate) }}
                    />
                    <View style={style.textContainer}>
                      <View style={{ flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                          <TextInput
                            style={{
                              width: 350,
                              height: 50,
                              backgroundColor: 'white',
                              margin: 10,
                              padding: 8,
                              color: 'black',
                              borderRadius: 25,
                              borderColor: '#DFDDDD0D',
                              borderWidth: 1,
                              fontSize: 18,
                              fontSize: 16,
                              paddingHorizontal: 20,
                              marginLeft: 10,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                            placeholder='Date of birth'
                            // autoCapitalize="none"
                            // onBlur={() => setFieldTouched('birthday')}
                            placeholderTextColor='#8F93A0'
                            editable={false}
                            value={userbirthday}
                          // onChangeText={() => {setbirthday(userbirthday) ,console.log("printdob::/",userbirthday)}}
                          />
                          <TouchableOpacity onPress={() => { setcalmodal(true) }}
                            style={{
                              justifyContent: "center", alignItems: "center", width: 40,
                              height: 40, position: "absolute", right: 25, zIndex: 2, top: 15
                            }}
                          >
                            <Image source={require('../assets/calenderIcon.png')}
                              style={{
                                width: 30,
                                height: 30, alignSelf: 'center',
                                //  right: 60
                              }} />
                          </TouchableOpacity>
                        </View>

                        {msg ?
                          <Text style={{
                            fontSize: 12, color: 'red',
                            // color: '#FF0D10', 
                            paddingLeft: 30,
                          }}>Please select D.O.B *</Text>
                          : <></>}

                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Username'
                          secureTextEntry={false}
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'

                          value={values.type_your_username}
                          onChangeText={handleChange('type_your_username')}
                          onBlur={() => setFieldTouched('type_your_username')}
                        />
                        {touched.type_your_username && errors.type_your_username &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.type_your_username}</Text>
                        }
                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <View style={{ flexDirection: 'row', width: 370, }}>
                          <TextInput
                            ref={emailInput}
                            style={style.textInput}
                            placeholder='Email'
                            autoCapitalize="none"
                            keyboardType='email-address'
                            placeholderTextColor='#8F93A0'

                            // maxLength={27}
                            value={emaildata ? emaildata : values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                          />
                          {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: -70 }}>
                          <TouchableOpacity Alert_Visibility={alertVisibility} onPress={() => EmailVerify(values)
                          }>
                            <Text style={{
                              color: "#E7BD16", fontSize: 18,
                              fontSize: 16,
                            }}>Verify</Text>
                          </TouchableOpacity>
                        </View> */}
                        </View>
                        {
                          Msg ?
                            (<View style={{ justifyContent: "center", marginHorizontal: 30, }}><Text style={{ color: "red", fontSize: 12, }}>{AlertMsg}</Text></View>)
                            :
                            (null)
                        }
                        {touched.email && errors.email &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.email}</Text>
                        }
                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Address Line 1'
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'

                          value={values.address1}
                          onChangeText={handleChange('address1')}
                          onBlur={() => setFieldTouched('address1')}
                        />
                        {/* {touched.type_your_username && errors.type_your_username &&
                      <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.type_your_username}</Text>
                    } */}
                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Address Line 2'
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'
                          fontWeight='normal'

                          value={values.address2}
                          onChangeText={handleChange('address2')}
                          onBlur={() => setFieldTouched('address2')}
                        />
                        {/* {touched.type_your_username && errors.type_your_username &&
                      <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.type_your_username}</Text>
                    } */}
                      </View>
                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Zip / Pin Code'
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'
                          fontWeight='normal'
                          keyboardType='number-pad'

                          value={values.zip_code}
                          onChangeText={handleChange('zip_code')}
                          onBlur={() => setFieldTouched('zip_code')}
                        />
                        {touched.zip_code && errors.zip_code &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.zip_code}</Text>
                        }
                      </View>
                      <View style={{ flexDirection: 'column', }}>
                        <View style={{ width: 350, height: 50, marginTop: 18, zIndex: 3 }} >
                          <DropDownPicker
                            loading={loading}
                            onPress={() => SelectCountry()}
                            items={Countryitems.map(item => ({ label: item?.name, value: item?.id }))}
                            setItems={setCountryitems}
                            maxHeight={240}
                            dropDownDirection="BOTTOM"
                            placeholder="Country"
                            itemStyle={{ justifyContent: 'flex-start' }}
                            textStyle={{
                              fontSize: 16
                            }}
                            containerStyle={{ height: 40, }}
                            placeholderTextColor='#8F93A0'
                            open={opencountry}
                            setOpen={setopencountry}
                            //bottomOffset={100}
                            scrollViewProps={{
                              decelerationRate: "medium", ScrollView: "#ffcc00"
                            }}
                            searchable={true}
                            searchPlaceholder="Search Country..."
                            searchContainerStyle={{
                              borderBottomColor: "#dfdfdf"
                            }}
                            searchTextInputStyle={{
                              color: "#000", borderColor: "#0000"
                            }}

                            value={valuecountry}
                            setValue={setvaluecountry}
                            listMode="MODAL"
                            onChangeText={(item) => { setvaluecountry(item), setMsgCountry(false) }}
                            defaultValue={null}
                            dropDownContainerStyle={{
                              borderColor: '#8F93A0',
                              color: '#8F93A0',
                              fontSize: 16,
                              borderRadius: 10,
                              shadowColor: '#000000',

                              shadowRadius: 5,
                              shadowOpacity: 1.0,
                              elevation: 5,
                              zIndex: 999,

                            }}
                            style={{
                              borderColor: 'white', backgroundColor: 'white', borderRadius: 25, alignItems: "center"
                              , justifyContent: "center", zIndex: 3, paddingLeft: 20
                            }}
                          />

                        </View>
                        {
                          msgcountry ?
                            <View style={{ justifyContent: "center", alignItems: "flex-start", marginTop: 8, paddingLeft: 20, }}>
                              <Text style={{
                                fontSize: 12,
                                color: '#FF0D10',

                              }}>Please select Country *</Text>
                            </View>
                            : <></>}
                      </View>
                      <View style={{
                        width: 350,
                        height: 50, marginTop: 25, zIndex: 2
                      }}>
                        <DropDownPicker
                          placeholder="State"
                          loading={loading}
                          onPress={() => { SelectState() }}
                          items={Stateitems.map(item => ({ label: item?.name, value: item?.id }))}
                          setItems={setStateitems}
                          dropDownContainerStyle={{
                            borderColor: '#8F93A0',
                            color: '#8F93A0',
                            fontSize: 16,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: {
                              width: 0,
                              height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 1.0,
                            elevation: 5,
                            zIndex: 999,
                            labelStyle: {
                              color: "#fff",
                              lineHeight: 0
                            },
                          }}
                          dropDownDirection="BOTTOM"
                          listMode="MODAL"
                          containerStyle={{ height: 40 }}
                          placeholderTextColor='#8F93A0'
                          itemStyle={{ justifyContent: 'flex-start' }}
                          textStyle={{
                            fontSize: 16
                          }}
                          open={openstate}
                          setOpen={setOpenstate}
                          searchable={true}
                          searchPlaceholder="Search State..."
                          searchContainerStyle={{
                            borderBottomColor: "#dfdfdf"
                          }}
                          searchTextInputStyle={{
                            color: "#000", borderColor: "#0000"
                          }}
                          value={valuestate}
                          setValue={setValuestate}
                          onChangeText={(item) => setValuestate(item)}
                          defaultValue={null}
                          style={{
                            borderColor: 'white', backgroundColor: 'white', borderRadius: 25, zIndex: 2, alignItems: "center", justifyContent: "center", paddingLeft: 20
                          }}
                        />

                      </View>


                      <View style={{ height: 50, width: 350, marginTop: 28, zIndex: 1 }}>
                        <DropDownPicker onPress={() => { SelectCity() }}
                          loading={loading}
                          items={Cityitems.map(item => ({ label: item?.name, value: item?.id }))}
                          setItems={setCityitems}
                          dropDownContainerStyle={{
                            borderColor: '#8F93A0',
                            color: '#8F93A0',
                            fontSize: 16,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: {
                              width: 0,
                              height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 1.0,
                            elevation: 5,
                            zIndex: 999,
                            labelStyle: {
                              color: "#fff",
                              lineHeight: 0
                            },
                          }}
                          dropDownDirection="BOTTOM"
                          placeholder="City"
                          containerStyle={{ height: 40 }}
                          textStyle={{
                            fontSize: 16
                          }}
                          placeholderTextColor='#8F93A0'
                          itemStyle={{
                            justifyContent: 'flex-start'
                          }}
                          listMode="MODAL"
                          open={opencity}
                          setOpen={setOpencity}
                          searchable={true}
                          searchPlaceholder="Search City..."
                          searchContainerStyle={{
                            borderBottomColor: "#dfdfdf"
                          }}
                          searchTextInputStyle={{
                            color: "#000", borderColor: "#0000"
                          }}
                          value={valuecity}
                          defaultValue={null}
                          setValue={setValuecity}
                          onChangeText={(item) => setValuecity(item)}
                          style={{ borderColor: 'white', backgroundColor: 'white', borderRadius: 25, zIndex: 1, paddingLeft: 20 }}
                        />

                      </View>

                      {/* <View style={{ flexDirection: 'column', marginTop: 18 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Save Address as'
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'
                          fontWeight='normal'

                          value={values.address_type}
                          onChangeText={handleChange('address_type')}
                          onBlur={() => setFieldTouched('address_type')}
                        />
                        {touched.address_type && errors.address_type &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.address_type}</Text>
                        }
                      </View> */}

                      <View style={{ flexDirection: 'column', marginTop: 10 }}>
                        <Textinput
                          style={{
                            width: '88.5%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "red",
                            fontSize: 18
                          }}
                          //InputColor="red"
                          placeholder='Create Password'
                          autoCapitalize="none"
                          onBlur={() => setFieldTouched('password')}
                          placeholderTextColor='#8F93A0'

                          secureTextEntry={true}
                          isPass={false}
                          value={values.password}
                          onChangeText={handleChange('password')}
                        />
                        {touched.password && errors.password &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 40, marginTop: 8 }}>{errors.password}</Text>
                        }
                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 10 }}>
                        <Textinput
                          style={{
                            width: '88.5%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "red",
                            fontSize: 18, marginTop: 15,
                          }}
                          // InputColor="red"
                          placeholder='Confirm Password'
                          autoCapitalize="none"
                          onBlur={() => setFieldTouched('cfm_password')}
                          placeholderTextColor='#8F93A0'

                          secureTextEntry={true}
                          isPass={false}
                          value={values.cfm_password}
                          onChangeText={handleChange('cfm_password')}
                        />
                        {touched.cfm_password && errors.cfm_password &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 40, marginTop: 8 }}>{errors.cfm_password}</Text>
                        }
                      </View>

                    </View>
                    <View style={{
                      marginTop: 1
                    }}>

                      <Text style={{ marginTop: 30, marginLeft: 2, textAlign: 'left', fontSize: 17, color: 'white', }}>How did you hear about us? (optional)</Text>


                      <View style={{ marginHorizontal: 1, marginTop: 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <TouchableOpacity onPress={() => { setChecked('Internet') }}>
                          <View style={{ borderColor: ischecked == 'Internet' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center', marginHorizontal: 0 }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Internet' ? '#ffcc00' : '#8F93A0', }}>Internet</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Newspaper / Magazine') }}>
                          <View style={{ borderColor: ischecked == 'Newspaper / Magazine' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 170, height: 45, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Newspaper / Magazine' ? '#ffcc00' : '#8F93A0', }}> Newspaper / Magazine</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Referral') }}>
                          <View style={{ borderColor: ischecked == 'Referral' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Referral' ? '#ffcc00' : '#8F93A0', }}>Referral</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                      <View style={{ marginHorizontal: 0, marginTop: 20, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>

                        <TouchableOpacity onPress={() => { setChecked('Other') }}>
                          <View style={{ marginLeft: -10, borderColor: ischecked == 'Other' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Other' ? '#ffcc00' : '#8F93A0', }}>Other</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Television / Radio') }}>
                          <View style={{ marginLeft: 10, borderColor: ischecked == 'Television / Radio' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 170, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Television / Radio' ? '#ffcc00' : '#8F93A0', }}>Television / Radio</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>

                    <View style={{ flex: 0.8, flexDirection: 'column', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => {

                        if (userbirthday == '') {
                          setMsg(true)
                        }
                        else {
                          setMsg(false)
                        }

                        if (valuecountry == "") {
                          setMsgCountry(true)
                        }
                        else if (valuecountry != "") { setMsgCountry(false) }

                        handleSubmit(values);


                      }}
                        disabled={!isValid}>
                        <View style={{ marginTop: 30, borderRadius: 50, width: 150, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 16, color: 'white', }}>Next</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => { gotoLogin() }}>
                        <View style={{ marginTop: 10, borderRadius: 25, width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white', }}>Already have an account ?</Text>
                        </View>
                      </TouchableOpacity>
                    </View>



                  </View>
                )}
              </Formik>

              {RegisteredPopUp ?
                (<Modal
                  animationType="slide"
                  transparent={true}
                  visible={RegisteredPopUp}
                  onRequestClose={() => {

                    setRegisteredPopUp(false);
                  }}
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(140, 141, 142, 0.7)',
                  }}>
                    <View style={{
                      margin: 2,
                      backgroundColor: "white",
                      borderRadius: 20,
                      paddingTop: 30,
                      // padding: 15,
                      alignItems: "center",
                      shadowColor: "#000",
                      width: "100%",
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5
                    }}>

                      <View style={{
                        // backgroundColor: 'red',
                        height: 160,
                        width: "98%",
                        // marginHorizontal: 10,
                        marginTop: 60,
                        // marginHorizontal: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                        alignItems: 'center',
                        flexDirection: 'column',

                      }}>

                        <View style={{
                          height: 10, justifyContent: "center", alignItems: 'center', flexDirection: 'row',
                        }}>

                          <View style={{
                            width: 60, height: 60, backgroundColor: 'white', marginTop: -70, borderRadius: 60 / 2
                          }}>
                            <TouchableOpacity>

                              <Image source={require('../assets/yellowcheck.png')}
                                style={{
                                  width: 60,
                                  height: 60, alignSelf: 'center'
                                }} />
                            </TouchableOpacity>
                          </View>



                        </View>

                        <Text style={{ marginTop: 15, marginLeft: 10, textAlign: 'center', fontSize: 18, color: 'black' }}>Successfully Registered</Text>
                        <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: 'black', }}>It is a long established fact that a reader will be distracted by
                          The readable of a page when looking its layout.
                        </Text>
                        <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 30 }}>
                          <TouchableOpacity onPress={() => { gotoLogin() }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 110, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                              <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Next</Text>

                            </View>
                          </TouchableOpacity>
                        </View>



                      </View>

                    </View>
                  </View>
                </Modal>)
                :
                null
              }
            </View>)
          :
          (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 400 }}>
            <ActivityIndicator size="large" color="#ffcc00" />
          </View>)}

      </ScrollView>
    </SafeAreaView>
  )
};

export default React.memo(Signup);


