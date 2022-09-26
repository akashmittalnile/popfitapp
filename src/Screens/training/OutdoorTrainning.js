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

  const gotoOutdoorCycle = (item) => {

    props.navigation.navigate("Training", {
      Tainingcat_id: categoryId ? categoryId : TrainingID,
      Trainingsubcat_data: item
    })
  }

  const gotoSubsciption = () => {
    props.navigation.navigate("SubscriptionPlan")
  }


  console.log("categoryId_item...............:", props?.route?.params?.categoryId?.id);
  const categoryId = props?.route?.params?.categoryId?.id
  console.log("TrainingID_item...............:", props?.route?.params?.TrainingID?.id);
  const TrainingID = props?.route?.params?.TrainingID?.id


  const workoutSubCategoryAPI = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_SUB_CATERORY}`, { "category_id": categoryId ? categoryId : TrainingID }, { headers: { "Authorization": ` ${usertkn}` } });
      console.log(":::::::::workoutSubCategoryAPI_Response>>>", response.data.message);
      console.log("workoutSubCategoryAPI_data::::::", response.data.data);
      // alert("Get Sub-category data successfully");
      if (response.data.status == '1') {
        setTrainingSUBCatgry(response.data.data)
        setIsLoading(false);
      } else if (response.data.status == '0'){
        Alert.alert("Workout sub categoru have no data at status 0")
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

                <Text style={{ marginLeft: 15, marginTop: 15, textAlign: 'left', fontSize: 18, color: '#ffffff', }}>Sub Category Name</Text>
                <View style={{
                  backgroundColor: 'black', width: "100%", marginBottom: 30, justifyContent: "center",
                }}>
                  <FlatList
                    numColumns={2}
                    // style={{ margin: 1 }}
                    columnWrapperStyle={{
                      flex: 1,
                      // justifyContent: "center"
                    }}
                    data={TrainingSUBCatgry}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => { gotoOutdoorCycle(item) }}>
                        <View
                          style={{
                            marginTop: 10,
                            backgroundColor: 'gray',
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
                    )}
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


                  <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 36, marginHorizontal: 20, marginTop: 20, flex: 1, }}>
                    <TouchableOpacity onPress={() => { gotoSubsciption() }}>
                      <View style={{ alignItems: 'center', width: 280, justifyContent: 'center', backgroundColor: '#ffcc00', borderRadius: 35, flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: 'white',fontWeight:"500" }}>Upgrade to Plan 1 Subscription</Text>
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
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>No data found</Text>
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
