import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Headers from '../../Routes/Headers';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { async } from 'regenerator-runtime';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const FitnessEquipment = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [shopitems, setshopitems] = useState([]);
  const [imagepath, setimagepath] = useState("");
  const [FilterPopup, setFilterPopUp] = useState(false);


  const gotoDumbleSet =  (item) => {
    
      props.navigation.navigate("DumbleSet", {
        categoryID: item.id,
        SHOPID: FitnessID
      })
    

  }

  // console.log("FITNESS_storeId......:", props?.route?.params?.FitnessstoreId);
  const FitnessID = props?.route?.params?.FitnessstoreId;
  useEffect(() => {
    FitnessStoresProduct();

    // const unsubscribe = props.navigation.addListener('focus', () => {


    // });
    // return unsubscribe;

  }, []);

  const FitnessStoresProduct = async () => {
    const Token = await AsyncStorage.getItem("authToken");

    // var fitnessdata = new FormData();
    // fitnessdata.append('shop_id', FitnessID);
    // console.log("FitnessStoresProduct_append data::::",fitnessdata);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_CATEGORY}`, { 'shop_id': FitnessID },
        { headers: { "Authorization": ` ${Token}` } }
      );
      console.log(":::::::::FitnessEquipmentStore_Response>>>", response.data.shop_category);
      console.log("status _FitnessEquipment", response.data.status);
      setimagepath(response.data.image_path);
      if (response.data.shop_category.length != 0) {
        setshopitems(response.data.shop_category)

        setIsLoading(false);
      } else {
        // Alert.alert("Fitness product status==0 found from backend side");
        setIsLoading(false);
      }

    }
    catch (error) {
      // console.log("......error.........", error.response.data.message);
      Alert.alert("FitnessEquipment Store!", error.response.data.message)
      setIsLoading(false);
    }

  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
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
        (<View>

          <ScrollView >

            <View style={{ height: 50, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width: "95%", marginHorizontal: 16 }}>
              <View style={{ justifyContent: "center", alignItems: "center", }}>
                <Text
                  style={{
                    // marginLeft: 10,
                    marginTop: 20,
                    textAlign: 'left',
                    fontSize: 18,
                    color: 'black',
                    fontWeight: "500"
                  }}>
                  Fitness Equipment
                </Text>
              </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", position: "absolute", right: 20, top: 18, flex: 1, width: 40, height: 30 }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center', flex: 0.5
                    // marginRight: 5,
                  }}
                  onPress={() => {
                    setFilterPopUp(true);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ffcc00',
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30 / 2,
                    }}>
                    <Image source={require('../assets/filter.png')} />
                  </View>
                </TouchableOpacity>

              </View> */}
            </View>

            <FlatList
              vertical
              // showsHorizontalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: "space-between"
              }}
              // style={{ margin: 10 }}
              keyExtractor={(item, index) => String(index)}
              data={shopitems}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    gotoDumbleSet(item)
                  }}>
                    <View
                      style={{
                        marginBottom: 6,
                        marginTop: 15,
                        marginHorizontal: 10,
                        height: 180,
                        width: WIDTH * 0.45,
                        overflow: 'hidden',
                        borderRadius: 20,
                        backgroundColor: '#f7f7f7',
                        backgroundColor: "lightgray",
                        shadowColor: '#000000',
                        shadowRadius: 5,
                        shadowOpacity: 1.0,
                        elevation: 6,
                      }}>

                      <View
                        style={{
                          width: WIDTH * 0.45, height: 180, borderTopRightRadius: 20,
                          borderTopLeftRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                        }}>
                        <Image
                          source={{ uri: `${imagepath + item?.image}` }}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center',
                          }}
                        />
                        <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "500" }}>{item?.name?.slice(0, 15) + '...'}</Text>

                        </View>

                      </View>


                    </View>
                    {/* <BackgroundImage
                    source={{ uri: `${imagepath + item?.image}` }}
                    style={{
                      marginBottom: 6,
                      marginTop: 6,
                      marginHorizontal: 6,
                      // justifyContent: 'space-between',
                      height: 180,
                      width: WIDTH * 0.45,
                      overflow: 'hidden',
                      borderRadius: 15,
                      backgroundColor: '#f7f7f7',
                      // backgroundColor: "lightgray",
                      shadowColor: '#000000',
                      shadowRadius: 5,
                      shadowOpacity: 1.0,
                      elevation: 6,


                    }}>

                    <View style={{ width: 115, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                      <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', fontWeight: "bold" }}>{item.name.slice(0, 15) + '...'}</Text>

                    </View>

                  </BackgroundImage> */}
                  </TouchableOpacity>
                )
              }}
            />


            {FilterPopup ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={FilterPopup}
                onRequestClose={() => {
                  setFilterPopUp(false);
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
                      // paddingTop: 20,
                      width: "100%",
                      height: "35%",
                      // height: "60%",
                      justifyContent: "center",
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
                    <View
                      style={{
                        backgroundColor: 'white',
                        // height: 480,
                        height: "100%",
                        width: "99%",
                        // marginHorizontal: 20,
                        alignItems: 'center',
                        borderRadius: 20,
                        flexDirection: 'column',
                      }}>
                      <View
                        style={{
                          marginTop: 20,
                          // marginHorizontal: 20,
                          height: 25,
                          flexDirection: 'row',
                          // backgroundColor: 'red',
                        }}>
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 40 / 2,
                          }}>
                          <Image
                            source={require('../assets/filterBlack.png')}
                            style={{
                              width: 20,
                              height: 15,
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            marginLeft: 10,
                            textAlign: 'center',
                            fontSize: 16,
                            color: 'black',

                            marginTop: 2,
                          }}>
                          Filter
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '90%',
                          height: 60,
                          flexDirection: 'row',
                          marginTop: 30,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 40,
                          }}>
                          <TouchableOpacity onPress={() => { setChecked('high_to_low') }}>
                            <View
                              style={{
                                width: 160,
                                flex: 1,
                                borderRadius: 35,
                                // borderColor: '#ffcc00',
                                borderWidth: 1,
                                borderColor: ischecked == 'high_to_low' ? '#ffcc00' : '#8F93A0'
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={ischecked == 'high_to_low' ? require('../assets/updownYellow.png') : require('../assets/updownGrey.png')}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    alignSelf: 'center',
                                    marginRight: 10,
                                  }}
                                />

                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontSize: 9,
                                    color: ischecked == 'high_to_low' ? '#ffcc00' : '#8F93A0'

                                  }}>
                                  Higher to Lower Price
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginLeft: 10,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 40,
                          }}>
                          <TouchableOpacity onPress={() => { setChecked('low_to_high') }}>
                            <View
                              style={{
                                width: 160,
                                flex: 1,
                                borderRadius: 35,
                                // borderColor: '#bbbaba',
                                borderWidth: 1,
                                borderColor: ischecked == 'low_to_high' ? '#ffcc00' : '#8F93A0'
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={ischecked == 'low_to_high' ? require('../assets/updownYellow.png') : require('../assets/updownGrey.png')}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    alignSelf: 'center',
                                    marginRight: 10,
                                  }}
                                />

                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontSize: 9,
                                    color: ischecked == 'low_to_high' ? '#ffcc00' : '#8F93A0'

                                  }}>
                                  Lower to Higher Price
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>



                      <View
                        style={{
                          height: 200,
                          marginTop: 20,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              ShopFilter();

                            }}>
                            <View
                              style={{
                                marginTop: 30,
                                borderRadius: 25,
                                width: 200,
                                height: 45,
                                backgroundColor: '#ffcc00',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: 'white',

                                }}>
                                Apply
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
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
};

export default FitnessEquipment;
