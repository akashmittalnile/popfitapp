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
import * as yup from 'yup';
import { Formik } from 'formik';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from 'regenerator-runtime';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Blog = (props) => {

  // const [UserEmail, setUserEmail] = useState("");
  const [Blogvideolist, setBlogvideolist] = useState([]);
  const [Blogcategorylist, setBlogcategorylist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [NewsletterPopup, setNewsletterPopup] = useState(false);


  const gotoBlogDetail = async (item) => {
    const usertkn = await AsyncStorage.getItem("authToken");
    if (usertkn == null) {
      Alert.alert('Blog details', 'Login first!')
    }
    else if (usertkn != null) {
      props.navigation.navigate('BlogDetail', {
        blogdetail_id: item
      });
    }

  };
  const gotoCategory = (item) => {
    props.navigation.navigate('Category', {
      ITEMS: item
    });
  };


  useEffect(() => {
    GetCategoryBlogApi();

  }, [props]);



  const GetNewsletterApi = async (values) => {
    const usertkn = await AsyncStorage.getItem("authToken");
 
    // const EnterEmail = UserEmail;
    const data = {
      email: values.Checkemail,
    }
    if(usertkn != null){
    // console.log("......userenteremail::", EnterEmail);
    setIsLoading(true);
    try {

      const response = await axios.post(`${API.NEWS_LETTER_SUBSCRIPTION}`, data, { headers: { "Authorization": ` ${usertkn}` } });
      // console.log(":::::::::Traing_Workout_Response>>>", response.data);
      // console.log("Traing_Workout_data::::::", response.data.status);
      if (response.data.status == 1) {
        props.navigation.goBack()
        setIsLoading(false);
      } else if (response.data.status == 0) {
        Alert.alert('Not Accessible', 'Login First !')
      }

    }
    catch (error) {
      Alert.alert('Blog Data', ' Something went wrong, Try again later !')
      // console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }
  }else {
    Alert.alert('','User not found')
  }
  };

  const GetCategoryBlogApi = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {

      const response = await axios.get(`${API.BLOG_MAIN_SCREEN}`,
        // { headers: { "Authorization": ` ${usertkn}` } }
      );
      // console.log(":::::::::Traing_Workout_Response>>>", response.data);
      // console.log("Traing_Workout_data::::::", response.data.status);
      setBlogvideolist(response.data.blog)
      setBlogcategorylist(response.data.blogcategory)
      setIsLoading(false);

    }
    catch (error) {
      Alert.alert('Blog Data', ' Something went wrong, Try again later !')
      // console.log("......error.........", error.response.data.message);
      setIsLoading(false);

    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, backgroundColor: 'black', flexGrow: 1
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
        (<View style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>

          <ScrollView nestedScrollEnabled={true} >
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
                  setNewsletterPopup(true);
                }}>
                <View
                  style={{
                    height: 120,
                    width: "90%",
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    // marginHorizontal: 25,
                    marginTop: 20,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      // width:120,
                      height: 140,
                      // marginLeft: 20,
                      flex: 0.4,
                      borderRadius: 20,
                      marginRight: 10,
                      backgroundColor: 'whiredte',
                    }}>
                    <Image
                      resizeMode='cover'
                      source={require('../assets/subscribelogo.png')}
                      style={{
                        alignSelf: 'center',
                        width: "100%",
                        height: "100%",
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                      }}
                    />
                  </View>
                  <Divider color="#DCDCDC" width={1.2} orientation="vertical" />
                  <View
                    style={{
                      height: 151,
                      // width:"100%",
                      // marginLeft: 20,
                      borderRadius: 20,
                      flex: 0.6,
                      justifyContent: 'center',
                      flexDirection: 'column',
                      // backgroundColor: 'white',
                    }}>
                    <View
                      style={{ flex: 0.6, justifyContent: 'center', marginTop: 30, marginLeft: 0, right: 2, alignItems: "center" }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 16,
                          color: 'black',
                          fontWeight: "600"
                        }}>
                        Subscribe to Newsletter
                      </Text>
                    </View>
                    <View style={{ flex: 0.9, alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                      <View
                        style={{
                          height: 45,
                          width: 60,
                          // right:-1,
                          //  backgroundColor: '#ffcc00', 
                          borderRadius: 50,
                        }}>
                        <Image
                          source={require('../assets/arrowWhiteBack.png')}
                          style={{
                            width: '100%',
                            height: "100%",
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderBottomRightRadius: 20,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Trending New Blogs */}
            <View style={{ marginTop: 15, height: 30, flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    color: 'white',
                    fontWeight: "500"
                  }}>
                  Trending New Blogs
                </Text>
              </View>
            </View>
            <FlatList
              horizontal
              // nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              // style={{ margin: 10 }}
              keyExtractor={(item, index) => String(index)}
              data={Blogvideolist}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => { gotoBlogDetail(item) }}
                  style={{
                    backgroundColor: 'white',
                    height: 180,
                    width: WIDTH * 0.45,
                    marginTop: 10,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                  }}>
                  <View style={{
                    height: 150,
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
                    style={{ height: 30, backgroundColor: '#fceeb5', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, width: WIDTH * 0.45, justifyContent: "flex-start", alignItems: "center", paddingTop: 5, paddingLeft: 0, }}>

                    <Text numberOfLines={1}
                      style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "500" }}>{item.youtube_title.slice(0, 15) + '...'}</Text>

                    {/* <View style={{ height: 30, alignItems: "flex-start", paddingTop: 4, justifyContent: "flex-start", width: WIDTH * 0.42, marginBottom:4, }}>
                      <Text  numberOfLines={1}
                        style={{textAlign: 'left', fontSize: 8, color: '#000000',fontWeight: "300"  }}>{item.youtube_description.slice(0, 200) + '...'}</Text>
                    </View> */}
                  </View>
                </TouchableOpacity>

              )}
            />
            {/* ///Category Blogs/ */}
            <View style={{ marginTop: 15, height: 30, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    color: 'white',
                    fontWeight: "500"
                  }}>
                  Category Blogs
                </Text>
              </View>
            </View>
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={true}
              keyExtractor={(item, index) => String(index)}
              data={Blogcategorylist}
              // style={{ margin: 0}}
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
                          source={{ uri: `${item?.image}` }}
                          resizeMode="stretch"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                            alignSelf: 'center',
                          }}
                        />
                        <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "500" }}>{item?.cat_name}</Text>

                        </View>

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
                )
              }}
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
                      // shadowColor: '#000',
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.25,
                      // shadowRadius: 4,
                      // elevation: 6,
                    }}>
                    <Formik
                      initialValues={{
                        Checkemail: '',
                      }}
                      onSubmit={values => GetNewsletterApi(values)}

                      validationSchema={yup.object().shape({
                        Checkemail: yup
                          .string()
                          .required('Please, enter a valid email address*'),
                      })}
                    >
                      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View style={{
                          backgroundColor: 'white',
                          height: 340,
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

                            <View style={{ marginTop: 20, position: "absolute", marginLeft: 110, justifyContent: "center", alignItems: "center" }}>
                              <Text style={{ textAlign: 'center', fontSize: 17, color: 'white', fontWeight: "600" }}>Subscribe News Letter</Text>
                            </View>

                          </View>


                          <View style={{
                            // backgroundColor: "#F3FFFF",

                            // shadowColor: '#11032586',
                            // borderRadius: 30,
                            marginTop: 65,
                            height: 55,
                            width: "99%",

                          }}>
                            <TextInput
                              placeholder="Please enter your email ID"
                              value={values.Checkemail}
                              // onChangeText={(text) => setUserEmail(text)}
                              onChangeText={handleChange('Checkemail')}
                              onBlur={() => setFieldTouched('Checkemail')}
                              fontWeight='normal'
                              placeholderTextColor='#41BDB9'
                              style={{
                                backgroundColor: "#F3FFFF",
                                marginHorizontal: 20,
                                shadowColor: '#11032586',
                                borderRadius: 30,
                                // marginTop: 10,
                                borderColor: "#41BDB9",
                                borderWidth: 0.5,
                                height: 45,
                                width: "90%",
                                justifyContent: 'center', alignItems: 'center',
                                paddingLeft: 14, color: '#41BDB9'
                              }} />

                            {
                              touched.Checkemail && errors.Checkemail &&
                              <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 35, marginTop: 6 }}>{errors.Checkemail}</Text>
                            }
                          </View>


                          <View style={{ marginLeft: 30, marginBottom: 15, flexDirection: 'row', height: 36, marginHorizontal: 20, marginTop: 30, justifyContent: "center", alignItems: 'center', }}>
                            <TouchableOpacity disabled={!isValid}
                              onPress={() => { handleSubmit(values) }}>
                              <View style={{ alignItems: 'center', justifyContent: 'center', width: 150, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'white'}}>Subscribe</Text>

                              </View>
                            </TouchableOpacity>
                          </View>

                        </View>
                      )}
                    </Formik>








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
