// //import : react components
// import React, {useState} from 'react';
// import {View, Text, PermissionsAndroid} from 'react-native';
// //import : custom components
// // import MyHeader from 'components/MyHeader/MyHeader';
// // import FAB_Button from 'components/FAB_Button/FAB_Button';
// //import : third parties
// // import {WebView} from 'react-native-webview';
// import RNFetchBlob from 'rn-fetch-blob';
// // import : globals
// import {Colors, MyIcon, Service} from 'global/Index';
// //import : styles
// import {styles} from './ViewInvoiceStyle';
// //import : redux
// // import {useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API } from '../../Routes/Urls';
// import axios from 'axios';
// const ViewInvoice = (props) => {
//     const[DownInvoice,setDownInvoice]=useState('');
//     //variables : redux variables
// //   const userToken = useSelector(state => state.user.userToken);
//   //variables : route variables
//   const appointment_id = route.params.appointment_id;
//   const booking_id = route.params.booking_id;
//   //variables : redux variables
// //   const dispatch = useDispatch();
//   //hook : states
//   //function : imp function
//   const checkPermission = async (url) => {
//     if (Platform.OS === 'ios') {
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'Application needs access to your storage to download File',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           downloadFile(url);
//           console.log('Storage Permission Granted.');
//         } else {
//           Alert.alert('Error', 'Storage Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.log('ERROR' + err);
//       }
//     }
//   };
  
//  console.log("MyorderId:::",props?.route?.params?.InvoiceMyorderid)
// const InvoiceMyorderid=props?.route?.params?.InvoiceMyorderid
//   //function : get invoice url
//   const getInvoiceUrl = async ()=>{
//     console.log("GetInvoiceUrl:In-api:",InvoiceMyorderid);
//     const ordertoken = await AsyncStorage.getItem("authToken");
//     try {
//         // const endPoint = `${Service.INVOICE}?appointment_id=${appointment_id}`  
//     //   const endPoint = `${Service.DOWNLOAD_INVOICE}?appointment_id=${appointment_id}`
//       const res = await axios.post(`${API.INVOICE}`, { "order_id": InvoiceMyorderid }, { headers: { "Authorization": ` ${ordertoken}` } });
//     //   const res = await Service.postApiWithToken(userToken, endPoint, {})
//       console.log('res', res.data)  
//       if(res.data.status){
//         // checkPermission(res.data.url)
//         setDownInvoice(res.data.download_url)
//         checkPermission(res.data.download_url)
//       }
//     } catch (error) {
//       console.log('error', error)
  
  
  
  
  
  
  
//     }
//   }
 

//   //function : service function
//   const downloadFile = async (url) => {
//     let pdfUrl = url;
//     let DownloadDir =
//       Platform.OS == 'ios'
//         ? RNFetchBlob.fs.dirs.DocumentDir
//         : RNFetchBlob.fs.dirs.DownloadDir;
//     const {dirs} = RNFetchBlob.fs;
//     const dirToSave =
//       Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
//     const configfb = {
//       fileCache: true,
//       useDownloadManager: true,
//       notification: true,
//       mediaScannable: true,
//       title: 'Cosmologo',
//       path: `${dirToSave}.pdf`,
//     };
//     const configOptions = Platform.select({
//       ios: {
//         fileCache: configfb.fileCache,
//         title: configfb.title,
//         path: configfb.path,
//         appendExt: 'pdf',
//       },
//       android: configfb,
//     });
//     Platform.OS == 'android'
//       ? RNFetchBlob.config({
//           fileCache: true,
//           addAndroidDownloads: {
//             useDownloadManager: true,
//             notification: true,
//             path: `${DownloadDir}/.pdf`,
//             description: 'Cosmologo',
//             title: `invoice.pdf`,
//             mime: 'application/pdf',
//             mediaScannable: true,
//           },
//         })
//           .fetch('GET', `${pdfUrl}`)
//           .catch(error => {
//             console.warn(error.message);
//           })
//       : RNFetchBlob.config(configOptions)
//           .fetch('GET', `${pdfUrl}`, {})
//           .then(res => {
//             if (Platform.OS === 'ios') {
//               RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
//               RNFetchBlob.ios.previewDocument(configfb.path);
//             }
//             console.log('The file saved to ', res);
//           })
//           .catch(e => {
//             console.log('The file saved to ERROR', e.message);
//           });
//   };
//   //UI
//   return (true
//     // <View style={styles.container}>
//     //   <Text Title={'View Invoice'} />
//     //   <WebView
//     //     // source={{uri: `${Service.BASE_URL.replace('api/','')}invoice/${appointment_id}`}}
//     //     source={{uri: `${DownInvoice}`}}
//     //     contentMode="mobile"
//     //     style={styles.webViewStyle}
//     //   />
//     //   <FAB_Button
//     //     icon={
//     //       <MyIcon.AntDesign name="download" size={30} color={Colors.WHITE} />
//     //     }
//     //     bottom={100}
//     //     onPress={getInvoiceUrl}
//     //   />
//     // </View>
//   );
// };
 
// export default ViewInvoice;