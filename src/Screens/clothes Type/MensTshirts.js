import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Pressable,
  Modal,
  SafeAreaView,
  ActivityIndicator, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import CustomLoader from '../../Routes/CustomLoader';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const MenTshirts = props => {

  const [FilterPopup, setFilterPopUp] = useState(false);
  const [ischecked, setChecked] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [shopitems, setshopitems] = useState([]);

  const gotoShippingDetail = (item) => {
    // console.log("product filter api:", item);
    props.navigation.navigate('ProductDetail', {
      MENSITEM: item
    });
  };

  // console.log("Cloth_storeId......:", props?.route?.params?.SHOPID);
  const FitnessID = props?.route?.params?.SHOPID;
  // console.log("CLoth_categoryID......:", props?.route?.params?.categoryID);
  const categoryID = props?.route?.params?.categoryID;

  useEffect(() => {


    const unsubscribe = props.navigation.addListener('focus', () => {
      CLOTHStoresProduct();

    });
    return unsubscribe;

  }, []);

  const CLOTHStoresProduct = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_PRODUCTLIST}`, { 'shop_id': FitnessID, "category_id": categoryID }, { headers: { "Authorization": ` ${Token}` } });
      // console.log(":::::::::SHOP_PRODUCTLISTStore_Response>>>", response.data.products);
      // console.log("status _SHOP_PRODUCTLIST", response.data.status);
      if (response.data.status == 1) {
        setshopitems(response.data.products)
        // setIsLoading(false);
      }
      else {
        // setIsLoading(false);
        Alert.alert('', 'Something went wrong please exit the app and try again');
      }

    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log("CLOTHStores_Producterror.........", error.response.data.message);
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // setIsLoading(false);
    }
    setIsLoading(false);
  };

  const ShopFilter = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    // console.log("SHOP filter...........>>>", ischecked, FitnessID);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_FILTER}`, { "search": ischecked, "shop_id": FitnessID, "category_id": categoryID }, { headers: { "Authorization": ` ${Token}` } });
      // console.log(":::::Shop_FIlter>>>", response.data.data);
      // console.log("SHOP_Status", response.data.status);
      if (response.data.status == 1) {
        setFilterPopUp(false);
        setshopitems(response.data.data)
        // setIsLoading(false);
      } else {
        setFilterPopUp(false);
        Alert.alert('!', 'Something went wrong please exit the app and try again');
        // setIsLoading(false);
      }

    }
    catch (error) {
      // console.log(".....ShopFilter.error.........", error.response.data.message);
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // setIsLoading(false);
    }
    setIsLoading(false);
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
        (<>
          {
            shopitems.length != 0 ?
              (<ScrollView>
                <View style={{ height: 50, flexDirection: 'row', flex: 1, justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                  <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flex: 0.45, }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        marginTop: 20,
                        textAlign: 'left',
                        fontSize: 18,
                        color: 'black',
                        fontWeight: "500"
                      }}>
                      Clothing Store
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", position: "absolute", right: 20, top: 18, flex: 1, width: 40, height: 30 }}>
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

                  numColumns={2}
                  columnWrapperStyle={{
                    flex: 1,
                    justifyContent: "space-between"
                  }}
                  data={shopitems}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item, index }) => {
                    return (

                      <TouchableOpacity
                        onPress={() => {
                          gotoShippingDetail(item)
                        }}
                        style={{
                          marginBottom: 6,
                          backgroundColor: '#f7f7f7',
                          height: 200,
                          width: WIDTH * 0.45,
                          marginTop: 15,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: "center",
                          marginHorizontal: 10,
                          shadowColor: '#000000',
                          shadowOffset: {
                            width: 0,
                            height: 3
                          },
                          shadowRadius: 5,
                          shadowOpacity: 1.0,
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
                            source={{ uri: item.product_image }}
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
                              marginLeft: 16,
                              fontSize: 14,
                              color: 'black', fontWeight: "500"

                            }}>
                            {item.product_name.slice(0, 15) + '...'}
                          </Text>

                          <View
                            style={{
                              marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3,
                            }}>

                            <Text
                              style={{
                                fontSize: 12,
                                color: 'black', fontWeight: "500"

                              }}>$ {item.product_price}
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
                  }}
                />



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
                      // justifyContent: 'flex-end',
                      // alignItems: 'center',
                      backgroundColor: 'rgba(140, 141, 142, 0.7)',
                    }}>
                    <TouchableOpacity onPress={() => setFilterPopUp(false)}
                      style={{ flex: 1, }}
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
                              fontWeight: "400",
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




              </ScrollView>)
              :
              (<View style={{
                flex: 1, justifyContent: "center", alignItems: "center", width: "100%",
                height: 200
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
        (<CustomLoader showLoader={isLoading} />)}
    </SafeAreaView>
  );
};
export default MenTshirts;
