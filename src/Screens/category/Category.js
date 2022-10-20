import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Category = (props) => {

  const [subcategoryitems, setsubcategoryitems] = useState([]);
  const [subscriptiontoken, setsubscriptiontoken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];

  // const buttonClickedHandler = () => {
  //   props.navigation.goBack()
  // }
  const gotoCategoryListBlog = (item) => {
    props.navigation.navigate("SubCategoryBlog", {
      subcategoryITEM: item,
      categoryITEM: props.route.params.ITEMS.id
    });
  }

  console.log("item.category_id..............:", props.route.params.ITEMS.id);
  const ITEMS = props.route.params.ITEMS.id

  useEffect(() => {

    getCategoryApi();
    getusertoken();

  }, []);
  const getusertoken = async () => {
    const usertoken = await AsyncStorage.getItem("authToken");
    console.log("check_roken in comment button:::>>>>>..", usertoken);
    setsubscriptiontoken(usertoken);
  }
  const Checkedtoken = () => {

    subscriptiontoken == "" ?
      props.navigation.navigate('LoginMain', {
        screen: 'LoginSignUp',
      })
      :
      setComments(true);
    // ShareCommentApi()

  };
  const getCategoryApi = async () => {
    const Token = await AsyncStorage.getItem("authToken");
    console.log("category_id get.....;;;;;", ITEMS);
    // const categoryitem = ITEMS;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.BLOG_SUBCATEGORY}`, { "category_id": ITEMS }, { headers: { "Authorization": ` ${Token}` } });
      console.log(":::::::::category_Response>>>", response.data.blog_subcategory);
      console.log("status category:", response.data.status);
      if (response.data.status == 1) {
        setsubcategoryitems(response.data.blog_subcategory)
        setIsLoading(false);
      } else {
        // Alert.alert("data not found",'')
        setIsLoading(false);
      }

    }
    catch (error) {
      Alert.alert('','Something went wrong please exit the app and try again')
      // console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }

  };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
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
            subcategoryitems.length != 0 ?
              (<ScrollView >
                <View style={{ height: 50, flexDirection: 'row' }}>
                  <View style={{ flex: 1,marginLeft: 15, marginTop: 20, }}>
                    <Text style={{  textAlign: 'left', fontSize: 18, color: 'white', fontWeight: "500" }}>Sub-Category Blogs</Text>
                  </View>

                </View>

                <FlatList
                  numColumns={2}
                  showsHorizontalScrollIndicator={true}
                  // style={{ margin: 10 }}
                  data={subcategoryitems}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item, index }) => {
                   return( <TouchableOpacity onPress={() => { gotoCategoryListBlog(item) }}>
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
                            source={{ uri: `${item.image}` }}
                            resizeMode="stretch"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 20,
                              alignSelf: 'center',
                            }}
                          />
                          <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "500" }}>{item?.subcat_name?.slice(0, 15) + '...'}</Text>

                          </View>
 
                        </View>
                        <View style={{
                          justifyContent: "flex-end",
                          alignItems: 'flex-end', 
                          position: "absolute", width: 40, height: 30, 
                          bottom: -1, right: 0
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
                    </TouchableOpacity>)
                  }}
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

        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}

export default Category;
