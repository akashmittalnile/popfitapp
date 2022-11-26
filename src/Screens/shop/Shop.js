import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Modal, SafeAreaView, Dimensions,
  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import { Divider } from 'react-native-elements';
import { async } from 'regenerator-runtime';
import CustomLoader from '../../Routes/CustomLoader';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Shop = (props) => {
  const DATA = ['first row', 'second row', 'third row', 'fourth row'];
  const [isLoading, setIsLoading] = useState(false);
  const [ischecked, setChecked] = useState("");
  const [shoptoken, setshoptoken] = useState("");
  const [FilterPopup, setFilterPopUp] = useState(false);
  const [CartAddedPopUp, setCartAddedPopUp] = useState(false);
  const [shopitems, setshopitems] = useState([]);

  // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

  const gotoShippingDetail = (item) => {
    console.log("filter product id:", item);
    // const Token = await AsyncStorage.getItem("authToken")
    // if (Token == null) {
    //   Alert.alert('Shop', 'Login First!')
    // } else if (Token != null) {
    props.navigation.navigate('ProductDetail', {
      ITEM: item
    })
    // }

  };
  // const gotoshippingdetails = () => {
  //   props.navigation.navigate('ShippingDetail');
  // };

  useEffect(() => {
    
    const unsubscribe = props.navigation.addListener('focus', () => {
      StoresProductget();
    })
    return unsubscribe;

  }, []);


  const ShopFilter = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    console.log("SHOP filter...........>>>", ischecked);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_FILTER}`, { "search": ischecked, "shop_id": '', "category_id": '' },
        { headers: { "Authorization": ` ${Token}` } }
      );
      console.log(":::::::::Shop_FIlter>>>", response.data.data);
      console.log("SHOP_Status", response.data.status);
      if (response.data.status == 1) {
        setshopitems(response.data.data)

        setFilterPopUp(false)

      } else {
        setFilterPopUp(false);
        Alert.alert('', 'Something went wrong please exit the app and try again');
      }

    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // Alert.alert("filter",error.response.data.message);
    }
    setIsLoading(false)
  };
  const StoresProductget = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    console.log("in SHOP Check token:", Token);

    setIsLoading(true);
    try {
      const response = await axios.get(`${API.SHOP_MAIN}`,
        { headers: { "Authorization": ` ${Token != null ? Token : null}` } }
      );
      // console.log(":::::::::Shop_Store_Response>>>", response.data.best_seller);
      // console.log("status _SHOP", response.data.status);
      if (response.data.status == 1) {
        setshopitems(response.data.best_seller)

      }
      else {

        Alert.alert('', 'Something went wrong please exit the app and try again');
      }

    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
       
    }
    setIsLoading(false)
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
    }} >
      <Headers
        Drawericon={{
          visible: true,
        }}
        DrawericononClick={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}

        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

        Bellicon={{
          visible: true,

        }}
        BelliconononClick={() => { props.navigation.navigate('Notifications') }}
      />
      {/* <View style={styles.navigationBarBlack}>
        <View style={styles.navigationBarLeftContainer}>
          <TouchableOpacity onPress={() => { openDrawer() }}>
            <Image
              source={require('../assets/hamburgerLeft.png')}
              style={{
                width: 25,
                height: 25,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navigationBarCenterContainer}>
          <TouchableOpacity>
            <Image resizeMode="contain"
              source={require('../assets/layerCenter.png')}
              style={{
                width: 80,
                height: 50,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationBarRight2Container}>
              <TouchableOpacity onPress={() => { gotoCartAdded() }}>
                <Image resizeMode="contain"
                  source={require('../assets/cart.png')}
                  style={{
                    width: 25,
                    height: 30, alignSelf: 'center', 
                    marginRight: 10
                  }} />

              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: '#ec1f1f',
                  width: 10,
                  height: 10,
                  borderRadius: 10 / 2,
                  // marginLeft: 30,
                  marginTop: -15,
                  right: 15
                }}>

              </View>
            </View>

            <View style={styles.navigationBarRightContainer}>
              <TouchableOpacity onPress={() => { gotoNotification() }}>
                <Image source={require('../assets/bellRight.png')}
                  style={{
                    width: 20,
                    height: 25, alignSelf: 'center', marginRight: 19
                  }} />

              </TouchableOpacity>
            </View>
      </View> */}

      {/* <Divider color="#393939" width={1.2} /> */}
      {!isLoading ?
        (<ScrollView >

          <View style={{ height: 50, flexDirection: 'row', flex: 1, justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 0.2, }}>
              <Text
                style={{
                  // marginLeft: 10,
                  marginTop: 20,
                  textAlign: 'left',
                  fontSize: 18,
                  color: 'black',
                  fontWeight: "500"
                }}>
                Shop
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", position: "absolute", right: 20, top: 18, flex: 1, width: 40, height: 30 }}>

              {/* <View
              style={{
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: "white",
                marginRight: 15, flex: 0.5
              }}>
              <TouchableOpacity
                onPress={() => {
                  setCartAddedPopUp(!CartAddedPopUp);
                }}>
                <View
                  style={{
                    marginTop: -15,
                    marginLeft: 10,
                    backgroundColor: '#ffcc00',
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30 / 2,
                  }}>
                  <Image source={require('../assets/bag1.png')} />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#ec1f1f',
                  width: 10,
                  height: 10,
                  borderRadius: 10 / 2,
                  marginLeft: 30,
                  marginTop: -30,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 7,
                    color: 'white',

                  }}>
                  1
                </Text>
              </View>
            </View> */}

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

            </View>
          </View>

          <FlatList
            vertical
            showsHorizontalScrollIndicator={true}
            style={{ margin: 0, paddingBottom: 10 }}
            numColumns={2}

            columnWrapperStyle={{
              flex: 1,
              // justifyContent: "space-around"
            }}
            keyExtractor={(item, index) => String(index)}
            data={shopitems}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => { gotoShippingDetail(item) }}
                  style={{
                    marginBottom: 5,
                    backgroundColor: '#f7f7f7',
                    height: 200,
                    width: WIDTH * 0.45,
                    marginTop: 15,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: "center",
                    marginHorizontal: 10,
                    shadowColor: '#000000',
                    shadowRadius: 5,
                    shadowOpacity: 0.3,
                    elevation: 5,
                    zIndex: 999,
                  }}>

                  <View
                    style={{
                      width: WIDTH * 0.45,
                      height: 155,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={{ uri: item?.image ? item?.image : item?.product_image }}
                      resizeMode="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: WIDTH * 0.45, flexDirection: 'column', justifyContent: "center", alignItems: 'stretch', height: 45, backgroundColor: '#fceeb5', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                    }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 14,
                        color: 'black', fontWeight: "500"

                      }}>
                      {item?.name != null ? item?.name?.slice(0, 15) + '...' : item?.product_name?.slice(0, 15) + '...'}
                    </Text>

                    <View
                      style={{
                        marginLeft: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3,
                      }}>

                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black', fontWeight: "500"

                        }}>$ {item?.price != null ? item?.price : item?.product_price}
                      </Text>

                      <View
                        style={{
                          alignItems: 'center', justifyContent: 'center', marginRight: 6, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00', bottom: 6
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 20,
                            alignSelf: 'center',
                          }}
                          source={require('../assets/bag1.png')}
                        />
                      </View>


                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            }
          />
          {/* <Text
          style={{
            marginLeft: 25,
            marginTop: 20,
            textAlign: 'left',
            fontSize: 14,
            color: 'black',
             
          }}>
          New Recipes & Tips
        </Text> */}


          {/* <TouchableOpacity onPress={()=>{gotoMyOrder()}}>
          <View
            style={{
              marginBottom: 20,
              marginTop: 30,
              marginHorizontal: 10,
              backgroundColor: '#f7f7f7',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/bagBlack.png')}
                  style={{
                    width: 15,
                    height: 20,
                    marginLeft: 15,
                  }}
                />
                <Text
                  style={{
                    marginTop: 3,
                    marginLeft: 15,
                    textAlign: 'left',
                    fontSize: 12,
                    color: 'black',
                      
                  }}>
                  My Order
                </Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#ffcc00',
                    width: 55,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 35 / 2,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: 'white',
                        
                    }}>
                    01
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>*/}

          {FilterPopup ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={FilterPopup}
              onRequestClose={() => {
                setFilterPopUp(false)
              }}>

              <View
                style={{
                  flex: 1,
                  // justifyContent: 'flex-end',
                  // alignItems: 'center',
                  backgroundColor: 'rgba(140, 141, 142, 0.7)',
                }}>
                <TouchableOpacity onPress={() => setFilterPopUp(false)}
                  style={{ flex: 1,  }}
                />
                <View
                  style={{
                    // margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    // paddingTop: 20,
                    width: "100%",
                    height: 220,
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
                      // backgroundColor: 'red',
                      height: 220,
                      // height: "100%",
                      width: "100%",
                      // marginHorizontal: 20,
                      // justifyContent: "center",
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
                        justifyContent: 'center'
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
                                  fontWeight: "500",
                                  textAlign: 'left',
                                  fontSize: 11,
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
                                  fontWeight: "500",
                                  textAlign: 'left',
                                  fontSize: 11,
                                  color: ischecked == 'low_to_high' ? '#ffcc00' : '#8F93A0'

                                }}>
                                Lower to Higher Price
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* <Text
                      style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        textAlign: 'left',
                        fontSize: 14,
                        color: 'black',

                      }}>
                      Select From Category & Sub-Category
                    </Text> */}

                    {/* <View
                      style={{
                        width: '90%',
                        marginTop: 20,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Fitness Dumble
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginLeft: 10,
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Workout Equipment
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}

                    {/* <View
                      style={{
                        marginTop: 10,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 100,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Clothes
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginLeft: 10,
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 100,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Barbel Set
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginLeft: 10,
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 100,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Training Bench
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}

                    {/* <View
                      style={{
                        width: '90%',
                        marginTop: 10,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Pull-Up Frame & Bar
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginLeft: 10,
                            borderColor: '#8F93A0',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 120,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontSize: 9,
                              color: '#bbbaba',

                            }}>
                            Kettlebell Set
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}

                    <View
                      style={{
                        height: 200,
                        marginTop: 2,
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
                              marginTop: 20,
                              borderRadius: 50,
                              width: 150,
                              height: 34,
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


          {/* {CartAddedPopUp ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={CartAddedPopUp}
              onRequestClose={() => {
                setCartAddedPopUp(false);
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
                    marginTop: 490,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    //paddingTop: 40,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: "center",
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 6,

                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: "100%",
                      width: "100%",
                      // marginHorizontal: 10,
                      // padding: 10,
                      borderRadius: 20,
                      // marginBottom: 20,
                      alignItems: 'center',
                      justifyContent: "center",
                    }}>
                    <View
                      style={{
                        height: 50,
                        marginHorizontal: 10,
                        marginTop: 10,
                        width: '40%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center",
                      }}>
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image resizeMode="contain"
                          style={{
                            width: 15,
                            height: 20, alignSelf: 'center'
                          }}
                          source={require('../assets/bag2.png')} />
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text
                          style={{
                            textAlign: 'left',
                            fontSize: 15,
                            color: '#000000',

                          }}>
                          Cart
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: -15,
                          borderRadius: 25,
                          backgroundColor: '#ffcc00',
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'white',

                          }}>
                          1
                        </Text>
                      </View>
                    </View>

                    <FlatList
                      horizontal
                      data={DATA}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            backgroundColor: 'white',
                            height: 200,
                            width: 175,
                            marginTop: 10,
                            marginHorizontal: 15,
                            // marginLeft: 20,
                            borderRadius: 25,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            elevation: 2,
                            flex: 1
                          }}>
                          <View
                            style={{
                              marginTop: 20,
                              width: 100,
                              height: 100,
                              borderRadius: 100 / 2,
                              backgroundColor: '#fceeb5', flex: 0.6
                            }}>
                            <Image
                              resizeMode="contain"
                              style={{
                                width: 90,
                                marginTop: 6,
                                height: 90,
                                borderRadius: 90 / 2,
                                alignSelf: 'center',
                              }}
                              source={require('../assets/dumble.png')}
                            />
                          </View>
                          <View
                            style={{
                              marginTop: 6,
                              width: '100%',
                              flexDirection: 'column', flex: 0.5, justifyContent: "center", alignItems: "stretch"

                            }}>
                            <Text
                              style={{
                                // marginTop: 25,
                                marginLeft: 25,
                                fontSize: 12,
                                color: 'black',

                                fontWeight: 'bold',
                              }}>
                              The Flexibell
                            </Text>

                            <View
                              style={{
                                marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4,
                              }}>

                              <Text
                                style={{
                                  // marginTop: 15,
                                  marginLeft: 10,
                                  fontSize: 12,
                                  color: 'black',

                                  fontWeight: '500',
                                }}>
                                $ 498.00
                              </Text>


                              <TouchableOpacity style={{ borderBottomRightRadius: 25, alignItems: "center" }}>

                                <View
                                  style={{
                                    alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: '#ffcc00',
                                  }}>
                                  <Image
                                    source={require('../assets/delete.png')}
                                    resizeMode="contain"
                                    style={{
                                      width: 15,
                                      height: 20, alignSelf: 'center'
                                    }}
                                  />
                                </View>
                              </TouchableOpacity>

                            </View>
                          </View>
                        </View>
                      )}
                    />
                    <View
                      style={{
                        marginBottom: 20,
                        flexDirection: 'row',
                        height: 50,
                        marginHorizontal: 20,
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setCartAddedPopUp(!CartAddedPopUp);
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            width: 200,
                            flex: 1,
                            backgroundColor: '#ffcc00',
                            borderRadius: 35,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 15,
                              color: 'white',

                              fontWeight: '700',
                            }}>
                            Continue Shopping
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          gotoshippingdetails();
                          setCartAddedPopUp(!CartAddedPopUp);
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            width: 120,
                            flex: 1,
                            backgroundColor: '#ffcc00',
                            borderRadius: 35,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 15,
                              color: 'white',

                              fontWeight: '700',
                            }}>
                            Buy Now
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null} */}
        </ScrollView>)
        :
        (<CustomLoader showLoader={isLoading} />
          // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          //   <ActivityIndicator size="large" color="#ffcc00" />
          // </View>
        )}
    </SafeAreaView >
  );
};

export default Shop;
