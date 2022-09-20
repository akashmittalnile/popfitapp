import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import * as yup from 'yup'
import { Formik } from 'formik'
import Headers from '../../Routes/Headers';

// let unsubscribe;
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row'];


const ShippingDetail = (props) => {

    const [producttoken, setproducttoken] = useState("");
    const [useraddress, setuseraddress] = useState([]);
    const [productdata, setproductdata] = useState([]);

    const [selectedcoupn, setSelectedcoupon] = useState("");
    const [coupondata, setCoupondata] = useState([]);
    const [optComment, setoptComment] = useState('')

    const [ShippingAddressPopUp, setShippingAddressPopUp] = useState(false);

    const [justUpdate, setjustUpdate] = useState(false)

    const buttonClickedHandler1 = () => {
        props.navigation.goBack();
    }
    const gotocurrentpage = () => {
        setShippingAddressPopUp(false);
    }
    const gotoCardPayment = () => {
        props.navigation.navigate("CardPayment");
    }
    const gotoNotification = () => {
        props.navigation.navigate("Notifications");
    }
    const gotoApplyCoupon = () => {
        props.navigation.navigate("ApplyCoupon", {

        });
    }

    console.log("Selectcoupon_item...............:", props?.route?.params?.Selectcoupon);
    let Selectcoupons = props?.route?.params?.Selectcoupon
    // console.log("...........", Selectcoupons);

    useEffect(() => {

        console.log('====================================');
        console.log('Useeffect');
        console.log('====================================');
        // setSelectedcoupon(Selectcoupons);
        const checklogin = async () => {
            let Usertoken = await AsyncStorage.getItem("authToken");
            setproducttoken(Usertoken);
            console.log("token.......", Usertoken);
            if (Usertoken == null) {
                props.navigation.navigate('LoginMain', {
                    screen: 'LoginSignUp',
                });
                console.log("...............................");
                // props.navigation.navigate("LoginSignUp")
            }
            else {
                console.log("??????????????error_ShippingDetail::");
            }
        };
        checklogin();
        GetShippingProducts();
        CouponListApi();
        // unsubscribe = props.navigation.addListener('focus', () => {

        // });
        // return unsubscribe;
    }, [justUpdate]);

    const GetShippingProducts = async () => {

        // console.log(".....usertoken.....GetShippingProducts...", producttoken);

        // setIsLoading(true)
        try {
            const response = await axios.get(`${API.SHIPPING_DETAILS}`);
            // console.log("", response);
            console.log("Response_ShippingProducts ::::", response.data.data);
            setproductdata(response.data.data);
            setuseraddress(response.data.address_lists);
            console.log("Response _Address-GET ::::", response.data.address_lists);
            // console.log("User_token_not_received+yet!!!>>>", response.data.message);

            // setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            // setIsLoading(false)
        }

    };

    const ProductRemovecart = async (productdata) => {
        const cartaddid = productdata.cart_id.cart_id;
        console.log("Remove_productin shippingpage.....", cartaddid);
        // setIsLoading(true);
        try {
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM}`, { "cart_id": cartaddid });
            console.log(":::::::::ProductRemovecart_Response>>>", response.data.data);
            console.log("status _ProductRemovecart:", response.data.status);
            GetShippingProducts()
            // props.navigation.goBack()
            // setProductitems(response.data.data)
            // setIsLoading(false);
        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            // setIsLoading(false);

        }

    };
    const CouponListApi = async () => {


        try {
            const response = await axios.get(`${API.COUPON_LIST}`);
            // console.log("", response);
            console.log("Response_CouponListApi ::::", response.data.data);
            setCoupondata(response.data.data);
            console.log("");

            // setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            // setIsLoading(false)
        }

    };

    const CouponRemove = async () => {
        console.log("CouponRemove cart.....");
        // setIsLoading(true);
        try {
            const response = await axios.post(`${API.COUPON_REMOVE}`, { "cart_id": 1, "coupon_id": Selectcoupons.id });
            console.log(":::::::::CouponRemove_Response>>>", response.data);
            alert("Coupon Removed Sussesfully....")
            Selectcoupons = null;
            setjustUpdate(!justUpdate)
            // console.log("status _CouponRemove:", response.data.status);

            // setProductitems(response.data.data)
            // setIsLoading(false);
        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            // setIsLoading(false);

        }

    };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, backgroundColor: '#ffffff', flexGrow: 1
        }} >

            <Headers
                Backicon={{
                    visible: true,
                }}
                BackicononClick={() => { props.navigation.goBack() }}

                CartIcon={{
                    visible: true,
                }}
                CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

                Bellicon={{
                    visible: true,

                }}
                BelliconononClick={() => { props.navigation.navigate("Notifications") }}
            />
            <ScrollView>
                {/* <View style={{
                    width: '92%',
                    height: 290,
                    marginLeft: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.2,
                    elevation: 3,
                    borderRadius: 15,
                    backgroundColor: '#d6d6d6',
                    marginTop: 20,
                    // justifyContent:"center",
                    // alignItems:"center",

                }}>

                    <TouchableOpacity onPress={() => { ProductRemovecart() }}>
                        <View style={{ position:"absolute" ,backgroundColor: 'red', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2,right:10,top:10 }}>
                            <Image source={require('../assets/delete.png')}
                            />
                        </View>
                    </TouchableOpacity>


                    <View style={{
                        height: 100, marginTop: 20, justifyContent: "center", alignItems: 'center'
                    }}>
                        <View style={{
                            marginTop: -40, width: 110, height: 110, borderRadius: 110 / 2, backgroundColor: '#fceeb5'
                        }}>
                            <Image resizeMode='contain'
                                style={{
                                    width: 100, marginTop: 20,
                                    height: 100, alignSelf: 'center', borderRadius: 100 / 2,
                                }}
                                source={{ uri: productdata?.product_image }} />

                        </View>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginLeft: 25, marginTop: 10, fontSize: 15, color: '#000000', }}>{productdata?.product_name}</Text>
                    </View>

                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Price  : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$ {productdata.product_price}</Text></Text>
                        </View>



                    </View>
                    <View style={{ height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Tax     : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$ {productdata?.tax}</Text></Text>
                        </View>

                    </View>
                    <View style={{ height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total  : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000' }}>$ {productdata.total_price}</Text></Text>
                        </View>



                    </View>
                </View> */}
                {/* product flatlist   */}
                <FlatList
                    vertical
                    data={productdata}
                    renderItem={({ item }) =>
                        <View onPress={() => { gotoOrderDetail() }}>

                            <View style={{
                                marginHorizontal: 6,
                                marginTop: 20,
                                height: 120,
                                borderRadius: 20,
                                marginBottom: 10,
                                backgroundColor: 'white',
                                width: WIDTH * 0.97,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: '#000000',
                                // shadowOffset: {
                                //     width: 0,
                                //     height: 3
                                // },
                                shadowRadius: 6,
                                shadowOpacity: 1.0,
                                elevation: 6,
                                // zIndex: 999,
                                // labelStyle: {
                                //     color: "#fff",
                                //     lineHeight: 0
                                // },
                                // flex: 1
                            }}>

                                <TouchableOpacity onPress={() => { ProductRemovecart() }}
                                    style={{
                                        position: "absolute",
                                        backgroundColor: 'red',
                                        width: 30, height: 30,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        borderRadius: 20 / 2,
                                        top: 10,
                                        right: 10
                                    }}>

                                    <Image resizeMode='contain'
                                        source={require('../assets/delete.png')}

                                    />

                                </TouchableOpacity>

                                <View style={{
                                    height: 120,
                                    flexDirection: 'row',
                                    width: WIDTH * 0.97,
                                    justifyContent: "flex-start",
                                    alignItems: "center",

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
                                                borderRadius: 20,
                                                height: "100%", alignSelf: 'center',

                                            }}
                                            source={{ uri: item.product_image }} />

                                    </View>

                                    <View style={{
                                        justifyContent: "flex-start", alignItems: "flex-start", width: WIDTH * 0.97, marginLeft: 15,
                                    }}>
                                        <Text style={{ textAlign: 'left', fontSize: 15, color: '#000000', fontWeight: "bold" }}>{item.product_name.slice(0, 20) + '...'}</Text>

                                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 60, width: WIDTH * 0.97 }}>


                                            <View style={{ marginTop: 1, flexDirection: 'row', marginLeft: 15 }}>
                                                <View style={{}}>
                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Price : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 12, color: '#000000', }}>$ {item.product_price}</Text></Text>
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
                            </View>
                        </View>
                    }
                />

                <Text style={{ marginLeft: 15, marginTop: 20, textAlign: 'left', fontSize: 15, color: '#000000', }}>Please Enter Your Shipping Address</Text>

                <View style={{
                    backgroundColor: 'white', justifyContent: "center", alignItems: "center", flexDirection: "row", width: WIDTH * 0.97,
                    height: 140, marginHorizontal: 6,
                }}>
                    {/* Please Enter Your Shipping Address */}
                    <FlatList
                        vertical
                        data={useraddress}
                        renderItem={({ item, index }) =>{ 
                          return (<View style={{
                                width: "99%",
                                height: 140,
                                marginHorizontal: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowRadius: 6,
                                shadowOpacity: 0.2,
                                elevation: 3,
                                borderRadius: 15,
                                backgroundColor: 'white',
                                marginTop: 20,
                                marginBottom: 10
                            }}>
                                <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "bold" }}>{item.address_type}</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ marginRight: 5, marginTop: -5, backgroundColor: 'red', width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                                            <Image source={require('../assets/delete.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: "red", height: 50, width: 50, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                    <Text style={{ marginTop: -5, marginHorizontal: 10, textAlign: 'left', fontSize: 14, color: '#000000' }}></Text>
                                </View>

                            </View>)
                            }
                        }
                    />
                    <View style={{
                        width: WIDTH * 0.97,
                        height: 70,
                        marginHorizontal: 6,
                        // marginLeft: 6,
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginTop: 20,
                        borderColor: "#ffcc00",
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}>
                            <View style={{ height: 40, flexDirection: 'row', width: WIDTH * 0.90, alignItems: 'center', justifyContent: 'flex-start', }} >

                                <View style={{
                                    marginRight: 5,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    //  width: WIDTH * 0.50,
                                    // backgroundColor: 'pink'
                                }}>

                                    <View style={{ width: 35, height: 35, justifyContent: "center", alignItems: 'center' }}>
                                        <Image

                                            style={{
                                                width: 35,
                                                height: 35, alignSelf: 'center'
                                            }}

                                            source={require('../assets/add1.png')}
                                        />
                                    </View>

                                </View>

                                <View style={{
                                    alignItems: 'center', width: WIDTH * 0.70,
                                    justifyContent: 'flex-end', backgroundColor: 'white'
                                }}>
                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#ffcc00' }}>Add New Address</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => { gotoApplyCoupon() }}
                    style={{
                        marginHorizontal: 10,
                        height: 50,
                        backgroundColor: 'white',
                        marginTop: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 6,
                        shadowOpacity: 0.2,
                        elevation: 3,
                        borderRadius: 25,
                        marginBottom: 10,
                        flexDirection: 'row'

                    }}>
                    <View style={{
                        marginLeft: 10, marginTop: 5, height: 40,
                        justifyContent: 'center'
                    }}>

                        <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                            <Image
                                style={{
                                    width: 15,
                                    height: 15, alignSelf: 'center'
                                }}


                                source={require('../assets/discount.png')}
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: 15, justifyContent: "center", alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { CouponRemove() }}
                                    style={{ position: "absolute", width: 31, backgroundColor: 'red', borderRadius: 35, height: 30, right: 30, top: -10 }}>
                                    <Image
                                        source={require('../../Screens/assets/cancelWhite.png')}
                                        style={{
                                            width: 30,
                                            height: 30, alignSelf: 'center'
                                        }}

                                    />
                                </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            {
                                Selectcoupons == null ?
                                    (<Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>Apply Coupon</Text>)
                                    :
                                    (<Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>{Selectcoupons?.name}</Text>)
                            }
                        </View>
                        < View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>Apply Coupon</Text>

                                </View>

                        <View style={{ marginRight: 10, marginTop: -5, width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                            <Image
                                style={{
                                    width: 10,
                                    height: 15, alignSelf: 'center'
                                }}
                                source={require('../assets/arrowPointToRight.png')}
                            />
                        </View>

                    </View>
                </TouchableOpacity> */}

                {/* Apply coupon field */}
                <View
                    style={{
                        marginHorizontal: 6,
                        height: 80,
                        width: WIDTH * 0.97,
                        backgroundColor: 'white',
                        marginTop: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 6,
                        shadowOpacity: 0.2,
                        elevation: 3,
                        borderRadius: 25,
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                    <View style={{

                        height: 40,
                        justifyContent: 'center',
                        alignItems: "center",
                        width: 40,

                    }}>

                        <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2 }}>
                            <Image
                                style={{
                                    width: 25,
                                    height: 25, alignSelf: 'center'
                                }}


                                source={require('../assets/discount.png')}
                            />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', width: WIDTH * 0.85, marginLeft: 10, height: 60 }}>

                        <View style={{
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: "center", marginTop: 10
                        }}>
                            < View style={{ justifyContent: "flex-start", alignItems: 'flex-start', }}>
                                <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', }}>Apply Coupon</Text>
                            </View>

                            {
                                Selectcoupons == null ?
                                    <></>
                                    :
                                    <><TouchableOpacity onPress={() => { CouponRemove() }}
                                    style={{ position: "absolute", width: 31, backgroundColor: 'red', borderRadius: 35, height: 30, right: 20, top: 7 }}>
                                    <Image
                                        source={require('../../Screens/assets/cancelWhite.png')}
                                        style={{
                                            width: 30,
                                            height: 30, alignSelf: 'center'
                                        }}

                                    />
                                </TouchableOpacity>
                                    <View style={{   }}>
                                        <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>{Selectcoupons?.name}</Text>

                                    </View></>
                            }

                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 0.5, height: 60, backgroundColor: "gray", right: -100, flexDirection: 'row' }} />

                        <TouchableOpacity onPress={() => { gotoApplyCoupon() }}
                        disabled={Selectcoupons == null ? false : true}
                            style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                            <View style={{ marginRight: 30, width: 25, height: 25, justifyContent: "flex-end", alignItems: 'center', borderRadius: 25 / 2 }}>
                                <Image
                                    style={{
                                        width: 10,
                                        height: 18, alignSelf: 'center'
                                    }}
                                    source={require('../assets/arrowPointToRight.png')}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* {
                    Selectcoupons == null ?
                        (<View
                            style={{
                                marginHorizontal: 10,
                                height: 50,
                                backgroundColor: 'white',
                                marginTop: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowRadius: 6,
                                shadowOpacity: 0.2,
                                elevation: 3,
                                borderRadius: 25,
                                marginBottom: 10,
                                flexDirection: 'row'

                            }}>
                            <View style={{
                                marginLeft: 10, marginTop: 5, height: 40,
                                justifyContent: 'center'
                            }}>

                                <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                                    <Image
                                        style={{
                                            width: 15,
                                            height: 15, alignSelf: 'center'
                                        }}


                                        source={require('../assets/discount.png')}
                                    />
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: 15, justifyContent: "center", alignItems: 'center' }}>

                                <TouchableOpacity onPress={() => { CouponRemove() }}
                                    style={{ position: "absolute", width: 31, backgroundColor: 'red', borderRadius: 35, height: 30, right: 20, top: 7 }}>
                                    <Image
                                        source={require('../../Screens/assets/cancelWhite.png')}
                                        style={{
                                            width: 30,
                                            height: 30, alignSelf: 'center'
                                        }}

                                    />
                                </TouchableOpacity>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>{Selectcoupons?.name}</Text>

                                </View>



                            </View>
                        </View>)
                        :
                        <></>
                } */}

                {/* Add Delivery Instruction */}
                <View style={{
                    backgroundColor: 'white',
                    height: 70,
                    marginHorizontal: 10,
                    marginTop: 20,
                    marginHorizontal: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    elevation: 2,
                    borderRadius: 15,
                    marginBottom: 20,
                    justifyContent: "center",
                }}>
                    <TextInput
                        style={{
                            justifyContent: "flex-start",
                            color: 'black',
                            borderWidth: 1,
                            marginHorizontal: 20,
                            borderColor: 'white'
                        }}
                        multiline
                        placeholder="Add Delivery Instruction ( Optional )"
                        placeholderTextColor={'#C0C0C0'}
                        value={optComment}
                        onChangeText={(text) => (setoptComment(text), console.log('selected_Coupon::::', Selectcoupons))}


                    />
                </View>

                {/* price table */}
                <View style={{
                    backgroundColor: '#fffcee',
                    height: 100,
                    marginTop: 20,
                    shadowColor: '#efe8c7',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    elevation: 2,
                    marginBottom: 20, justifyContent: "center", alignItems: 'center'
                }}>
                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Subtotal  :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Tax  :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>Calculated at checkout</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Shipping  :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>Calculated at checkout</Text>
                        </View>
                    </View>

                </View>
                {/* Total */}
                <View style={{
                    backgroundColor: '#fffcee',
                    height: 40,
                    marginTop: 20,
                    shadowColor: '#efe8c7',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    elevation: 2,
                    marginBottom: 20, justifyContent: "center", alignItems: 'center'
                }}>
                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total  :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
                        </View>
                    </View>



                </View>

                <View style={{ justifyContent: "center", marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => { gotoCardPayment() }}>
                        <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>



                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Total Payable Amount</Text>


                        </View>
                    </TouchableOpacity>


                </View>
                {ShippingAddressPopUp ? (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={ShippingAddressPopUp}
                        onRequestClose={() => {
                            setShippingAddressPopUp(false);
                        }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'rgba(140, 141, 142, 0.7)',
                            }}>
                            <ScrollView>
                                <View
                                    style={{
                                        //margin: 10,
                                        width: "100%",
                                        // height: "50%",
                                        // backgroundColor: 'white',
                                        borderRadius: 20,

                                        marginTop: 115,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 6,

                                    }}>
                                    <Formik
                                        initialValues={{
                                            fullname: '',
                                            phoneno: '',
                                            pincode: '',
                                            enter_state: '',
                                            enter_city: '',
                                            typeofaddress: '',
                                            house_no: '',
                                            area_colony: '',
                                            landmark: '',
                                        }}
                                        onSubmit={values => Loginwithmobile(values)}
                                        validationSchema={yup.object().shape({
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                            fullname: yup
                                                .string()
                                                .required('Enter your full name'),
                                        })}
                                    >
                                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                            <View style={{
                                                backgroundColor: 'pink',
                                                height: "100%",
                                                width: WIDTH * 0.99,
                                                // paddingTop: 20,
                                                padding: 10,
                                                // marginHorizontal: 10,
                                                // justifyContent: "center",
                                                // marginHorizontal: 15,
                                                borderRadius: 10,
                                                marginBottom: 20,
                                                alignItems: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <TouchableOpacity onPress={() => { setShippingAddressPopUp(false) }}
                                                    style={{ position: "absolute", width: 30, backgroundColor: 'red', borderRadius: 35, height: 35, right: 10, top: 10 }}>
                                                    <Image
                                                        source={require('../assets/cancelWhite.png')}
                                                        style={{
                                                            width: 35,
                                                            height: 35, alignSelf: 'center'
                                                        }}

                                                    />
                                                </TouchableOpacity>

                                                <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                                    <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2 }}>
                                                        <Image source={require('../assets/plusBlack.png')}
                                                            style={{
                                                                marginRight: 5,
                                                                width: 25,
                                                                height: 25,
                                                                //   justifyContent: "center",
                                                                alignItems: 'center',
                                                                borderRadius: 25 / 2
                                                            }}
                                                        />
                                                    </View>

                                                    <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 14, color: 'black', }}>Add New Shipping Address</Text>


                                                </View>


                                                <View style={{
                                                    marginTop: 30, borderRadius: 25, marginHorizontal: 20,
                                                    flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    // backgroundColor: 'red', 
                                                    justifyContent: "center",
                                                }}>
                                                    <TextInput placeholder="Full Name"
                                                        fontWeight='normal'
                                                        maxLength={10}
                                                        keyboardType='number-pad'
                                                        placeholderTextColor='#D7D7D7'
                                                        value={values.fullname}
                                                        onChangeText={handleChange('fullname')}
                                                        onBlur={() => setFieldTouched('fullname')}
                                                        style={{ width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black" }}
                                                    />
                                                    {
                                                        touched.fullname && errors.fullname &&
                                                        <Text style={{ fontSize: 14, color: '#FF0D10', paddingLeft: 10, marginTop: 5 }}>{errors.fullname}</Text>
                                                    }
                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="Phone number"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="Pincode / Zipcode"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="State"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="City"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="Type of address"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="Home No."
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>
                                                <View style={{
                                                    marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
                                                    height: 45,
                                                    shadowColor: '#11032586',
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    borderColor: "#D7D7D7",
                                                    borderWidth: 1,
                                                    justifyContent: "center",
                                                }}
                                                ><TextInput
                                                        placeholder="Area, Colony, Road name"
                                                        // value={Useremail}
                                                        //editable={!isLoading}
                                                        // onChangeText={(text) => setUseremail(text)}
                                                        keyboardType="number-pad"
                                                        fontWeight='normal'
                                                        placeholderTextColor='#D7D7D7'
                                                        style={{
                                                            width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                                                            fontSize: 14
                                                        }} />


                                                </View>


                                                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 45, marginHorizontal: 20, marginTop: 30 }}>
                                                    <TouchableOpacity onPress={() => { gotocurrentpage() }}>
                                                        <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>



                                                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Save & Continue</Text>


                                                        </View>
                                                    </TouchableOpacity>


                                                </View>



                                            </View>
                                        )}
                                    </Formik>


                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                ) : null}
            </ScrollView>
        </SafeAreaView >
    )
};

export default ShippingDetail;
