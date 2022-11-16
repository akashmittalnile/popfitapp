// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Image,
//   Alert,
//   Pressable,
//   SafeAreaView,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {ScrollView} from 'react-native-gesture-handler';
// import {BackgroundImage} from 'react-native-elements/dist/config';
// import {RadioButton} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {Pages} from 'react-native-pages';
// import styles from '../../Routes/style';
// import Headers from '../../Routes/Headers';
// import axios from 'axios';
// import {API} from '../../Routes/Urls';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useSelector, useDispatch} from 'react-redux';
// import {incrementCounter} from '../../Redux/actions/UpdateCounter';
// import CustomLoader from '../../Routes/CustomLoader';

// var WIDTH = Dimensions.get('window').width;
// var HEIGHT = Dimensions.get('window').height;

// const Notifications = props => {
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(false);
//   const [noti, setNoti] = useState([]);

//   const Clicknotication = item => {
//     console.log('after click data:', item.type);
//     if (item.type == 'recipe') {
//       // props.navigation.reset({
//       //   index: 0,
//       //   routes: [{ name: 'Home' }]
//       // })
//       props.navigation.navigate("Home")
//     } else if (item.type == 'training') {
       
//       props.navigation.navigate("TrainingDetail")
//     } else if (item.type == 'blog') {
      
//       props.navigation.navigate("Blog")
//     } else {
//       // Alert.alert('TYPE:COUPON');
//       console.log('Go to current page for coupon !!');
//     }
//   };
//   useEffect(() => {
//     GetNotification();
//   }, []);

//   const GetNotification = async () => {
//     const usertkn = await AsyncStorage.getItem('authToken');

//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API.NOTIFICATION}`, {
//         headers: {Authorization: ` ${usertkn}`},
//       });
//       let data = response.data.data.length;
//       // console.log('incrementCounter1', data);
//       dispatch(incrementCounter(parseInt(data)));
//       // AsyncStorage.setItem("notification", JSON.stringify(data));
//       if (response.data.status == '1') {
//         setIsLoading(false);
//         setNoti(response.data.data);
//       }
//     } catch (error) {
//       // Alert.alert('Something went wrong', '')
//       setIsLoading(false);
//       //  console.log("ShippingProductserror:::", error);
//     }
//   };
//   //console.log('notiii------>', noti)
//   const ItemRemove = async item => {
//     const usertkn = await AsyncStorage.getItem('authToken');
//     setIsLoading(true);
//     console.warn('$$$$$$id---->', item.id);
//     let id = item.id;
//     const url = API.NOTIFICATION_DELETE + '/' + id;
//     console.log('url------>', url);
//     axios({
//       url: url,
//       method: 'DELETE',
//       // data: data,
//       headers: {
//         Authorization: ` ${usertkn}`,
//       },
//     })
//       .then(function (response) {
//         if (response.data.status == '1') {
//           GetNotification();
//         } else {
//           alert('something went wrong');
//         }

//         setIsLoading(false);
//       })
//       .catch(function (error) {
//         console.log('......error.........', error);
//         Alert.alert('something went wrong in catch');
//         setIsLoading(false);
//       });

//     // try {

//     //     const response = await axios.delete(`${API.NOTIFICATION_DELETE + '/' + id}`, {
//     //         headers: {
//     //             "Authorization": ` ${usertkn}`
//     //         }
//     //     });
//     //     //  console.log(":::::::::item_Response>>>", response.data);
//     //     if (response.data.status == "1") {
//     //         GetShippingProducts();
//     //     }
//     //     else {
//     //         alert("something went wrong")
//     //     }
//     // }
//     // catch (error) {
//     //     console.log("......error.........", error);
//     //     alert("something went wrong in catch")
//     //     setIsLoading(false);
//     // }
//   };

//   const NoticationDetails = async item => {
//     const usertkn = await AsyncStorage.getItem('authToken');
//     console.log('item in notification details API:', item.id);
//     if (item.id != null) {
//       let notifiID = item.id;
//       setIsLoading(true);

