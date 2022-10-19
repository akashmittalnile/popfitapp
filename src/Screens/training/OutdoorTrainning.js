import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
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

  const [isLoading, setIsLoading] = useState(false);
  const [TrainingSUBCatgry, setTrainingSUBCatgry] = useState([]);
  const [checkplanid, setCheckPlanId] = useState(props?.route?.params?.TrainingData);

  useEffect(() => {
    workoutSubCategoryAPI();
    console.log("Traingplanstatus...:", props?.route?.params?.TrainingData);
    //   const checklogin = async () => {
    //     let Usertoken = await AsyncStorage.getItem("authToken");
    //     console.log("token.......", Usertoken);
    //     if (Usertoken == null) {
    //         props.navigation.navigate('LoginMain', {
    //             screen: 'LoginSignUp',
    //           });
    //           Alert.alert("Login Fist!")
    //         console.log(".........Not Login......................");

    //     }
    //     else {

    //         console.log(".......user login...................");
    //     }
    // };
    // checklogin();

    // getusertoken();
  }, []);

  const gotoOutdoorCycle = (item) => {

    // Alert.alert(" status 0")
    if (checkplanid?.plan_status == "Active") {
      // switch (Active) {
      //   case checkplanid.plan_id == "1":
      //     console.log("plan 1 used");
      //     break;
      //   case checkplanid.plan_id == "2":
      //     console.log("plan 2 used");
      //     break;
      //   case checkplanid.plan_id == "3":
      //     console.log("plan 3 used");
      //     break;
      //     default:
      //       console.log("plan 0 used ");
      // }
      // Alert.alert(" status Active")
      props.navigation.navigate("Training", {
        Tainingcat_id: categoryId ? categoryId : TrainingID,
        Trainingsubcat_data: item
      })
    }
    else if (checkplanid?.plan_status == "Inactive") {
      props.navigation.navigate("Training", {
        Tainingcat_id: categoryId ? categoryId : TrainingID,
        Trainingsubcat_data: item
      })
      // Alert.alert("Please, Login First and Suscribe any plan!")
      // if(checkplanid?.plan_id > "0"){
        // props.navigation.navigate('LoginMain', {
        //   screen: 'LoginSignUp',
        // });
      // }
      // else if(checkplanid?.plan_id == "0")
      // {
      //   return
      // }
     
    
    }
    else if (checkplanid?.plan_status == null){
      props.navigation.navigate("Training", {
        Tainingcat_id: categoryId ? categoryId : TrainingID,
        Trainingsubcat_data: item
      })
    }

  }

  const gotoSubsciption = () => {
    props.navigation.navigate("SubscriptionPlan")
  }


  // console.log("categoryId_item...............:", props?.route?.params?.categoryId?.id);
  const categoryId = props?.route?.params?.categoryId?.id
  console.log("TrainingID_item.from home..............:", props?.route?.params?.TrainingID?.id);
  const TrainingID = props?.route?.params?.TrainingID?.id

  // setCheckPlanId(props?.route?.params?.TrainingData);

  const workoutSubCategoryAPI = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_SUB_CATERORY}`, { "category_id": categoryId ? categoryId : TrainingID },
        //  { headers: { "Authorization": ` ${usertkn}` } }
      );
      // console.log(":::::::::workoutSubCategoryAPI_Response>>>", response.data.message);
      // console.log("workoutSubCategoryAPI_data::::::", response.data.data);
      // alert("Get Sub-category data successfully");
      if (response.data.status == '1') {
        setTrainingSUBCatgry(response.data.data)
        setIsLoading(false);
      } else if (response.data.status == '0') {

        Alert.alert('Training Not Accessible', 'Login First !')
      }


    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      setIsLoading(false);

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
        (<>
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
          {
            TrainingSUBCatgry.length != 0 ?
              (<ScrollView>
                <View style={{marginTop: 10, justifyContent: "center", alignItems: "center", width: WIDTH * 0.4, height: 50 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18, color: '#ffffff', fontWeight: "500" }}>Sub Categories</Text>
                </View>

                <View style={{
                  backgroundColor: 'black', width: "100%", marginBottom: 30, justifyContent: "center",
                }}>
                  <FlatList
                    numColumns={2}
                    columnWrapperStyle={{
                      flex: 1,
                      justifyContent: "space-between"
                    }}
                    keyExtractor={(item, index) => String(index)}
                    data={TrainingSUBCatgry}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity onPress={() => { gotoOutdoorCycle(item) }}>
                          <View
                            style={{
                              marginTop: 6,
                              backgroundColor: 'lightgray',
                              height: 160,
                              width: WIDTH * 0.45,
                              borderRadius: 20,
                              marginBottom: 6,
                              marginHorizontal: 10,
                              justifyContent: "flex-start",
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: WIDTH * 0.45, height: 160, borderRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                              }}>
                              <Image
                                source={{ uri: item.image }}
                                resizeMode="contain"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: 20,
                                  // borderTopRightRadius: 20,
                                  alignSelf: 'center',
                                }}
                              />
                              <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.subcat_name.slice(0, 13) + '...'}</Text>

                              </View>

                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    }}
                  />


                  {/* 
                  <View style={{ marginBottom: 20, marginTop: 30, marginHorizontal: 10, backgroundColor: 'white', height: 40, borderRadius: 10, justifyContent: 'center', flex: 1 }}>


                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "center", alignItems: 'center' }}>
                      <View style={{ flex: 0.7, flexDirection: 'row', }}>

                        <Text style={{ marginLeft: 15, textAlign: 'left', fontSize: 12, color: 'black', }}>Monthly billing</Text>
                      </View>
                      <View style={{ flex: 0.3 }}>
                        <Text style={{ marginRight: 15, textAlign: 'right', fontSize: 12, color: 'black', }}>$ 99</Text>
                      </View>
                    </View>
                  </View> */}


                  <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 20, flex: 1, }}>
                    <TouchableOpacity onPress={() => { gotoSubsciption() }}>
                      <View style={{ alignItems: 'center', width: 220, justifyContent: 'center', backgroundColor: '#ffcc00', borderRadius: 50, flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: 'white', fontWeight: "400" }}>SubscriptionPlan Buy Now</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>
              </ScrollView>)
              :
              (<View style={{
                justifyContent: "center", alignItems: "center", width: WIDTH,
                height: 200, backgroundColor: "white", flex: 1,
              }}>
                <Image resizeMode='contain'
                  source={require('../assets/Nodatafound.png')}
                  style={{
                    width: 200,
                    height: 120, alignSelf: 'center'
                  }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>Oops! No data found</Text>
              </View>)
          }
        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}
export default OutdoorTrainning;
