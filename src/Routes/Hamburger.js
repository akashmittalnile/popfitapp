// import React, { useState, useEffect } from 'react'
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, FlatList, Dimensions, Modal } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
// import { ScrollView } from 'react-native-gesture-handler';
// import { BackgroundImage } from 'react-native-elements/dist/config';
// import { RadioButton } from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
// import DrawerAfterLogin from './CustomDrawer';
// var deviceHeight = Dimensions.get('window').height;


// const Hamburger = ({ props }) => {


//   //console.log("....props........///",props);
//   const buttonClickedHandler = () => {
//     props.navigation.goBack()
//   }
//   const buttonClickedHandler1 = () => {
//     setContactUs(!ContactUs)
//     props.navigation.navigate("Home")
//   }
//   const gotoTrainingDetails = () => {
//     props.navigation.navigate("TrainingDetail")
//   }

//   const [toggleCheckBox, setToggleCheckBox] = useState(false)
//   const [ContactUs, setContactUs] = React.useState(false);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState([]);

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView style={{
//         height: deviceHeight,
//         width: '100%',
//         backgroundColor: '#000000',
//       }} >
//         <TouchableOpacity onPress={() => { buttonClickedHandler() }}>
//           <View style={{
//             height: 60,
//             left: 10,
//             width: "20%",
//             justifyContent: 'center',
//           }}>
//             <Image source={require('../Screens/assets/cancelWhite.png')}
//               style={{
//                 width: 30,
//                 height: 30,
//                 tintColor: "white",
//                 marginTop: 5, left: 10
//               }}
//             />

//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => props.navigation.navigate("MyProfile")}>
//           <View style={{ borderRadius: 20, backgroundColor: 'white', marginHorizontal: 20, height: 100, flexDirection: 'row', marginTop: 40 }}>
//             <View style={{ justifyContent: 'center', width: 100, height: 100 }} >
//               <Image source={require('../Screens/assets/profileImage.png')}
//                 style={{
//                   width: 80,
//                   height: 80, alignSelf: 'center', borderRadius: 80 / 2
//                 }} />
//             </View>
//             <View style={{ justifyContent: 'center', flex: 1, height: 100 }} >
//               <Text style={{ fontSize: 15, color: 'black',   textAlign: 'left' }}>Jerry Paul</Text>
//             </View>
//             <View style={{ justifyContent: 'flex-end', flex: 1 / 2, width: 50, }}>
//               <Image source={require('../Screens/assets/arrowWhiteBack.png')}
//                 style={{
//                   width: 40,
//                   height: 30, borderBottomRightRadius: 10, alignSelf: 'flex-end'
//                 }} />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <View style={{ marginBottom: 30, marginTop: 30, marginHorizontal: 15 }} >

//           <TouchableOpacity onPress={() => props.navigation.navigate("Home")} >
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu1.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ width: 50, height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Home</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { gotoTrainingDetails() }}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu2.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Training</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("Shop ")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu3.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Shop</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("Blog")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu4.png')}
//                   style={{
//                     width: 22,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Blog</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("TermsAndCondition")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu5.png')}
//                   style={{
//                     width: 22,
//                     height: 22, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Terms & Condition</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("CancellationPolicy")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu6.png')}
//                   style={{
//                     marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Cancellation Return Policy </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("RefundPolicy")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu7.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Refund Policy</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => { setContactUs(!ContactUs) }}>
//             {/* <TouchableOpacity> */}
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu8.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Contact Us</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => props.navigation.navigate("AboutsUs")}>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu9.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>About Us</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu10.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Donation Link</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu11.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Develop the Concept</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu12.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Invite Your Friend</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={{ marginTop: 15, flexDirection: 'row', height: 30 }}>
//               <View style={{ width: 50, height: 50 }} >
//                 <Image source={require('../Screens/assets/menu13.png')}
//                   style={{
//                     width: 20,
//                     height: 20, marginLeft: 5
//                   }} />
//               </View>
//               <View style={{ height: 50 }} >
//                 <View style={{ height: 50, marginLeft: -10 }} >
//                   <Text style={{ fontSize: 15, color: 'white',    textAlign: 'left' }}>Rate Us</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {ContactUs ? (
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={ContactUs}
//             onRequestClose={() => {
//               setContactUs(!ContactUs);
//             }}>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(140, 141, 142, 0.7)',
//               }}>
//               <View
//                 style={{
//                   margin: 10,
//                   backgroundColor: 'white',
//                   borderRadius: 20,
//                   //paddingTop: 40,