//       try {
//         const response = await axios.post(
//           `${API.NOTIFICATION_DETAILS}`,
//           {notification_id: notifiID},
//           {headers: {Authorization: ` ${usertkn}`}},
//         );
//         console.log(
//           'notificationdetails response:',
//           response.data.message,
//           response.data.status,
//         );
//         if (response.data.status == 1) {
//           GetNotification();
//           // setIsLoading(false);
//         } else if (response.data.status == 0) {
//           alert('Server issue', 'Try again later ');
//           // setIsLoading(false);
//         }
//       } catch (error) {
       
//         // console.log("NoticationDetails-error:::", error);
//         Alert.alert('something went wrong !', 'Try again later');
//       } setIsLoading(false);
//     } setIsLoading(false);
//   };
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         width: WIDTH,
//         height: HEIGHT,
//         flexGrow: 1,
//         backgroundColor: 'white',
//       }}>
//       <Headers
//         Backicon={{
//           visible: true,
//         }}
//         BackicononClick={() => {
//           props.navigation.goBack();
//         }}
//         CartIcon={{
//           visible: true,
//         }}
//         CartIconononClick={() => {
//           props.navigation.navigate('CartAdded');
//         }}
//         Bellicon={{
//           visible: true,
//         }}
//         BelliconononClick={() => {
//           // props.navigation.navigate('Notifications');
//         }}
//       />

//       {!isLoading ? (
//         <View
//           style={{
//             flex: 1,
//             marginTop: 8,
//             width: '100%',
//             height: '100%',
//           }}>
//           <ScrollView>
//             {noti?.length > 0 ? (
//               noti.map((item, index) => {
//                 return (
//                   <View
//                     style={{
//                       width: '100%',
//                     }}>
//                     {item.is_read == '1' ? (
//                       <>
//                         <TouchableOpacity
//                           onPress={() => {
//                             Clicknotication(item), NoticationDetails(item);
//                           }}
//                           style={{
//                             marginHorizontal: 10,
//                             // marginTop: 6,
//                             height: 85,
//                             borderRadius: 20,
//                             // marginBottom: 10,
//                             marginVertical: 10,
//                             // backgroundColor: 'red',
//                             backgroundColor: '#FFFFFF',
//                             width: WIDTH * 0.95,
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                             // paddingBottom: 10,
//                             // shadowColor: '#cdcbcb',
//                             // shadowRadius: 6,
//                             // shadowOpacity: 0.1,
//                             // elevation: 6,
//                             borderWidth: 1,
//                             borderColor: '#F4F4F4',
//                           }}>
//                           <TouchableOpacity
//                             onPress={() => ItemRemove(item)}
//                             style={{
//                               position: 'absolute',
//                               backgroundColor: 'red',
//                               width: 30,
//                               height: 30,
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               borderRadius: 20 / 2,
//                               top: 20,
//                               right: 10,
//                             }}>
//                             <Image
//                               resizeMode="contain"
//                               source={require('../assets/delete.png')}
//                             />
//                           </TouchableOpacity>

//                           <View
//                             style={{
//                               marginHorizontal: 10,
//                               width: WIDTH * 0.8,
//                               height: 85,
//                               flexDirection: 'row',
//                               justifyContent: 'flex-start',
//                               alignItems: 'flex-start',
                              
