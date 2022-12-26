import 'react-native-gesture-handler';
import React, { useState } from "react";
import {
  ScrollView, View, Text, TouchableOpacity, TextInput, Image, Dimensions, Modal, ActivityIndicator, BackHandler, SafeAreaView, Alert, KeyboardAvoidingView,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect } from 'react';
import { API } from '../Routes/Urls';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CustomDrawerrender = (props) => {
  const { t } = useTranslation();
  const [userprofile, setuserprofile] = useState("");
  const [loginbtn, setloginbtn] = useState("");

  const [ContactUs, setContactUs] = React.useState(false);
  const [UserName, setUserName] = useState("");
  const [Useremail, setUseremail] = useState("");
  const [Typemessage, setTypemessage] = useState("");
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState([]);
  const [profiledata, setprofiledata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setcheck] = useState(false);
  const [emailerrormsg, setemailerrormsg] = useState("");
  const [emailalert, setEmailAlert] = useState(false);
  useEffect(() => {
    if (!check) {
      const getusertoken = async () => {
        const usertoken = await AsyncStorage.getItem("authToken");
        setuserprofile(usertoken);
        setloginbtn(usertoken);
        if (usertoken != "") {
          GetProfile();
        }

        else {
          console.log("drawerlogin else part call");
          // GetProfile();
        }

      }

      getusertoken()
    }
    const backAction = () => {
      Alert.alert(t('Hold_on'), t('Are_you_sure_you_want_back'), [
        {
          text: t('Cancel'),
          onPress: () => null,
          style: "cancel"
        },
        { text: t('Yes'), onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

    //  getusertoken();
    // GetProfile();
    // const unsubscribe = props.navigation.addListener('focus', () => {

    //   // getusertoken();
    //   // GetProfile();

    // });
    // return unsubscribe;

  }, []);


  const buttonClickedHandler = () => {
    props.navigation.goBack()
  }

  const gotologin_signuppage = () => {
    props.navigation.navigate("LoginMain")
  }

  const GetProfile = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.get(`${API.GET_PROFILE}`, { headers: { "Authorization": ` ${Token}` } });
      // console.log("response profile", response);
      // console.log("ResponseProfile ::::", response.data.status);
      if (response.data.status === 1) {
        setprofiledata(response.data.data)
        // console.log("User_token_not_received+yet!!!>>>", response.data.data.first_name);
        // setIsLoading(false);
      }
      // else if (response.data.status === 0) {
      //   Alert.alert('error', 'Something went wrong, Please exit the app and try again');
      //   setIsLoading(false);
      // }

    }
    catch (error) {
      // Alert.alert("profile","Internet connection appears to be offline. Please check your internet connection and try again.")
      // Alert.alert('drawer', 'Something went wrong please exit the app and try again');
      // console.log("GET User Profile in drawer error:", error.response.data.message);

    }
    setIsLoading(false)

  };

  const Emailvalidaton = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setemailerrormsg("Email is Not Correct")
      // console.log("Email is Not Correct");
      setEmailAlert(true)
      setUseremail(text)
      return false;
    }
    else {
      setUseremail(text)
      setEmailAlert(false)
      // console.log("Email is Correct");
    }
  }
  const GetContactUs = async () => {


    if (UserName && Useremail != null) {

      const data = {
        name: UserName,
        email: Useremail,
        message: Typemessage
      }
      // console.log("........contactus", data);
      // setIsLoading(true);
      // setContactUs(true);
      try {
        const response = await axios.post(`${API.CONTACT_US}`, data)
        // console.log("response_contactus ::::", response.data);
        // console.log("contactus-Status ::::", response.data.status);
        if (response.data.status == '1') {
          Alert.alert('', t('Your_will_contact_shortly'))
          // console.log("response_contactus ::::", response.data);
          setContactUs(false);
          setIsLoading(false);
          setUserName("")
          setUseremail("")
          setTypemessage("")
          setcheck(false);

          // props.navigation.navigate("Home");
        }
        else if (response.data.status == '0') {
          setUserName("")
          setUseremail("")
          setTypemessage("")
          setIsLoading(false);
          setcheck(false);
          Alert.alert('', t('Error_msg'));
        }
        else {
          setIsLoading(false);
        }

      } catch (error) {
        // Alert.alert("",t('Check_internet_connection'))
        // Alert.alert('', 'Something went wrong please exit the app and try again');
        // console.log("error_ContactUs:", error.response.data.message);
        setIsLoading(false);
        setcheck(false)
      }
    } else return Alert.alert('', t('All_the_fields_are_required'));
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      // height: "100%",
      // width: "100%",
      flexGrow: 1,
      backgroundColor: '#000000',
    }} >
      {!isLoading ?
        (<>
          <View style={{
            height: 60, width: "100%", flexDirection: "row", justifyContent
              : "space-between"
          }}>

            <TouchableOpacity onPress={() => { buttonClickedHandler() }}
              style={{
                height: 50,
                left: 10,
                width: "20%",
                justifyContent: 'center',
                marginTop: 10,

              }}>
              <Image source={require('../Screens/assets/cancelWhite.png')}
                style={{
                  width: 30,
                  height: 30,
                  left: 10
                }}
              />


            </TouchableOpacity>

            <View style={{ width: 50, height: 34, alignItems: 'flex-end', justifyContent: 'flex-end', right: 10, marginTop: 10, }}>
              <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 13, color: '#ffcc00', fontWeight: "400" }}>V <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 13, color: '#ffcc00', fontWeight: "400" }}>1.01</Text></Text>
            </View>
          </View>
          {
            userprofile == null ?
              (<TouchableOpacity onPress={() => gotologin_signuppage()}
                style={{ borderRadius: 20, backgroundColor: 'white', marginHorizontal: 20, height: 100, flexDirection: 'row', marginTop: 20, marginRight: 27, }}>
                <View style={{ justifyContent: 'center', width: 100, height: 100 }} >
                  <Image resizeMode="contain"
                    source={require('../Screens/assets/AvatarImg.png')}
                    style={{
                      width: 70,
                      height: 70, alignSelf: 'center',
                    }} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, height: 100 }} >
                  <Text style={{ fontSize: 14, color: 'black', textAlign: 'left', fontWeight: "500" }}>{t('Users_Login')}</Text>
                </View>

                <View style={{ justifyContent: 'flex-end', flex: 1 / 2, width: 50, borderBottomRightRadius: 20 }}>
                  <Image source={require('../Screens/assets/arrowWhiteBack.png')}
                    style={{
                      width: 40,
                      height: 30, borderBottomRightRadius: 20, alignSelf: 'flex-end'
                    }} />
                </View>
              </TouchableOpacity>)
              :
              (<TouchableOpacity onPress={() => {
                props.navigation.navigate("MyProfile")
              }}>
                <View style={{ borderRadius: 20, backgroundColor: 'white', marginHorizontal: 20, height: 100, flexDirection: 'row', marginTop: 20, marginRight: 27, }}>
                  <View style={{ justifyContent: 'center', width: 100, height: 100 }} >
                    {profiledata.user_profile != "" ?
                      <Image
                        source={{ uri: profiledata?.user_profile != "" ? `${profiledata.user_profile}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                        resizeMode="contain"
                        style={{
                          width: 80,
                          height: 80, alignSelf: 'center', borderRadius: 80 / 2, borderColor: "#383838", borderWidth: 1
                          , backgroundColor: "black"
                        }} />
                      :
                      <Image
                        source={require('../Screens/assets/AvatarImg.png')}
                        resizeMode="contain"
                        style={{
                          width: 80,
                          height: 80, alignSelf: 'center', borderRadius: 80 / 2, borderColor: "#383838",
                        }} />
                    }
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1.1, height: 100, }} >
                    <Text numberOfLines={2} style={{ fontSize: 15, color: 'black', textAlign: 'left' }}>{profiledata.first_name + " " + profiledata.last_name}</Text>
                  </View>
                  <View style={{ justifyContent: 'flex-end', flex: 1 / 2, width: 50, borderBottomRightRadius: 20, }}>
                    <Image source={require('../Screens/assets/arrowWhiteBack.png')}
                      style={{
                        width: 40,
                        height: 30, borderBottomRightRadius: 20, alignSelf: 'flex-end'
                      }} />
                  </View>
                </View>
              </TouchableOpacity>)
          }
          <ScrollView>
            <View style={{ marginBottom: 20, marginTop: 10, marginHorizontal: 15, height: "95%", backgroundColor: '#000000' }} >

              <TouchableOpacity onPress={() => props.navigation.navigate("HomeBottomTab")} >
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30, }}>
                  <View style={{ width: 50, height: 50 }} >
                    <Image source={require('../Screens/assets/menu1.png')}
                      style={{
                        width: 20,
                        height: 20, marginLeft: 5
                      }} />
                  </View>
                  <View style={{ height: 50,}} >
                    <View style={{  height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Home')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {
                loginbtn != null ?
                  (<TouchableOpacity onPress={() => props.navigation.navigate("SubscriptionPlan")} >
                    <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                      <View style={{ width: 50, height: 50 }} >
                        <Image resizeMode='contain'
                          source={require('../Screens/assets/subscribeicon.png')}
                          style={{
                            width: 22,
                            height: 22, marginLeft: 5
                          }} />
                      </View>
                      <View style={{ height: 30, width: 100 }} >
                        <View style={{ width: 110, height: 30, marginLeft: -10 }} >
                          <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Subscriptions')}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>)
                  :
                  <></>

              }
              <TouchableOpacity onPress={() => props.navigation.navigate("Selector")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/Lngchoose.png')}
                      style={{
                        width: 22,
                        height: 22,
                      }} />
                  </View>

                  <View style={{ height: 50, marginLeft: -14,  }} >
                    <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Choose_Language')}</Text>
                  </View>

                </View>
              </TouchableOpacity>
              {
                loginbtn != null ?
                  (<TouchableOpacity onPress={() => props.navigation.navigate("MyOrder")} >
                    <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                      <View style={{ width: 50, height: 50 }} >
                        <Image resizeMode='contain'
                          source={require('../Screens/assets/bag1.png')}
                          style={{
                            width: 20,
                            height: 20, marginLeft: 5
                          }} />
                      </View>
                      <View style={{ height: 30, }} >
                        <View style={{   height: 30, marginLeft: -10 }} >
                          <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('My_Order')}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>)
                  :
                  (null)

              }
              <TouchableOpacity onPress={() => props.navigation.navigate("Recipecategory")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 4 }} >
                    <Image resizeMode='contain'
                      source={require('../Screens/assets/Recipesicon.png')}
                      style={{
                        width: 23,
                        height: 24,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Recipes')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { props.navigation.navigate("TrainingBottomTab") }}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu2.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Training')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("ShopBottomTab")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu3.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Shop')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("BlogBottomTab")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu4.png')}
                      style={{
                        width: 22,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Blogs')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => props.navigation.navigate("TermsAndCondition")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu5.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Terms & Conditions</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => props.navigation.navigate("CancellationPolicy")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5, }} >
                    <Image source={require('../Screens/assets/menu6.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} resizeMode="contain" />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Cancellation & Return Policy </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => props.navigation.navigate("RefundPolicy")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu7.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Privacy_Policy')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                props.navigation.goBack();
                setContactUs(true)
                setcheck(true)
              }}>

                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50, marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu8.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -14 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Contact_Us')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("AboutsUs")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50 }} >
                    <Image source={require('../Screens/assets/menu9.png')}
                      style={{
                        width: 20,
                        height: 20, marginLeft: 5
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('About_Us')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {
                loginbtn != null ?
                  (<TouchableOpacity onPress={() => {
                    AsyncStorage.removeItem('authToken');
                    // AsyncStorage.clear();
                    props.navigation.navigate("LoginMain");
                  }}>
                    <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                      <View style={{ width: 25, height: 23, marginLeft: 5 }} >
                        <Image source={require('../Screens/assets/logouts.png')}
                          style={{
                            width: 20,
                            height: 20,
                          }} />
                      </View>
                      <View style={{ height: 50 }} >
                        <View style={{ height: 50, marginLeft: 10 }} >
                          <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{t('Logout')}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>)
                  :
                  (null)

              }
            </View>
          </ScrollView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={ContactUs}
            onRequestClose={() => {
              setContactUs(false);
              setcheck(false)
            }}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View
                style={{
                  flex: 1,
                  // justifyContent: 'flex-end',
                  // alignItems: 'center',
                  backgroundColor: 'rgba(140, 141, 142, 0.7)',

                }}>
                <TouchableOpacity
                  onPress={() => {
                    setContactUs(false),
                      setcheck(false)
                  }}
                  style={{ flex: 1 }}
                />
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: "100%",
                    justifyContent: "flex-end",

                  }}>

                  <View style={{
                    height: 485,
                    width: "100%",
                    borderRadius: 20,

                    alignItems: 'center',
                    // backgroundColor: 'pink',
                    justifyContent: "center",
                  }}>
                    {/* <TouchableOpacity onPress={() => { setContactUs(false) }}
                        style={{ position: "absolute", width: 30, backgroundColor: 'red', borderRadius: 35, height: 35, right: 10, top: 10 }}>
                        <Image
                          source={require('../Screens/assets/cancelWhite.png')}
                          style={{
                            width: 35,
                            height: 35, alignSelf: 'center'
                          }}

                        />
                      </TouchableOpacity> */}
                    <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>


                      <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
                        <Image source={require('../Screens/assets/contactUs.png')}
                          style={{
                            width: 20,
                            height: 20, alignSelf: 'center'
                          }} />

                      </View>
                      <View style={{ marginLeft: 10, }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black', fontWeight: "500" }}>{t('Contact_Us')}</Text>
                      </View>


                    </View>



                    <View style={{
                      marginTop: 30, borderRadius: 25, marginHorizontal: 20,
                      flexDirection: 'row',
                      height: 45,
                      shadowColor: '#11032586',
                      // backgroundColor: 'white',
                      alignItems: 'center',
                      borderColor: "#D7D7D7",
                      borderWidth: 1,
                      // backgroundColor: 'red', 
                      justifyContent: "center",
                    }}
                    >
                      <TextInput
                        placeholder={t('Name')}
                        value={UserName}
                        onChangeText={(text) => setUserName(text)}
                        fontWeight='normal'
                        placeholderTextColor='#D7D7D7'
                        style={{
                          width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                          fontSize: 14, height: "100%"
                        }} />
                    </View>
                    {/* <View style={{ height: 50, marginHorizontal: 25, marginTop: 15 }}>
                        <DropDownPicker
                          items={[
                            { label: 'France', value: 'fr' },
                            { label: 'Spain', value: 'es' },
                            { label: 'India', value: 'In' },
                          ]}

                          backgroundColor='white'
                          //defaultNull
                          placeholder="Select Object"
                          placeholderTextColor='#D7D7D7'
                          itemStyle={{
                            justifyContent: 'flex-start'
                          }}
                          open={open}
                          setOpen={setOpen}
                          value={value}
                          setValue={setValue}
                          containerStyle={{ height: 40 }}

                          style={{
                            borderColor: '#D7D7D7', backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                            // shadowOffset: { width: 0, height: 2 },
                            // shadowOpacity: 0.2,
                            // elevation: 2,
                          }}
                        /
                      </View> */}
                    <View style={{
                      marginTop: 25, flexDirection: 'column', height: 65,
                      justifyContent: "flex-start", alignItems: 'flex-start'
                    }}>
                      <View style={{
                        borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                        height: 45,
                        shadowColor: '#11032586',
                        // backgroundColor: 'red',s
                        alignItems: 'center',
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        // justifyContent: "center", 
                        // alignItems: 'center'
                      }}
                      ><TextInput
                          placeholder={t('Please_Enter_Your_Email_ID')}
                          value={Useremail}
                          //editable={!isLoading}
                          onChangeText={(text) => Emailvalidaton(text)}
                          keyboardType="email-address"
                          fontWeight='normal'
                          autoCorrect={false}
                          placeholderTextColor='#D7D7D7'
                          style={{
                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                            fontSize: 14, height: "100%"
                          }} />


                      </View>
                      {
                        emailalert ?
                          (<View style={{ justifyContent: "center", marginHorizontal: 30, }}><Text style={{ color: "red", fontSize: 12, }}>{emailerrormsg}</Text></View>)
                          :
                          (null)
                      }
                    </View>
                    <View style={{
                      borderRadius: 20,
                      // backgroundColor: 'white',
                      marginTop: 10,
                      borderColor: "#D7D7D7",
                      borderWidth: 1,
                      height: 160,
                      width: '85%',
                      marginHorizontal: 20,
                      justifyContent: "center",
                      alignItems: 'center'
                    }}>
                      <TextInput
                        placeholder={t('Type_Message_here')}
                        value={Typemessage}
                        //editable={!isLoading}
                        onChangeText={(text) => setTypemessage(text)}
                        fontWeight='normal'
                        placeholderTextColor='#D7D7D7'
                        numberOfLines={7}
                        multiline={true}
                        textAlignVertical='top'
                        style={{
                          width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 6, color: "black",
                          fontSize: 14, height: "100%"
                        }} />
                    </View>

                    <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 30 }}>
                      <TouchableOpacity onPress={() => {
                        GetContactUs()

                      }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 120, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>

                          <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>{t('Send')}</Text>

                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>

              </View>
            </KeyboardAvoidingView>
          </Modal>

        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );

}
export default CustomDrawerrender;