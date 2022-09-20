// /react components
// import React, {useRef, useState} from 'react';
// import {
//   View,
//   KeyboardAvoidingView,
//   Modal,
//   Keyboard,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   Alert,
// } from 'react-native';
// import {useNavigation, CommonActions} from '@react-navigation/core';
// //custom components
// import CustomLoader from '../../components/CustomLoader/CustomLoader';
// import MyButton from '../../components/MyButton/MyButton';
// import MyText from '../../components/MyText/MyText';
// //third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //global
// import {Colors, ScreensName, Server} from '../../global/Index';
// //styles
// import {styles} from './VerifiedOtpStyle';
// //redux
// import {UserAction} from '../../redux/actions/actions';
// import {connect} from 'react-redux';
// const VerifiedOtp = ({visible, setVisibility, email, dispatch}) => {
//   //useRef
//   const firstCodeRef = useRef();
//   const secondCodeRef = useRef();
//   const thirdCodeRef = useRef();
//   const forthCodeRef = useRef();
//   //variables
//   const navigation = useNavigation();
//   //variables : common actions
//   const resetIndexGoBottomTab = CommonActions.reset({
//     index: 1,
//     routes: [{name: ScreensName.BOTTOM_TAB}],
//   });
//   //states
//   const [firstCode, setfirstCode] = useState('');
//   const [secondCode, setsecondCode] = useState('');
//   const [thirdCode, setthirdCode] = useState('');
//   const [forthCode, setforthCode] = useState('');
//   const [showLoader, setshowLoader] = useState(false);
//   //function : modal function
//   const closeModal = () => {
//     setVisibility(false);
//   };
//   //function : imp function
//   const Validation = () => {
//     const otp = firstCode + secondCode + thirdCode + forthCode;
//     if (otp.length < 4) {
//       Alert.alert('Invalid Otp');
//     } else return true;
//   };
//   //function : service function
//   const VerifyOtp = async () => {
//     if (Validation()) {
//       setshowLoader(true);
//       try {
//         const otp = firstCode + secondCode + thirdCode + forthCode;
//         const data = {
//           email: email,
//           otp: otp,
//         };
//         const resp = await Server.postApi(Server.VALIDATE_OTP, data);
//         // console.warn(resp.data);
//         if (resp.data.status) {
//           dispatch(UserAction.setUser(resp.data.data));
//           const jsonValue = JSON.stringify(resp.data.data);
//           await AsyncStorage.setItem('userInfo', jsonValue);
//           dispatch(UserAction.setUserToken(resp.data.access_token));
//           await AsyncStorage.setItem('userToken', resp.data.access_token);
//           closeModal();
//           navigation.dispatch(resetIndexGoBottomTab);
//         } else {
//           Alert.alert('', `${resp?.data?.msg}`);
//         }
//       } catch (error) {
//         Alert.alert('', `${error}`);
//         console.log('error in VerifyOtp', error);
//       }
//       setshowLoader(false);
//     }
//   };
//   //UI
//   return (
//     <Modal
//       visible={visible}
//       onRequestClose={closeModal}
//       animationType="fade"
//       transparent={true}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.blurView} />
//           <View style={styles.mainView}>
//             <MyText
//               text="Verification Code"
//               textAlign="center"
//               fontSize={18}
//               
//             />
//             <MyText
//               text="Please enter verification code received in your registered email or mobile number"
//               fontSize={12}
//               textAlign="center"
//               marginVertical={10}
//              
//             />
//             <View style={styles.textInputView}>
//               <TextInput
//                 ref={firstCodeRef}
//                 style={styles.TextInputStyle}
//                 keyboardType="number-pad"
//                 onChangeText={text => {
//                   if (text.length == 1) {
//                     secondCodeRef.current.focus();
//                   } else {
//                     firstCodeRef.current.focus();
//                   }
//                   setfirstCode(text);
//                 }}
//                 placeholderTextColor={Colors.BLACK}
//                 onSubmitEditing={() => secondCodeRef.current.focus()}
//                 maxLength={1}
//               />
//               <TextInput
//                 ref={secondCodeRef}
//                 style={styles.TextInputStyle}
//                 keyboardType="number-pad"
//                 onChangeText={text => {
//                   if (text.length == 1) {
//                     thirdCodeRef.current.focus();
//                   } else {
//                     firstCodeRef.current.focus();
//                   }
//                   setsecondCode(text);
//                 }}
//                 placeholderTextColor={Colors.BLACK}
//                 onSubmitEditing={() => thirdCodeRef.current.focus()}
//                 maxLength={1}
//               />
//               <TextInput
//                 ref={thirdCodeRef}
//                 style={styles.TextInputStyle}
//                 keyboardType="number-pad"
//                 onChangeText={text => {
//                   if (text.length == 1) {
//                     forthCodeRef.current.focus();
//                   } else {
//                     secondCodeRef.current.focus();
//                   }
//                   setthirdCode(text);
//                 }}
//                 placeholderTextColor={Colors.BLACK}
//                 onSubmitEditing={() => forthCodeRef.current.focus()}
//                 maxLength={1}
//               />
//               <TextInput
//                 ref={forthCodeRef}
//                 style={styles.TextInputStyle}
//                 keyboardType="number-pad"
//                 onChangeText={text => {
//                   if (text.length == 1) {
//                     Keyboard.dismiss();
//                   } else {
//                     thirdCodeRef.current.focus();
//                   }
//                   setforthCode(text);
//                 }}
//                 placeholderTextColor={Colors.BLACK}
//                 onSubmitEditing={() => forthCodeRef.current.focus()}
//                 maxLength={1}
//               />
//             </View>
//             {showLoader ? (
//               <CustomLoader showLoader={showLoader} color={Colors.RED} />
//             ) : null}
//             <MyButton
//               disabled={showLoader}
//               title="Verify"
//               onPress={() => {
//                 VerifyOtp();
//                 Keyboard.dismiss();
//               }}
//             />
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };
// const mapDispatchToProps = dispatch => ({dispatch});
// export default connect(null, mapDispatchToProps)(VerifiedOtp);