//                             }}>
//                             <View
//                               style={{
//                                 marginRight: 20,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 height: 85,
//                               }}>
//                               <Image
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   alignSelf: 'center',
//                                 }}
//                                 source={require('../assets/notification.png')}
//                               />
//                             </View>
//                             <View
//                               style={{
//                                 height: 85,paddingBottom:8,
//                                 width: WIDTH * 0.67,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                               }}>
//                               <Text
//                                 numberOfLines={1}
//                                 style={{
//                                   marginTop: 2,
//                                   textAlign: 'left',
//                                   fontSize: 15,
//                                   color: 'black',
//                                   fontWeight: '500',
//                                 }}>
//                                 {item.title}
//                               </Text>
//                               <View
//                                 style={{
//                                   marginTop: 4,
//                                 }}>
//                                 <Text
//                                   numberOfLines={2}
//                                   style={{
//                                     textAlign: 'left',
//                                     fontSize: 12,
//                                     color: '#455A64',
//                                     fontWeight: '400',
//                                   }}>
//                                   {item.message}
//                                 </Text>
//                               </View>
//                               <Text
//                                 numberOfLines={1}
//                                 style={{
//                                   marginTop: 4,
//                                   textAlign: 'left',
//                                   fontSize: 12,
//                                   color: '#455A64',
//                                   fontWeight: '400',
//                                 }}>
//                                 {item.created_at}
//                               </Text>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                       </>
//                     ) : (
//                       <>
//                         <TouchableOpacity
//                           onPress={() => {
//                             Clicknotication(item), NoticationDetails(item);
//                           }}
//                           style={{
//                             marginHorizontal: 10,
//                             // marginTop: 6,
//                             height: 85,
//                             borderRadius: 20,
//                             // marginBottom: 10,
//                             marginVertical: 10,
//                             backgroundColor: '#F4F4F4',
//                             width: WIDTH * 0.95,
//                             justifyContent: 'flex-start',
//                             alignItems: 'flex-start',
//                             // paddingBottom: 10,
//                             // shadowColor: '#cdcbcb',
//                             // shadowRadius: 6,
//                             // shadowOpacity: 0.1,
//                             // elevation: 6,
//                             borderWidth: 1,
//                             borderColor: '#F4F4F4',
//                           }}>
//                           <TouchableOpacity
//                             onPress={() => ItemRemove(item)}
//                             style={{
//                               position: 'absolute',
//                               backgroundColor: 'red',
//                               width: 30,
//                               height: 30,
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               borderRadius: 20 / 2,
//                               top: 20,
//                               right: 10,
//                             }}>
//                             <Image
//                               resizeMode="contain"
//                               source={require('../assets/delete.png')}
//                             />
//                           </TouchableOpacity>

//                           <View
//                             style={{
//                               marginHorizontal: 10,
//                               width: WIDTH * 0.8,
//                               height: 80,
//                               flexDirection: 'row',
//                               justifyContent: 'flex-start',
//                               alignItems: 'flex-start',
//                             }}>
//                             <View
//                               style={{
//                                 marginRight: 20,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 height: 80,
//                               }}>
//                               <Image
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   alignSelf: 'center',
//                                 }}
//                                 source={require('../assets/notification.png')}
//                               />
//                             </View>
//                             <View
//                               style={{
//                                 height: 80,
//                                 width: WIDTH * 0.67,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                               }}>
//                               <Text
//                                 numberOfLines={1}
//                                 style={{
//                                   marginTop: 2,
//                                   textAlign: 'left',
//                                   fontSize: 15,
//                                   color: 'black',
//                                   fontWeight: '500',
//                                 }}>
//                                 {item.title}
//                               </Text>
//                               <View
//                                 style={{
//                                   marginTop: 4,
//                                 }}>
//                                 <Text
//                                   numberOfLines={2}
//                                   style={{
//                                     textAlign: 'left',
//                                     fontSize: 12,
//                                     color: '#455A64',
//                                     fontWeight: '400',
//                                   }}>
//                                   {item.message}
//                                 </Text>
//                               </View>
//                               <Text
//                                 numberOfLines={1}
//                                 style={{
//                                   marginTop: 4,
//                                   textAlign: 'left',
//                                   fontSize: 12,
//                                   color: '#455A64',
//                                   fontWeight: '400',
//                                 }}>
//                                 {item.created_at}
//                               </Text>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                       </>
//                     )}
//                   </View>
//                 );
//               })
//             ) : (
//               <View
//                 style={{
//                   marginTop: 250,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flex: 1,
//                   // backgroundColor: "red",
//                   // height:1000
//                 }}>
//                 <Image
//                   resizeMode="contain"
//                   source={require('../assets/Nodatafound.png')}
//                   style={{
//                     width: 200,
//                     height: 120,
//                     alignSelf: 'center',
//                   }}
//                 />
//                 <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
//                 No Notificaton Found !
//                 </Text>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       ) : (
//         <CustomLoader showLoader={isLoading}/>
//         // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         //   <ActivityIndicator size="large" color="#ffcc00" />
//         // </View>
//       )}
//     </SafeAreaView>
//   )
// };

// export default Notifications;
