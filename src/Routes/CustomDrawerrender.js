import 'react-native-gesture-handler';
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions, Modal, ActivityIndicator, BackHandler, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect } from 'react';
import { API } from '../Routes/Urls';
import axios from 'axios';
import { resolvePlugin } from '@babel/core';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const CustomDrawerrender = (props) => {

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

  useEffect(() => {

    if (!check) {
      getusertoken();

    }
    const backAction = () => {
      BackHandler.exitApp()
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

  }, [props]);

  const getusertoken = async () => {
    const usertoken = await AsyncStorage.getItem("authToken");
    // console.log(".....drawer profiletoken get::", usertoken);
    setuserprofile(usertoken);
    setloginbtn(usertoken);
    GetProfile();
  }
  const buttonClickedHandler = () => {
    props.navigation.goBack();
  }

  const gotologin_signuppage = () => {
    props.navigation.navigate("LoginMain")
  }

  const GetProfile = async () => {

    // console.log(".....usertoken.....ProfileIN...", userprofile);
    // setIsLoading(true)
    if (userprofile != null) {
      setIsLoading(true)
      try {
        const response = await axios.get(`${API.GET_PROFILE}`, { headers: { "Authorization": ` ${userprofile}` } });
        // console.log("", response);
        // console.log("ResponseProfile ::::", response.data.status);
        if (response.data.status == 1) {
          setprofiledata(response.data.data)
          // console.log("User_token_not_received+yet!!!>>>", response.data.data.first_name);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }

      }
      catch (error) {
        console.log("GET User Profile in drawer error:", error.response.data.message);
        setIsLoading(false)
      }

    };
  };

  const GetContactUs = async () => {

    const data = {
      name: UserName,
      email: Useremail,
      message: Typemessage
    }
    console.log("........contactus", data);
    // setIsLoading(true);
    // setContactUs(true);
    try {
      const response = await axios.post(`${API.CONTACT_US}`, data)
      console.log("response_contactus ::::", response.data);
      if (response.data.status == 1) {
        setContactUs(false);
        props.navigation.navigate("Home");
        setUserName = "";
        setUseremail = "";
        setTypemessage = "";
        setIsLoading(false);
        setcheck(false)
      }
      else {
        setIsLoading(false);
        setcheck(false)
      }

    } catch (error) {
      console.log("error_ContactUs:", error.response.data.message);
      setIsLoading(false);
      setcheck(false)
    }

  };

  return (
    <SafeAreaView style={{
      flex: 1,
      height: "100%",
      width: "100%",
      flexGrow: 1,
      backgroundColor: '#000000',
    }} >
      {!isLoading ?
        (<>
          <TouchableOpacity onPress={() => { buttonClickedHandler() }}>
            <View style={{
              height: 60,
              left: 10,
              width: "20%",
              justifyContent: 'center',
            }}>
              <Image source={require('../Screens/assets/cancelWhite.png')}
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 5, left: 10
                }}
              />

            </View>
          </TouchableOpacity>


          {
            userprofile == null ?
              (<View style={{ borderRadius: 20, backgroundColor: 'white', marginHorizontal: 20, height: 100, flexDirection: 'row', marginTop: 30 }}>
                <View style={{ justifyContent: 'center', width: 100, height: 100 }} >
                  <Image resizeMode="contain" 
                  source={require('../Screens/assets/AvatarImg.png')}
                    style={{
                      width: 70,
                      height: 70, alignSelf: 'center',
                    }} />
                </View>

                <TouchableOpacity onPress={() => gotologin_signuppage()} style={{ justifyContent: 'center', flex: 1, height: 100, }} >
                  <Text style={{ fontSize: 14, color: 'black', textAlign: 'left' }}>User's Login</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'flex-end', flex: 1 / 2, width: 50, borderBottomRightRadius: 20 }}>
                  <Image source={require('../Screens/assets/arrowWhiteBack.png')}
                    style={{
                      width: 40,
                      height: 30, borderBottomRightRadius: 20, alignSelf: 'flex-end'
                    }} />
                </View>
              </View>)
              :
              (<TouchableOpacity onPress={() => {
                props.navigation.navigate("MyProfile")
                }}>
                <View style={{ borderRadius: 20, backgroundColor: 'white', marginHorizontal: 20, height: 100, flexDirection: 'row', marginTop: 30 }}>
                  <View style={{ justifyContent: 'center', width: 100, height: 100 }} >
                    <Image
                      source={{ uri: profiledata.user_profile }}
                      resizeMode="contain"
                      style={{
                        width: 80,
                        height: 80, alignSelf: 'center', borderRadius: 80 / 2, borderColor: "#383838", borderWidth: 1
                        , backgroundColor: "black"
                      }} />
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1.1, height: 100, }} >
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'left' }}>{profiledata.first_name + " " + profiledata.last_name}</Text>
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
            <View style={{ marginBottom: 20, marginTop: 20, marginHorizontal: 15, height: "95%", backgroundColor: '#000000' }} >

              <TouchableOpacity onPress={() => props.navigation.navigate("HomeBottomTab")} >
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50 }} >
                    <Image source={require('../Screens/assets/menu1.png')}
                      style={{
                        width: 20,
                        height: 20, marginLeft: 5
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ width: 50, height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Home</Text>
                    </View>
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
                      <View style={{ height: 30, width: 100 }} >
                        <View style={{ width: 100, height: 30, marginLeft: -10 }} >
                          <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>My Order</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>)
                  :
                  (null)

              }
              <TouchableOpacity onPress={() => { props.navigation.navigate("TrainingBottomTab") }}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50,marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu2.png')}
                      style={{
                        width: 20,
                        height: 20, 
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Training</Text>
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
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Shop</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("BlogBottomTab")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50 ,marginLeft: 5}} >
                    <Image source={require('../Screens/assets/menu4.png')}
                      style={{
                        width: 22,
                        height: 20, 
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Blogs</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("TermsAndCondition")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50,marginLeft: 5 }} >
                    <Image source={require('../Screens/assets/menu5.png')}
                      style={{
                        width: 20,
                        height: 20, 
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Terms & Condition</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("CancellationPolicy")}>
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
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Cancellation Return Policy </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("RefundPolicy")}>
                <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
                  <View style={{ width: 50, height: 50 ,marginLeft: 5}} >
                    <Image source={require('../Screens/assets/menu7.png')}
                      style={{
                        width: 20,
                        height: 20, 
                      }} />
                  </View>
                  <View style={{ height: 50 }} >
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Refund Policy</Text>
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
                    <View style={{ height: 50, marginLeft: -10 }} >
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Contact Us</Text>
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
                      <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>About Us</Text>
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
                          <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>Logout</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>)
                  :
                  (null)

              }
            </View>
          </ScrollView>
          {ContactUs ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={ContactUs}
              onRequestClose={() => {
                setContactUs(false);
                setcheck(false)
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'rgba(140, 141, 142, 0.7)',

                }}>
                <ScrollView>
                  <View
                    style={{
                      marginTop: 385,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      //  margin: 10,
                      // marginHorizontal:0,
                      // height:"100%",
                      width: "100%",
                      alignItems: 'center',
                      justifyContent: "flex-end",
                      // alignContent:"flex-end",
                      alignSelf: "flex-end",
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 6,
                    }}>

                    <View style={{
                      // marginHorizontal: 15,
                      borderRadius: 20,
                      backgroundColor: 'white',
                      //marginTop: 150,
                      borderColor: "white",
                      borderWidth: 1,
                      height: "100%",
                      width: "100%",
                      padding: 10,
                      alignItems: 'center',
                      // justifyContent:"center",
                    }}>
                      <TouchableOpacity onPress={() => { setContactUs(false) }}
                        style={{ position: "absolute", width: 30, backgroundColor: 'red', borderRadius: 35, height: 35, right: 10, top: 10 }}>
                        <Image
                          source={require('../Screens/assets/cancelWhite.png')}
                          style={{
                            width: 35,
                            height: 35, alignSelf: 'center'
                          }}

                        />
                      </TouchableOpacity>
                      <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>


                        <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
                          <Image source={require('../Screens/assets/contactUs.png')}
                            style={{
                              width: 20,
                              height: 20, alignSelf: 'center'
                            }} />

                        </View>
                        <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 17, color: 'black', }}>Contact Us</Text>

                      </View>



                      <View style={{
                        marginTop: 30, borderRadius: 25, marginHorizontal: 20,
                        flexDirection: 'row',
                        height: 45,
                        shadowColor: '#11032586',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        // backgroundColor: 'red', 
                        justifyContent: "center",
                      }}
                      >
                        <TextInput
                          placeholder="Name"
                          value={UserName}
                          onChangeText={(text) => setUserName(text)}
                          fontWeight='normal'
                          placeholderTextColor='#D7D7D7'
                          style={{
                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                            fontSize: 14
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
                        />
                      </View> */}
                      <View style={{
                        marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                        height: 45,
                        shadowColor: '#11032586',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        justifyContent: "center", alignItems: 'center'
                      }}
                      ><TextInput
                          placeholder="Please Enter Your Email ID"
                          value={Useremail}
                          //editable={!isLoading}
                          onChangeText={(text) => setUseremail(text)}
                          keyboardType="email-address"
                          fontWeight='normal'
                          placeholderTextColor='#D7D7D7'
                          style={{
                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                            fontSize: 14
                          }} />


                      </View>
                      <View style={{
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginTop: 20,
                        borderColor: "#D7D7D7",
                        borderWidth: 1,
                        height: 140,
                        width: 300,
                        justifyContent: "center", alignItems: 'center'
                      }}>
                        <TextInput
                          placeholder="Type Message here"
                          value={Typemessage}
                          //editable={!isLoading}
                          onChangeText={(text) => setTypemessage(text)}
                          fontWeight='normal'
                          placeholderTextColor='#D7D7D7'
                          numberOfLines={10}
                          multiline={true}
                          textAlignVertical='top'
                          style={{
                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 6, color: "black",
                            fontSize: 14
                          }} />
                      </View>

                      <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
                        <TouchableOpacity onPress={() => {
                          GetContactUs()

                        }}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>Send OTP</Text>

                          </View>
                        </TouchableOpacity>
                      </View>

                    </View>

                  </View>
                </ScrollView>
              </View>
            </Modal>
          ) : <></>}
        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );

}
export default CustomDrawerrender;