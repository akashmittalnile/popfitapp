import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, Image, Alert, ImageBackground, SafeAreaView, Dimensions, RefreshControl, ScrollView } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Pages } from 'react-native-pages';
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Banner from './Banner';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { WebView } from 'react-native-webview';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Home = (props) => {

  const [banneritem, setbanneritem] = useState([]);
  const [trainingdata, setTrainingdata] = useState([]);
  const [ImageBaseUrl, setImageBaseUrl] = useState('');
  const [planstatus, setPlanstatus] = useState([]);
  const [Clothingitem, setClothingitem] = useState([]);
  const [Newrecipeitem, setNewrecipeitem] = useState([]);
  const [Newblogitem, setNewblogitem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const { t } = useTranslation();

  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    // console.log('running');
    StoresProductget();
    setrefreshing(false)
  }
  const gotoBlog = () => {
    props.navigation.navigate("BlogBottomTab")
  };
  // const gotoBlogDetail = async (item) => {
  //   const usertkn = await AsyncStorage.getItem("authToken");
  //   if (usertkn == null) {
  //     Alert.alert('', t('Please_login_first'))
  //   }
  //   else if (usertkn != null) {
  //     props.navigation.navigate("BlogDetail", {
  //       homeblogid: item
  //     })
  //   }

  // }
  // const gotoShop = () => {
  //   console.log("[123]", Clothingitem[0].shop_id);
  //   props.navigation.navigate("FitnessEquipment", {
  //     FitnessstoreId: Clothingitem[0].shop_id
  //   })
  // }
  // const gotoproductshop = (item) => {
  //   props.navigation.navigate('ProductDetail', {
  //     ITEM: item
  //   });
  // }
  const gototshirtproduct = (item) => {
    props.navigation.navigate("ClothesType", {
      Clothexploreid: item.id
    })
  }
  const gotoClothesType = () => {
    props.navigation.navigate("Exploreshop")

  }
  const gotoRecipecategory = () => {
    props.navigation.navigate("Recipecategory")
  }
  const gotoRecipeDetails = async (item) => {
    const usertkn = await AsyncStorage.getItem("authToken");
    if (usertkn == null) {
      Alert.alert('', t('Please_login_first'))
    }

    else if (usertkn != null) {
      if (planstatus.plan_status == "Inactive" || planstatus.plan_id == "0") {
        if (item.plan_id.includes('1')) {
          props.navigation.navigate("Recipesubcategory", {
            getHomeRecipelistID: item
          })
        }
        else if (item.plan_id.includes('2')) {
          props.navigation.navigate("SubscriptionPlan")

        }
        else if (item.plan_id.includes('3')) {
          props.navigation.navigate("SubscriptionPlan")

        }

        else {

          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "1") {
        if (item.plan_id.includes("1")) {
          props.navigation.navigate("Recipesubcategory", {
            getHomeRecipelistID: item
          })
        } else if (item.plan_id.includes("2") && item.user_plan_id == "2") {
          props.navigation.navigate("Recipesubcategory", {
            getHomeRecipelistID: item
          })
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "2") {
        if (item.user_plan_id == "2" && item.plan_id.includes("1")) {
          props.navigation.navigate("Recipesubcategory", {
            getHomeRecipelistID: item
          })
        } else if (item.plan_id.includes("2")) {
          props.navigation.navigate("Recipesubcategory", {
            getHomeRecipelistID: item
          })
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "3") {
        props.navigation.navigate("Recipesubcategory", {
          getHomeRecipelistID: item
        })
      }


    }

  }
  const gotoTrainingsubcatgory = async (item) => {

    const usertkn = await AsyncStorage.getItem("authToken");
    if (usertkn == null) {
      Alert.alert('', t('Please_login_first'))
    }
    else if (usertkn != null) {
      if (planstatus.plan_status == "Inactive" || planstatus.plan_id == "0") {
        if (item.plan_id.includes('1')) {
          props.navigation.navigate("OutdoorTrainning", {
            TrainingID: item
          })
        }
        else if (item.plan_id.includes('2')) {
          props.navigation.navigate("SubscriptionPlan")

        }
        else if (item.plan_id.includes('3')) {
          props.navigation.navigate("SubscriptionPlan")

        }

        else {

          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "1") {
        if (item.plan_id.includes("1")) {
          props.navigation.navigate("OutdoorTrainning", {
            TrainingID: item
          })
        } else if (item.plan_id.includes("2") && item.user_plan_id == "2") {
          props.navigation.navigate("OutdoorTrainning", {
            TrainingID: item
          })
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "2") {
        if (item.user_plan_id == "2" && item.plan_id.includes("1")) {
          props.navigation.navigate("OutdoorTrainning", {
            TrainingID: item
          })
        } else if (item.plan_id.includes("2")) {
          props.navigation.navigate("OutdoorTrainning", {
            TrainingID: item
          })
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "3") {
        props.navigation.navigate("OutdoorTrainning", {
          TrainingID: item
        })
      }


    }

  }
  // const gotoNotification = () => {
  //   props.navigation.navigate("Notifications")
  // }
  // const gotoCartAdded = () => {
  //   props.navigation.navigate("CartAdded")
  // }

  // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer())

  useEffect(() => {
    StoresProductget();
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   StoresProductget();
    // })
    // return unsubscribe;
  }, []);

  const gotoCategory = async (item) => {
    // console.log("blogcategory-home",item);
    const usertkn = await AsyncStorage.getItem("authToken");
    if (usertkn == null) {
      Alert.alert('', t('Please_login_first'))
    }
    else if (usertkn != null) {
      if (planstatus.plan_status == "Inactive" || planstatus.plan_id == "0") {
        if (item.plan_id.includes('1')) {
          props.navigation.navigate('Category', {
            ITEMS: item
          });
        }
        else if (item.plan_id.includes('2')) {
          props.navigation.navigate("SubscriptionPlan")
          // console.log("ncludes+2:",item.plan_id.includes('2'));

        }
        else if (item.plan_id.includes('3')) {
          props.navigation.navigate("SubscriptionPlan")
          // console.log("ncludes+3:",item.plan_id.includes('3'));

        }

        else {
          //   console.log("Buy+plan" );
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "1") {
        if (item.plan_id.includes("1")) {
          props.navigation.navigate('Category', {
            ITEMS: item
          });
        } else if (item.plan_id.includes("2")) {
          props.navigation.navigate('Category', {
            ITEMS: item
          });
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "2") {
        if (item.user_plan_id == "2" && item.plan_id.includes("1")) {
          props.navigation.navigate('Category', {
            ITEMS: item
          });
        } else if (item.plan_id.includes("2")) {
          props.navigation.navigate('Category', {
            ITEMS: item
          });
        } else {
          props.navigation.navigate("SubscriptionPlan")
        }

      }
      else if (planstatus.plan_status == "Active" && planstatus.plan_id == "3") {
        props.navigation.navigate('Category', {
          ITEMS: item
        });
      }
    }

  };

  // const StoresProductget = async ()=>{
  //   const usertkn = await AsyncStorage.getItem("authToken");
  //   setIsLoading(true);
  //   fetch(`${API.HOME_PRODUCT_list}`, {
  //     method: 'GET',

  //     Headers:{ "Authorization": ` ${usertkn}` }
  //   },
  // )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setIsLoading(false);
  //       setbanneritem(result.banner)
  //       // console.log(".....banner....", result.banner)
  //       setTrainingdata(result.trainingCategory_list);
  //       setImageBaseUrl(result.product_url)
  //       setStoreitem(result.fitnes_product)
  //       setClothingitem(result.clothe_product)
  //       // console.log('====================================');
  //       // console.log(response.data.recipe_category_lis);
  //       // console.log('====================================');
  //       setNewblogitem(result.blog)
  //       setNewrecipeitem(result.recipe_category_list)
  //       console.log('Success:', result);

  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       setIsLoading(false);
  //     });
  // }

  const StoresProductget = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.get(`${API.HOME_PRODUCT_list}`, { headers: { "Authorization": ` ${usertkn}` } });
      // console.log(":::::::::Home_Store_Response>>>", response.data.fitnes_product);
      setPlanstatus(response.data)
      setbanneritem(response.data.banner)
      // console.log(".....banner....", response.data.banner)
      setTrainingdata(response.data.trainingCategory_list);
      setImageBaseUrl(response.data.product_url)
      // setStoreitem(response.data.fitnes_product)
      setClothingitem(response.data.shops)
      // console.log('====================================');
      // console.log(response.data.recipe_category_lis);
      // console.log('====================================');
      setNewblogitem(response.data.blog_category)
      setNewrecipeitem(response.data.recipe_category_list)


    }
    catch (error) {
      // Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log(".....Home.error.........", error.response.data.message);
      // Alert.alert('', 'Something went wrong please exit the app and try again')

    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black', flexGrow: 1
    }} >
      <Headers
        // navigation={props.navigation}
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
        BelliconononClick={() => {
          props.navigation.navigate("Notifications")

        }}
      />
      {!isLoading ?
        (<View style={{
          width: WIDTH,
          height: "100%", flex: 1,
        }}>
          <Divider color='#393939' width={1.2} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

            <View style={{
              alignItems: "flex-start", justifyContent: "flex-start"
            }}>
              {/* //first store slide bar//  */}

              {/* <View style={{   height: 160, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,backgroundColor: '#262626',paddingBottom:8  }}>
        <Pages indicatorColor='#ffcc00' >
          
          <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>

          <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>

         <View style={{ height: 100, flexDirection: 'row',backgroundColor: 'black',margin:20,marginTop:20, borderRadius:20}}>
            <View style={{ marginLeft: 20, flex: 1.4 / 2, justifyContent: 'center',   }}>
              <Text style={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: 15, color: 'white', fontFamily: 'Raleway-SemiBold' }}>Lorem Ipsum is that it has a more
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Image source={require('../assets/logo4.png')}
                style={{ alignSelf: 'center', width: '100%', height: '100%',borderBottomRightRadius:20,borderTopRightRadius:20 }} />
            </View>
          </View>
        </Pages>
      </View> */}
              <View style={{ height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#262626', justifyContent: "center", alignItems: "center", alignSelf: "center", width: "100%" }}>

                <View style={{ height: 200, flexDirection: 'row', width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 3 }}>

                  <Banner data={banneritem} />

                </View>

              </View>

              {/* //trainingCategory/// */}
              <View style={{ marginTop: 20, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.75  }}>
                  <Text  numberOfLines={2} style={{ marginLeft: 20, fontSize: 16, color: 'white', fontWeight: "bold" }}>{t('Training_Categories')}</Text>
                </View>
                <View style={{ flex: 0.3, right: 10, }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate("TrainingDetail")}>
                    <View style={{ borderRadius: 50, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', paddingBottom: 2 }}>
                      <Text numberOfLines={2} style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "400" }}>{t('Explore_Training')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}

                keyExtractor={(item, index) => String(index)}
                data={trainingdata}

                renderItem={({ item, index }) =>
                  <TouchableOpacity onPress={() => { gotoTrainingsubcatgory(item) }}>
                    <View style={{
                      // backgroundColor: '#262626',
                      backgroundColor: 'white',
                      height: 180,
                      width: WIDTH * 0.45,
                      marginTop: 10,
                      marginHorizontal: 6,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: 'center',

                    }}>
                      <View style={{ width: WIDTH * 0.45, backgroundColor: '#c9bca0', height: 25, justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.lenght >= 26 ? item?.cat_name?.slice(0, 26) + '...' : item?.cat_name?.slice(0, 26)}</Text>

                      </View>
                      <View

                        style={{
                          width: WIDTH * 0.45, height: 130,

                          justifyContent: "flex-start",
                          alignItems: "flex-start", backgroundColor: "black"

                        }}>

                        <Image resizeMode="stretch"
                          source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}

                          style={{
                            width: "100%",
                            height: "100%",
                            alignSelf: 'center',

                          }}
                        />


                      </View>

                      <View style={{ width: WIDTH * 0.45, height: 25, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                        <Text numberOfLines={1} style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>{t('Subscription')} {item?.plan_name} {t('Plan')}</Text>
                      </View>


                      {/* <View style={{
                        width: "100%", flexDirection: 'column', justifyContent: "center", alignItems: "stretch"
                      }}>

                        <View style={{ marginLeft: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, }}>
                          <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item.name.slice(0, 7) + '...'}</Text>
                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item.price}</Text>

                          <View style={{ borderBottomRightRadius: 25, alignItems: "center" }}>

                            <View style={{
                              alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00',
                            }}>
                              <Image
                                resizeMode="contain"
                                style={{
                                  width: 15,
                                  height: 20, alignSelf: 'center'
                                }}
                                source={require('../assets/bag1.png')} />
                            </View>

                          </View>
                        </View>
                      </View> */}

                    </View>
                  </TouchableOpacity>
                }
              />

              {/* //New Blog container//// */}

              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.75 }}>
                  <Text style={{ marginLeft: 20, fontSize: 16, color: 'white', fontWeight: "bold" }}>{t('New_Blogs')}</Text>
                </View>
                <View style={{ flex: 0.3, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoBlog() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', paddingBottom: 2 }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "400" }}>{t('Explore_Blogs')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                style={{ margin: 10 }}
                data={Newblogitem}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        gotoCategory(item)
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: 'white',
                          height: 180,
                          width: WIDTH * 0.45,
                          borderRadius: 20,
                          marginBottom: 10,
                          marginHorizontal: 6,
                          justifyContent: "center",
                          alignItems: 'center',
                        }}>
                        <View style={{ width: WIDTH * 0.45, backgroundColor: '#c9bca0', height: 25, justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "500" }}>{item?.cat_name?.length >= 26 ? item?.cat_name?.slice(0, 26) + '...' : item?.cat_name?.slice(0, 26)}</Text>

                        </View>
                        <View
                          style={{
                            width: WIDTH * 0.45,
                            height: 155,
                            // borderRadius: 20,

                            justifyContent: "flex-start", alignItems: "flex-start"
                          }}>
                          <Image
                            source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                            resizeMode="stretch"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                              alignSelf: 'center', backgroundColor: "black"
                            }}
                          />


                        </View>
                        <View style={{
                          justifyContent: "flex-end",
                          alignItems: 'flex-end',
                          position: "absolute", width: 40, height: 30, bottom: 0, right: 0
                        }}>
                          <Image resizeMode='contain'
                            source={require('../assets/arrowWhiteBack.png')}
                            style={{
                              width: "100%",
                              height: "100%",
                              alignSelf: 'center',
                              borderBottomRightRadius: 20,

                            }}
                          />
                        </View>

                      </View>
                      {/* <BackgroundImage
                    resizeMode=''
                    source={{ uri: `${item.image}` }}
                    style={{
                      marginBottom: 6,
                      marginTop: 6,
                      marginHorizontal: 6,
                      justifyContent: 'space-between',
                      width: WIDTH * 0.45,
                      height: 180,
                      overflow: 'hidden',
                      borderRadius: 15,
                      backgroundColor: 'gray',
                    }}>
                    <View
                      style={{
                        width: 115,
                        backgroundColor: '#c9bca0',
                        height: 25,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center', alignItems: "center"
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 11,
                          color: 'black',
                          fontWeight: "bold"
                        }}>
                        {item.cat_name.slice(0, 13) + '...'}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 30,
                        borderBottomRightRadius: 10,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={{ height: 30, width: 50 }}>
                        <Image resizeMode='stretch'
                          source={require('../assets/arrowWhiteBack.png')}
                          style={{
                            width: 40,
                            height: 30,
                            alignSelf: 'center',
                            borderBottomRightRadius: 10,
                            right: -5
                          }}
                        />
                      </View>
                    </View>
                  </BackgroundImage> */}
                    </TouchableOpacity>
                    // <TouchableOpacity
                    //   onPress={() => {
                    //     gotoBlogDetail(item)
                    //   }}
                    //   style={{
                    //     backgroundColor: 'white',
                    //     height: 200,
                    //     width: WIDTH * 0.45,
                    //     marginTop: 10,
                    //     marginHorizontal: 6,
                    //     borderRadius: 20,
                    //     justifyContent: "center",
                    //   }}>
                    //   <View style={{
                    //     height: 170,
                    //     borderRadius: 20,
                    //     width: WIDTH * 0.45,
                    //     alignItems: "center",
                    //     justifyContent: 'space-around',

                    //   }}>
                    //     <Image
                    //       resizeMode='stretch'
                    //       source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                    //       style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', backgroundColor: 'black', width: '100%', height: '100%', }} />
                    //   </View>
                    //   {/* <View style={{
                    //   height: 100,
                    //  overflow:"hidden",
                    //   width: WIDTH * 0.45,
                    //   borderTopLeftRadius: 20, 
                    //   borderTopRightRadius: 20,
                    //   justifyContent: 'center',  
                    // }}>

                    //      <WebView   
                    //      source={{ uri: 'https://www.youtube.com/embed/ml6cT4AZdqI' }}
                    //      style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center',width: "100%",alignItems:"center",borderRadius:10,  }}
                    //       />


                    // </View> */}

                    //   <View

                    //     style={{
                    //       height: 30,
                    //       width: WIDTH * 0.45,
                    //       backgroundColor: '#fceeb5',
                    //       borderBottomLeftRadius: 16,
                    //       borderBottomRightRadius: 16, justifyContent: "flex-start", alignItems: "center", paddingTop: 5, paddingLeft: 0,
                    //     }}>
                    //     <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "500" }}>{item?.image_title?.length >= 18 ? item?.image_title?.slice(0, 18) + '...' : item?.image_title?.slice(0, 18)}</Text>

                    //     {/* <View style={{ height: 30, alignItems: "flex-start", justifyContent: "flex-start",  width: WIDTH * 0.42, paddingTop: 4, marginBottom:4,}}>
                    //     <Text numberOfLines={1}  
                    //       style={{textAlign: 'left', fontSize: 8, color: '#000000',fontWeight: "300" }}>{item?.image_description?.slice(0, 200)+ '...'}</Text>
                    //   </View> */}
                    //   </View>
                    // </TouchableOpacity>
                  )
                }

                }

              />

              {/* //New Recipes & Tips  container//// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.75 }}>
                  <Text numberOfLines={2} style={{ marginLeft: 20, fontSize: 16, color: 'white', fontWeight: "bold" }}>{t('New_Recipes_Tips')}</Text>
                </View>
                <View style={{ flex: 0.3, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoRecipecategory() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                      <Text numberOfLines={2} style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "400" }}>{t('Explore_Recipes')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                // numColumns={2}
                style={{ margin: 10 }}
                data={Newrecipeitem}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {
                    gotoRecipeDetails(item)
                  }}>
                    <View
                      style={{
                        // marginBottom: 6,
                        marginTop: 10,
                        marginHorizontal: 6,
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
                          source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                          resizeMode="stretch"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center', backgroundColor: "black"
                          }}
                        />
                        <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.length >= 15 ? item?.cat_name?.slice(0, 15) + '...' : item?.cat_name?.slice(0, 15)}</Text>

                        </View>

                      </View>


                    </View>
                    {/* <BackgroundImage
                      source={{ uri:  `${item.image}` }}
                      style={{
                        // marginBottom: 10,
                        marginTop: 6,
                        marginHorizontal: 6,
                        // justifyContent: 'space-between',
                        height: 180,
                        width: WIDTH * 0.45,
                        overflow: 'hidden',
                        borderRadius: 15,
                        backgroundColor: "gray"
                      }}>

                      <View style={{ width: 115, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item.cat_name.slice(0, 20) + '...'}</Text>

                      </View>

                    </BackgroundImage> */}
                  </TouchableOpacity>
                )}
              />

              {/* //store/// */}
              {/* <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 16, color: 'white', fontWeight: "bold" }}>{t('Fitness_Equipment_Store')}</Text>
                </View>
                <View style={{ flex: 0.25, right: 10, }}>
                  <TouchableOpacity onPress={() => { gotoShop() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center',paddingBottom:2 }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "400" }}>{t('Explore_Store')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                data={Storeitem}
                style={{ margin: 10 }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => { gotoproductshop(item) }}>
                      <View style={{
                        backgroundColor: 'white',
                        height: 200,
                        width: WIDTH * 0.45,
                        marginTop: 10,
                        marginHorizontal: 6,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: 'center',

                      }}>
                        <View style={{
                          width: WIDTH * 0.45,
                          height: 155,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          backgroundColor: 'black',
                        }}>

                          <Image
                            source={{ uri: item?.image != null ? `${ImageBaseUrl + item?.image[0]}` : 'https://dev.pop-fiit.com/images/logo.png' }}
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



                        <View style={{
                          width: WIDTH * 0.45, flexDirection: 'column', justifyContent: "center", alignItems: 'stretch', height: 45, backgroundColor: '#fceeb5', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                        }}>

                          <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.name?.slice(0, 15) + '...'}</Text>


                          <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3, }}>

                            <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.price}</Text>



                            <View style={{
                              alignItems: 'center', justifyContent: 'center', marginRight: 6, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00', bottom: 6
                            }}>
                              <Image
                                resizeMode="contain"
                                style={{
                                  width: 15,
                                  height: 20, alignSelf: 'center'
                                }}
                                source={require('../assets/bag1.png')} />
                            </View>

                          </View>
                        </View>

                      </View>
                    </TouchableOpacity>
                  )
                }}
              /> */}

              {/* //clothing store view// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 0.75 }}>
                  <Text style={{ marginLeft: 20, fontSize: 16, color: 'white', fontWeight: "bold" }}>{t('Store_Categories')}</Text>
                </View>
                <View style={{ flex: 0.3, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoClothesType() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', fontWeight: "400" }}>{t('Explore_shop')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                // numColumns={2}
                style={{ margin: 10 }}
                data={Clothingitem}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {
                    gototshirtproduct(item)
                  }}>
                    <View
                      style={{
                        // marginBottom: 6,
                        marginTop: 10,
                        marginHorizontal: 6,
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
                          source={{ uri: item?.image != null ? `${planstatus?.shop_image_path + item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                          resizeMode="stretch"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center', backgroundColor: "black"
                          }}
                        />
                        <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                          <Text numberOfLines={1} style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.shop_name?.length >= 15 ? item?.shop_name?.slice(0, 15) + '...' : item?.shop_name?.slice(0, 15)}</Text>

                        </View>

                      </View>


                    </View>

                  </TouchableOpacity>
                )}
              />
              {/* <FlatList
                horizontal
                style={{ margin: 10 }}
                keyExtractor={(item, index) => String(index)}
                showsHorizontalScrollIndicator={false}
                data={Clothingitem}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => { gototshirtproduct(item) }}>
                      <View style={{
                        backgroundColor: 'white',
                        height: 200,
                        width: WIDTH * 0.45,
                        marginTop: 10,
                        marginHorizontal: 6,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: 'center',

                      }}>
                        <View style={{
                          width: WIDTH * 0.45,
                          height: 155,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          backgroundColor: 'black'
                        }}>
                          <Image
                            source={{ uri: item?.image != null ? ImageBaseUrl + item?.image[0] : 'https://dev.pop-fiit.com/images/logo.png' }}
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
                        <View style={{
                          width: WIDTH * 0.45, flexDirection: 'column', justifyContent: "center", alignItems: 'stretch', height: 45, backgroundColor: '#fceeb5', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                        }}>
                          <Text style={{ marginLeft: 16, fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.name?.slice(0, 15) + '...'}</Text>

                          <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -3, }}>

                            <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>{item?.price}</Text>

                            <View style={{
                              alignItems: 'center', justifyContent: 'center', marginRight: 6, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00', bottom: 6
                            }}>
                              <Image resizeMode="contain"
                                style={{
                                  width: 15,
                                  height: 20, alignSelf: 'center'
                                }}
                                source={require('../assets/bag1.png')} />
                            </View>

                          </View>
                        </View>

                      </View>
                    </TouchableOpacity>
                  )
                }}
              /> */}
            </View>
          </ScrollView>

        </View>)
        :
        (<CustomLoader showLoader={isLoading} />
          // <View style={{ flex: 1, justifyContent: "center", alignItems: "center",position: 'absolute',
          // height: HEIGHT,
          // width: WIDTH, }}>
          //   <ActivityIndicator size="large" color="#ffcc00" />
          // </View>
        )}
    </SafeAreaView>
  )
}

export default Home;
