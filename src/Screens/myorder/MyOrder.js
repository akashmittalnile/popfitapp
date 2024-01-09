import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  Platform,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { ScrollView } from 'react-native-gesture-handler';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {Pages} from 'react-native-pages';
import styles from '../../Routes/style';
import {API} from '../../Routes/Urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Headers from '../../Routes/Headers';
import RNFetchBlob from 'rn-fetch-blob';
import CustomLoader from '../../Routes/CustomLoader';
import {useTranslation} from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const MyOrder = props => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [value, setValue] = useState('');
  const [Myorderslist, setMyorderslist] = useState('');
  const [ordereditem, setordereditem] = useState([]);
  const [ordermsg, setordermsg] = useState('');
  const [msg, setMsgAlert] = useState(false);
  const [copyDdownValue, setcopyDdownValue] = useState('');
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = () => {
    setrefreshing(true);
    MyorderApi(null);
    setrefreshing(false);
  };

  const gotoOrderDetail = item => {
    props.navigation.navigate('OrderDetail', {
      Gotoorderdetails: item,
    });
  };
  const checkPermission = async download_url => {
    if (Platform.OS === 'ios') {
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile(download_url);
          // console.log('Storage Permission Granted.');
        } else {
          Alert.alert('Error', t('Storage_Permission_Not_Granted'));
        }
      } catch (err) {
        // To handle permission related exception
        // console.log('ERROR' + err);
      }
    }
  };
  const getInvoiceUrl = async item => {
    console.log('item', item.order_id);
    // console.log("GetInvoiceUrl:In-api:",InvoiceMyorderid);
    const ordertoken = await AsyncStorage.getItem('authToken');
    try {
      const res = await axios.post(
        `${API.INVOICE}`,
        {order_id: item?.order_id},
        {headers: {Authorization: ` ${ordertoken}`}},
      );

      console.log('res', res.data);
      if (res.data.status == 1) {
        // checkPermission(res.data.url)
        console.log('res status == 1', res.data.download_url);
        checkPermission(res.data.download_url);
      }
    } catch (error) {
      console.log('errorinvoiceAPI', error);
    }
  };

  const downloadFile = async url => {
    let pdfUrl = url;
    let DownloadDir =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Cosmologo',
      path: `${dirToSave}.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });
    Platform.OS == 'android'
      ? RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/.pdf`,
            description: 'Cosmologo',
            title: `invoice.pdf`,
            mime: 'application/pdf',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .catch(error => {
            console.warn(error.message);
          })
      : RNFetchBlob.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .then(res => {
            if (Platform.OS === 'ios') {
              RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
              RNFetchBlob.ios.previewDocument(configfb.path);
            }
            console.log('The file saved to ', res);
          })
          .catch(e => {
            console.log('The file saved to ERROR', e.message);
          });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      MyorderApi(null);
    });
    return unsubscribe;
  }, []);

  // console.log("select filter", value);

  const MyorderApi = async values => {
    // console.log("select filter", values);
    // setcopyDdownValue(values)
    const ordertoken = await AsyncStorage.getItem('authToken');
    // console.log(".....MY_order token get_in MYORDER::", ordertoken);
    // console.log('====================================');
    // console.log("Search VAlue in api", values);
    // console.log('====================================');

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API.MY_ORDER}`,
        {search: values != null ? values : null},
        {headers: {Authorization: ` ${ordertoken}`}},
      );
      // console.log("Myorderresssss:", response?.data);
      // console.log("Response_MYorders  ::::", response.data.success);
      // console.log('====================================');
      // console.log("Response MY_Orders  ::::", response?.data?.order);
      // console.log('====================================');
      // if (response.data.status == 1) {
      // console.log("................", response.data.order.length);
      if (response.data.order.length == 0) {
        setordereditem(null);
      } else {
        setordereditem(response.data.order);

        // setrefresh(!refresh)
      }
      //   console.log("User_token_not_received+yet!!!>>>", response.data.success.first_name);
    } catch (error) {
      props.navigation.goBack();
      Alert.alert('', t('Error_msg'));
      // console.log("Countryerror:", error.response.data.message);
      //Alert.alert("something went wrong !", '');
      setordermsg(response.data.message);
      setMsgAlert(true);
    }
    setIsLoading(false);
  };
  // const SearchOrder_filter = async () => {
  //     console.log("SearchOrder_filter.....");
  //     // setIsLoading(true);
  //     try {
  //         const response = await axios.post(`${API.SEARCH_ORDER_FILTER}`, { "search": 1 });
  //         console.log(":::::::::ProductRemovecart_Response>>>", response.data.data);
  //         console.log("status _ProductRemovecart:", response.data.status);

  //         // setProductitems(response.data.data)
  //         // setIsLoading(false);
  //     }
  //     catch (error) {
  //         console.log("......error.........", error.response.data.message);
  //         // setIsLoading(false);

  //     }

  // };

  function Orderstatus(status) {
    if (status == '1') {
      return <Text>{t('Order_placed')}</Text>;
    } else if (status == '2') {
      return <Text>{t('Order_dispatched')}</Text>;
    } else if (status == '3') {
      return <Text>{t('Out_for_delivery')}</Text>;
    } else if (status == '4') {
      return <Text>{t('Order_delivered')}</Text>;
    } else if (status == '5') {
      return <Text>{t('Cancel_Order')}</Text>;
    } else {
      return 'data not available';
    }
  }

  function OrderDATE(data) {
    if (data.order_status_id == '1') {
      return data.order_placed;
    } else if (data.order_status_id == '2') {
      return data.odis_date;
    } else if (data.order_status_id == '3') {
      return data.ofd_date;
    } else if (data.order_status_id == '4') {
      return data.odeliv_date;
    } else if (data.order_status_id == '5') {
      return data.cancel_date;
    } else {
      return '';
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'white',
        flexGrow: 1,
      }}>
      <Headers
        Backicon={{
          visible: true,
        }}
        BackicononClick={() => {
          props.navigation.goBack();
        }}
        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => {
          props.navigation.navigate('CartAdded');
        }}
        Bellicon={{
          visible: true,
        }}
        BelliconononClick={() => {
          props.navigation.navigate('Notifications');
        }}
      />
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {!isLoading ? (
          <>
            {msg ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#ffcc00', fontSize: 16}}>{ordermsg}</Text>
              </View>
            ) : null}

            {ordereditem?.length > 0 ? (
              <>
                <View
                  style={{
                    height: 50,
                    marginHorizontal: 10,
                    marginVertical: 20,
                    zIndex: 999,
                  }}>
                  <DropDownPicker
                    items={[
                      {label: 'Today', value: 'today'},
                      {label: '30 Days', value: '30_days'},
                      {label: '60 Days', value: '60_days'},
                      {label: '90 Days', value: '90_days'},
                      {label: '120 Days', value: '120_days'},
                      {label: 'Last Year', value: 'last_year'},
                      {label: 'Last 3 Year', value: 'last_3_year'},
                    ]}
                    listParentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 25,
                    }}
                    listParentLabelStyle={{
                      fontWeight: '600',
                      fontSize: 16,
                    }}
                    // disableBorderRadius={true}
                    backgroundColor="white"
                    // loading={loading}
                    placeholder={t('Search_History')}
                    containerStyle={{height: 70}}
                    dropDownDirection="BOTTOM"
                    bottomOffset={100}
                    // defaultValue={changeCountry}
                    itemStyle={{justifyContent: 'flex-start'}}
                    textStyle={{
                      fontSize: 14,
                    }}
                    // listMode="MODAL"
                    open={open}
                    setOpen={setOpen}
                    value={value}
                    setValue={setValue}
                    // setValue={(v) => {
                    //     setValue(v)
                    //     MyorderApi(v)
                    // }
                    // }
                    // theme="DARK"

                    scrollViewProps={{
                      decelerationRate: 'medium',
                      ScrollView: '#ffcc00',
                    }}
                    // onChangeText={(item) => setValue(item)}

                    onChangeValue={Wvalue => {
                      // console.log('djfnjdjfd', 'copyDdownValue:- ', copyDdownValue, 'Wvalue:- ', Wvalue);
                      // console.log('if', copyDdownValue != '' , copyDdownValue != Wvalue , copyDdownValue != null);
                      if (Wvalue == '') {
                        // console.log('empty');

                        return;
                      }

                      if (Wvalue == null) {
                        // console.log('null');
                        return;
                      }

                      if (copyDdownValue == Wvalue) {
                        // console.log('Wvalue');
                        return;
                      }

                      setcopyDdownValue(Wvalue);

                      // console.log('Else')
                      MyorderApi(Wvalue);
                    }}
                    style={{
                      borderColor: 'white',
                      backgroundColor: 'white',
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      elevation: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      paddingLeft: 20,
                    }}
                    defaultValue={null}
                    dropDownContainerStyle={{
                      flex: 1,
                      backgroundColor: 'white',
                      zIndex: -999,
                      elevation: 4,
                      borderColor: '#8F93A0',
                      borderRadius: 15,
                    }}
                    // dropDownContainerStyle={{
                    // height:500
                    // borderColor: '#8F93A0',
                    // color: '#8F93A0',
                    // alignItems: "center",
                    // justifyContent: "center",
                    // fontSize: 16,
                    // borderWidth: 1,
                    // borderRadius: 10,
                    // shadowColor: '#000000',
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 3
                    // },
                    // shadowRadius: 5,
                    // shadowOpacity: 1.0,
                    // elevation: 5,
                    // zIndex: 999,

                    // }}
                  />
                </View>

                <FlatList
                  vertical
                  data={ordereditem}
                  keyExtractor={(item, index) => String(index)}
                  // style={{ margin: 10 }}
                  scrollEnabled={false}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          marginHorizontal: 10,
                          height: 240,
                          width: WIDTH * 0.95,
                          borderRadius: 10,
                          backgroundColor: 'white',
                          // width: 380,
                          justifyContent: 'center',
                          alignItems: 'center',
                          shadowColor: '#000000',
                          shadowRadius: 6,
                          shadowOpacity: 0.2,
                          elevation: 6,
                          flexDirection: 'column',
                          marginBottom: 10,
                          zIndex: 999,
                        }}>
                        <View
                          style={{
                            height: 50,
                            width: WIDTH * 0.92,
                            flexDirection: 'row',
                            padding: 10,
                            justifyContent: 'space-between',
                            zIndex: -999,
                          }}>
                          <View
                            style={{
                              height: 30,
                              marginTop: 1,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              marginLeft: 1,
                              zIndex: -999,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#455A64',
                                fontWeight: '500',
                              }}>
                              {t('Order_No')}. :{' '}
                              <Text style={{fontSize: 12, color: '#FFCC00'}}>
                                {' '}
                                {item.order_number}
                              </Text>
                            </Text>
                          </View>

                          <View
                            style={{
                              backgroundColor: '#ffcc00',
                              borderRadius: 20,
                              height: 30,
                              width: 140,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: -999,
                            }}>
                            <View style={{width: 30, marginLeft: 6}}>
                              <Image
                                source={require('../assets/download1.png')}
                                style={{
                                  width: 10,
                                  height: 13,
                                }}
                              />
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => getInvoiceUrl(item)}
                                style={{marginLeft: -10}}>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    textAlign: 'left',
                                    fontSize: 9,
                                    color: 'white',
                                  }}>
                                  {t('Download_Invoice')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            height: 120,
                            flexDirection: 'row',
                            width: WIDTH * 0.92,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                          }}>
                          <View
                            style={{
                              width: 115,
                              height: 120,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              resizeMode="contain"
                              style={{
                                width: '100%',
                                borderRadius: 10,
                                height: '100%',
                                alignSelf: 'center',
                              }}
                              source={{
                                uri:
                                  item?.product_image != ''
                                    ? item?.product_image
                                    : 'https://dev.pop-fiit.com/images/logo.png',
                              }}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              width: WIDTH * 0.97,
                              marginLeft: 15,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontSize: 15,
                                color: '#455A64',
                                fontWeight: '600',
                              }}>
                              {item?.product_name?.length >= 25
                                ? item?.product_name?.slice(0, 25) + '...'
                                : item?.product_name?.slice(0, 25)}
                            </Text>

                            <View
                              style={{
                                marginTop: 6,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                height: 60,
                                width: WIDTH * 0.97,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <View>
                                  <Text
                                    style={{
                                      textAlign: 'left',
                                      fontSize: 14,
                                      color: '#455A64',
                                      fontWeight: '500',
                                    }}>
                                    {t('Total_Amount')}:{' '}
                                    <Text
                                      style={{
                                        marginLeft: 20,
                                        textAlign: 'center',
                                        fontSize: 14,
                                        color: '#77869E',
                                      }}>
                                      {item?.total_price}
                                    </Text>
                                  </Text>
                                </View>
                              </View>

                              {/* <View style={{ flexDirection: 'row', marginLeft: 17,marginTop: 3 }}>
                                                    <View style={{}}>
                                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000',fontWeight:"bold" }}>Tax : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 10, color: '#000000', }}>$ {item?.tax}</Text></Text>
                                                    </View>
    
                                                </View>
    
                                                <View style={{ flexDirection: 'row', marginLeft: 25 ,marginTop: 3,}}>
                                                    <View style={{}}>
                                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000',fontWeight:"bold" }}>Total : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 10, color: '#000000' }}>$ {item.total_price}</Text></Text>
                                                    </View>
    
                                                </View> */}
                            </View>
                          </View>
                        </View>
                        {/* <View style={{
                                                height: 120, marginLeft: 0, flexDirection: 'row', width: WIDTH * 0.9, justifyContent: "center", flex: 2, backgroundColor: "pink",marginTop:10
                                            }}>
                                                <View style={{
                                                    width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: '#fceeb5', flex: 0.3,
                                                }}>
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{
                                                            width: 110, marginTop: 20,
                                                            height: 100, alignSelf: 'center'
                                                        }}
                                                        source={require('../assets/dumble.png')} />
    
                                                </View>
                                                <View style={{
                                                    flex: 0.7, height: 110, marginLeft: 10,
                                                }}>
                                                    <Text style={{ marginLeft: 15, marginTop: 10, textAlign: 'left', fontSize: 15, color: '#000000', }}>The Flexibell</Text>
                                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 15 }}>
                                                        <View style={{}}>
                                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total Paid Price :</Text>
                                                        </View>
                                                        <View style={{}}>
                                                            <Text style={{ marginLeft: 10, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  {item.total_price}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View> */}

                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            flex: 1,
                            margin: 10,
                            height: 70,
                            width: WIDTH * 0.92,
                          }}>
                          <View
                            style={{
                              marginTop: 9,
                              height: 50,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              flex: 0.35,
                            }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                textAlign: 'left',
                                fontSize: 12,
                                color: '#353535',
                                fontWeight: '500',
                              }}>
                              {t('Order_Status')} :
                            </Text>
                          </View>

                          {item.order_status_id >= '1' ? (
                            <View
                              style={{
                                flexDirection: 'column',
                                height: 55,
                                flex: 0.6,
                              }}>
                              <Text
                                style={{
                                  marginTop: 10,
                                  textAlign: 'left',
                                  fontSize: 12,
                                  color: '#455A64',
                                  fontWeight: '400',
                                }}>
                                {Orderstatus(item?.order_status_id)}
                              </Text>
                              <View style={{marginTop: 6}}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontSize: 12,
                                    color: '#455A64',
                                    fontWeight: '400',
                                  }}>
                                  {OrderDATE(item)}
                                </Text>
                              </View>
                            </View>
                          ) : null
                          // <View style={{ flexDirection: 'column', height: 55, flex: 0.6, }}><Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "400" }}>data not available</Text>
                          // </View>
                          }
                          <View
                            style={{
                              marginTop: 10,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              marginRight: 10,
                              flex: 0.1,
                            }}>
                            <TouchableOpacity
                              onPress={() => gotoOrderDetail(item)}>
                              <View
                                style={{
                                  backgroundColor: '#ffcc00',
                                  width: 35,
                                  height: 35,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 35 / 2,
                                }}>
                                <Image
                                  source={require('../assets/rightArrow.png')}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  // marginHorizontal: 6,
                  height: HEIGHT * 0.8,
                  // width: WIDTH * 0.97,
                  // borderRadius: 10,
                  // // backgroundColor: 'white',
                  // // width: 380,
                  // // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "column",
                  // marginTop: 160,
                  // shadowColor: '#000000',
                  // shadowRadius: 6,
                  // shadowOpacity: 1.0,
                  // elevation: 6,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/Nodatafound.png')}
                  style={{
                    width: 200,
                    height: 120,
                    alignSelf: 'center',
                  }}
                />
                <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
                  {t('Oops_order_list_empty')}
                </Text>
              </View>
            )}
          </>
        ) : (
          <CustomLoader showLoader={isLoading} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrder;
