import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, ImageBackground, SafeAreaView, Animated, ActivityIndicator, Dimensions, Linking, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Modal, RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Banner from './Banner';
import Headers from '../../Routes/Headers';
import { async } from 'regenerator-runtime';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { WebView } from 'react-native-webview';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Home = (props) => {

  const [banneritem, setbanneritem] = useState([]);
  const [trainingdata, setTrainingdata] = useState([]);
  const [ImageBaseUrl, setImageBaseUrl] = useState('');
  const [Storeitem, setStoreitem] = useState([]);
  const [Clothingitem, setClothingitem] = useState([]);
  const [Newrecipeitem, setNewrecipeitem] = useState([]);
  const [Newblogitem, setNewblogitem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const gotoBlog = () => {
    props.navigation.navigate("BlogBottomTab")
  };
  const gotoBlogDetail = async(item) => {
    const usertkn = await AsyncStorage.getItem("authToken");
    if (usertkn == null) {
      Alert.alert('Blog details', 'Login first!')
    }
    else if (usertkn != null) {
      props.navigation.navigate("BlogDetail", {
        homeblogid: item
      })
    }
   
  }
  const gotoShop = () => {
    props.navigation.navigate("FitnessEquipment", {
      FitnessstoreId: "1"
    })
  }
  const gotoproductshop = (item) => {
    props.navigation.navigate('ProductDetail', {
      ITEM: item
    });
  }
  const gototshirtproduct = (item) => {
    props.navigation.navigate("ProductDetail", {
      CLOTHITEM: item
    })
  }
  const gotoClothesType = () => {
    props.navigation.navigate("ClothesType", {
      Clothexploreid: "2"
    })
  }
  const gotoRecipecategory = () => {
    props.navigation.navigate("Recipecategory")
  }
  const gotoRecipeDetails = (item) => {
    props.navigation.navigate("Recipesubcategory", {
      getHomeRecipelistID: item
    })
  }
  const gotoTrainingsubcatgory = (item) => {
// console.log("trainingdata:",item)
    props.navigation.navigate("OutdoorTrainning", {
      TrainingID: item
    })
  }
  // const gotoNotification = () => {
  //   props.navigation.navigate("Notifications")
  // }
  // const gotoCartAdded = () => {
  //   props.navigation.navigate("CartAdded")
  // }

  // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer())

  useEffect(() => {
    StoresProductget()

  }, []);

  

  const StoresProductget = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API.HOME_PRODUCT_list}`);
      // console.log(":::::::::Home_Store_Response>>>", response.data.fitnes_product);

      setbanneritem(response.data.banner)
      // console.log(".....banner....", response.data.banner)
      setTrainingdata(response.data.trainingCategory_list)
      setImageBaseUrl(response.data.product_url)
      setStoreitem(response.data.fitnes_product)
      setClothingitem(response.data.clothe_product)
      // console.log('====================================');
      // console.log(response.data.recipe_category_lis);
      // console.log('====================================');
      setNewblogitem(response.data.blog)
      setNewrecipeitem(response.data.recipe_category_list)

      setIsLoading(false);
    }
    catch (error) {
      console.log(".....Home.error.........", error.response.data.message);
      setIsLoading(false);

    }

  };

return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black'
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
      {!isLoading ?
        (<View style={{
          width: WIDTH,
          height: "100%", flex: 1
        }}>
          <Divider color='#393939' width={1.2} />
          <ScrollView>

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

                <View style={{ height: 200, flexDirection: 'row', width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 3, }}>

                  <Banner data={banneritem} />

                </View>

              </View>

              {/* //trainingCategory/// */}
              <View style={{ marginTop: 20, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 17, color: 'white', fontWeight: "bold" }}>Training Categories</Text>
                </View>
                <View style={{ flex: 0.25, right: 10, }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate("TrainingDetail")}>
                    <View style={{ borderRadius: 50, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center',  }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', fontWeight: "400" }}>Explore Trainings</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}
                // columnWrapperStyle={{
                //   flex: 1,
                //   justifyContent: "space-around"
                // }}
                data={trainingdata}
                 
                renderItem={({ item }) =>
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
                      // shadowColor: '#ffffff',
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 3
                      // },
                      // shadowRadius: 5,
                      // shadowOpacity: 1.0,
                      // elevation: 5,
                      // zIndex: 999,

                      // flex: 1
                    }}>

                      <View

                        style={{
                          // marginTop: 1,
                          width: WIDTH * 0.45, height: 150,
                          // borderRadius: 100  ,
                          // backgroundColor: '#fceeb5',
                          // flex: 1,
                          // borderRadius: 20,
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          justifyContent: "flex-start", alignItems: "flex-start"

                        }}>

                        <Image
                          source={{ uri: item?.image }}
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
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.slice(0, 13) + '...'}</Text>

                        </View>
                      </View>

                      <View style={{ width: WIDTH * 0.45, height: 30, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                        <Text style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>Subscription {item?.plan_name} @ {item?.plan_price} {item.plan_type}</Text>
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
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 17, color: 'white', fontWeight: "bold" }}>New Blogs</Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoBlog() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', fontWeight: "400" }}>Explore Blogs</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}
                data={Newblogitem}
                renderItem={({ item }) =>
                  <TouchableOpacity
                    onPress={() => {
                      gotoBlogDetail(item)
                    }}
                    style={{
                      backgroundColor: 'white',
                      height: 200,
                      width: WIDTH * 0.45,
                      marginTop: 10,
                      marginHorizontal: 6,
                      borderRadius: 20,
                      justifyContent: "center",
                    }}>
                    <View style={{
                      height: 170,
                      borderRadius: 20,
                      width: WIDTH * 0.45,
                      alignItems: "center",
                      justifyContent: 'space-around',
                    }}>
                      <Image
                        resizeMode='contain'
                        source={{ uri: item?.image }}
                        style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', backgroundColor: 'white', width: '100%', height: '100%', }} />
                    </View>
                    {/* <View style={{
                      height: 100,
                     overflow:"hidden",
                      width: WIDTH * 0.45,
                      borderTopLeftRadius: 20, 
                      borderTopRightRadius: 20,
                      justifyContent: 'center',  
                    }}>
                      
                         <WebView   
                         source={{ uri: 'https://www.youtube.com/embed/ml6cT4AZdqI' }}
                         style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center',width: "100%",alignItems:"center",borderRadius:10,  }}
                          />
                           
                     
                    </View> */}

                    <View

                      style={{
                        height: 30, 
                        width: WIDTH * 0.45,
                        backgroundColor: '#fceeb5',
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16, justifyContent: "flex-start", alignItems: "center",paddingTop: 5,paddingLeft: 0,
                      }}>
                      <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "500" }}>{item?.image_title?.slice(0, 15) + '...'}</Text>

                      {/* <View style={{ height: 30, alignItems: "flex-start", justifyContent: "flex-start",  width: WIDTH * 0.42, paddingTop: 4, marginBottom:4,}}>
                        <Text numberOfLines={1}  
                          style={{textAlign: 'left', fontSize: 8, color: '#000000',fontWeight: "300" }}>{item?.image_description?.slice(0, 200)+ '...'}</Text>
                      </View> */}
                    </View>
                  </TouchableOpacity>
                }

              />

              {/* //New Recipes & Tips  container//// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 17, color: 'white', fontWeight: "bold" }}>New Recipes & Tips</Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoRecipecategory() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', fontWeight: "400" }}>Explore Recipes</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                style={{ margin: 10 }}
                data={Newrecipeitem}
                renderItem={({ item }) => (
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
                          source={{ uri: `${item?.image}` }}
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
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.slice(0, 15) + '...'}</Text>

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
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 17, color: 'white', fontWeight: "bold" }}>Fitness Equipment Store</Text>
                </View>
                <View style={{ flex: 0.25, right: 10, }}>
                  <TouchableOpacity onPress={() => { gotoShop() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', fontWeight: "400" }}>Explore Store</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={Storeitem}
                style={{ margin: 10 }}
                renderItem={({ item }) =>
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
                        backgroundColor: 'white',
                      }}>

                        <Image
                          source={{ uri: ImageBaseUrl + item?.image[0] }}
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

                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item?.price}</Text>



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
                }
              />

              {/* //clothing store view// */}
              <View style={{ marginTop: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 20, fontSize: 17, color: 'white', fontWeight: "bold" }}>Clothing Store </Text>
                </View>
                <View style={{ flex: 0.25, right: 10 }}>
                  <TouchableOpacity onPress={() => { gotoClothesType() }}>
                    <View style={{ borderRadius: 24, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', fontWeight: "400" }}>Explore Store</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              <FlatList
                horizontal
                style={{ margin: 10 }}
                showsHorizontalScrollIndicator={false}
                data={Clothingitem}
                renderItem={({ item }) =>
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
                        backgroundColor: 'white'
                      }}>
                        <Image
                          source={{ uri: ImageBaseUrl + item?.image[0] }}
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

                          <Text style={{ fontSize: 12, color: 'black', fontWeight: "bold" }}>$ {item?.price}</Text>

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
                }
              />
            </View>
          </ScrollView>

        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  )
}

export default Home;