//                   alignItems: 'center',
//                   shadowColor: '#000',
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },
//                   shadowOpacity: 0.25,
//                   shadowRadius: 4,
//                   elevation: 5,
//                 }}>

//                 <View style={{
//                   marginHorizontal: 15,
//                   borderRadius: 20,
//                   backgroundColor: 'white',
//                   //marginTop: 150,
//                   borderColor: "white",
//                   borderWidth: 1,
//                   height: 520,
//                   alignItems: 'center'
//                 }}>
//                   <View style={{ marginTop: 20, marginHorizontal: 20, height: 25, flexDirection: "row", }}>


//                     <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
//                       <Image source={require('../Screens/assets/contactUs.png')}
//                         style={{
//                           width: 20,
//                           height: 20, alignSelf: 'center'
//                         }} />

//                     </View>
//                     <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 17, color: 'black'}}>Contact Us</Text>

//                   </View>

//                   <View style={{
//                     marginTop: 30, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
//                     height: 50,
//                     shadowColor: '#11032586',
//                     backgroundColor: 'white',
//                     alignItems: 'center',
//                     borderColor: "#D7D7D7",
//                     borderWidth: 1,


//                   }}
//                   >
//                     <TextInput placeholder="Name"
//                        
//                       fontWeight='normal'
//                       placeholderTextColor='#D7D7D7'
//                       style={{ width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black" }} />

//                   </View>
//                   <View style={{ height: 50, marginHorizontal: 25, marginTop: 15 }}>
//                     <DropDownPicker
//                       items={[
//                         { label: 'France', value: 'fr' },
//                         { label: 'Spain', value: 'es' },
//                         { label: 'India', value: 'In' },
//                       ]}
 
//                       backgroundColor='white'
//                       //defaultNull
//                       placeholder="Select Object"
//                       placeholderTextColor='#D7D7D7'
//                       itemStyle={{
//                         justifyContent: 'flex-start'
//                       }}
//                       open={open}
//                       setOpen={setOpen}
//                       value={value}
//                       setValue={setValue}
//                       containerStyle={{ height: 40 }}

//                       style={{
//                         borderColor: '#D7D7D7', backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
//                         // shadowOffset: { width: 0, height: 2 },
//                         // shadowOpacity: 0.2,
//                         // elevation: 2,
//                       }}
//                     />
//                   </View>
//                   <View style={{
//                     marginTop: 30, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
//                     height: 50,
//                     shadowColor: '#11032586',
//                     backgroundColor: 'white',
//                     alignItems: 'center',
//                     borderColor: "#D7D7D7",
//                     borderWidth: 1,
//                   }}
//                   >
//                     <TextInput placeholder="Please Enter Your Email ID"
//                        
//                       fontWeight='normal'
//                       placeholderTextColor='#D7D7D7'
//                       style={{ width: '95%', paddingLeft: 15, color: "black" }} />

//                   </View>
//                   <View style={{
//                     borderRadius: 15,
//                     backgroundColor: 'white',
//                     marginTop: 20,
//                     borderColor: "#D7D7D7",
//                     borderWidth: 1,
//                     height: 140,
//                     width: 300,
//                   }}>
//                     <TextInput placeholder="Type Message here"
//                        
//                       fontWeight='normal'
//                       placeholderTextColor='#D7D7D7'
//                       numberOfLines={10}
//                       multiline={true}
//                       textAlignVertical='top'
//                       style={{ width: '70%', paddingLeft: 10, color: "black" }} />
//                   </View>

//                   <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
//                     <TouchableOpacity onPress={() => { buttonClickedHandler1() }}>
//                       <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

//                         <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>Send OTP</Text>

//                       </View>
//                     </TouchableOpacity>
//                   </View>

