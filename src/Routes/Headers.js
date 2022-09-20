import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, } from 'react-native';


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

    return (
        <View style={style.navigationBarBlack}>

            {
                Drawericon?.visible ?
                    (<View style={style.navigationBarLeftContainer}>
                        <TouchableOpacity onPress={() => DrawericononClick() }>
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
                        <TouchableOpacity onPress={() =>BackicononClick() }>
                            <Image source={require('../Screens/assets/leftArrowWhite.png')}
                                style={{
                                    width:30,
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
                            <TouchableOpacity onPress={() => BelliconononClick()}>
                                <Image source={require('../Screens/assets/bellRight.png')}
                                    style={{
                                        width: 20,
                                        height: 25, alignSelf: 'center', marginRight: 19
                                    }} />

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
        marginLeft: 10,
        // backgroundColor: "yellow"
    },



    navigationBarCenterContainer: {
         left: 20,
        // backgroundColor: "yellow",
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        right:0
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