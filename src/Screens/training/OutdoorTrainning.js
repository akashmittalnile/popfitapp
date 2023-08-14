import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ScrollView,RefreshControl} from 'react-native'
 
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import styles from '../../Routes/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const OutdoorTrainning = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [TrainingSUBCatgry, setTrainingSUBCatgry] = useState([]);
  const [checkplanid, setCheckPlanId] = useState(props?.route?.params?.TrainingData);
  const [planstatus, setPlanstatus] = useState(JSON.stringify(props?.route?.params?.categoryId?.plan_id));
  const [hometrainingid, setHomeTrainingid] = useState(props?.route?.params?.TrainingID);
  const [tokenuser, SetTokenUser] = useState("");
  const { t } = useTranslation();

  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    workoutSubCategoryAPI();
    setrefreshing(false)
  }
  useEffect(() => {
    // console.log("categoryId_item..plan_id.............:", props?.route?.params?.categoryId?.plan_id);

    // console.log("TrainingID_item.from home..............:", props?.route?.params?.TrainingID);
    // const TrainingID = props?.route?.params?.TrainingID?.id
    // console.log("Trainingdata_From trainingscreen:", props?.route?.params?.TrainingData);

    workoutSubCategoryAPI();
    // console.log("Traingplanstatus...:", props?.route?.params?.TrainingData);

    const checklogin = async () => {
      let Usertoken = await AsyncStorage.getItem("authToken");
      SetTokenUser(Usertoken);
    };
    checklogin();

  }, []);

  const gotoOutdoorCycle = (item) => {
     
    if (checkplanid?.plan_status == "Active" || checkplanid?.plan_id >= 2) {
      if (tokenuser != null) {
        // console.log("ACTIVE plan::::::");
        props.navigation.navigate("SubCategorylist2", {
          Tainingcat_id: checkplanid != undefined ? checkplanid?.id : hometrainingid?.id,
          Trainingsubcat_data: item
        })
      }
      else if (tokenuser == null) {
        Alert.alert('', t('Please_login_first'))

      }

    }
    else if (checkplanid?.plan_status == "Inactive" || checkplanid?.plan_id == 1) {
      // console.log("ACTIVE plan::::::");
      props.navigation.navigate("SubCategorylist2", {
        Tainingcat_id: checkplanid != undefined ? checkplanid?.id : hometrainingid?.id,
        Trainingsubcat_data: item
      })



    }
    else if (checkplanid?.plan_status == null) {
      props.navigation.navigate("SubCategorylist2", {
        Tainingcat_id: checkplanid != undefined ? checkplanid?.id : hometrainingid?.id,
        Trainingsubcat_data: item
      })
    }

  }

  // const gotoSubsciption = () => {
  //   props.navigation.navigate("SubscriptionPlan")
  // }





  const workoutSubCategoryAPI = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_SUB_CATERORY}`, { "category_id": checkplanid != undefined ? checkplanid?.id : hometrainingid?.id },
        { headers: { "Authorization": ` ${usertkn}` } }
      );
      // console.log(":::::::::workoutSubCategoryAPI_Response>>>", response?.data?.message);
      // console.log("workoutSubCategoryAPI_data::::::", response.data.data);
      // alert("Get Sub-category data successfully");
      if (response?.data?.status == '1') {
        setTrainingSUBCatgry(response?.data?.data)

      }
      // else {

      //   Alert.alert('Training Not Accessible', 'Login First !')
      // }


    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("..workoutSubCategoryAPI..Catch..error.........", error.response?.data?.message);
    } setIsLoading(false);
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: '#000000'
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
            TrainingSUBCatgry?.length > 0 ?
              (<ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                } 
              >
                <View style={{ marginTop: 20, justifyContent: "flex-start", alignItems: "flex-start", width: WIDTH * 0.45, height: 36, marginLeft: 20 }}>
                  <Text style={{ textAlign: 'left', fontSize: 17, color: '#ffffff', fontWeight: "500" }}>

                    {t('Sub_Categories')}
                  </Text>
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
                                source={{ uri: item?.image != "" ? item?.image : 'https://dev.pop-fiit.com/images/logo.png' }}
                                resizeMode="contain"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: 20,
                                  // borderTopRightRadius: 20,
                                  alignSelf: 'center',
                                  backgroundColor: "black"
                                }}
                              />
                              <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.subcat_name?.lenght >= 18 ? item?.subcat_name.slice(0, 18) + '...' : item?.subcat_name.slice(0, 18)}</Text>

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
                  </View> || planstatus != "Active"*/}


                  {/* {
                    (checkplanid?.plan_id.includes('1') != undefined ? checkplanid?.plan_id.includes('1') : undefined) >= 2  || (hometrainingid?.plan_id != undefined ? hometrainingid?.plan_id : undefined) >= 2 ?
                      <>

                        {(hometrainingid?.user_plan_status != undefined ? hometrainingid?.user_plan_status != "Active" : undefined )  || (checkplanid?.user_plan_status  != undefined ? checkplanid?.user_plan_status != "Active" : undefined)  ?
                          (<View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 20, flex: 1, }}>
                            <TouchableOpacity
                              onPress={() => {
                                gotoSubsciption()
                                console.log('hhhhh', (hometrainingid?.user_plan_status != undefined ? hometrainingid?.user_plan_status : undefined ) != "Active" || (checkplanid?.user_plan_status  != undefined ? checkplanid?.user_plan_status : undefined) != "Active");
                              }}>
                              <View style={{ alignItems: 'center', width: 160, justifyContent: 'center', backgroundColor: '#ffcc00', borderRadius: 50, flex: 1 }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: 'white', fontWeight: "400" }}>Subscribe Now</Text>
                              </View>
                            </TouchableOpacity>
                          </View>)
                          :
                          null

                        }


                      </>
                      :
                      null
                  } */}

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
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>{t('Oops_No_data_found')}</Text>
              </View>)
          }
        </>)
        :
        (<CustomLoader showLoader={isLoading} />)}
    </SafeAreaView>
  );
}
export default OutdoorTrainning;