//                 </View>

//               </View>
//             </View>
//           </Modal>
//         ) : null}

//       </ScrollView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   linearGradientMainView: {
//     borderRadius: 25,
//     height: 380,
//     marginHorizontal: 15,
//     marginTop: 190,
//   },
//   buttonTextMainView: {
//     fontSize: 18,
 
//     textAlign: 'center',
//     margin: 10,
//     color: '#ffffff',
//     backgroundColor: 'transparent',
//   },
//   cameraButtonContainer: {
//     right: 40,
//     position: 'absolute',
//     width: 50,
//     height: 55,
//     marginTop: 6
//   },
//   cameraButtonSend: {
//     width: 25,
//     height: 25,
//     resizeMode: 'strech'
//   }, cameraImageCroper: {
//     width: 20,
//     height: 20,
//   },
//   sendButtonContainer: {
//     justifyContent: 'center',
//     position: 'absolute',
//     right: 15,
//     width: 35,
//     backgroundColor: '#fee3e3',
//     height: 35,
//     borderRadius: 35,
//   },
//   sendButtonSend: {
//     width: 25,
//     height: 25,
//     justifyContent: 'center',
//     alignItems: "center",
//     alignSelf: 'center'
//   }, sendImageCroper: {
//     width: 35,
//     height: 35,
//     borderRadius: 35 / 2,
//     borderColor: 'white',
//     borderWidth: 1
//   },
//   passwordButton: {
//     borderRadius: 20,
//     padding: 10,
//   },
//   passwordContainer: {
//     flex: 1,
//     backgroundColor: '#F5EEDC',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12
//   },
//   passwordInputContainer: {
//     backgroundColor: 'white',
//     width: '100%',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: '#d7d7d7'
//   },

//   passwordInputField: {
//     padding: 14,
//     fontSize: 22,
//     width: '90%'
//   }

//   ,
//   pickercontainer: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: "center"
//   },
//   textInput: {
//     width: 275,
//     height: 55,
//     backgroundColor: 'white',
//     marginHorizontal: 10,
//     borderRadius: 5,
//     borderColor: '#DFDDDD0D',
//     borderWidth: 1,
//     fontSize: 12,
//      ,
//     paddingHorizontal: 20,
//     marginTop: 10

//   },
//   textContainer: {

//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: -8

//   },
//   textBusinessContainer: {

//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F2F2F2',
//     marginTop: 10,
//   }
//   ,
//   radio: {
//     flexDirection: 'row',
//   },
//   radioImage: {
//     height: 20,
//     width: 20,
//     marginHorizontal: 5,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   leftNavigationContainer: {
//     height: 60,
//     position: 'absolute',
//     left: 10,
//     width: "20%",
//     justifyContent: 'center',
//   },
//   containerForgotPasswordButton: {

//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginHorizontal: 10,
//     height: 60
//   },
//   textForgotPassword: {
//     color: '#133072',
//     fontSize: 16,
//      
//   },
//   containeInquiryButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 80,
//     height: 60,
//     marginHorizontal: 10,
//     marginBottom: 20

//   },
//   gradientInquiryButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 10
//   },
//   buttonInquiryButton: {
//     width: '100%',
//     height: 60,
//   },
//   textInquiryButton: {
//     color: 'white',
//     fontSize: 16,
 
