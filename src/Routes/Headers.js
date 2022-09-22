import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

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

    const myNoticount= useSelector((state)=>state.changeTheNumber) ;
    const [counter, setCounter] = useState('');

    useEffect(() => {
        Notifi()
        b()
    }, [])
    const a = () => {
        setTimeout(() => {
            Notifi()
            b();
        }, 2000)

    }
    const b = () => {
        a();
    }
    const clearNoti = async () => {
        AsyncStorage.setItem("notification", JSON.stringify(""));
    }
    const Notifi = async () => {
        let noti = AsyncStorage.getItem('notification');
        var notify = JSON.parse(noti);
        setCounter(notify);
        //console.log('notifica--------->', notify)
    }
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
                                    height: 25, alignSelf: 'center'
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

                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: '#ec1f1f',
                                    width: 10,
                                    height: 10,
                                    borderRadius: 10 / 2,
                                    // marginLeft: 30,
                                    marginTop: -15,
                                    right: 15
                                }}>

                            </View>
                        </View>)
                        : null
                }

                {
                    Bellicon?.visible ?
                        (<View style={style.navigationBarRightContainer}>
                            <TouchableOpacity onPress={() => {
                                BelliconononClick()
                                clearNoti()
                            }}>
                                <Image source={require('../Screens/assets/bellRight.png')}
                                    style={{
                                        width: 20,
                                        height: 25, alignSelf: 'center', marginRight: 19
                                    }} />

                            </TouchableOpacity>
                            <View
                                style={{
                                    position:"absolute",
                                    backgroundColor: '#ffcc00',
                                    width: 15,
                                    height: 15, 
                                    borderRadius: 15 / 2,
                                    marginLeft: 30,
                                    top: -1,
                                    right: 12, 
                                    shadowColor: '#000000',
                                    // shadowOffset: {
                                    //   width: 0,
                                    //   height: 3
                                    // },
                                    shadowRadius: 5,
                                    shadowOpacity: 1.0,
                                    elevation: 6,
                                    zIndex: 999,
                                    justifyContent:"center",
                                    alignItems:"center"
                                }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 10,textAlign:"center",justifyContent:"center",
                                    alignItems:"center" }}>2
                                {/* {myNoticount} */}
                                </Text>
                            </View>
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