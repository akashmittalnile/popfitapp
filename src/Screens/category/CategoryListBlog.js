import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, Linking, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const SubCategoryBlog = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [subcategorylistBlogitems, setsubcategorylistBlogitems] = useState([]);

  // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

  // const gotoNotification = () => {
  //   props.navigation.navigate("Notifications")
  // }
  // const buttonClickedHandler = () => {
  //   props.navigation.goBack()
  //   console.log('You have been clicked a button!');
  // };
  // const gotoBlog =()=>{
  //     props.navigation.navigate("Blog")
  // }
  const gotoBlogDetail = (item) => {
    props.navigation.navigate("BlogDetail", {
      Categoryblogid: item
    })
  }

  console.log("subcategory_id_get from category...............:", props.route.params.subcategoryITEM.id);
  console.log("category_id_item category...............:", props.route.params.categoryITEM);
  const subcategoryITEM = props.route.params.subcategoryITEM.id;
  const categoryITEM = props.route.params.categoryITEM;

  useEffect(() => {

    getCategoryblog_listApi()

  }, []);

  const getCategoryblog_listApi = async () => {
    const Token = await AsyncStorage.getItem("authToken");


    console.log("subcategory listBLog.....infunction;;;;;", subcategoryITEM);
    console.log("categoryITEM listBLog....infunction.;;;;;", categoryITEM);
    const categoryitem = categoryITEM;
    const subcategoryid = subcategoryITEM;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.BLOG_LISTBLOG}`, { "category_id": categoryitem, "subcategory_id": subcategoryid }, { headers: { "Authorization": ` ${Token != null ? Token : null}` } });
      console.log(":::::::::listBLog_Response>>>", response.data.blog_list);
      console.log("status _listBLog:", response.data.status);
      if (response.data.status == 1) {
        setsubcategorylistBlogitems(response.data.blog_list);
        // setIsLoading(false);
      }
    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log("......error.........", error.response.data.message);
      // setIsLoading(false);

    }
    setIsLoading(false);

  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'black',
      flexGrow: 1,
      // width: WIDTH,
      // height: HEIGHT,  
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
              subcategorylistBlogitems.length != 0 ?
                (<ScrollView >
                  <View style={{ height: 50, flexDirection: 'row' }}>
                    <View style={{ flex: 1,marginLeft: 15, marginTop: 20, }}>
                      <Text style={{  textAlign: 'left', fontSize: 18, color: 'white', fontWeight: "500" }}>Blogs</Text>
                    </View>

                  </View>

                  <FlatList
                    numColumns={2}
                    // style={{ margin: 10 }}
                    showsHorizontalScrollIndicator={true}
                    data={subcategorylistBlogitems}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                    return(<TouchableOpacity 
                    onPress={() => { gotoBlogDetail(item) }}>
                        <View
                          style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            height: 180,
                            width: WIDTH * 0.45,
                            borderRadius: 20,
                            marginBottom: 10,
                            marginHorizontal: 10,
                            justifyContent: "center",
                            alignItems: 'center',
                          }}>

                          <View
                            style={{
                              width: WIDTH * 0.45, height: 180, borderRadius: 20,
                              justifyContent: "flex-start", alignItems: "flex-start"
                            }}>
                            <Image
                              source={{ uri: `${item?.blog_image}` }}
                              resizeMode="stretch"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 20,
                                alignSelf: 'center',
                              }}
                            />
                            <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                              <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.image_title?.slice(0, 13) + '...'}</Text>

                            </View>

                          </View>
                          <View style={{
                            justifyContent: "flex-end",
                            alignItems: 'flex-end', position: "absolute", width: 40, height: 30, bottom: -1, right: 0
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
                        resizeMode='stretch'
                        source={{ uri: `${item.image}` }}
                        style={{
                          // marginTop: 6, 
                          marginBottom: 6,
                          marginHorizontal: 6,
                          justifyContent: 'space-between',
                          width: WIDTH * 0.45,
                          height: 180,
                          overflow: 'hidden',
                          borderRadius: 15,
                          backgroundColor: "gray"
                        }}>
                        <View style={{
                          width: 115,
                          backgroundColor: '#c9bca0',
                          height: 25,
                          borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center"
                        }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item.subcat_name.slice(0, 13) + '...'}</Text>
                        </View>
                        <View style={{ height: 30, borderBottomRightRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <View style={{ height: 30, width: 50 }}>
                            <Image source={require('../assets/arrowWhiteBack.png')}
                              style={{
                                width: 40,
                                height: 30, alignSelf: 'center', borderBottomRightRadius: 10, right: -5
                              }}
                              resizeMode='stretch' />
                          </View>
                        </View>
                      </BackgroundImage> */}
                      </TouchableOpacity>
                    )}}
                  />
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
                  <Text style={{  fontSize: 14, fontWeight: "500", color: 'black'  }}>No data found!</Text>
                </View>)
            }
            
            {/* <View style={{ paddingBottom: 130 }}>
                  <View 
                  style={{ height: 60 }}>
                    <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 14, color: 'black', fontWeight: "bold" }}>{item.youtube_title}</Text>
                  </View>
                  <View style={{
                    marginHorizontal: 20, height: 170, borderRadius: 20,marginVertical: 10
                  }}>
                    <TouchableOpacity onPress={() => { gotoBlogDetail(item) }}
                     style={{ justifyContent: 'space-around', height: '100%', resizeMode: "center", alignItems: "center", width: WIDTH * 0.9 }}>
                      
                    <Image
                      source={{ uri: item.blog_image }}
                      style={{
                        width: '100%', height: '100%', justifyContent: "center",
                        alignItems: 'center',

                        //  borderWidth: 1, 
                        // borderColor: "red",
                        borderRadius: 20,
                      }}>
                    </Image>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: 'red',
                        width: 50, height: 50,
                        justifyContent: "center",
                        alignItems: 'center',
                        borderRadius: 50 / 2, top: -90
                      }}>
                      <Image
                        source={require('../assets/play.png')}
                      />
                    </View>

                    </TouchableOpacity>
                  </View>
                  <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 11, color: '#000', }}>{item.youtube_description}</Text>

                  <Text style={{ marginLeft: 20, textAlign: 'left', marginTop: 20, fontSize: 14, color: '#000', fontWeight: "bold" }} >{item.image_title}</Text>


                  <View style={{ backgroundColor: "white", borderRadius: 20, marginTop: 20, height: HEIGHT * 0.2, width: WIDTH * 0.9, marginHorizontal: 18 }}>
                    <Image resizeMode='contain'
                      source={{ uri: item.blog_image }} 
                      style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center',borderRadius: 20, }}
                    />
                  </View>

                  <Text style={{ marginHorizontal: 20, marginTop: 20, textAlign: 'left', fontSize: 11, color: '#000', }}>{item.image_description}</Text>
                </View> */}
           

        </>)
        :
        (<CustomLoader showLoader={isLoading}/>
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //   <ActivityIndicator size="large" color="#ffcc00" />
        // </View>
        )}
    </SafeAreaView>
  )
}
export default SubCategoryBlog;
