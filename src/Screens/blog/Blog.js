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
  Dimensions,
  ImageBackground,
  Linking, ActivityIndicator

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { createThumbnail } from "react-native-create-thumbnail";
import Headers from '../../Routes/Headers';
// import AsyncStorage from '@react-native-async-storage/async-storage';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Blog = (props) => {

  const [UserEmail, setUserEmail] = useState("");
  const [Blogvideolist, setBlogvideolist] = useState([]);
  const [Blogcategorylist, setBlogcategorylist] = useState([]);
  // const[bearertoken,setBearertoken]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [NewsletterPopup, setNewsletterPopup] = useState(false);

  // const openDrawer = () =>
  //   props.navigation.dispatch(DrawerActions.openDrawer());

  // const buttonClickedHandler = () => {
  //   props.navigation.goBack();

  // };
  const gotoBlogDetail = (item) => {
    props.navigation.navigate('BlogDetail', {
      blogdetail_id: item
    });
  };
  const gotoCategory = (item) => {
    props.navigation.navigate('Category', {
      ITEMS: item
    });
  };
  // const gotoCartAdded = () => {
  //   props.navigation.navigate("CartAdded")
  // }
  // const gotoNotification = () => {
  //   props.navigation.navigate('Notifications');
  // };

  useEffect(() => {
    GetCategoryBlogApi();
    // getusertoken();
  }, [props]);

  // const getusertoken = async () => {
  //   const usertoken = await AsyncStorage.getItem("authToken");
  //   console.log("check_roken in comment button:::>>>>>..", usertoken);
  //   setBearertoken(usertoken);
  // }
  // const Checkedtoken = () => {

  //   bearertoken == "" ?
  //     props.navigation.navigate('LoginMain', {
  //       screen: 'LoginSignUp',
  //     })
  //     :
  // null


  // };

  const GetNewsletterApi = async () => {

    const EnterEmail = UserEmail;
    console.log("......userenteremail::", EnterEmail);
    setIsLoading(true);
    try {

      const response = await axios.post(`${API.NEWS_LETTER_SUBSCRIPTION}`, { "email": EnterEmail });
      console.log(":::::::::Traing_Workout_Response>>>", response.data);
      console.log("Traing_Workout_data::::::", response.data.status);
      if (response.data.status == 1) {
        props.navigation.goBack()
        setIsLoading(false);
      }

    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }
  };

  const GetCategoryBlogApi = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`${API.BLOG_MAIN_SCREEN}`);
      console.log(":::::::::Traing_Workout_Response>>>", response.data);
      console.log("Traing_Workout_data::::::", response.data.status);
      setBlogvideolist(response.data.blog)
      setBlogcategorylist(response.data.blogcategory)
      setIsLoading(false);

    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, backgroundColor: 'black', flexGrow: 1
    }} >
      {!isLoading ?
        (<View style={{ width: WIDTH, height: HEIGHT, paddingBottom: 50 }}>
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
          <ScrollView  >
            <Divider color="#393939" width={1.2} />

            {/*// btn navigate Newsletterpopup/// */}
            <View
              style={{
                height: 185,
                width: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: '#262626',
                paddingBottom: 15,
                justifyContent: "center",
                alignItems: "center",

              }}>
              <TouchableOpacity
                onPress={() => {
                  setNewsletterPopup(!NewsletterPopup);
                }}>
                <View
                  style={{
                    height: 120,
                    width: "90%",
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    // marginHorizontal: 25,
                    marginTop: 20,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      // width:120,
                      height: 150,
                      // marginLeft: 20,
                      flex: 0.4,
                      borderRadius: 15,
                      marginRight: 10,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      resizeMode='cover'
                      source={require('../assets/subscribelogo.png')}
                      style={{
                        alignSelf: 'center',
                        width: "100%",
                        height: "100%",
                        borderBottomLeftRadius: 15,
                        borderTopLeftRadius: 15,
                      }}
                    />
                  </View>
                  <Divider color="#DCDCDC" width={1.2} orientation="vertical" />
                  <View
                    style={{
                      height: 151,
                      // width:"100%",
                      // marginLeft: 20,
                      borderRadius: 15,
                      flex: 0.6,
                      justifyContent: 'center',
                      flexDirection: 'column',
                      // backgroundColor: 'white',
                    }}>
                    <View
                      style={{ flex: 0.7, justifyContent: 'center', marginTop: 20, marginLeft: 10, }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 15,
                          color: 'black',
                          fontWeight: "bold"
                        }}>
                        Subscribe to Newsletter
                      </Text>
                    </View>
                    <View style={{ flex: 0.9, alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                      <View
                        style={{
                          height: 48,
                          width: 70,
                          //  backgroundColor: '#ffcc00', 
                          borderRadius: 35,
                        }}>
                        <Image
                          source={require('../assets/arrowWhiteBack.png')}
                          style={{
                            width: '100%',
                            height: "100%",
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderBottomRightRadius: 17,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Trending New Blogs */}
            <View style={{ marginTop: 30, height: 35, flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'white',
                    fontWeight: "bold"
                  }}>
                  Trending New Blogs
                </Text>
              </View>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ margin: 10 }}
              data={Blogvideolist}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { gotoBlogDetail(item) }} 
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
                      height: 100,
                      borderRadius: 20,
                      width: WIDTH * 0.45,
                      alignItems: "center",
                      justifyContent: 'space-around',
                    }}>
                      <Image
                        resizeMode='contain'
                        source={{ uri: item.blog_image }}
                        style={{ justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', backgroundColor: 'white', width: '100%', height: '100%', }} />
                    </View>
                  <View 
                    style={{ height: 100, backgroundColor: '#fceeb5', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, width: WIDTH * 0.45, justifyContent: "flex-start", alignItems: "flex-start", }}>

                    <Text style={{ marginLeft: 10, marginTop: 5, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "bold" }}>{item.youtube_title.slice(0, 20) + '...'}</Text>

                    <View style={{ height: 65, alignItems: "center", marginTop: 2, justifyContent: "center", width: WIDTH * 0.45, marginTop: 2 }}>
                      <Text
                        style={{ marginHorizontal: 10, textAlign: 'left', fontSize: 7, color: '#000000', justifyContent: "center", alignItems: "center" }}>{item.youtube_description.slice(0, 308) + '...'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

              )}
            />
            {/* ///Category Blogs/ */}
            <View style={{ marginTop: 15, height: 35, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'white',
                    fontWeight: "bold"
                  }}>
                  Category Blogs
                </Text>
              </View>
            </View>
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={true}
              data={Blogcategorylist}
              style={{ margin: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    gotoCategory(item);
                  }}>
                  <BackgroundImage
                    resizeMode='stretch'
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
                  </BackgroundImage>
                </TouchableOpacity>
              )}
            />

            {NewsletterPopup ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={NewsletterPopup}
                onRequestClose={() => {
                  setNewsletterPopup(false);
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
                      //paddingTop: 40,
                      width: "100%",
                      justifyContent: "flex-end",
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 6,
                    }}>

                    <View style={{
                      backgroundColor: 'white',
                      // height: 350,
                      //marginHorizontal: 10,
                      // marginTop: 20,
                      width: "100%",
                      alignItems: 'center',
                      flexDirection: 'column',
                      // padding: 15,
                      marginHorizontal: 15,
                      borderRadius: 20,
                      marginBottom: 20,
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>


                      <View style={{
                        height: 150,
                        width: "100%",
                      }}>
                        <Image
                          source={require('../assets/newslogo.png')}
                          style={{ width: "100%", height: 190, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: "center", alignSelf: "center" }} />

                        <View style={{ position: "absolute", marginLeft: 110, justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ marginTop: 15, textAlign: 'center', fontSize: 15, color: 'white', fontWeight: "bold" }}>Subscribe News Letter</Text>
                        </View>

                      </View>

                      <View style={{
                        backgroundColor: "#F3FFFF",
                        // marginHorizontal: 20,
                        shadowColor: '#11032586',
                        borderRadius: 30,
                        marginTop: 65,
                        borderColor: "#41BDB9",
                        borderWidth: 0.5,
                        height: 45,
                        width: "85%",
                        alignItems: 'flex-start', justifyContent: 'flex-start',
                      }}>
                        <TextInput
                          placeholder="Please enter your email ID"
                          value={UserEmail}
                          onChangeText={(text) => setUserEmail(text)}
                          fontWeight='normal'
                          placeholderTextColor='#41BDB9'
                          style={{ width: '80%', paddingLeft: 14, color: '#41BDB9' }} />
                      </View>

                      <View style={{ marginLeft: 30, marginBottom: 15, flexDirection: 'row', height: 48, marginHorizontal: 20, marginTop: 30, justifyContent: "center", alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => { GetNewsletterApi() }}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', width: 150, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Subscribe</Text>

                          </View>
                        </TouchableOpacity>
                      </View>

                    </View>

                  </View>
                </View>
              </Modal>
            ) : null}
          </ScrollView>
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {/* <Text style={{color:"white",textAlign: 'center',fontSize: 15,marginBottom:4,fontWeight:"bold"}}>Loading.....</Text> */}
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
};
export default Blog;
