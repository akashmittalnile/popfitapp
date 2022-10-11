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
  Pressable, SafeAreaView, Dimensions, ActivityIndicator, VirtualizedList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const SubscriptionPlan = (props, navigation) => {

  const [checktoken, setchecktoken] = useState("");
  const [SubscriptionsId, setSubscriptionsId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetSubscriptionPlan();
    // checklogin();
  }, [props, navigation]);

  const checklogin = async (item) => {
    let Usertoken = await AsyncStorage.getItem("authToken");
    console.log("token.......", Usertoken);
    setchecktoken(Usertoken);
    if (Usertoken == null) {
      props.navigation.navigate('LoginMain', {
        screen: 'LoginSignUp',

      });
      console.log("...............................");
    }
    else {
      // GetSubscriptionPlan(item.id);
      props.navigation.navigate("PaymentScreen",{
        SubscriptionPlan:item
      });
      console.log("??????????????error", item.id);
    }
  };

  const GetSubscriptionPlan = async () => {

    let Usertoken1 = await AsyncStorage.getItem("authToken");
    console.log(".....usertoken..PLAN_IN...", Usertoken1);

    setIsLoading(true)
    try {
      const response = await axios.get(`${API.SUBSCRIPTION_PLAN}`, { headers: { "Authorization": ` ${Usertoken1}` } });
      // console.log("", response);
      // console.log("ResponseSUBscribtion_plan ::::", response.data);
      if (response.data.status == 1) {
        setSubscriptionsId(response.data.data)
        // console.log("SUBSCRIPTION_plan_data!!!>>>", response.data.data);
        setIsLoading(false)

      }
    }
    catch (error) {
      console.log("SUBSCRIPTION_error:", error.response.data.message);
      setIsLoading(false)
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
        (<View >
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

          <ScrollView style={{}}>
            <View style={{
              paddingBottom: 80, alignItems: "center",
              justifyContent: "center",
            }}>
              <FlatList
                data={SubscriptionsId}
                numColumns={2}
                renderItem={({ item }) => (
                  <View
                    style={{
                      // backgroundColor: '#2147b3',
                      backgroundColor: "#ffcc00",
                      marginTop: 10,
                      marginHorizontal: 5,
                      borderRadius: 20,
                      width: "47%",
                      height: 200,
                      //  paddingBottom:100
                      // alignItems:"center",
                      justifyContent: "center",


                    }}>
                    <View style={{
                      height: 45, borderRadius: 20, flexDirection: 'row', alignItems: "center",
                      justifyContent: "center", flex: 1, width: "95%",
                    }}>
                      <View
                        style={{
                          flex: 0.6,
                          height: 50,
                          flexDirection: 'row',
                          borderTopLeftRadius: 20,
                          justifyContent: "center"
                        }}>
                        <Text
                          style={{
                            width: 90,
                            marginLeft: 10,
                            marginTop: 10,
                            textAlign: 'left',
                            fontSize: 16,
                            color: 'white',
                            fontWeight: "500"

                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View
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
                      </View>
                    </View>

                    <View style={{
                      height: 100, width: "100%", flexDirection: 'column', alignItems: "flex-start",
                      justifyContent: "flex-start", flex: 2
                    }}>
                      <View style={{
                        height: 30, flexDirection: 'row', flex: 1, alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Text
                          style={{
                            marginLeft: 10,
                            // marginTop: 10,
                            textAlign: 'left',
                            fontSize: 14,
                            color: 'white',
                            flex: 0.07,
                            fontWeight: "500"
                          }}>$</Text><Text
                            style={{
                              // backgroundColor:"red",
                              marginLeft: 2,
                              textAlign: 'left',
                              fontSize: 14,
                              color: 'white',
                              flex: 0.3,
                              fontWeight: "500"
                              // marginTop: 10,
                            }}>{item.price}</Text>
                        <Text
                          style={{
                            // backgroundColor:"red",
                            textAlign: 'left',
                            fontSize: 14,
                            color: 'white',
                            flex: 0.5,
                            fontWeight: "500"
                          }}>
                          {item.type}
                        </Text>
                      </View>

                      <View style={{
                        width: "100%", alignItems: "flex-start",
                        justifyContent: "flex-start", flex: 1, paddingVertical: 6
                      }}>
                        <View
                          style={{
                            marginHorizontal: 10,
                            height: 15,
                            flexDirection: 'row',
                            flex: 0.3,
                            marginBottom: 6
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
                                marginTop: -4,
                                textAlign: 'left',
                                fontSize: 10,
                                color: 'white',
                                fontWeight: "500"

                              }}>Yearly price: {item.yearly_price}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginHorizontal: 10,
                            height: 15,
                            flexDirection: 'row', flex: 0.3, marginBottom: 6
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
                                marginTop: -4,
                                textAlign: 'left',
                                fontSize: 10,
                                color: 'white',
                                fontWeight: "500"

                              }}>
                              Half yearly price: {item.half_yearly_price}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginHorizontal: 10,
                            height: 15,
                            flexDirection: 'row', flex: 0.4
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
                                marginTop: -4,
                                textAlign: 'left',
                                fontSize: 10,
                                color: 'white',
                                fontWeight: "500"
                              }}>
                              Quarterly price: {item.quarterly_price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{
                      flex: 1, flexDirection: 'row', width: "100%", alignItems: "flex-start",
                      justifyContent: "flex-start", paddingTop: 4,
                    }}>
                      <View
                        style={{ flex: 0.4, height: 50, borderBottomLeftRadius: 20, }}>
                        <BackgroundImage
                          source={require('../assets/leftCurve.png')}
                          style={{ height: 70, alignItems: "center", justifyContent: 'center', }}></BackgroundImage>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          justifyContent: 'center',
                          // flexDirection: 'row',
                          alignItems: "center",
                          height: 30,
                          marginTop: 6,
                        }}>
                        <TouchableOpacity onPress={() => { checklogin(item) }}>
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
                                fontSize: 10,
                                color: '#c79d3a',
                                fontWeight: "500"

                              }}>
                              Subscribe Now
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                )}
              />
            </View>
          </ScrollView>
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}

export default SubscriptionPlan;
