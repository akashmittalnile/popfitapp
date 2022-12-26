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
  Pressable, SafeAreaView, Dimensions, ScrollView, RefreshControl, Platform, Modal
} from 'react-native';
 
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import CustomLoader from '../../Routes/CustomLoader';
import CancelSubscription from './CancelSubscription';
import { useTranslation } from 'react-i18next';
import * as IAP from 'react-native-iap';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const SubscriptionPlan = (props) => {
  const { t } = useTranslation();
  const [checktoken, setchecktoken] = useState("");
  const [SubscriptionsId, setSubscriptionsId] = useState([]);
  const [activeplan, setActiveplan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);
  const [subscriptionData, SetSubscriptionData] = useState([]);

  //data : subscription data
  const items = Platform.select({
    ios: [
      'Popfiit_monthly',
      'Popfiit_yearly',
    ],
    android: [''],
  });
  //function : imp function
  const validate = async receipt => {
    const receiptBody = {
      'receipt-data': receipt,
      password: 'f5802c2403f5474a91278e6cca6b65a0',
    };
    const result = await IAP.validateReceiptIos(receiptBody, false)
      .catch(err => {
        console.log('error in validateReceiptIos', err);
      })
      .then(receipt => {
        console.log('the recipt is==>>', receipt);
        try {
          const renewalHistory = receipt.latest_receipt_info;
          const expiration =
            renewalHistory[renewalHistory.length - 1].expires_date_ms;
          let expired = Date.now() > expiration;
          if (!expired) {
            console.log('setpurchase(True)');
          } else {
            // Alert.alert('Purchase Expired\nyour subscription has expired , please re-subscribe to continue',)
            console.log('Purchase Expired\nyour subscription has expired , please re-subscribe to continue',);

          }
        } catch (error) { }
      });
  };
  const Ioscheckplan = async () => {
    if (Platform.OS === 'ios') {
      let purchaseUpdatedListener;
      let purchaseErrorListener;


      IAP.initConnection()
        .catch(() => {
          console.error('error connecting to store..');
        })
        .then(async () => {
          console.log('connected to store...');
          IAP.getSubscriptions({ skus: items })
            .catch(function (error) {
              console.error('error finding purchases', error);
            })
            .then(function (res) {
              console.log('got product', res);
              SetSubscriptionData(res);

            });

        });


      purchaseErrorListener = IAP.purchaseErrorListener(error => {
        if (error['responseCode'] === '2') {
        } else {
          Alert.alert("error", 'There has been an error with your purchase,error code = ' + error['code']);
        }
      });
      purchaseUpdatedListener = IAP.purchaseUpdatedListener(purchase => {
        try {
          const receipt = purchase.transactionReceipt;
        } catch (error) {
          console.log('error', error);
        }
      });
    }
  }
  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    GetSubscriptionPlan();
    setrefreshing(false)
  }
  useEffect(() => {
    GetSubscriptionPlan();
    Ioscheckplan();
}, []);



  const checklogin = async (item) => {
    let Usertoken = await AsyncStorage.getItem("authToken");
    // console.log("token.......", Usertoken);
    setchecktoken(Usertoken);
    if (Usertoken == null) {
      Alert.alert('', t('Please_login_first'))
      // props.navigation.navigate('LoginMain', {
      //   screen: 'LoginSignUp',

      // });

    }
    else {
      // GetSubscriptionPlan(item.id);
      props.navigation.navigate("PaymentScreen", {
        SubscriptionPlan: item
      });
      // console.log("??????????????error", item.id);
    }
  };

  const purchasePlan = async (item, offerToken) => {

    setIsLoading(true)
    {
      const index = subscriptionData.findIndex(e => e.title.toUpperCase() == item.title.toUpperCase());
      console.warn("index", index);

      if (index > -1) {
        try {
          var data = await IAP.requestSubscription(
            { sku: subscriptionData[index].productId }, (offerToken && { subscriptionOffers: [{ sku: subscriptionData[index].productId, offerToken }] }),
          );
          console.log('check Ashish data is==>>', data);
          const receipt = data.transactionReceipt;
          setIsLoading(false);
          if (receipt) {
            buyPlanInIos(item, data.transactionReceipt);
          } else {
            console.log('i am here ');
          }
        } catch (error) {
          console.error('error in purchasePlan', error);
          setIsLoading(false);
        }
      } else {
        Alert.alert("", 'This plan does not exist');
         
        setIsLoading(false);
      }
    }
  };
  const GetSubscriptionPlan = async () => {

    let usertkn = await AsyncStorage.getItem("authToken");
    // console.log(".....usertoken..PLAN_IN...", usertkn);

    setIsLoading(true)
    try {
      const response = await axios.get(`${API.SUBSCRIPTION_PLAN}`,
        { headers: { "Authorization": ` ${usertkn}` } }
      )

      // console.log("ResponseSUBscribtion_plan ::::", response.data);
      if (response.data.status == 1) {
        setSubscriptionsId(response.data.data)
        setActiveplan(response.data)
        // console.log("SUBSCRIPTION_plan_data!!!>>>", response.data.data);

      }
    }
    catch (error) {
      // Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log('error in getAllMemberShipPlan', error);

    }
    setIsLoading(false)
  };

  const cancelMemberShip = async (subs_id) => {


    let usertkn = await AsyncStorage.getItem("authToken");
    // console.log("... PLAN_ID...", subs_id);


    setIsLoading(true)
    try {
      const response = await axios.post(`${API.CANCEL_SUBSCRIPTION}`, { 'subscriptions_id': subs_id },
        { headers: { "Authorization": ` ${usertkn}` } }
      );

      // console.log("ResponseSUBscribtion_plan ::::", response.data);
      if (response.data.status == 1) {
        props.navigation.goBack();
        Alert.alert("",  t('Subscription_canceled_successfully'))
        // console.log("SUBSCRIPTION_plan_data!!!>>>", response.data);

      }
    }
    catch (error) {
      // Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log('error in cancelMemberShip', error);
    }
    setIsLoading(false)
  }
  const showAlert = (subs_id) =>
    Alert.alert(
      "",
       t('Are_you_sure_you_want_to_cancel_subscription'),
      [
        {
          text: t('Cancel'),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => { cancelMemberShip(subs_id) }

        },
      ],
      {
        cancelable: true,
      }
    );
  const cancelMemberShipIos = () => {
    setShowCancelSubscription(true);
  }
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
      <ScrollView 
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        {!isLoading ?
          (<View>
            {
              activeplan?.my_subscriber_status === "Active" ?

                (<>
                  <View style={{ marginLeft: 10, marginTop: 5, height: 50, width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}  >
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#000', fontWeight: "500" }} >{t('My_Plan')}</Text>
                  </View>
                  <View style={{
                    height: 122, width: "94%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginHorizontal: 10, borderRadius: 20, padding: 4, backgroundColor: '#FFCC00'
                  }}>
                    <View
                      style={{

                        marginTop: 8,

                        height: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        width: 100,
                        right: 10,

                      }}>


                      <View style={{ flexDirection: "row", width: 60, justifyContent: "center", alignItems: 'center' }}>
                        <Image source={require('../assets/Ellipsewhite.png')}
                          style={{
                            width: 8,
                            height: 8, borderRadius: 50, marginRight: 8
                          }} />
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                          <Text style={{ textAlign: 'left', fontSize: 14, color: 'white', }}>{t('Active')}</Text>
                        </View>

                      </View>


                    </View>

                    <View style={{ flexDirection: "row" }}>

                      <View style={{ justifyContent: 'center', width: 55, height: 55, borderRadius: 55 / 2, backgroundColor: "#ffcc00", marginHorizontal: 10, marginTop: 10 }}>
                        <Image
                          source={require('../assets/activeplan.png')}
                          resizeMode="contain"
                          style={{
                            width: 60,
                            height: 60, alignSelf: 'center',
                          }} />
                      </View>
                      <View style={{
                        height: 60, width: "40%", flexDirection: 'column', alignItems: "flex-start",
                        justifyContent: "center", marginTop: 6, marginLeft: 14
                      }}>
                        <Text style={{
                          // backgroundColor:"red",
                          textAlign: 'left',
                          fontSize: 20,
                          color: '#FFFFFF',
                          fontWeight: "500"
                        }}>
                          {activeplan?.my_subscriber?.plan_name}
                        </Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Text
                            style={{
                              // marginLeft: 10,
                              // marginTop: 10,
                              textAlign: 'center',
                              fontSize: 22,
                              color: '#FFFFFF',
                              fontWeight: "500"
                            }}>{activeplan?.currency}
                            {activeplan?.my_subscriber?.amount}/
                            <Text style={{
                              // backgroundColor:"red",
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#FFFFFF',

                              fontWeight: "500"
                            }}> {activeplan?.my_subscriber?.plan_type}
                            </Text></Text>

                        </View>
                      </View>

                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        Platform.OS === 'android'
                          ? showAlert(activeplan?.my_subscriber?.subscr_id)
                          :
                          cancelMemberShipIos()

                      }
                      style={{
                        marginLeft: 90,
                        height: 30, width: 100, flexDirection: 'column', alignItems: "center",
                        justifyContent: "center", marginTop: 10, backgroundColor: "#FED945", borderRadius: 50, borderWidth: 1, borderColor: "#FFFFFF"
                      }}>
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: "400", textAlign: "center" }}>{t('Cancel')}</Text>
                    </TouchableOpacity>
                  </View>
                </>)
                :
                (<>
                  <View style={{ marginLeft: 10, marginTop: 5, height: 50, width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}  >
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#000', fontWeight: "500" }} >{t('My_Plan')}</Text>
                  </View>
                  <View style={{
                    height: 122, width: "94%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginHorizontal: 10, borderRadius: 20, padding: 4, backgroundColor: '#FFCC00'
                  }}>
                    <View
                      style={{

                        marginTop: 8,

                        height: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        width: 100,
                        right: 10,

                      }}>


                      <View style={{ flexDirection: "row", width: 60, justifyContent: "center", alignItems: 'center' }}>
                        <Image source={require('../assets/Ellipsewhite.png')}
                          style={{
                            width: 8,
                            height: 8, borderRadius: 50, marginRight: 8
                          }} />
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                          <Text style={{ textAlign: 'left', fontSize: 14, color: 'white', }}>{t('Active')}</Text>
                        </View>

                      </View>


                    </View>

                    <View style={{ flexDirection: "row" }}>

                      <View style={{ justifyContent: 'center', width: 55, height: 55, borderRadius: 55 / 2, backgroundColor: "#ffcc00", marginHorizontal: 10, marginTop: 10 }}>
                        <Image
                          source={require('../assets/activeplan.png')}
                          resizeMode="contain"
                          style={{
                            width: 60,
                            height: 60, alignSelf: 'center',
                          }} />
                      </View>
                      <View style={{
                        height: 60, width: "40%", flexDirection: 'column', alignItems: "flex-start",
                        justifyContent: "center", marginTop: 6, marginLeft: 14
                      }}>
                        <Text style={{
                          // backgroundColor:"red",
                          textAlign: 'left',
                          fontSize: 20,
                          color: '#FFFFFF',
                          fontWeight: "500"
                        }}>{t('Free')}
                        </Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Text
                            style={{
                              // marginLeft: 10,
                              // marginTop: 10,
                              textAlign: 'center',
                              fontSize: 22,
                              color: '#FFFFFF',
                              fontWeight: "500"
                            }}>0
                            <Text style={{
                              // backgroundColor:"red",
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#FFFFFF',

                              fontWeight: "500"
                            }}> {activeplan?.my_subscriber?.plan_type}
                            </Text></Text>

                        </View>
                      </View>

                    </View>


                  </View>
                </>)
            }
            <>

            </>
            {/* <View style={styles.navigationBarColor}>
            <View style={styles.navigationBarLeftContainer}>
              <TouchableOpacity
                onPress={() => {
                  buttonClickedHandler();
                }}>
                <Image
                  source={require('../assets/leftArrowWhite.png')}
                  style={{
                    width: 30,
                    height: 25,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.navigationBarCenterContainer}>
              <TouchableOpacity>
                <Image resizeMode='contain'
                  source={require('../assets/layerCenter.png')}
                  style={{
                    width: 80,
                    height: 50,
                    alignSelf: 'center',
                  }}
                />
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


            <View style={{
              paddingBottom: 80, alignItems: "center",
              justifyContent: "center", marginTop: 15
            }}>

              <FlatList
                data={SubscriptionsId}
                numColumns={2}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      {index == 0 ? <></>
                        :
                        <View
                          style={{

                            backgroundColor: "#ffcc00",
                            marginTop: 10,
                            marginHorizontal: 5,
                            borderRadius: 20,
                            width: WIDTH * 0.60,
                            height: 210,



                          }}>
                          <View style={{
                            height: 30, borderRadius: 20, flexDirection: 'row', alignItems: "center",
                            justifyContent: "center", flex: 1, width: "100%",
                          }}>
                            <View
                              style={{
                                flex: 0.6,
                                height: 45,
                                flexDirection: 'row',
                                borderTopLeftRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                              }}>
                              <Text
                                style={{
                                  width: 90,
                                  // marginLeft: 10,
                                  // marginTop: 10,
                                  textAlign: 'center',
                                  fontSize: 16,
                                  color: 'white',
                                  fontWeight: "500"

                                }}>
                                {item?.title}
                              </Text>
                            </View>
                            {/* <View
                      style={{
                        flex: 0.4, height: 60, borderTopRightRadius: 20, alignItems: "center",
                        justifyContent: "center"
                      }}>
                      <BackgroundImage
                        // resizeMode="contain"
                        source={require('../assets/dotted.png')}
                        style={{
                          borderTopRightRadius: 20,
                          // flex: 1,
                          height: 50,
                          width: 80,
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            position: "absolute",
                            top: 11,
                            right: 10,
                            width: 20,
                            height: 20,
                            borderColor: 'white',
                            borderWidth: 5,
                            borderRadius: 20 / 2,
                            alignItems: "center",
                            justifyContent: "center"
                          }}></View>
                      </BackgroundImage>
                    </View> */}
                          </View>
                          {/* // plan price */}
                          <View style={{
                            height: 30, width: "100%", flexDirection: 'column', alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <Text
                                style={{
                                  // marginLeft: 10,
                                  // marginTop: 10,
                                  textAlign: 'center',
                                  fontSize: 20,
                                  color: 'white',

                                  fontWeight: "500"
                                }}>{item?.price}{item?.type == "Weekly" ? null : "/"}<Text style={{
                                  // backgroundColor:"red",
                                  textAlign: 'left',
                                  fontSize: 12,
                                  color: 'white',

                                  fontWeight: "500"
                                }}> {item?.type == "Weekly" ? null : item?.type}</Text></Text>
                              {/* <Text
                          style={{
                            // backgroundColor:"red",
                            marginLeft: 2,
                            textAlign: 'center',
                            fontSize: 14,
                            color: 'white',
                            flex: 0.3,
                            fontWeight: "500"
                            // marginTop: 10,
                          }}>{item.price}/</Text>
                      <Text */}
                              {/* style={{
                          // backgroundColor:"red",
                          textAlign: 'left',
                          fontSize: 10,
                          color: 'white',
                          flex: 0.5,
                          fontWeight: "500"
                        }}>
                        {item.type}
                      </Text> */}
                            </View>
                          </View>

                          {/* description */}
                          <View style={{
                            width: "100%",
                            alignItems: "flex-start",
                            // justifyContent: "center",
                            paddingVertical: 2, height: 100
                          }}>
                            <View
                              style={{
                                marginHorizontal: 10,
                                height: 30,
                                flexDirection: 'row',

                                // marginBottom: 6,
                                // backgroundColor: "pink",
                                justifyContent: "center",
                                alignItems: "center"
                              }}>
                              <View
                                style={{
                                  marginTop: -10,
                                  // alignItems: "flex-start",
                                  // justifyContent: "flex-start",
                                  backgroundColor: 'white',
                                  borderRadius: 20,
                                  height: 5,
                                  width: 5,
                                }}></View>
                              <View style={{ marginLeft: 5, alignItems: 'center' }}>
                                <Text numberOfLines={2}
                                  style={{
                                    // 
                                    textAlign: 'left',
                                    fontSize: 10,
                                    color: 'white',
                                    fontWeight: "500"

                                  }}>{item?.title_1}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                marginHorizontal: 10,
                                height: 30,
                                flexDirection: 'row',

                                // marginBottom: 6,
                                // backgroundColor: "pink",
                                justifyContent: "center",
                                alignItems: "center"
                              }}>
                              <View
                                style={{
                                  marginTop: -10,
                                  // alignItems: "flex-start",
                                  // justifyContent: "flex-start",
                                  backgroundColor: 'white',
                                  borderRadius: 20,
                                  height: 5,
                                  width: 5,
                                }}></View>
                              <View style={{ marginLeft: 5, alignItems: 'center' }}>
                                <Text numberOfLines={2}
                                  style={{
                                    // 
                                    textAlign: 'left',
                                    fontSize: 10,
                                    color: 'white',
                                    fontWeight: "500"

                                  }}>{item?.title_2}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                marginHorizontal: 10,
                                height: 30,
                                flexDirection: 'row',

                                // marginBottom: 6,
                                // backgroundColor: "pink",
                                justifyContent: "center",
                                alignItems: "center"
                              }}>
                              <View
                                style={{
                                  marginTop: -10,
                                  // alignItems: "flex-start",
                                  // justifyContent: "flex-start",
                                  backgroundColor: 'white',
                                  borderRadius: 20,
                                  height: 5,
                                  width: 5,
                                }}></View>
                              <View style={{ marginLeft: 5, alignItems: 'center' }}>
                                <Text numberOfLines={2}
                                  style={{
                                    // 
                                    textAlign: 'left',
                                    fontSize: 10,
                                    color: 'white',
                                    fontWeight: "500"

                                  }}>{item?.title_3}
                                </Text>
                              </View>
                            </View>
                            {/* <View
                        style={{
                          marginHorizontal: 10,
                          height: 15,
                          flexDirection: 'row', flex: 0.3, 
                          marginBottom: 6,
                          justifyContent:"center",alignItems:"center"
                        }}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 20,
                            height: 5,
                            width: 5,
                          }}></View>
                        <View style={{ marginLeft: 5, height: 10, alignItems: 'center' }}>
                          <Text
                            style={{
                              // marginTop: -4,
                              textAlign: 'left',
                              fontSize: 10,
                              color: 'white',
                              fontWeight: "500"

                            }}>
                            {item.title_2}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginHorizontal: 10,
                          height: 15,
                          flexDirection: 'row', flex: 0.4
                          , justifyContent:"center",alignItems:"center"
                        }}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 20,
                            height: 5,
                            width: 5,
                          }}></View>
                        <View style={{ marginLeft: 5, height: 10, alignItems: 'center' }}>
                          <Text
                            style={{
                              // marginTop: -4,
                              textAlign: 'left',
                              fontSize: 10,
                              color: 'white',
                              fontWeight: "500"
                            }}>
                             {item.title_3}
                          </Text>
                        </View>
                      </View> */}
                          </View>

                          <View style={{
                            flex: 1, flexDirection: 'row', width: "100%", alignItems: "flex-start",
                            justifyContent: "flex-start", height: 50,
                          }}>
                            <View
                              style={{ flex: 0.4, height: 40, borderBottomLeftRadius: 20, }}>
                              <BackgroundImage
                                source={require('../assets/leftCurve.png')}
                                style={{ height: 90, alignItems: "center", justifyContent: 'center', }}></BackgroundImage>
                            </View>
                            <View
                              style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                // flexDirection: 'row',
                                alignItems: "center",
                                height: 30,
                                // marginTop: 6,

                              }}>
                              {item?.title === "Free" ?
                                (<TouchableOpacity
                                  onPress={() => props.navigation.goBack()}
                                  style={{ borderRadius: 50, }}>
                                  <View
                                    style={{
                                      // marginLeft: 10,
                                      justifyContent: 'center',
                                      backgroundColor: 'white',
                                      width: 120,
                                      height: 30,
                                      borderRadius: 50,
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: '#c79d3a',
                                        fontWeight: "500"

                                      }}>
                                      {t('Free')}
                                    </Text>
                                  </View>
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity onPress={() => { Platform.OS === 'android' ? checklogin(item) : purchasePlan(item) }}
                                  style={{ borderRadius: 50, }}>
                                  <View
                                    style={{
                                      // marginLeft: 10,
                                      justifyContent: 'center',
                                      backgroundColor: 'white',
                                      width: 140,
                                      height: 30,
                                      borderRadius: 50,
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: '#c79d3a',
                                        fontWeight: "500"

                                      }}>
                                      {t('Subscribe_Now')}
                                    </Text>
                                  </View>
                                </TouchableOpacity>)

                              }

                            </View>
                          </View>
                        </View>}
                    </>


                  )
                }
                }
              />
            </View>
            
            <CancelSubscription
              visible={showCancelSubscription}
              setVisibility={setShowCancelSubscription}
            />
          </View>)
          :
          (<CustomLoader showLoader={isLoading} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SubscriptionPlan;
