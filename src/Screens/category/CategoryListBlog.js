import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, Linking, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import Category from './Category';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';


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



    console.log("subcategory listBLog.....infunction;;;;;", subcategoryITEM);
    console.log("categoryITEM listBLog....infunction.;;;;;", categoryITEM);
    const categoryitem = categoryITEM;
    const subcategoryid = subcategoryITEM;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.BLOG_LISTBLOG}`, { "category_id": categoryitem, "subcategory_id": subcategoryid });
      console.log(":::::::::listBLog_Response>>>", response.data.blog_list);
      console.log("status _listBLog:", response.data.status);
      if (response.data.status == 1) {
        setsubcategorylistBlogitems(response.data.blog_list);
        setIsLoading(false);
      }
    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }

  };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%', flexGrow: 1,
    }} >
      {!isLoading ?
        (<View>
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
          <FlatList
            vertical
            // numColumns={2}
            data={subcategorylistBlogitems}
            renderItem={({ item }) => (
              <ScrollView  >
                <View style={{ paddingBottom: 130 }}>
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
                </View>
              </ScrollView>
            )
            }
          />
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  )
}
export default SubCategoryBlog;
