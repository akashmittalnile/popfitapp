import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import styles from '../../Routes/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const OutdoorTrainning = (props) => {

  const [TrainingSUBCatgry, setTrainingSUBCatgry] = useState([]);
  const [subscriptiontoken, setsubscription] = useState("");

  useEffect(() => {
    workoutSubCategoryAPI();

    //   const checklogin = async () => {
    //     let Usertoken = await AsyncStorage.getItem("authToken");
    //     console.log("token.......", Usertoken);
    //     if (Usertoken == null) {
    //         props.navigation.navigate('LoginMain', {
    //             screen: 'LoginSignUp',
    //           });
    //         console.log("...............................");

    //     }
    //     else {

    //         console.log("??????????????error");
    //     }
    // };
    // checklogin();

    // getusertoken();
  }, [props]);

  // const getusertoken = async () => {
  //   const usertoken = await AsyncStorage.getItem("authToken");
  //   setsubscription(usertoken)

  // }
  const DATA = ['first row', 'second row', 'third row', 'fourth row', 'five row', 'six row'];
  const newData = [{
    key: '1',
    text: 'Outdoor Walk',
    uri: 'https://picsum.photos/id/1/200',

  },
  {
    key: '2',
    text: 'Outdoor Cycle',
    uri: 'https://picsum.photos/id/10/200',
  },

  {
    key: '3',
    text: 'Badminton',
    uri: 'https://picsum.photos/id/1002/200',
  },
  {
    key: '4',
    text: 'Basketball',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '5',
    text: 'Outdoor Run',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '6',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '7',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },

  ];
  const buttonClickedHandler = () => {
    props.navigation.goBack()
  }
  const gotoOutdoorCycle = () => {
    props.navigation.navigate("Training")
  }
  const gotoSubsciption = () => {
    props.navigation.navigate("SubscriptionPlan")
  }
  const gotoNotification = () => {
    props.navigation.navigate("Notifications")
  }

  console.log("categoryId_item...............:", props?.route?.params?.categoryId?.id);
  const categoryId = props?.route?.params?.categoryId?.id

  const workoutSubCategoryAPI = async () => {

    try {

      // setIsLoading(true);
      const response = await axios.post(`${API.TRAINING_SUB_CATERORY}`, { "category_id": categoryId });
      console.log(":::::::::workoutSubCategoryAPI_Response>>>", response.data.message);
      console.log("workoutSubCategoryAPI_data::::::", response.data.data);
      // alert("Get Sub-category data successfully");
      setTrainingSUBCatgry(response.data.data)
      // setIsLoading(false);

    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      // setIsLoading(false);

    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
    }} >
      <Headers
        Backicon={{
          visible: true,
        }}
        BackicononClick={() => {props.navigation.goBack()}}

        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => {props.navigation.navigate("CartAdded")}}

        Bellicon={{
          visible: true,

        }}
        BelliconononClick={() => {props.navigation.navigate("Notifications")}}
      />
      {/* <View style={styles.navigationBarColor}>
        <View style={styles.navigationBarLeftContainer}>
          <TouchableOpacity onPress={() => { buttonClickedHandler() }}>

            <Image source={require('../assets/leftArrowWhite.png')}
              style={{
                width: 30,
                height: 25, alignSelf: 'center', marginLeft: 10
              }} />

          </TouchableOpacity>
        </View>

        <View style={styles.navigationBarCenterContainer}>
          <TouchableOpacity>
            <Image resizeMode='contain'
              source={require('../assets/layerCenter.png')}
              style={{
                width: 80,
                height: 50, alignSelf: 'center'
              }} />

          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => {
              gotoNotification();
            }}>
            <Image
              source={require('../assets/bellRight.png')}
              style={{
                width: 20,
                height: 25,
                alignSelf: 'center',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      <ScrollView>

        <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 14, color: '#ffffff', }}>Sub Category Name</Text>
        <View style={{
          backgroundColor: 'black', width: "100%", marginBottom: 30, justifyContent: "center",
        }}>
          <FlatList
            numColumns={2}
            data={TrainingSUBCatgry}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { gotoOutdoorCycle() }}>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: 'gray',
                    height: 160,
                    width: 180,
                    borderRadius: 20,
                    marginBottom: 20,
                    marginLeft: 15,
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                  <BackgroundImage
                    source={{}}
                    style={{
                      marginLeft: 1,
                      justifyContent: 'space-between',
                      width: 170,
                      height: 120,
                      overflow: 'hidden',
                      borderRadius: 15
                    }} >
                    <View style={{ width: 100, backgroundColor: '#c9bca0', height: 20, borderBottomRightRadius: 10, justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'center', fontSize: 9, color: 'black', }}>{item.cat_name}</Text>
                    </View>

                  </BackgroundImage>
                </View>
              </TouchableOpacity>
            )}
          />



          <View style={{ marginBottom: 20, marginTop: 30, marginHorizontal: 10, backgroundColor: 'white', height: 40, borderRadius: 10, justifyContent: 'center', flex: 1 }}>


            <View style={{ flexDirection: 'row', flex: 1, justifyContent: "center", alignItems: 'center' }}>
              <View style={{ flex: 0.7, flexDirection: 'row', }}>

                <Text style={{ marginLeft: 15, textAlign: 'left', fontSize: 12, color: 'black', }}>Monthly billing</Text>
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={{ marginRight: 15, textAlign: 'right', fontSize: 12, color: 'black', }}>$ 99</Text>
              </View>
            </View>
          </View>


          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 45, marginHorizontal: 20, marginTop: 20, flex: 1, }}>
            <TouchableOpacity onPress={() => { gotoSubsciption() }}>
              <View style={{ alignItems: 'center', width: 300, justifyContent: 'center', backgroundColor: '#ffcc00', borderRadius: 35, flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Upgrade to Plan 1 Subscription</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default OutdoorTrainning;
