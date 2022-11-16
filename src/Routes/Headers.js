import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, Dimensions, ScrollView, Modal, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../Redux/actions/UpdateCounter';
import axios from 'axios';
import { API } from '../Routes/Urls';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from "./CustomLoader";

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Headers = ({
    Drawericon,
    Backicon,
    Bellicon,
    CartIcon,
    DrawericononClick,
    BelliconononClick,
    CartIconononClick,
    BackicononClick,
    navigation

}) => {
    const dispatch = useDispatch();
    const myNoticount = useSelector((state) => state.mofiynoti);
    const Mycartcount = useSelector((state) => state.Cartreducer);
    const [NotificationModal, setNotificationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noti, setNoti] = useState([]);

    const Clicknotication = item => {
        console.log('after click data:', item.type);
        if (item.type == 'recipe') {
            setNotificationModal(false);
            navigation.navigate("Home")
        } else if (item.type == 'training') {
            setNotificationModal(false);
            navigation.navigate("TrainingDetail")
        } else if (item.type == 'blog') {
            setNotificationModal(false);
            navigation.navigate("Blog")
        } else {
            setNotificationModal(false);
            Alert.alert('TYPE:COUPON');
            console.log('Go to current page for coupon !!');
        }
    };
    const GetNotification = async () => {

        // console.log('on');

        const usertkn = await AsyncStorage.getItem('authToken');

        setIsLoading(true);
        try {
            const response = await axios.get(`${API.NOTIFICATION}`, {
                headers: { Authorization: ` ${usertkn != null ? usertkn : null}` },
            });
            
           
            // AsyncStorage.setItem("notification", JSON.stringify(data));
            if (response.data.status == '1') {
                // console.log('1');
                let data = response.data.data.length;
                // console.log('incrementCounter1', data);
                dispatch(incrementCounter(parseInt(data)));
                setNoti(response.data.data);
                // setIsLoading(false);
            }
            if (response.data.status == '0') {
                // console.log('0');
                // Alert.alert("","Login First")
                // setIsLoading(false);
                // setNoti(response.data.data);
            }
        } catch (error) {
            Alert.alert('1catch', 'Something went wrong please exit the app and try again');
           
            // console.log("Notification_catch-error:::", error.response.data.message);
        }   setIsLoading(false);
    };
    const ItemRemove = async item => {
        const usertkn = await AsyncStorage.getItem('authToken');
        setIsLoading(true);
        console.warn('$$$$$$id---->', item.id);
        let id = item.id;
        const url = API.NOTIFICATION_DELETE + '/' + id;
        console.log('url------>', url);
        axios({
            url: url,
            method: 'DELETE',
            // data: data,
            headers: {
                Authorization: ` ${usertkn}`,
            },
        })
            .then(function (response) {
                if (response.data.status == '1') {
                    GetNotification();
                } else {
                    alert('something went wrong');
                }


            })
            .catch(function (error) {
                console.log('......error.........', error);
                Alert.alert('', 'Something went wrong please exit the app and try again');
                // setIsLoading(false);
            });
        setIsLoading(false);

    };

    const NoticationDetails = async item => {
        const usertkn = await AsyncStorage.getItem('authToken');
        console.log('item in notification details API:', item.id);
        if (item.id != null) {
            let notifiID = item.id;
            setIsLoading(true);

            try {
                const response = await axios.post(
                    `${API.NOTIFICATION_DETAILS}`,
                    { notification_id: notifiID },
                    { headers: { Authorization: ` ${usertkn}` } },
                );
                console.log(
                    'notificationdetails response:',
                    response.data.message,
                    response.data.status,
                );
                if (response.data.status == 1) {
                    GetNotification();
                    // setIsLoading(false);
                } else if (response.data.status == 0) {
                    alert('Server issue', 'Try again later ');
                    // setIsLoading(false);
                }
            } catch (error) {
                // console.log("NoticationDetails-error:::", error);
                Alert.alert('', 'Something went wrong please exit the app and try again');
            } setIsLoading(false);
        } setIsLoading(false);
    };
    return (
        <View style={style.navigationBarBlack}>

            {
                Drawericon?.visible ?
                    (<View style={style.navigationBarLeftContainer}>
                        <TouchableOpacity onPress={() => DrawericononClick()}>
                            <Image source={require('../Screens/assets/hamburgerLeft.png')}
                                style={{
                                    width: 25,
                                    height: 25, alignSelf: 'center'
                                }} />

                        </TouchableOpacity>
                    </View>)
                    : null
            }
            {
                Backicon?.visible ?
                    (<View style={style.navigationBarLeftContainer}>
                        <TouchableOpacity onPress={() => BackicononClick()}>
                            <Image source={require('../Screens/assets/leftArrowWhite.png')}
                                style={{
                                    width: 30,
                                    height: 20, alignSelf: 'center'
                                }} />

                        </TouchableOpacity>
                    </View>)
                    : null
            }


            <View style={style.navigationBarCenterContainer}>
                <TouchableOpacity>
                    <Image resizeMode="contain"
                        source={require('../Screens/assets/layerCenter.png')}
                        style={{
                            width: 80,
                            height: 50, alignSelf: 'center'
                        }} />

                </TouchableOpacity>
            </View>
            <View style={{
                width: "20%",
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                // backgroundColor:"pink"
            }}>
                {
                    CartIcon?.visible ?
                        (<View style={style.navigationBarRight2Container}>
                            <TouchableOpacity onPress={() => CartIconononClick()}>
                                <Image resizeMode="contain"
                                    source={require('../Screens/assets/cart.png')}
                                    style={{
                                        width: 25,
                                        height: 30, alignSelf: 'center', marginRight: 10
                                    }} />
                                {Mycartcount >= '0' ?
                                    <View
                                        style={{
                                            position: "absolute",
                                            backgroundColor: '#ffcc00',
                                            width: 15,
                                            height: 15,
                                            borderRadius: 15,
                                            marginLeft: 30,
                                            top: 1,
                                            right: 4,
                                            shadowColor: '#000000',
                                            shadowRadius: 5,
                                            shadowOpacity: 1.0,
                                            elevation: 6,
                                            zIndex: 2000,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        <Text style={{
                                            color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: "center", justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            {Mycartcount}
                                        </Text>
                                    </View>
                                    : null
                                }
                                {/* <View
                                    style={{
                                        position: "absolute",
                                        backgroundColor: '#ec1f1f',
                                        width: 12,
                                        height: 12,
                                        borderRadius: 12,
                                        // marginLeft: 30,
                                        top: 2,
                                        right: 6,
                                        shadowColor: '#000000',
                                        shadowRadius: 5,
                                        shadowOpacity: 1.0,
                                        elevation: 6,
                                        zIndex: 2000,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>

                                </View> */}
                            </TouchableOpacity>


                        </View>)
                        : null
                }

                {
                    Bellicon?.visible ?
                        (<View style={style.navigationBarRightContainer}>
                            <TouchableOpacity onPress={() => {
                                setNotificationModal(true);
                                setIsLoading(true)
                                GetNotification();
                                // clearNoti()
                            }}>
                                <Image source={require('../Screens/assets/bellRight.png')}
                                    style={{
                                        width: 20,
                                        height: 25, alignSelf: 'center', marginRight: 19
                                    }} />

                                {myNoticount >= '0' ?
                                    <View
                                        style={{
                                            position: "absolute",
                                            backgroundColor: '#ffcc00',
                                            width: 15,
                                            height: 15,
                                            borderRadius: 15,
                                            marginLeft: 30,
                                            top: -1,
                                            right: 12,
                                            shadowColor: '#000000',

                                            shadowRadius: 5,
                                            shadowOpacity: 1.0,
                                            elevation: 6,
                                            zIndex: 2000,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        <Text style={{
                                            color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: "center", justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            {myNoticount}
                                        </Text>
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>




                        </View>)
                        : null
                }

            </View>
            <Modal
                animationType="fade"
                transparent={false}
                visible={NotificationModal}
                onRequestClose={() => {
                    setNotificationModal(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        // backgroundColor: 'rgba(140, 141, 142, 0.7)',
                    }}>
                    <View style={{
                        flex: 1,
                        top: 0,
                        height: 60,
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#262626',
                        position: 'absolute'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => {
                                setNotificationModal(false)
                                // setIsLoading(false)
                            }} style={{ marginLeft: 4 }}>
                                <Image source={require('../Screens/assets/leftArrowWhite.png')}
                                    style={{
                                        width: 30,
                                        height: 20,
                                        alignSelf: 'center'
                                    }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,

                            justifyContent: 'center',
                            alignItems: 'center',
                            // right: 0
                        }}>
                            <TouchableOpacity>
                                <Image resizeMode="contain"
                                    source={require('../Screens/assets/layerCenter.png')}
                                    style={{
                                        width: 80,
                                        height: 50, alignSelf: 'center'
                                    }} />

                            </TouchableOpacity>
                        </View>
                    </View>


                    {!isLoading ? (
                        <View
                            style={{
                                flex: 1,
                                marginTop: 60,
                                width: '100%',
                                height: '100%',
                            }}>
                            <ScrollView>
                                {noti?.length > 0 ? (
                                    noti.map((item, index) => {
                                        return (
                                            <View key = {String(index)}
                                                style={{
                                                    width: '100%',
                                                }}>
                                                {item.is_read == '1' ? (
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Clicknotication(item), NoticationDetails(item);
                                                            }}
                                                            style={{
                                                                marginHorizontal: 10,
                                                                // marginTop: 6,
                                                                height: 85,
                                                                borderRadius: 20,
                                                                // marginBottom: 10,
                                                                marginVertical: 10,
                                                                // backgroundColor: 'red',
                                                                backgroundColor: '#FFFFFF',
                                                                width: WIDTH * 0.95,
                                                                justifyContent: 'center',
                                                                alignItems: 'flex-start',
                                                                // paddingBottom: 10,
                                                                // shadowColor: '#cdcbcb',
                                                                // shadowRadius: 6,
                                                                // shadowOpacity: 0.1,
                                                                // elevation: 6,
                                                                borderWidth: 1,
                                                                borderColor: '#F4F4F4',
                                                            }}>
                                                            <TouchableOpacity
                                                                onPress={() => ItemRemove(item)}
                                                                style={{
                                                                    position: 'absolute',
                                                                    backgroundColor: 'red',
                                                                    width: 30,
                                                                    height: 30,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: 20 / 2,
                                                                    top: 20,
                                                                    right: 10,
                                                                }}>
                                                                <Image
                                                                    resizeMode="contain"
                                                                    source={require('../Screens/assets/delete.png')}
                                                                />
                                                            </TouchableOpacity>

                                                            <View
                                                                style={{
                                                                    marginHorizontal: 10,
                                                                    width: WIDTH * 0.8,
                                                                    height: 85,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    alignItems: 'flex-start',

                                                                }}>
                                                                <View
                                                                    style={{
                                                                        marginRight: 20,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        height: 85,
                                                                    }}>
                                                                    <Image
                                                                        style={{
                                                                            width: 30,
                                                                            height: 30,
                                                                            alignSelf: 'center',
                                                                        }}
                                                                        source={require('../Screens/assets/notification.png')}
                                                                    />
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        height: 85, paddingBottom: 8,
                                                                        width: WIDTH * 0.67,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'flex-start',
                                                                    }}>
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={{
                                                                            marginTop: 2,
                                                                            textAlign: 'left',
                                                                            fontSize: 15,
                                                                            color: 'black',
                                                                            fontWeight: '500',
                                                                        }}>
                                                                        {item.title}
                                                                    </Text>
                                                                    <View
                                                                        style={{
                                                                            marginTop: 4,
                                                                        }}>
                                                                        <Text
                                                                            numberOfLines={2}
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                fontSize: 12,
                                                                                color: '#455A64',
                                                                                fontWeight: '400',
                                                                            }}>
                                                                            {item.message}
                                                                        </Text>
                                                                    </View>
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={{
                                                                            marginTop: 4,
                                                                            textAlign: 'left',
                                                                            fontSize: 12,
                                                                            color: '#455A64',
                                                                            fontWeight: '400',
                                                                        }}>
                                                                        {item.created_at}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Clicknotication(item), NoticationDetails(item);
                                                            }}
                                                            style={{
                                                                marginHorizontal: 10,
                                                                // marginTop: 6,
                                                                height: 85,
                                                                borderRadius: 20,
                                                                // marginBottom: 10,
                                                                marginVertical: 10,
                                                                backgroundColor: '#F4F4F4',
                                                                width: WIDTH * 0.95,
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-start',
                                                                // paddingBottom: 10,
                                                                // shadowColor: '#cdcbcb',
                                                                // shadowRadius: 6,
                                                                // shadowOpacity: 0.1,
                                                                // elevation: 6,
                                                                borderWidth: 1,
                                                                borderColor: '#F4F4F4',
                                                            }}>
                                                            <TouchableOpacity
                                                                onPress={() => ItemRemove(item)}
                                                                style={{
                                                                    position: 'absolute',
                                                                    backgroundColor: 'red',
                                                                    width: 30,
                                                                    height: 30,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: 20 / 2,
                                                                    top: 20,
                                                                    right: 10,
                                                                }}>
                                                                <Image
                                                                    resizeMode="contain"
                                                                    source={require('../Screens/assets/delete.png')}
                                                                />
                                                            </TouchableOpacity>

                                                            <View
                                                                style={{
                                                                    marginHorizontal: 10,
                                                                    width: WIDTH * 0.8,
                                                                    height: 80,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    alignItems: 'flex-start',
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        marginRight: 20,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        height: 80,
                                                                    }}>
                                                                    <Image
                                                                        style={{
                                                                            width: 30,
                                                                            height: 30,
                                                                            alignSelf: 'center',
                                                                        }}
                                                                        source={require('../Screens/assets/notification.png')}
                                                                    />
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        height: 80,
                                                                        width: WIDTH * 0.67,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'flex-start',
                                                                    }}>
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={{
                                                                            marginTop: 2,
                                                                            textAlign: 'left',
                                                                            fontSize: 15,
                                                                            color: 'black',
                                                                            fontWeight: '500',
                                                                        }}>
                                                                        {item.title}
                                                                    </Text>
                                                                    <View
                                                                        style={{
                                                                            marginTop: 4,
                                                                        }}>
                                                                        <Text
                                                                            numberOfLines={2}
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                fontSize: 12,
                                                                                color: '#455A64',
                                                                                fontWeight: '400',
                                                                            }}>
                                                                            {item.message}
                                                                        </Text>
                                                                    </View>
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={{
                                                                            marginTop: 4,
                                                                            textAlign: 'left',
                                                                            fontSize: 12,
                                                                            color: '#455A64',
                                                                            fontWeight: '400',
                                                                        }}>
                                                                        {item.created_at}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                )}
                                            </View>
                                        );
                                    })
                                ) : (
                                    <View
                                        style={{
                                            marginTop: 250,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 1,
                                            // backgroundColor: "red",
                                            // height:1000
                                        }}>
                                        <Image
                                            resizeMode="contain"
                                            source={require('../Screens/assets/Nodatafound.png')}
                                            style={{
                                                width: 200,
                                                height: 120,
                                                alignSelf: 'center',
                                            }}
                                        />
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                                            No Notificaton Found !
                                        </Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    ) : (
                        <CustomLoader showLoader={isLoading} />

                    )}
                </View>

            </Modal>
        </View>
    );
};
const style = StyleSheet.create({
    navigationBarBlack: {
        height: 60,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#262626',
        // backgroundColor: 'blue',
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // flex: 1,
        // zIndex:999,
        // marginTop:20
    },



    navigationBarLeftContainer: {
        // width: "10%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        // backgroundColor: "yellow"
    },



    navigationBarCenterContainer: {
        left: 20,
        // backgroundColor: "yellow",
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        right: 0
    },
    navigationBarRightContainer: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: "yellow"
    },
    navigationBarRight2Container: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 6,
        // backgroundColor: "red"
    },
    navigationBarRightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        backgroundColor: 'white',
    }
});
export default Headers;