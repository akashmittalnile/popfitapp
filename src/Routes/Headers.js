import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartCounter,incrementCounter } from '../Redux/actions/UpdateCounter';

const Headers = ({
    Drawericon,
    Backicon,
    Bellicon,
    CartIcon,
    DrawericononClick,
    BelliconononClick,
    CartIconononClick,
    BackicononClick
}) => {
    const dispatch = useDispatch();
    const myNoticount = useSelector((state) => state.mofiynoti);
    const Mycartcount = useSelector((state) => state.Cartreducer);
    const [counter, setCounter] = useState('');

    useEffect(() => {

        // GetShippingProducts()
        // Notifi()
        // b()

    }, [])
    // const GetShippingProducts = async () => {
    //     const usertkn = await AsyncStorage.getItem("authToken");

    //     // console.log('heloooooo')
    //     setIsLoading(true)
    //     try {
    //         const response = await axios.get(`${API.NOTIFICATION}`, { headers: { "Authorization": ` ${usertkn}` } });
    //         let data = response.data.data.length;
    //         console.log('incrementCounter', data
    //         );
    //         dispatch(incrementCounter(parseInt(data)));
    //         // AsyncStorage.setItem("notification", JSON.stringify(data));
    //         if (response?.data?.status == '1') {
    //             setIsLoading(false)
    //             setNoti(response.data.data);
    //         }
    //     }
    //     catch (error) {
    //         setIsLoading(false)
    //         //  console.log("ShippingProductserror:::", error);

    //     }

    // };
    // const a = () => {
    //     setTimeout(() => {
    //         Notifi()
    //         b();
    //     }, 2000)

    // }
    // const b = () => {
    //     a();
    // }
    // const clearNoti = async () => {
    //     AsyncStorage.setItem("notification", JSON.stringify(""));
    // }
    // const Notifi = async () => {
    //     let noti = AsyncStorage.getItem('notification');
    //     // var notify = JSON.parse(noti);
    //     // setCounter(notify);
    //     //console.log('notifica--------->', notify)
    // }
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
                                {Mycartcount >= '0'  ?
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
                                BelliconononClick()
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