import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, SafeAreaView, Modal, Button, ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import style from '../../Routes/style';
import * as yup from 'yup';
import { Formik } from 'formik';
import MenuFieldState from '../../Screens/Menuinput/State/index';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Textinput from '../CommonTextInput/TextInput/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarModal from './CalendarModal';
import moment from 'moment';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Signup = (props, navigation) => {

  const { t } = useTranslation();
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
  const [Countrycode, setCountrycode] = useState('');
  // console.log("....COUNTRY CODE::", valuecountry); 
  // console.log("COUNTRY-codename::", Countrycode);
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

  const Firstnamevld = t('Enter_firstname');
  const Lastnamevld = t('Enter_lastname');
  const Usernamevld = t('Set_any_username');
  const Emailvld = t('Enter_validemail_id');
  const Zipcode_minvld = t('Zipcode_validation_minimun_msg');
  // const Zipcode_maxvld = t('ZIP code minimum length 4-digits and maximum 10-digits');
  const zipvld = t('Enter_ZipCode_signup');
  const paswdvld = t('Password_length_greater_than_8_characters');
  const paswdminvld = t('Your_password_short_minimum_8characters');
  const cnfmpswdvld = t('Confirm_password_required');
  const cnfmpswdmsg = t('Password_confirm_password_does_not_match');

  const [isToggle, setToggle] = useState(false)
  const [secureText, setSecureText] = useState(true)

  // console.log("passs", isToggle)

  const showPass = () => {
    setToggle(true)
    setSecureText(false)
  }
  const hidePass = () => {
    setToggle(false)
    setSecureText(true)
  }
  const [isToggle1, setToggle1] = useState(false)
  const [secureText1, setSecureText1] = useState(true)

  // console.log("passs", isToggle)

  const showPass1 = () => {
    setToggle1(true)
    setSecureText1(false)
  }
  const hidePass1 = () => {
    setToggle1(false)
    setSecureText1(true)
  }
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
    SelectCountry()
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
    // console.log("....COUNTRY CODE::", valuecountry);
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
      // address_1: values?.address1,
      // address_2: values?.address2,
      country_code: Countrycode,
      state: valuestate,
      city: valuecity,
      // address: values?.address_type,
      // address: "",
      zipcode: values?.zip_code,
      about_us: ischecked,
      password: values?.passwords,
      c_password: values?.cfm_password,
    };
    console.log(".......userInputdata", data);
    setIsLoading(true);
    axios({
      url: API.SIGN_UP,
      method: 'POST',
      data: data,

    })
      .then(function (response) {
        // console.log("responsesignup :", response?.data);
        if (response.data.status == 1) {
          setRegisteredPopUp(true);
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          Alert.alert(t('All_the_fields_are_required'), '')
        }

      })
      .catch(function (error) {
        Alert.alert("", t('Check_internet_connection'))
        // Alert.alert('', 'Something went wrong please exit the app and try again');
        console.log("Signup_error:", error);
        setIsLoading(false);
      })
  };

  //console.log("valuecountry..........", valuecountry);

  const SelectCountry = async () => {

    // console.log("valuecountryInner..........", valuecountry);
    // const country_code = valuecountry;
    setLoading(true);
    // setIsLoading(true);
    try {
      const response = await axios.get(`${API.GET_COUNTRY}`);
      // console.log("Countryresponse ::::", response.data.data);
      setCountryitems(response.data.data)
      // console.log(setCountryitems);
      // setIsLoading(false)
      // setLoading(false)
      if (response.data.status == 1) {
        // console.log(".......statsus", response.data.status);
        // if (response.data.data.id == valuecountry) {
        //   setSelectedcountrycode(response.data.data.code)
        // } else {
        //   Alert.alert('', 'Something went wrong please exit the app and try again');
        // }
        // setIsLoading(false);
        // setLoading(false)
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        // setIsLoading(false);
        // setLoading(false)
      }
    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("Countryerror:", error.response.data.message);
      setAlertVisibility(false);
      // setLoading(false)
    }
    setLoading(false)
  };

  const SelectState = async () => {

    // console.log("valuestate_id>:::", valuecountry);
    const country_id = valuecountry;
    // console.log("state.....", country_id);
    setLoading(true);
    // setIsLoading(true);
    try {
      const response = await axios.post(`${API.SIGIN_SELECT_STATE}`, { country_id });
      // console.log("responseState:::::", response.data.data);

      // setIsLoading(false)

      if (response.data.status == 1) {
        // console.log(".......Response_State_status", response.data.status);
        setStateitems(response.data.data)
        // setIsLoading(false);
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        // setIsLoading(false);
      }
    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("emailerror:", error.response.data.message);
      // setIsLoading(false);
      setAlertVisibility(false);
    }
    setLoading(false)
  };

  const SelectCity = async () => {

    // console.log("valuestate_id>>>>", valuestate);
    const state_id = valuestate;
    // console.log("state.....", state_id);
    setLoading(true);
    // setIsLoading(true)
    try {
      const response = await axios.post(`${API.SELECT_CITY}`, { state_id });
      // console.log("responseCity ::::", response.data.data);

      // setIsLoading(false)

      if (response.data.status == 1) {
        // console.log(".......Response_State_status", response.data.status);
        setCityitems(response.data.data)
        // setIsLoading(false);
        setAlertVisibility(false);
      }
      else if (response.data.status == 0) {
        setAlertMsg(response.data.data.Message);
        setMsgAlert(true);
        // setIsLoading(false);
      }
    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // console.log("emailerror:", error.response.data.message);

      setAlertVisibility(false);
    }
    setLoading(false)
  };

  const gotologin_signuppage = () => {
    props.navigation.navigate("MobileNo")
    // props.navigation.goBack()
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
            // <KeyboardAvoidingView style={{ flex: 1 }}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                  <Text style={{ textAlign: 'justify', fontSize: 20, color: 'white' }}>{t('Please_Enter_Your_Basic_Details')}</Text>
                </View>
              </View>

              <Formik
                initialValues={{
                  first_Name: '',
                  last_Name: '',
                  birthday: '',
                  type_your_username: '',
                  email: '',
                  // address1: '',
                  // address2: '',
                  zip_code: '',
                  country: '',
                  state: '',
                  city: '',
                  // address_type: '',
                  passwords: '',
                  cfm_password: '',

                }}
                onSubmit={values => FormUpdate(values)}

                validationSchema={yup.object().shape({
                  first_Name: yup
                    .string()
                    .required(Firstnamevld),
                  last_Name: yup
                    .string()
                    .required(Lastnamevld),
                  birthday: yup
                    .string(),
                  type_your_username: yup
                    .string()
                    // .min(4, "Username  must be at least 4 characters")
                    .required(Usernamevld),
                  email: yup
                    .string()
                    .email()
                    .required(Emailvld),
                  // address1: yup
                  //   .string(),
                  // address2: yup
                  //   .string(),
                  zip_code: yup
                    .string()
                    .min(4, Zipcode_minvld)
                    .max(10, Zipcode_minvld)
                    .required(zipvld),
                  country: yup
                    .string(),
                  state: yup
                    .string(),
                  city: yup
                    .string(),
                  // address_type: yup
                  //   .string(),
                  passwords: yup
                    .string()
                    .required(paswdvld)
                    .min(8, paswdminvld),
                  // .max(16, 'Your password should not  be more then   *'),
                  cfm_password: yup
                    .string()
                    .required(cnfmpswdvld)
                    .oneOf([yup.ref('passwords')], cnfmpswdmsg)
                })}
              >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <View style={{
                    height: 1100, justifyContent: "flex-start", alignItems: "center", paddingTop: 10
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
                            placeholder={t('First_Name')}
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
                            placeholder={t('Last_Name')}
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
                            placeholder={t('Date_of_birth')}
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
                          }}>{t('Select_DOB')} *</Text>
                          : <></>}

                      </View>

                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder={t('Username')}
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
                            placeholder={t('Email')}
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

                      {/* <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder='Address Line 1'
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'

                          value={values.address1}
                          onChangeText={handleChange('address1')}
                          onBlur={() => setFieldTouched('address1')}
                        />
                       
                      </View> */}
                      {/* 
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
                        {touched.type_your_username && errors.type_your_username &&
                      <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.type_your_username}</Text>
                    }
                      </View> */}
                      <View style={{ flexDirection: 'column', marginTop: 8 }}>
                        <TextInput
                          style={style.textInput}
                          placeholder={t('Zip_Pin_Code')}
                          autoCapitalize="none"
                          placeholderTextColor='#8F93A0'
                          fontWeight='normal'
                          keyboardType='number-pad'
                          maxLength={10}
                          value={values.zip_code}
                          onChangeText={handleChange('zip_code')}
                          onBlur={() => setFieldTouched('zip_code')}
                        />
                        {touched.zip_code && errors.zip_code &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 30, }}>{errors.zip_code}</Text>
                        }
                      </View>

                      <View style={{ width: 350, height: 50, zIndex: 3, marginTop: 18 }} >
                        <DropDownPicker
                          loading={loading}
                          onPress={() => SelectCountry()}
                          itemKey="value"
                          items={Countryitems.map((item, id) => ({ label: item?.name, value: item?.id, id: item?.code }))}
                          setItems={setCountryitems}
                          maxHeight={240}
                          dropDownDirection="BOTTOM"
                          placeholder={t('Country')}
                          itemStyle={{ justifyContent: 'flex-start' }}
                          textStyle={{
                            fontSize: 16
                          }}
                          on
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
                          // onChangeValue={(value) => {
                          //   console.log("yoyo value:",value,);
                          // }}
                          onSelectItem={(itm) => {
                             
                            setCountrycode(itm.id)
                            setMsgCountry(false)
                            console.log("yoyo item:", itm);
                          }}
                          // onChangeText={(item) => { setvaluecountry(item), setMsgCountry(false) ,console.log('item',item)}}
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
                        {
                          msgcountry ?
                            <View style={{ justifyContent: "center", alignItems: "flex-start", marginTop: 8, paddingLeft: 20, height: 30 }}>
                              <Text style={{
                                fontSize: 12,
                                color: '#FF0D10',

                              }}>Select Country *</Text>
                            </View>
                            : <></>}
                      </View>


                      <View style={{
                        width: 350,
                        height: 50, marginTop: 30, zIndex: 2
                      }}>
                        <DropDownPicker
                          placeholder={t('State')}
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
                          placeholder={t('City')}
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

                      <View style={{
                        marginTop: 29, justifyContent: 'flex-start', alignItems: 'flex-start', height: 70,
                      }}>
                        <View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50,
                        }}>
                          <TextInput
                            style={{
                              width: 350,
                              height: 50,
                              backgroundColor: 'white',
                              // marginTop: 15,
                              // padding: 8,
                              color: 'black',
                              borderRadius: 25,
                              borderColor: '#DFDDDD0D',
                              borderWidth: 1,
                              fontSize: 18,
                              fontSize: 16,
                              paddingHorizontal: 20,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                            // style={{
                            //   width: '88.5%',

                            //   justifyContent: 'center',
                            //   // alignItems: 'center', 
                            //   paddingLeft: 15,
                            //    color: "red",
                            //   fontSize: 18
                            // }}
                            //InputColor="red"
                            placeholder={t('Create_Password')}
                            autoCapitalize="none"
                            onBlur={() => setFieldTouched('passwords')}
                            placeholderTextColor='#8F93A0'

                            secureTextEntry={secureText}
                            isPass={false}
                            value={values.passwords}
                            onChangeText={handleChange('passwords')}
                          />

                          <View style={{ position: "absolute", right: 0, height: 50, justifyContent: "center", alignItems: "center", width: 30, }}>
                            {
                              isToggle == false ?
                                <TouchableOpacity onPress={() => showPass()}>
                                  <Image style={{ width: 25, height: 20, marginRight: 20 }} source={require('../assets/hide_eye.png')} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => hidePass()}>
                                  <Image resizeMode='contain' style={{ width: 30, height: 25, marginRight: 20 }} source={require('../assets/show_eye.png')} />
                                </TouchableOpacity>
                            }
                          </View>
                        </View>

                        {
                          touched.passwords && errors.passwords &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 10, marginTop: 4 }}>{errors.passwords}</Text>
                        }

                      </View>


                      <View style={{
                        marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', height: 60,
                      }}>
                        <View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50,
                        }}>
                          <TextInput
                            style={{
                              width: 350,
                              height: 50,
                              backgroundColor: 'white',
                              // marginTop: 15,
                              // padding: 8,
                              color: 'black',
                              borderRadius: 25,
                              borderColor: '#DFDDDD0D',
                              borderWidth: 1,
                              fontSize: 18,
                              fontSize: 16,
                              paddingHorizontal: 20,
                              justifyContent: "center",
                              // alignItems:"center"
                            }}
                            // style={{
                            //   width: '88.5%',
                            //   justifyContent: 'center',
                            //   //  alignItems: 'center', 
                            //   paddingLeft: 15, color: "red",
                            //   fontSize: 18, marginTop: 15,
                            // }}
                            // InputColor="red"
                            placeholder={t('Confirm_Password')}
                            autoCapitalize="none"
                            onBlur={() => setFieldTouched('cfm_password')}
                            placeholderTextColor='#8F93A0'

                            secureTextEntry={secureText1}
                            isPass={false}
                            value={values.cfm_password}
                            onChangeText={handleChange('cfm_password')}
                          />
                          <View style={{ position: "absolute", right: 0, height: 50, justifyContent: "center", alignItems: "center", width: 30, }}>
                            {
                              isToggle1 == false ?
                                <TouchableOpacity onPress={() => showPass1()}>
                                  <Image style={{ width: 25, height: 20, marginRight: 20 }} source={require('../assets/hide_eye.png')} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => hidePass1()}>
                                  <Image resizeMode='contain' style={{ width: 30, height: 25, marginRight: 20 }} source={require('../assets/show_eye.png')} />
                                </TouchableOpacity>
                            }
                          </View>
                        </View>
                        {
                          touched.cfm_password && errors.cfm_password &&
                          <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 10, marginTop: 8 }}>{errors.cfm_password}</Text>
                        }
                      </View>

                    </View>
                    <View style={{
                      marginTop: 1
                    }}>

                      <Text style={{ marginTop: 30, marginLeft: 2, textAlign: 'left', fontSize: 17, color: 'white', }}>{t('How_did_you_hear_aboutus')}</Text>


                      <View style={{ marginHorizontal: 1, marginTop: 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <TouchableOpacity onPress={() => { setChecked('Internet') }}>
                          <View style={{ borderColor: ischecked == 'Internet' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center', marginHorizontal: 0 }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Internet' ? '#ffcc00' : '#8F93A0', }}>{t('Internet')}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Newspaper / Magazine') }}>
                          <View style={{ borderColor: ischecked == 'Newspaper / Magazine' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 170, height: 45, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Newspaper / Magazine' ? '#ffcc00' : '#8F93A0', }}>{t('Newspaper_Magazine')}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Referral') }}>
                          <View style={{ borderColor: ischecked == 'Referral' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Referral' ? '#ffcc00' : '#8F93A0', }}>{t('Referral')}</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                      <View style={{ marginHorizontal: 0, marginTop: 20, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>

                        <TouchableOpacity onPress={() => { setChecked('Other') }}>
                          <View style={{ marginLeft: -10, borderColor: ischecked == 'Other' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 80, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Other' ? '#ffcc00' : '#8F93A0', }}>{t('Other')}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setChecked('Television / Radio') }}>
                          <View style={{ marginLeft: 10, borderColor: ischecked == 'Television / Radio' ? '#ffcc00' : '#8F93A0', borderWidth: 1, borderRadius: 25, width: 170, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: ischecked == 'Television / Radio' ? '#ffcc00' : '#8F93A0', }}>
                              {t('Television_Radio')}
                            </Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>

                    <View style={{ flex: 0.8, flexDirection: 'column', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => {
                        handleSubmit(values)
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
                      }}
                        disabled={!isValid}>
                        <View style={{ marginTop: 30, borderRadius: 50, width: 150, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 16, color: 'white', }}>{t('Next')}</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => { gotoLogin() }}>
                        <View style={{ marginTop: 10, borderRadius: 25, width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white', }}>{t('Already_have_an_account')}</Text>
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

                        <Text style={{ marginTop: 15, marginLeft: 10, textAlign: 'center', fontSize: 18, color: 'black' }}>{t('Successfully_Registered')}</Text>
                        <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: 'black', }}>{t('Signuppopup_msg')}
                        </Text>
                        <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 30 }}>
                          <TouchableOpacity onPress={() => { gotoLogin() }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 110, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                              <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>{t('Next')}</Text>

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
            </View>

          )
          :
          (<CustomLoader showLoader={isLoading} />
            // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 400 }}>
            //   <ActivityIndicator size="large" color="#ffcc00" />
            // </View>
          )}

      </ScrollView>
    </SafeAreaView>
  )
};

export default React.memo(Signup);


