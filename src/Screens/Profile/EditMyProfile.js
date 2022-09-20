import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import Headers from '../../Routes/Headers';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';

const EditMyProfile = (props) => {

  const [userprofile, setUserprofile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [email, setEmail] = useState("");
  const [EditMyProfilePopUp, setEditMyProfilePopUp] = React.useState(false);
  const [profileImage, setprofileImage] = useState('');

  const buttonClickedHandler = () => {
    setEditMyProfilePopUp(false)
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'MyProfile' }]
    })
  };

  const openLibrary = async () => {
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
      }).then(image => {
        setprofileImage(image);
        console.log(image);
      });
    } catch (error) {
      console.log('error in openLibrary', error);
    }
  };
  useEffect(() => {
    GetUserProfile();
  }, []);

  const Setuserdetails = (userprofile) => {
    console.log('====================================');
    console.log(userprofile?.first_name, userprofile?.last_name, userprofile?.phone, userprofile?.email);
    console.log('====================================');
    setFirstname(userprofile?.first_name),
      setLastname(userprofile?.last_name),
      setMobileno(userprofile?.phone),
      setEmail(userprofile?.email)

  }
  const GetUserProfile = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true)
    try {
      const response = await axios.get(`${API.GET_PROFILE}`, { headers: { "Authorization": ` ${usertkn}` } });
      // console.log("", response);
      // console.log("ResponseProfile ::::", response.data.status);
      if (response.data.status == 1) {
        setUserprofile(response.data.data);
        Setuserdetails(response.data.data);
        setIsLoading(false);
        // console.log("User_ordersdetails>>>", response.data.orders);
      } else {
        Alert.alert("something went wrong user Profile!")
        setIsLoading(false);
      }
    }
    catch (error) {
      console.log("GetUserProfile _Catch_error:", error.response.data.message);
      setIsLoading(false)
    }
  };

  const GetProfile = async () => {
    setIsLoading(true);
    const usertkn = await AsyncStorage.getItem("authToken");
    // console.log("Profile_Update ::::",usertkn);

    var formdata = new FormData();
    formdata.append("first_name", firstname);
    formdata.append("last_name", lastname);
    formdata.append("phone", mobileno);
    formdata.append("email", email);
     
if (profileImage != '') {
      const imageName = profileImage.path.slice(
        profileImage.path.lastIndexOf('/'),
        profileImage.path.length,

      );
      formdata.append('image', {
        name: imageName,
        type: profileImage.mime,
        uri: profileImage.path,
      });
    }
    try {
      const response = await axios.post(`${API.PROFILE_UPDATE}`, formdata, { headers: { "Authorization": ` ${usertkn}`, 'Content-Type': 'multipart/form-data'} });
      console.log("ResponseProfile_UpdateStatus ::::", response.data);
      // console.log("Profile_Update ::::", response.data.message);
      if (response.data.status == 1) {
        setEditMyProfilePopUp(true);
        setIsLoading(false);
      }
      else {
        console.log("Profile_Update_else ::::", response.data.message);
        setIsLoading(false);
      }
}
    catch (error) {
      Alert.alert("something went wrong user Update Profile catch!")
      // console.log("Profile_Update _error:", error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%', flexGrow: 1
    }} >

      <Headers
        Backicon={{
          visible: true,
        }}
        BackicononClick={() => { props.navigation.goBack() }}

        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

        Bellicon={{
          visible: true,

        }}
        BelliconononClick={() => { props.navigation.navigate("Notifications") }}
      />
      {!isLoading ?
        (<ScrollView >

          <View style={{
            marginHorizontal: 15,
            borderRadius: 15,
            backgroundColor: 'white',
            marginTop: 20,
            borderColor: "#bbbaba",
            borderWidth: 1,
            height: 300
          }}>
            <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 15, color: 'black', }}>Profile Name</Text>

            <View style={{ flexDirection: 'row', borderRadius: 25, height: 50, marginHorizontal: 23, marginTop: 15 }}>
              <View style={{
                borderRadius: 25, flexDirection: 'row',
                height: 40,
                flex: 0.8,
                shadowColor: '#11032586',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                //android specific
                borderColor: "#bbbaba",
                borderWidth: 1,
              }}
              >
                <Image source={require('../assets/user.png')}
                  style={{
                    width: 30,
                    height: 30, alignSelf: 'center'
                  }} />

                <TextInput placeholder="First Name"

                  fontWeight='normal'
                  placeholderTextColor='#D7D7D7'
                  autoCorrect={false}
                  value={firstname}
                  onChangeText={(text) => setFirstname(text)}
                  style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black", fontSize: 11 }} />


              </View>


              <View style={{
                borderRadius: 25, marginLeft: 10, flexDirection: 'row',
                height: 40,
                shadowColor: '#11032586',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 0.8,               //android specific
                borderColor: "#bbbaba",
                borderWidth: 1,

              }}
              >
                <Image source={require('../assets/user.png')}
                  style={{
                    width: 30,
                    height: 30, alignSelf: 'center'
                  }} />

                <TextInput
                  placeholder="Last Name"
                  fontWeight='normal'
                  placeholderTextColor='#D7D7D7'
                  autoCorrect={false}
                  value={lastname}
                  onChangeText={(text) => setLastname(text)}
                  style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black", fontSize: 11 }} />
              </View>
            </View>
            <View style={{
              marginTop: 10, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
              height: 40,
              shadowColor: '#11032586',
              backgroundColor: 'white',
              alignItems: 'center',
              height: 40,               //android specific
              borderColor: "#bbbaba",
              borderWidth: 1,
            }}
            >
              {/* <Text style={{ marginLeft: 10, textAlign: 'left', fontSize: 13, color: 'black', fontWeight: '700' }}>+91</Text>
            <View style={{
              marginLeft: 10,
              height: 30,
              backgroundColor: '#cacaca',
              width: 1
            }}
            >
            </View> */}
              <Image source={require('../assets/iphone.png')}
                style={{
                  width: 16,
                  height: 16, alignSelf: 'center', marginLeft: 15
                }} />

              <View style={{
                marginLeft: 11,
                height: 30,
                backgroundColor: '#cacaca',
                width: 1
              }}
              >
              </View>

              <TextInput placeholder="Mobile Number"
                autoCorrect={false}
                value={mobileno}
                onChangeText={(text) => setMobileno(text)}
                fontWeight='normal'
                keyboardType='number-pad'
                placeholderTextColor='#D7D7D7'
                style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black", fontSize: 11 }} />


            </View>
            <View style={{
              marginTop: 20, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
              height: 40,
              shadowColor: '#11032586',
              backgroundColor: 'white',
              alignItems: 'center',
              height: 40,               //android specific
              borderColor: "#bbbaba",
              borderWidth: 1,
            }}
            >

              <Image source={require('../assets/message1.png')}
                style={{
                  width: 16,
                  height: 11, alignSelf: 'center', marginLeft: 15
                }} />

              <View style={{
                marginLeft: 11,
                height: 30,
                backgroundColor: '#cacaca',
                width: 1
              }}
              >
              </View>

              <TextInput
                placeholder="Enter Email"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => setEmail(text)}
                fontWeight='normal'
                placeholderTextColor='#D7D7D7'
                style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black", fontSize: 11 }} />


            </View>
            <TouchableOpacity onPress={() => openLibrary()}>
              <View style={{
                marginTop: 20, borderRadius: 25, marginRight: 120, marginLeft: 20, flexDirection: 'row',
                height: 40,
                shadowColor: '#11032586',
                backgroundColor: 'white',
                alignItems: 'center',
                height: 40,               //android specific
                borderColor: "#bbbaba",
                borderWidth: 1,
                flexDirection: 'row'
              }}
              >

                <View style={{ flex: 1 }}>
                  <TextInput placeholder="   Change Profile Photo"

                    fontWeight='normal'
                    placeholderTextColor='black'
                    editable={false} selectTextOnFocus={false}
                  />

                </View>
                <View style={{ flex: 1 / 3 }}>
                  <View style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>

                    <View style={{ backgroundColor: '#f2f2f2', width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2, marginRight: -20 }}>
                      <Image source={require('../assets/export.png')}
                      />
                    </View>

                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </View>


          <View style={{ marginBottom: 20, flexDirection: 'row', height: 50, marginTop: 40, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { buttonClickedHandler() }}>
              <View style={{ justifyContent: 'center', width: 150, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Cancel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { GetProfile() }}>
              <View style={{ justifyContent: 'center', width: 150, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35, marginLeft: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Save</Text>

              </View>
            </TouchableOpacity>
          </View>

          {EditMyProfilePopUp ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={EditMyProfilePopUp}
              onRequestClose={() => {
                setEditMyProfilePopUp(false);
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
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    //paddingTop: 40,

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
                    height: 320,
                    //marginHorizontal: 10,

                    marginHorizontal: 30,
                    borderRadius: 10,

                    alignItems: 'center',
                    flexDirection: 'column'
                  }}>
                    <View style={{ width: 150, height: 120, marginTop: 20 }}>
                      <Image source={require('../assets/congrats.png')}
                        style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 15 }} />
                    </View>
                    <Text style={{ marginTop: 25, marginHorizontal: 80, textAlign: 'center', fontSize: 15, color: 'black', }}>Profile Details Update
                      Successfully</Text>
                    <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>


                      <TouchableOpacity onPress={buttonClickedHandler}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                          <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Close</Text>

                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </View>
            </Modal>
          ) : null}
        </ScrollView>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}

export default EditMyProfile;
