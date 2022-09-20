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

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const MenTshirts = props => {

  const [FilterPopup, setFilterPopUp] = useState(false);
  const [ischecked, setChecked] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [shopitems, setshopitems] = useState([]);

  const gotoShippingDetail = (item) => {
    props.navigation.navigate('ProductDetail', {
      ITEM: item
    });
  };

  console.log("Cloth_storeId......:", props?.route?.params?.SHOPID);
  const FitnessID = props?.route?.params?.SHOPID;
  console.log("CLoth_categoryID......:", props?.route?.params?.categoryID);
  const categoryID = props?.route?.params?.categoryID;

  useEffect(() => {
    CLOTHStoresProduct();

    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   FitnessStoresProduct();

    // });
    // return unsubscribe;

  }, []);

  const CLOTHStoresProduct = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_PRODUCTLIST}`, { 'shop_id': FitnessID, "category_id": categoryID }, { headers: { "Authorization": ` ${Token}` } });
      console.log(":::::::::SHOP_PRODUCTLISTStore_Response>>>", response.data.products);
      console.log("status _SHOP_PRODUCTLIST", response.data.status);

      setshopitems(response.data.products)
      setIsLoading(false);

    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      Alert.alert("Catch error msg FitnessEquipment !!!!")
      setIsLoading(false);
    }

  };
  const ShopFilter = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    console.log("SHOP filter...........>>>", ischecked);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_FILTER}`, { "search": ischecked, "shop_id": FitnessID }, { headers: { "Authorization": ` ${Token}` } });
      console.log(":::::Shop_FIlter>>>", response.data.data);
      console.log("SHOP_Status", response.data.status);
      if (response.data.status == 1) {
        setFilterPopUp(false)
        setshopitems(response.data.data)
        setIsLoading(false);


      } else {
        Alert.alert(" If-else status 0 !");
        setIsLoading(false);
      }

    }
    catch (error) {
      // console.log("......error.........", error.response.data.message);
      Alert.alert(" Error in filter api catch part!");
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
        (<>
          {
            shopitems.length != 0 ?
              (<ScrollView>
                <View style={{ height: 60, flexDirection: 'row', flex: 1, justifyContent: "flex-start", alignItems: "flex-start", width: "95%", marginHorizontal: 18 }}>
                  <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flex: 0.45, }}>
                    <Text
                      style={{
                        // marginLeft: 1,
                        marginTop: 20,
                        textAlign: 'left',
                        fontSize: 18,
                        color: 'black',
                        fontWeight: "bold"
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
                  style={{ margin: 10 }}
                  numColumns={2}
                  data={shopitems}
                  renderItem={({ item }) => (

                    <TouchableOpacity
                      onPress={() => {
                        // gotoShippingDetail(item) 
                      }}
                      style={{
                        marginBottom: 6,
                        backgroundColor: '#f7f7f7',
                        height: 200,
                        width: WIDTH * 0.45,
                        marginTop: 10,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: "center",
                        marginHorizontal: 6,
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
                            fontSize: 12,
                            color: 'black', fontWeight: "bold"

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
                              color: 'black', fontWeight: "bold"

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

                  )}
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
                <Text style={{fontSize:14,fontWeight:"bold"}}>No data found</Text>
              </View>)
          }

        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
};
export default MenTshirts;
