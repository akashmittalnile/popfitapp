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
  Dimensions, Linking, ActivityIndicator,KeyboardAvoidingView,Platform
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import CustomLoader from '../../Routes/CustomLoader';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;



const BlogDetail = (props) => {


  const [subcategoryBlogdetailsitems, setsubcategoryBlogdetailsitems] = useState([]);
  const [apistatus, setApiStatus] = useState('0');
  const [subscriptiontoken, setsubscriptiontoken] = useState("");

  const [usercomment, setUserComment] = useState("");
  // const [blog_comment, setblog_comment] = useState([]);
  const [comments, setComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // const buttonClickedHandler = () => {
  //   props.navigation.goBack();
  // };
  // const gotoComment = () => {
  //   props.navigation.navigate('Comment');
  // };

  // const gotoNotification = () => {
  //   props.navigation.navigate('Notifications');
  // };
  // const gotoContactUs = () => {
  //   props.navigation.navigate('ContactUs');
  // };

  // console.log("Blog_id_item ...............:", props?.route?.params?.blogdetail_id?.id);
  const blogdetail_id = props?.route?.params?.blogdetail_id?.id;

  // console.log("CategoryBlog_id_item ...............:", props?.route?.params?.Categoryblogid?.id);
  const Categoryblogid = props?.route?.params?.Categoryblogid?.id;

  // console.log("homeblogid_item ...............:", props?.route?.params?.homeblogid?.id);
  const homeblogid = props?.route?.params?.homeblogid?.id;
  // let BLOGId = blogdetail_id ? blogdetail_id : Categoryblogid ? Categoryblogid : homeblogid ? homeblogid : null;

  useEffect(() => {
    const checklogin = async () => {
      let Usertoken = await AsyncStorage.getItem("authToken");
      setsubscriptiontoken(Usertoken);
      // console.log("token.......", Usertoken);
      if (Usertoken != null) {
        getCategoryblog_detail();
        // props.navigation.navigate('LoginMain', {
        //   screen: 'LoginSignUp',
        // });
        // console.log(".....usertoken ..........................");
      }
      else {
        getCategoryblog_detail();
        // console.log("..........usertoken_null/////:");
      }
    };
    checklogin();

  }, []);

  // const getusertoken = async () => {
  //   const usertoken = await AsyncStorage.getItem("authToken");
  //   // console.log("check_token in comment button:::>>>>>..", usertoken);

  // }
  const Checkedtoken = () => {
    // console.log("Checkedtoken status::", subscriptiontoken);
    subscriptiontoken == null ?
      Alert.alert('', 'Please login first')
      :
      setComments(true);


  };
  const MycustomonShare = async () => {
    let Usertoken = await AsyncStorage.getItem("authToken");
    if (Usertoken == null) {
      Alert.alert('', 'Please login first')
    } else if (Usertoken != null) {
      const shareOptions = {
        title: 'Popfiit Blog Contents',
        icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
        // type: 'data:image/png;base64,<imageInBase64>',
        message: "Popfiit Blog Post !!!",
        url: 'https://www.youtube.com/embed/ml6cT4AZdqI',
      }
      try {
        const shareResponse = await Share.open(shareOptions);
        
        // console.log(JSON.stringify(shareResponse));
        
      }
      catch (error) {
        console.log('ERROR=>', error);
      }
    }


  };

  const getCategoryblog_detail = async () => {
    let Token = await AsyncStorage.getItem("authToken");
    

    setIsLoading(true);
    try {

      const response = await axios.post(`${API.BLOG_DETAILS}`, { "blog_id": blogdetail_id ? blogdetail_id : Categoryblogid ? Categoryblogid : homeblogid },
        { headers: { "Authorization": ` ${Token != null ? Token : null}` } });
      // console.log(":::::::::DetailsBLog_Response>>>", response.data.blog_detail);
      // console.log("status _DetailsBLog:", response.data.status);
      // console.log("status _comment_count:", response.data.comment_count);
      // console.log("status _blog_comment:", response.data.blog_comment);
      if (response.data.status == '1') {
        setApiStatus('1');
        setsubcategoryBlogdetailsitems(response.data);
        // setcomment_count(response.data.comment_count);
        // setblog_comment(response.data.blog_comment);
        // setIsLoading(false);
      }
      else if (response.data.status == '0') {
        // setIsLoading(false);
        Alert.alert('', 'Something went wrong please exit the app and try again');
        setApiStatus('0');
      } 
      // else {
      //   // setIsLoading(false);
      //   Alert.alert('', 'Something went wrong please exit the app and try again');
      // }


    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // console.log("......error.........", error.response.data.message);
      // setIsLoading(false);

    }
    setIsLoading(false);
  };

  const ShareCommentApi = async () => {

    // console.log("User commented_STATUS:::::::::::::::::::::::", subscriptiontoken);
    const EnterComment = usercomment;
    setIsLoading(true);
    try {
      // setIsLoading(false);
      const response = await axios.post(`${API.SEND_COMMENTS}`, { "blog_id": blogdetail_id ? blogdetail_id : Categoryblogid ? Categoryblogid : homeblogid ? homeblogid : null, "comment": EnterComment }, { headers: { "Authorization": ` ${subscriptiontoken}` } })
      // console.log("User commented_STATUS::", response.data.status);
      // console.log("User commented_Message::", response.data.message);
      if (response.data.status == 1) {
        getCategoryblog_detail();
        setComments(false);
        Alert.alert('', 'Comment send successfully');
        setUserComment('');
      }
      // else {
      //   // setIsLoading(false);
      //   Alert.alert('', 'Something went wrong please exit the app and try again');
      // }


    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // Alert.alert('', 'Something went wrong please exit the app and try again');
      // console.log("......error.........", error.response.data.message);
      // setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1,
    }} >
      <Headers
      // navigation={props.navigation}
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
        BelliconononClick={() => { 
          props.navigation.navigate("Notifications") 
        }}
      />
      {!isLoading ?
        (<>
          {
            apistatus == '1' ?
              (<View style={{
                height: HEIGHT,
                width: WIDTH, flex: 1
              }}>
                {/* <View style={styles.navigationBarColor}>
            <View style={styles.navigationBarLeftContainer}>
              <TouchableOpacity onPress={() => { buttonClickedHandler() }}>
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

                <ScrollView
                // style={{ marginTop: 10, marginBottom: 20 }}
                >
                  <View style={{ paddingBottom: 70 }}>


                    <View>
                      <View style={{ marginLeft: 20, marginTop: 6, height: 50, width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }} numberOfLines={1}>
                        <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', fontWeight: "500" }}>{subcategoryBlogdetailsitems?.blog_detail?.youtube_title.slice(0, 36)}</Text>
                      </View>
                      <View style={{
                        marginHorizontal: 20, marginTop: 6, height: 200, borderRadius: 20, marginVertical: 1, width: WIDTH * 0.9,
                      }}>
                        <View style={{
                          height: '100%',
                          overflow: "hidden",
                          width: WIDTH * 0.9,
                          borderRadius: 20,
                          justifyContent: 'center',
                          // alignSelf: "auto"

                        }}>
                          <WebView
                            source={{ uri: subcategoryBlogdetailsitems?.blog_detail?.youtube_link }}
                          />


                        </View>
                        {/* <TouchableOpacity onPress={() => { Linking.openURL(subcategoryBlogdetailsitems?.youtube_link) }}
                    style={{ justifyContent: 'space-around', height: '100%', resizeMode: "center", alignItems: "center", width: WIDTH * 0.9 }}>

                    <Image
                      source={{ uri: subcategoryBlogdetailsitems?.image }}
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

                  </TouchableOpacity> */}
                      </View>
                      <View style={{ marginHorizontal: 20, marginTop: 15, height: "auto", width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}>
                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000', fontWeight: "400" }}>{subcategoryBlogdetailsitems?.blog_detail?.youtube_description}</Text>
                      </View>

                      <View style={{ marginLeft: 20, marginTop: 5, height: 50, width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }} numberOfLines={1}>
                        <Text style={{ textAlign: 'left', fontSize: 18, color: '#000', fontWeight: "500" }} >{subcategoryBlogdetailsitems?.blog_detail?.image_title}</Text>
                      </View>

                      <View style={{ backgroundColor: "white", borderRadius: 20, marginTop: 6, height: HEIGHT * 0.2, width: WIDTH * 0.9, marginHorizontal: 18, }}>
                        <Image resizeMode='contain'
                          source={{ uri: `${subcategoryBlogdetailsitems?.blog_detail?.image}` }}
                          style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center', borderRadius: 20 }}
                        />
                      </View>

                      <View style={{ marginHorizontal: 20, marginTop: 15, height: "auto", width: WIDTH * 0.9, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}>
                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000', fontWeight: "400" }}>{subcategoryBlogdetailsitems?.blog_detail?.image_description}</Text>
                      </View>
                    </View>

                    {/* //Comment//  */}

                    <Text
                      style={{
                        marginLeft: 25,
                        marginTop: 20,
                        textAlign: 'left',
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: "bold"
                      }}>{subcategoryBlogdetailsitems?.comment_count}  <Text>Comments</Text>
                    </Text>

                    <FlatList
                      vertical
                      keyExtractor={(item, index) => String(index)}
                      data={subcategoryBlogdetailsitems?.blog_comment}
                      renderItem={({ item ,index}) => (
                        <View style={{
                          // backgroundColor: "red",
                          padding: 15,
                          marginHorizontal: 10,
                          borderRadius: 10,
                          height: 100,
                          width: WIDTH * 0.94,
                          borderWidth: 1,
                          borderColor: "lightgrey",
                          borderRadius: 30,
                          marginVertical: 6,
                          marginTop: 10,
                          justifyContent: "center",

                        }}>
                          <View
                            style={{
                              marginHorizontal: 6,
                              marginVertical: 15,
                              height: 60,
                              width: 60,
                              justifyContent: 'center',
                              position: 'absolute',
                              alignItems: 'center',
                              borderRadius: 60 / 2,

                            }}>
                            <Image resizeMode='contain'
                              style={{
                                height: 60,
                                width: 60,
                                marginVertical: -20,
                                borderRadius: 60, backgroundColor: "black"
                              }}
                              source={{ uri: `${item.image}` }}
                            />
                          </View>

                          <View
                            style={{
                              marginTop: -6,
                              marginLeft: 60,
                              flex: 1,
                              flexDirection: 'row',
                            }}>
                            <View style={{ flex: 0.5 }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 12,
                                  color: '#000000',
                                  fontWeight: "500"
                                }}>
                                {item.user_name}
                              </Text>
                            </View>
                            <View style={{ flex: 0.8 }}>
                              <Text
                                style={{
                                  textAlign: 'right',
                                  fontSize: 12,
                                  color: '#000000',

                                }}>
                                {item.created_at}
                              </Text>
                            </View>
                          </View>

                          <View style={{ marginLeft: 60, flex: 3.2, justifyContent: "center", alignItems: "flex-start", marginTop: 10, marginVertical: -5, height: "auto" }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontSize: 10,
                                color: '#000000',
                              }}>{item.comment}
                            </Text>
                          </View>
                        </View>
                      )}
                    />

                  </View>
                </ScrollView>

                <View
                  style={{
                    position: "absolute",
                    bottom: 6,
                    marginBottom: 10,
                    flexDirection: 'row',
                    height: 34,
                    marginHorizontal: 20,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignSelf: "center"
                  }}>
                  <TouchableOpacity
                    onPress={() => { MycustomonShare() }}>
                    <View
                      style={{
                        width: 160,
                        flex: 1,
                        backgroundColor: '#ffcc00',
                        borderRadius: 50,
                        justifyContent: "center",
                        alignSelf: "center"
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../assets/share.png')}
                          style={{
                            width: 15,
                            height: 15,
                            alignSelf: 'center',
                            marginRight: 10,
                          }}
                        />

                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white',

                          }}>
                          Share
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Checkedtoken()

                    }}>
                    <View
                      style={{
                        width: 160,
                        flex: 1,
                        backgroundColor: '#ffcc00',
                        borderRadius: 50,
                        marginLeft: 20,
                        justifyContent: "center",
                        alignSelf: "center"
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../assets/comment.png')}
                          style={{
                            width: 17,
                            height: 15,
                            alignSelf: 'center',
                            marginRight: 10,
                          }}
                        />

                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white',

                          }}>
                          Comment
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={comments}
                  onRequestClose={() => {
                    setComments(false);
                  }}>
                    <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: 'flex-end',
                      // alignItems: 'center',
                      backgroundColor: 'rgba(140, 141, 142, 0.7)',
                    }}>
                       <TouchableOpacity
                      onPress={() => setComments(false)}
                      style={{ flex: 1 }}
                    />
                    <View
                      style={{
                        // margin: 10,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        //paddingTop:10,
                        width: "100%",
                        height: 300,
                        alignItems: 'center',
                        shadowColor: '#000',
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 2,
                        // },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 300,
                          width: "100%",
                          marginHorizontal: 85,
                          borderRadius: 20,
                          marginBottom: 20,
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{
                            marginTop: 20,
                            marginHorizontal: 20,
                            height: 25,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#f2f2f2',
                              width: 25,
                              height: 25,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'white',
                            }}>
                            <Image
                              source={require('../assets/comment1.png')}
                              style={{ height: 25, width: 25, backgroundColor: 'white' }}
                            />
                          </View>
                          <Text
                            style={{
                              marginTop: 2,
                              marginLeft: 10,
                              textAlign: 'center',
                              fontSize: 14,
                              color: 'black',

                            }}>
                            Post Your Comment
                          </Text>
                        </View>

                        <View
                          style={{

                            borderColor: "#bbbaba",
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            //marginHorizontal: 15,
                            borderRadius: 15,
                            backgroundColor: 'white',
                            marginTop: 20,
                            height: 140,
                            width: '90%',
                            justifyContent: "flex-start"
                          }}>
                          <View>
                            <TextInput
                              placeholder="Type Your comment here....."
                              value={usercomment}
                              onChangeText={(text) => setUserComment(text)}
                              fontWeight="normal"
                              placeholderTextColor="grey"
                              numberOfLines={10}
                              multiline={true}
                              textAlignVertical='top'
                              style={{
                                // padding: 10,
                                //  backgroundColor:"red",
                                width: '99%',
                                color: 'black',
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                height: "100%",
                                justifyContent: "flex-start",
                                //marginBottom:80
                              }}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            marginLeft: 30,
                            marginBottom: 20,
                            flexDirection: 'row',
                            height: 34,
                            marginHorizontal: 20,
                            marginTop: 30,
                          }}>
                          <TouchableOpacity onPress={() => { ShareCommentApi() }}>
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 120,
                                flex: 1,
                                backgroundColor: '#ffcc00',
                                borderRadius: 35,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 15,
                                  color: 'white',

                                }}>
                                Post
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  </KeyboardAvoidingView> 
                </Modal>
              </View>)
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
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>Oops! No data found</Text>
              </View>)
          }
        </>)
        :
        (
         <CustomLoader showLoader={isLoading}/>
        )}
    </SafeAreaView>
  );
};

export default BlogDetail;