//   },
//   input: {
//     left: 15,
//     width: 220,
//     marginTop: 10,
//     height: 40,
//     padding: 10,
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   btn: {
//     backgroundColor: '#01c853',
//     paddingVertical: 10,
//     paddingHorizontal: 50,
//   },
//   input: {
//     marginTop: 10,
//     height: 40,
//     borderWidth: 1,
//     padding: 10,
//     borderColor: 'white',
//     borderRadius: 10
//   },
//   submitButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     height: 50,
//     borderRadius: 10,
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: 16,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white'
//   },
//   tinyLogo: {
//     flex: 1,
//     width: null,
//     height: null,
//     resizeMode: 'contain'
//   },
//   navBar: {
//     height: 140,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#133072',
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25
//   },
//   leftContainer: {
//     height: 60,
//     position: 'absolute',
//     left: 10,
//     width: "20%",
//     justifyContent: 'center',

//   },
//   rightContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },

//   SquareShapeView: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#e30f50',
//     borderRadius: 35
//   },
//   containerGradient: {
//     flex: 1,
//   },
//   linearGradient: {
//     flex: 1,
//   },
//   viewInsider: {
//     backgroundColor: '#ffb0ba', paddingLeft: 0, paddingRight: 0, height: 60
//   },
//   screen: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     left: '42%',
//     marginTop: '-7%'
//   },
//   rightIcon: {
//     height: 45,
//     width: 45,
//     backgroundColor: 'yellow',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 0,
//     borderRadius: 100,
//     right: 10
//   },
//   roundButton1: {
//     width: 45,
//     height: 45,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 0,
//     borderRadius: 100,
//     backgroundColor: 'orange',

//   },
//   containerSettingButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 64,
//     backgroundColor: '#ecf0f1',
//   },
//   settingImageWrapper: {
//     width: 30,
//     height: 30,
//     borderRadius: 20
//   },
//   settingButton: {
//     width: 30,
//     height: 30,
//     padding: 5,
//   }, chatImageWrapper: {
//     width: 25,
//     height: 25,
//     marginTop: 5

//   },
//   chatButton: {
//     width: 45,
//     height: 45,
//     right: 15,
//   },
//   text: {
//     fontSize: 40,
//     color: 'white',
//     lineHeight: 42
//   }

// });
// export default Hamburger;




// cart flatlist

//  <View style={{ flex: 1, justifyContent: "center" }}>
//  <FlatList
//      horizontal
//      data={DATA}
//      renderItem={({ item }) => (
//          <View
//              style={{
//                  backgroundColor: 'white',
//                  height: 200,
//                  width: 175,
//                  marginTop: 10,
//                  marginHorizontal: 15,
//                   0,
//                  borderRadius: 25,
//                  alignItems: 'center',
//                  shadowColor: '#000',
//                  shadowOffset: { width: 0, height: 2 },
//                  shadowOpacity: 0.2,
//                  elevation: 2,
//                  flex: 1
//              }}>
//              <View
//                  style={{
//                      marginTop: 20,
//                      width: 100,
//                      height: 100,
//                      borderRadius: 100 / 2,
//                      backgroundColor: '#fceeb5', flex: 0.6
//                  }}>
//                  <Image
//                      resizeMode="contain"
//                      style={{
//                          width: 90,
//                          marginTop: 6,
//                          height: 90,
//                          borderRadius: 90 / 2,
//                          alignSelf: 'center',
//                      }}
//                  source={{ uri: item.product_image }}
//                  />
//              </View>
//              <View
//                  style={{
//                      marginTop: 6,
//                      width: '100%',
//                      flexDirection: 'column', flex: 0.5, justifyContent: "center", alignItems: "stretch"

//                  }}>
//                  <Text
//                      style={{
                          
//                          marginLeft: 25,
//                          fontSize: 12,
//                          color: 'black',

//                          fontWeight: 'bold',
//                      }}>
//                      itemnamemodal{item.product_name.slice(0, 15) + '...'}
//                  </Text>

//                  <View
//                      style={{
//                          marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4,
//                      }}>

//                      <Text
//                          style={{
                             
//                              marginLeft: 8,
//                              fontSize: 12,
//                              color: 'black',

//                              fontWeight: '500',
//                          }}>$
//                          {item.product_price}
//                      </Text>


//                      <TouchableOpacity onPress={() => {
//                           ProductRemovecart(item) 
//                      }}
//                          style={{ borderBottomRightRadius: 25, alignItems: "center" }}>

//                          <View
//                              style={{
//                                  alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: '#ffcc00',
//                              }}>
//                              <Image
//                                  source={require('../assets/delete.png')}
//                                  resizeMode="contain"
//                                  style={{
//                                      width: 15,
//                                      height: 20, alignSelf: 'center'
//                                  }}
//                              />
//                          </View>
//                      </TouchableOpacity>

//                  </View>
//              </View>
//          </View>
//      )
//      }
//  />
// </View >
 