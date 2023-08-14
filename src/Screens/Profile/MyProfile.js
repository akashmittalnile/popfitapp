import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, ScrollView, Image, Alert, Linking, SafeAreaView, ActivityIndicator, Dimensions, PermissionsAndroid, Platform, RefreshControl } from 'react-native'
// import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
// import { ScrollView } from 'react-native-gesture-handler';

import { DrawerActions, CommonActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import RNFetchBlob from 'rn-fetch-blob';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';
import { async } from 'regenerator-runtime';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const MyProfile = (props) => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [Userprofile, setUserprofile] = useState('');
    const [orderdata, setorderdata] = useState([]);


    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = () => {
        setrefreshing(true)
        // console.log('running');
        StoresProductget();
        setrefreshing(false)
    }
    const gotoEditMyProfile = () => {
        props.navigation.navigate("EditMyProfile")
    }
    const gotoChangePassword = () => {

        props.navigation.navigate("ChangePassword", {
            PhoneNo: Userprofile.phone
        })
    }
    const gotoOrderDetail = (item) => {
        props.navigation.navigate("OrderDetail", {
            gotoprofileOrderdetails: item
        })
    };

    const gotoMyOrder = () => {
        props.navigation.navigate("MyOrder")
    }
    function Orderstatus(status) {

        if (status == '1') {
            return <Text>{t('Order_placed')}</Text>
        }
        else if (status == '2') {
            return <Text>{t('Order_dispatched')}</Text>
        }
        else if (status == '3') {
            return <Text>{t('Out_for_delivery')}</Text>
        } else if (status == '4') {
            return <Text>{t('Order_delivered')}</Text>
        }
        else if (status == '5') {
            return <Text>{t('Cancel_Order')}</Text>
        }
        else {
            return 'data not available'
        }
    }
    function OrderDATE(data) {

        if (data.order_status_id == '1') {
            return data?.status_TimeDate
            // return data.order_placed
        }
        else if (data.order_status_id == '2') {
            return data?.status_TimeDate
            // return data.odis_date
        }
        else if (data.order_status_id == '3') {
            return data?.status_TimeDate
            // return data.ofd_date
        } else if (data.order_status_id == '4') {
            return data?.status_TimeDate
            // return data.odeliv_date
        }
        else if (data.order_status_id == '5') {
            return data?.status_TimeDate
            // return data.cancel_date
        }
        else {
            return ''
        }
    };

    // console.log("props.route.params::", props.route.params)
    // const { UserProfile } = props.route.params
    const checkPermission = async (download_url) => {
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
                    console.log('Storage Permission Granted.');
                } else {
                    Alert.alert('Error', t('Storage_Permission_Not_Granted'));
                }
            } catch (err) {
                // To handle permission related exception
                console.log('ERROR' + err);
            }
        }
    };
    const getInvoiceUrl = async (item) => {
        console.log("item in profile", item?.order_id);
        // console.log("GetInvoiceUrl:In-api:",InvoiceMyorderid);
        const ordertoken = await AsyncStorage.getItem("authToken");
        try {

            const res = await axios.post(`${API.INVOICE}`, { "order_id": item?.order_id }, { headers: { "Authorization": ` ${ordertoken}` } });

            console.log('res', res.data)
            if (res.data.status == 1) {
                // checkPermission(res.data.url)
                console.log('res status == 1', res.data.download_url)
                checkPermission(res.data.download_url)
            }
        } catch (error) {
            console.log('errorinvoiceAPI', error)
        }
    }

    const downloadFile = async (url) => {
        let pdfUrl = url;
        let DownloadDir =
            Platform.OS == 'ios'
                ? RNFetchBlob.fs.dirs.DocumentDir
                : RNFetchBlob.fs.dirs.DownloadDir;
        const { dirs } = RNFetchBlob.fs;
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
        GetProfile();
    }, []);

    const GetProfile = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        // console.log(usertkn);
        setIsLoading(true);
        try {
            const response = await axios.get(`${API.GET_PROFILE}`, { headers: { "Authorization": ` ${usertkn}` } });
            // console.log("", response);
            // console.log("ResponseProfile ::::", response.data.status);
            if (response.data.status == 1) {

                setUserprofile(response.data.data)
                setorderdata(response.data.orders)

                // console.log("User_ordersdetails>>>", response.data.orders);
            } else {
                Alert.alert('', t('Error_msg'));

            }
        }
        catch (error) {
            // console.log("Countryerror:", error.response.data.message);
            //Alert.alert('','Something went wrong please exit the app and try again.');
            Alert.alert("", t('Check_internet_connection'))
        }
        setIsLoading(false);
    };
    const DeleteProfile = async () => {
        console.log("user_ID:", Userprofile.id);
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.Delete_USER}`, { "user_id": Userprofile.id });
            AsyncStorage.removeItem('authToken');
            AsyncStorage.clear();
            props.navigation.navigate("LoginMain");
            // Alert.alert('', response.data.message);

        }
        catch (error) {
            //  Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
            // console.log("......error.........", error.response.data.message);
            Alert.alert('', t('Error_msg'));

        }
        setIsLoading(false);
    };

    const showAlert = () =>
        Alert.alert(
            "",
            t('Are_you_sure_you_want_to_delete_your_Profile'),
            [
                {
                    text: t('Cancel'),
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => { DeleteProfile() }

                },
            ],
            {
                cancelable: true,
            }
        );
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
                BackicononClick={() => {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }]
                        })

                    )
                }}
                // Drawericon={{
                //     visible: true,
                //   }}
                //   DrawericononClick={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={{ paddingBottom: 0 }}>

                            <View style={{ marginHorizontal: 6, marginTop: 20, height: 150, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', width: WIDTH * 0.97 }}>

                                <View style={{ margin: 5, flex: 1 / 3, borderRadius: 10 }}>
                                    <Image source={{ uri: Userprofile?.user_profile != "" ? `${Userprofile?.user_profile}` : 'https://dev.pop-fiit.com/images/logo.png' }} resizeMode="contain"
                                        style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 10, borderWidth: 1, backgroundColor: "#455A64" }} />
                                </View>
                                <TouchableOpacity style={{ position: "absolute", right: 6, top: 6, width: 130, borderRadius: 50, zIndex: 999, }} onPress={() => { showAlert() }}>
                                    <View style={{ borderWidth: 1, borderColor: '#ffcc00', borderRadius: 50, backgroundColor: '#FFCC00', height: 30, flexDirection: 'row', alignItems: 'center', width: 130, }}>
                                        <View style={{ width: 35, marginLeft: 13 }}>
                                            <Image source={require('../assets/delete_account.png')}
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                }} />
                                        </View>

                                        <View style={{ marginLeft: -18, alignItems: 'center', justifyContent: "center", width: 90, height: 30, }}>

                                            <Text numberOfLines={2} style={{ textAlign: 'left', fontSize: 10, color: '#fff', }}>
                                                {t('Delete_Account')}
                                            </Text>


                                        </View>

                                    </View>
                                </TouchableOpacity>

                                <View style={{ margin: 5, flex: 1 / 1.2, flexDirection: 'column', marginTop: 15, }}>

                                    <View style={{ width: WIDTH * 0.30, marginLeft: 4 }}>
                                        <Text numberOfLines={2} style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: "500" }}>{Userprofile?.first_name + " " + Userprofile?.last_name}</Text>
                                    </View>

                                    <View style={{ flex: 1 / 3, flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 1.5, flexDirection: 'row', }}>
                                            <View style={{ width: 30, height: 30, marginTop: 5 }} >
                                                <Image source={require('../assets/message.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 23,
                                                        height: 16, alignSelf: 'center',
                                                    }} />
                                            </View>
                                            <View style={{ width: 100, height: 20, marginTop: 3, marginLeft: 4 }}  >
                                                <Text numberOfLines={1} style={{ fontSize: 11, color: 'black', textAlign: 'left' }} >
                                                    {Userprofile?.email}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 22, flex: 1.5, flexDirection: 'row', }}>
                                            <View style={{ width: 30, height: 30, marginTop: 2 }} >
                                                <Image source={require('../assets/telephone.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 20,
                                                        height: 20, alignSelf: 'center'
                                                    }} />
                                            </View>
                                            <View style={{ width: 80, height: 20, marginTop: 3, marginLeft: 4 }} >
                                                <Text style={{ fontSize: 11, color: 'black', textAlign: 'left' }}>{Userprofile?.phone}</Text>
                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ flex: 1, height: 50, marginTop: 20, flexDirection: 'row' }}>

                                        <TouchableOpacity style={{ flex: 0.9 / 2 }} onPress={() => { gotoEditMyProfile() }}>
                                            <View style={{ borderWidth: 1, borderColor: '#ffcc00', borderRadius: 20, backgroundColor: 'white', height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: 30, marginLeft: 17 }}>
                                                    <Image source={require('../assets/edit.png')}
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                        }} />
                                                </View>

                                                <View style={{ flex: 1, marginLeft: -6, }}>

                                                    <Text style={{ textAlign: 'left', fontSize: 10, color: '#ffcc00', }}>{t('Edit_Profile')}</Text>


                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flex: 1.1 / 2, }} onPress={() => { gotoChangePassword() }}>
                                            <View style={{ marginLeft: 6, borderWidth: 1, borderColor: '#ffcc00', borderRadius: 20, backgroundColor: 'white', height: 30, flexDirection: 'row', alignItems: 'center', }}>
                                                <View style={{ width: 30, marginLeft: 14 }}>
                                                    <Image source={require('../assets/lock2.png')}
                                                        style={{
                                                            width: 11,
                                                            height: 15,
                                                        }} />
                                                </View>
                                                <View style={{ flex: 1, marginLeft: -10, }}>

                                                    <Text style={{ textAlign: 'left', fontSize: 10, color: '#ffcc00', }}>{t('Change_Password')}</Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 34,   marginHorizontal: 10 ,marginTop:20 ,alignSelf:"center" }}>
                            <TouchableOpacity onPress={() => { Linking.openURL('https://dev.pop-fiit.com/terms-of-use') }}  >
                                <View style={{ borderRadius: 50, height: 34, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', padding: 3, width: 170 ,marginHorizontal: 10 }}>
                                    <Text numberOfLines={1} style={{ alignSelf: 'center', textAlign: 'center', fontSize: 12, color: 'white',fontWeight:"bold" }}>
                                        {t('Terms_of_use')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Linking.openURL('https://dev.pop-fiit.com/privacy-policy') }}  >
                                <View style={{ borderRadius: 50, height: 34, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', padding: 3, width:170  , }}>
                                    <Text numberOfLines={1} style={{ alignSelf: 'center', textAlign: 'center', fontSize: 12, color: 'white', fontWeight:"bold"}}>
                                        {t('Privacy_Policy')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                            
                            <View style={{ marginTop: 20, height: 45, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginLeft: 10, }}>
                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: "500" }}>{t('Recent_Orders')}</Text>
                                </View>
                                <View style={{ flex: 1.3 / 3, right: 10 }}>
                                    <TouchableOpacity onPress={() => { gotoMyOrder() }}>
                                        <View style={{ borderRadius: 50, height: 34, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                                            <Text numberOfLines={2} style={{ alignSelf: 'center', textAlign: 'center', fontSize: 10, color: 'white', }}>
                                                {t('View_All_Orders')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Myorderlist */}

                            {orderdata.length > 0 ?
                                orderdata.map((item, index) => {
                                    return (
                                        <View key={String(index)} style={{
                                            marginHorizontal: 6,
                                            height: 240,
                                            width: WIDTH * 0.97,
                                            borderRadius: 10,
                                            backgroundColor: 'white',
                                            // width: 380,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            shadowColor: '#000000',
                                            shadowRadius: 6,
                                            shadowOpacity: 1.0,
                                            elevation: 6,
                                            flexDirection: "column",
                                            marginBottom: 10

                                        }}>

                                            <View style={{ height: 50, width: WIDTH * 0.92, flexDirection: 'row', padding: 10, justifyContent: "space-between", }}>

                                                <View style={{ height: 30, marginTop: 1, justifyContent: 'flex-start', alignItems: "flex-start", marginLeft: 1, }}>

                                                    <Text style={{ fontSize: 12, color: '#455A64', fontWeight: "500" }}>{t('Order_No')}. : <Text style={{ fontSize: 12, color: '#FFCC00', }}> {item?.order_number}</Text></Text>

                                                </View>

                                                <TouchableOpacity onPress={() => { getInvoiceUrl(item) }}
                                                    style={{ backgroundColor: '#ffcc00', borderRadius: 20, height: 30, width: 140, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                                    <View style={{ width: 30, marginLeft: 6 }}>
                                                        <Image source={require('../assets/download1.png')}
                                                            style={{
                                                                width: 10,
                                                                height: 13,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <View style={{ marginLeft: -10 }}>
                                                            <Text numberOfLines={2} style={{ textAlign: 'left', fontSize: 9, color: 'white', }}>{t('Download_Invoice')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>


                                            </View>

                                            <View style={{
                                                height: 120,
                                                flexDirection: 'row',
                                                width: WIDTH * 0.92,
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                // backgroundColor: 'red',
                                            }}>

                                                <View style={{
                                                    width: 115, height: 120,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: 10,
                                                            height: "100%", alignSelf: 'center',

                                                        }}
                                                        source={{ uri: item?.product_image != "" ? `${item?.product_image}` : 'https://dev.pop-fiit.com/images/logo.png' }} />

                                                </View>

                                                <View style={{
                                                    justifyContent: "flex-start", alignItems: "flex-start", width: WIDTH * 0.97, marginLeft: 15,
                                                }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 15, color: '#455A64', fontWeight: "600" }}>{item?.product_name.slice(0, 25)}</Text>

                                                    <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 60, width: WIDTH * 0.97 }}>


                                                        <View style={{ marginTop: 1, flexDirection: 'row', marginLeft: 0 }}>
                                                            <View>
                                                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Total_Amount')}: <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#77869E', }}>{item?.order_price}</Text></Text>
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
                                            <View style={{
                                                marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", flex: 1, margin: 10, height: 70, width: WIDTH * 0.92
                                            }}>
                                                <View style={{ marginTop: 9, height: 50, justifyContent: "flex-start", alignItems: "center", flex: 0.35 }}>
                                                    <Text numberOfLines={2} style={{ textAlign: 'left', fontSize: 12, color: '#353535', fontWeight: "500" }}>{t('Order_Status')} :</Text>
                                                </View>

                                                {item?.order_status_id >= "1" ?
                                                    (<View style={{ flexDirection: 'column', height: 55, flex: 0.6, }}>
                                                        <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 12, color: '#455A64', fontWeight: "400" }}>{Orderstatus(item?.order_status_id)}</Text>
                                                        <View style={{ marginTop: 6, }}>
                                                            <Text style={{ textAlign: 'left', fontSize: 12, color: '#455A64', fontWeight: "400" }}>{OrderDATE(item)}</Text>
                                                        </View>
                                                    </View>)
                                                    :
                                                    (
                                                        <View style={{ flexDirection: 'column', height: 55, flex: 0.6, }}><Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "400" }}>data not available</Text>
                                                        </View>)

                                                }
                                                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, flex: 0.1 }}>
                                                    <TouchableOpacity
                                                        onPress={() => gotoOrderDetail(item)}>
                                                        <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                                            <Image source={require('../assets/rightArrow.png')}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {/* <View style={{
                                        marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", flex: 1, margin: 10, height: 70, width: WIDTH * 0.92
                                    }}>
                                        <View style={{ marginTop: 8, height: 20, justifyContent: "center", alignItems: "center", flex: 0.3, }}>
                                            <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', fontWeight: "bold" }}>Order Status :</Text>
                                        </View>
                                        <View style={{ marginLeft: 0, marginTop: 10, flexDirection: 'column', height: 55, flex: 0.6, }}>
                                            <View style={{}}>
                                                <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', fontWeight: "bold" }}>{item.order_status}</Text>
                                            </View>
                                            <View style={{ marginTop: 6, }}>
                                                <Text style={{ textAlign: 'left', fontSize: 9, color: 'black' }}>on {item.created_at}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, flex: 0.1 }}>
                                            <TouchableOpacity
                                                onPress={() => gotoOrderDetail(item)}>
                                                <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                                    <Image source={require('../assets/rightArrow.png')}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
                                        </View>)

                                })
                                : (<View style={{
                                    marginHorizontal: 6,
                                    height: 240,
                                    width: WIDTH * 0.97,
                                    borderRadius: 10,
                                    backgroundColor: 'white',
                                    // width: 380,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    shadowColor: '#000000',
                                    shadowRadius: 6,
                                    shadowOpacity: 1.0,
                                    elevation: 6,
                                    flexDirection: "column",
                                    marginBottom: 10
                                }}>
                                    <Image resizeMode='contain'
                                        source={require('../assets/Nodatafound.png')}
                                        style={{
                                            width: 200,
                                            height: 120, alignSelf: 'center'
                                        }} />
                                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>{t('Oops_order_list_empty')}</Text>
                                </View>)}

                            {/* <View style={{ marginTop: 30, height: 45, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', }}>Recent Training Activity</Text>
                            </View>


                        </View>
                        <FlatList
                            horizontal
                            data={newData}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { gotoOutDoorCycle() }}>

                                    <BackgroundImage source={{ uri: item.uri }} style={{ marginTop: 20, marginLeft: 20, justifyContent: 'space-between', width: 170, height: 120, overflow: 'hidden', borderRadius: 15 }}>
                                        <View style={{ width: 130, backgroundColor: '#c9bca0', height: 20, borderBottomRightRadius: 10, justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: 'black', }}>Resume Outdoor Cycle</Text>
                                        </View>
                                        <View style={{ height: 40, borderBottomRightRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <View style={{ height: 30, width: 50 }}>
                                                <Image source={require('../assets/arrowWhiteBack.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 30, alignSelf: 'center', borderBottomRightRadius: 10, marginRight: -8
                                                    }} />
                                            </View>
                                        </View>
                                    </BackgroundImage>
                                </TouchableOpacity>
                            }
                        /> */}
                        </View>
                    </ScrollView>
                </>
                )


                :
                (<CustomLoader showLoader={isLoading} />
                    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    //     <ActivityIndicator size="large" color="#ffcc00" />
                    // </View>
                )}
        </SafeAreaView>
    );
}

export default MyProfile;
