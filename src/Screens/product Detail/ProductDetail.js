import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, Modal, ScrollView, RefreshControl } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
// import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Headers from '../../Routes/Headers';
import styles from '../../Routes/style'
import { API } from '../../Routes/Urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from 'regenerator-runtime';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;



const ProductDetail = (props) => {

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [productdata, setproductdata] = useState([]);
  const [useraddress, setuseraddress] = useState([]);
  const [isdiscount, setDiscount] = useState('');
  const [Productitems, setProductitems] = useState("");

  const [ImageBaseUrl, setImageBaseUrl] = useState('');
  const [countnums, setCountnum] = useState(1);
  const [usertoken, setUsertoken] = useState("");

  const [currenysymbol, SetCurrenysymbol] = useState('')


  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    StoresProductDetails();
    setrefreshing(false)
  }
  // const gotoShippingDetail = () => {
  //   // setCartAddedPopUp(false);
  //   props.navigation.navigate("ShippingDetail");
  // }



  // const Productincrease = () => {
  //   console.log(".before.", countnums);
  //   if (countnums < 10) {
  //     var Num = countnums + 1;
  //     setCountnum(+Num);
  //     console.log(".numm.", Num);

  //     console.log("..", countnums);
  //   }
  // };
  // const Productdecrease = () => {
  //   if (countnums > 1) {
  //     setCountnum(countnums - 1);

  //   }
  // };


  console.log("Store_item...............:", props?.route?.params?.ITEM?.id);
  const ITEM = props?.route?.params?.ITEM?.id
  // console.log("ClothITEM_item...............:", props?.route?.params?.CLOTHITEM?.id);
  const CLOTHITEM = props?.route?.params?.CLOTHITEM?.id
  // console.log("FitnessItem.........:",props?.route?.params?.FitnessItem?.id);
  const FitnessItem = props?.route?.params?.FitnessItem?.id
  // console.log("MENSITEM.........:",props?.route?.params?.MENSITEM?.id);
  const MENSITEM = props?.route?.params?.MENSITEM?.id
  // console.log("Cart item view.........:", props?.route?.params?.Cartaddedview?.product_id);
  let Cartaddedview = props?.route?.params?.Cartaddedview?.product_id;
  // console.log("Shipping item view.........:", props?.route?.params?.Isshippingview?.product_id);
  let Isshippingview = props?.route?.params?.Isshippingview?.id;

  let productids = ITEM ? ITEM : CLOTHITEM ? CLOTHITEM : FitnessItem ? FitnessItem : MENSITEM ? MENSITEM : Cartaddedview ? Cartaddedview : Isshippingview;

  useEffect(() => {
    UserToken();
    StoresProductDetails();
    // const unsubscribe = props.navigation.addListener('focus', () => {

    //   GetShippingProducts();

    // });
    // return unsubscribe;


  }, [props]);

  const StoresProductDetails = async () => {
    // console.log("ProductStore get.....;;;;;", ITEM);
    // console.log("ProductClothITEM get.....;;;;;", CLOTHITEM);
    // const productitem = ITEM;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.STORE_PRODUCT_DETAIL}`, { "product_id": productids });
      console.log(":::::::::Shop_product_Response>>>", response.data.data);
      // console.log("status _SHOP:", response.data.status);
      SetCurrenysymbol(response.data.currency)
      setProductitems(response.data.data);
      setImageBaseUrl(response.data.product_url);
      discountPercentage(response.data.data.reg_price, response.data.data.price)
    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("......StoresProductDetails_error.........", error.response.data.message);
    }
    setIsLoading(false);
  };
  const GetShippingProducts = async () => {

    // console.log(".....usertoken.....GetShippingProducts...", producttoken);

    setIsLoading(true);
    try {
      const response = await axios.get(`${API.SHIPPING_DETAILS}`);
      // console.log("", response);
      // console.log("ResponseShippingProducts(product) ::::", response.data.data);
      setproductdata(response.data.data);
      setuseraddress(response.data.address_lists);
      // console.log("User_token_not_received+yet!!!>>>", response.data.message);


    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("ShippingProductserror:::", error.response.data.message);

    }
    setIsLoading(false)
  };
  const UserToken = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    // console.log("TOKEN:", usertkn);
    setUsertoken(usertkn)
  }
  const ProductADDcart = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");


    // console.log("ADD_productin_QNTY cart.....", countnums);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.PRODUCT_DETAILS_ADD_ITEM}`, { "qty": countnums, "product_id": productids }, {
        'headers': { "Authorization": ` ${usertkn}` }
      });
      // console.log(":::::::::ProductADD_Response>>>", response.data.message);
      // console.log("status _ProductADD:", response.data.status);
      if (response.data.status == 1) {
        props.navigation.navigate("CartAdded")
        // GetShippingProducts();
        // Alert.alert("Added to cart")

      }
      else {
        Alert.alert('', t('Error_msg'))

      }

    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("......error ProductADD.........", error.response.data.message);
    }
    setIsLoading(false);
  };

  // const ProductRemovecart = async (item) => {

  //   const cartaddid = item.cart_id;
  //   // console.log("Remove_productin cart.....", cartaddid);
  //   // setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM}`, { "cart_id": cartaddid });
  //     // console.log(":::::::::ProductRemovecart_Response>>>", response.data.message);
  //     // console.log("status _ProductRemovecart:", response.data.status);
  //     GetShippingProducts();
  //     // props.navigation.goBack();
  //     // setProductitems(response.data.data)
  //     // setIsLoading(false);
  //   }
  //   catch (error) {
  //     console.log("......ProductRemovecarterror.........", error.response.data.message);
  //     // setIsLoading(false);

  //   }

  // };
  // Discount = Marked Price - Selling price
  // Discount Percentage = (Discount / Marked Price) * 100
   

  function discountPercentage(M, S) {
    console.log("S,M", S, M);
    let fraction = S / M;
    let discount_fraction = 1 - fraction;
    let percentage = discount_fraction * 100;
    setDiscount(percentage)
    return percentage.toFixed(2) + "%";
}

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: '#ffffff',
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
        (
          <View style={{
            flex: 1,
            // width: WIDTH,
            // height: HEIGHT, 
            flexGrow: 1,

            backgroundColor: 'transparent',
          }}>

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              <View style={{ paddingBottom: 44 }}>
                {/* productitem _image */}
                <View style={{
                  width: "95%",
                  height: 200,
                  marginTop: 10,
                  // marginLeft: 15,
                  marginHorizontal: 10,
                  shadowColor: '#000',
                  // shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 6,
                  shadowOpacity: 0.2,
                  elevation: 3,
                  borderRadius: 15,
                  backgroundColor: '#F7F7F7',
                  marginTop: 20,
                  borderRadius: 20,
                  justifyContent: "center", alignItems: 'center',
                }}>
                  {/* <View style={{
                        marginHorizontal: 0, height: 30, alignItems: 'flex-end',backgroundColor: 'yellow',
                    }}>
                        <View style={{
                            width: 35, height: 35, marginTop: 10, marginRight: 10
                        }}>
                            <TouchableOpacity>
                                <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                                    <Image source={require('../assets/delete.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                  <View style={{
                    width: "100%",
                    height: 200, justifyContent: "center", alignItems: 'center',
                    //  backgroundColor: '#F7F7F7',
                    // backgroundColor: 'pink'
                  }}>

                    <Image resizeMode='contain'
                      style={{
                        width: "100%",
                        height: "100%",
                        alignSelf: 'center',
                        borderRadius: 20
                      }}
                      source={{ uri: Productitems?.image != null ? `${ImageBaseUrl + Productitems?.image[0]}` : "https://dev.pop-fiit.com/images/logo.png" }} />

                  </View>

                </View>

                <FlatList
                  horizontal
                  // style={{padding:5}}
                  keyExtractor={(item, index) => String(index)}
                  data={Productitems?.image}
                  renderItem={({ item, index }) =>
                    <View style={{
                      width: 110,
                      height: 100,
                      // marginLeft: 15,
                      marginHorizontal: 10,

                      shadowColor: '#000000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowRadius: 6,
                      shadowOpacity: 0.2,
                      elevation: 3,
                      borderRadius: 10,
                      borderColor: '#ffcc00',
                      borderWidth: 1,
                      backgroundColor: '#F7F7F7',
                      marginTop: 20,
                      marginBottom: 5,
                      justifyContent: "center",
                      alignItems: 'center',

                    }}>

                      <View style={{
                        width: 109,
                        height: 99, justifyContent: "center", alignItems: 'center',
                      }}>
                        <Image
                          source={{ uri: ImageBaseUrl + item }}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            height: "100%",
                            alignSelf: 'center',
                            borderRadius: 10
                          }}
                        />


                      </View>

                    </View>
                  }
                />

                <Text style={{ marginLeft: 20, marginTop: 20, textAlign: 'left', fontSize: 18, color: '#000000', fontWeight: "500" }}>{Productitems?.name?.slice(0, 40)}</Text>

                <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', width: "95%", height: 50, justifyContent: "center", alignItems: "center" }}>

                  <View style={{ flex: 1, marginLeft: 20, height: 30, width: 100, justifyContent: "center", alignItems: "flex-start" }}>
                    <View style={{height:32,width:"auto",backgroundColor:'#FF0000',justifyContent:'center',paddingHorizontal:7,borderRadius:5,}}
                    ><Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 14, color: '#ffff', fontWeight: "400",  }}>{t('Deal')}</Text></View>
                  
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#FF0000', fontWeight: "500",lineHeight:30 }}>-{Number(isdiscount).toFixed(0)}% <Text style={{ textAlign: 'left', fontSize: 18, color: '#000000', fontWeight: "500" }}>{currenysymbol}{Productitems?.price}</Text></Text>
                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#77869E', fontWeight: "500" }}>M.R.P.: <Text style={{ textAlign: 'left', fontSize: 14, color: '#77869E', fontWeight: "500", textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{currenysymbol}{Productitems?.reg_price}</Text></Text>
                  </View>

                </View>

                <View style={{ justifyContent: "flex-start", alignItems: "flex-start", width: "90%", marginLeft: 20, height: "auto", marginBottom: 20, marginTop: 20, }}>
                  <Text style={{ textAlign: 'left', fontSize: 15, color: '#000000', fontWeight: "500" }}>{t('Product_Details')}</Text>
                  <Text style={{ marginTop: 8, textAlign: 'left', fontSize: 14, color: '#000000', }}>{Productitems?.description}</Text>
                </View>



                {/* product view in modal  */}
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
                        // marginTop: 330,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        //paddingTop: 40,
                        height:  380,
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
                        // flex: 1
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

                        <View style={{ flex: 1 ,justifyContent:"center"}}>
                          <FlatList
                            horizontal
                            data={productdata}
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
                                    source={{ uri: item.product_image }}
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
                                    }}>{item.product_name.slice(0, 15) + '...'}</Text>

                                  <View
                                    style={{
                                      marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4,
                                    }}>

                                    <Text
                                      style={{
                                        // marginTop: 15,
                                        marginLeft: 8,
                                        fontSize: 12,
                                        color: 'black',

                                        fontWeight: '500',
                                      }}>$ {item.product_price}
                                    </Text>


                                    <TouchableOpacity onPress={() => { ProductRemovecart(item) }}
                                      style={{ borderBottomRightRadius: 25, alignItems: "center" }}>

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
                        </View>

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
                              setCartAddedPopUp(false);
                              buttonClickedHandler()
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
                              gotoShippingDetail()

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
              </View>
            </ScrollView>
            {/* bottom Buttons   */}
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: "center", alignItems: "center", height: 36, width: "100%", position: "absolute", bottom: 0, }}>

              <TouchableOpacity onPress={() => { props.navigation.navigate("Home") }}
                style={{ justifyContent: 'center', backgroundColor: '#ffcc00', borderRadius: 50, alignItems: "center", height: 34, width: 170 }}>


                <Text style={{ textAlign: 'center', fontSize: 13, color: 'white', }}>{t('Continue_Shopping')}</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                if (usertoken == null) {
                  Alert.alert('', t('Please_login_first'))
                } else if (usertoken != null) {
                  ProductADDcart()
                }

              }}
                style={{ justifyContent: 'center', height: 34, backgroundColor: '#ffcc00', borderRadius: 50, marginLeft: 10, width: 130 }}>
                <Text style={{ textAlign: 'center', fontSize: 13, color: 'white', fontWeight: "500" }}>{t('Add_To_Cart')}</Text>
                {/* {
Cartaddedview && Isshippingview == "" ?
(<Text style={{ textAlign: 'center', fontSize: 16, color: 'white', fontWeight: "500" }}>Add To Cart</Text>)
:
(<Text style={{ textAlign: 'center', fontSize: 16, color: 'white', fontWeight: "500" }}>Go To Cart</Text>)
} */}


              </TouchableOpacity>
            </View>
          </View>)
        :
        (<CustomLoader showLoader={isLoading} />
          // <View style={{ flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
          //   <ActivityIndicator size="large" color="#ffcc00" />
          // </View>
        )}
    </SafeAreaView>
  )
}

export default ProductDetail;
