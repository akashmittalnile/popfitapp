import React, { useState, useEffect } from 'react'
//import { StyleSheet } from 'react-native';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import * as yup from 'yup'
import { Formik } from 'formik'
import Headers from '../../Routes/Headers';
import Address from './Address';
import { useReducer } from 'react';

// let unsubscribe;
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row'];


const ShippingDetail = (props) => {
    const [User, setuser] = useState('')
    const [producttoken, setproducttoken] = useState("");
    const [useraddress, setuseraddress] = useState([]);
    const [type, setType] = useState('');
    const [pin, setPin] = useState('');
    const [productdata, setproductdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedcoupn, setSelectedcoupon] = useState("");
    const [coupondata, setCoupondata] = useState([]);
    const [address, setAddress] = useState({});
    const [optComment, setoptComment] = useState('')
    const [landmark, setlandmark] = useState('');
    const [address_type, setaddress_type] = useState('');
    const [city, setCity] = useState('');
    const [full_name, setfull_name] = useState('');
    const [area_village, setarea_village] = useState('');
    const [ShippingAddressPopUp, setShippingAddressPopUp] = useState(false);
    const [house_no, sethouse_no] = useState('');
    const [phone, setphone] = useState('');
    const [pincode, setpincode] = useState('');
    const [state, setstate] = useState('');
    const [justUpdate, setjustUpdate] = useState(false)
    const [subtotal, setSubtotal] = useState('');
    const [tax, setTax] = useState('');
    const [total, setTotal] = useState('');
    const [coupon, setcoupon] = useState('');
    const [ammont, setammont] = useState('');
    //const [Selectcoupons, setSelectcoupons] = useState('');

    const [shippingcost, setshipping_cost] = useState('');
    const validate = () => {
        if (pincode == '') {
            alert('please enter password')
        }
        if (pincode.length < 0 || pincode.length > 10) {
            alert("Password should be min 8 char and max 20 char");

            return false;
        } else {
            //  setPassword(true)

        }
    }


    const pass = () => {

        // input validation
        if (phone == '') {
            alert('please enter password')
        }
        if (phone.length < 0 || phone.length > 10) {
            alert("Password should be min 8 char and max 20 char");

            return false;
        } else {
            //  setPassword(true)

        }
    }

    const gotocurrentpage = async e => {

        if (landmark && area_village && address_type && city && full_name && house_no && phone && pincode && state) {
            validate();
            pass();
            setShippingAddressPopUp(false);
            setIsLoading(true)
            try {
                const usertkn = await AsyncStorage.getItem("authToken");
                axios.post(`${API.SHIPPING_ADDRESS_ADD}`,
                    {
                        area_village: area_village,
                        landmark: landmark,
                        address_type: address_type,
                        city: city,
                        full_name: full_name,
                        house_no: house_no,
                        phone: phone,
                        pincode: pincode,
                        state: state
                    }, {
                    'headers': { "Authorization": ` ${usertkn}` }
                })
                    .then(function (response) {
                        setIsLoading(false)
                        //   console.log('res----->', response)
                    })
                    .catch(function (error) {
                        setIsLoading(false)
                        alert({ ...error })
                        //  console.log(error)

                    })
            } catch (error) {
                setIsLoading(false)
                alert("An error has occurred");
                //  console.log({ ...error })

            }
        }
        else {
            setIsLoading(false)
            alert("Please enter all fields")
        }
    }

    const gotoCardPayment = () => {
        props.navigation.navigate("CardPayment");
    }
    const gotoApplyCoupon = () => {
        props.navigation.navigate("ApplyCoupon", {
        });

    }

    //console.log("Selectcoupon_item...............:", props?.route?.params?.Selectcoupon);
    //console.warn("Selectcoupon_item...............:", address);
    let Selectcoupons = props?.route?.params?.Selectcoupon
    const gotoCoupon = async () => {
        const user = await AsyncStorage.getItem("item");
        //  console.log('999999999999999999999999999------------');
        //  console.log('item--------&&&&&&&&&&>', user);
        setuser(user);
        // var a = JSON.parse(user)
        // setSelectcoupons(a);
    }
    console.log("...........", Selectcoupons);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            checklogin();
            gotoCoupon();
            GetShippingProducts();
    });
    return unsubscribe;
        
        // GetShippingProducts();
    }, []);
    const checklogin = async () => {
        let Usertoken = await AsyncStorage.getItem("authToken");
        setproducttoken(Usertoken);
        //console.log("token.......", Usertoken);
        if (Usertoken == null) {
            props.navigation.navigate('LoginMain', {
                screen: 'LoginSignUp',
            });

        }
        else {

        }
    };
    const GetShippingProducts = async () => {
        setIsLoading(true)
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            },);

            if (response?.data?.status == '1') {
                setIsLoading(false)
                var address = response.data.address_lists[0];
                console.log('adreeesss----------->', address)
                setuseraddress(response.data.address_lists);
                setAddress(address)
                setproductdata(response.data.data);
                setSubtotal(response.data.sub_total);
                setTax(response.data.tax);
                setcoupon(response.data.coupon_price);
                setshipping_cost(response.data.shipping_cost);
                setTotal(response.data.total_price);
                setcoupon(response.data.coupon_price);
                setammont(response.data.amount);
            }
        }
        catch (error) {

            setIsLoading(false)
            Alert.alert("something went wrong")
        }

    };


    //     // console.log(".....usertoken.....GetShippingProducts...", producttoken);

    //     // setIsLoading(true)
    //     try {
    //         const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
    //             'headers': {
    //                 'Authorization': '228e273912a6b5718c5f2b1cbd857aba26c9cbf818436e51d8fea1b24eb71ec3c8e25cd398b45ccf8079aeb0825747d697d702536b212fd3cdcdeb656988f2d7aa6e1bb2cd4f6441ceb625eaa5aeac0ec88608afab00f850ed376837e6f7dd343972874e1cd245bdd2394229c895e082a9d1dc508d906868accd5ccae9345c0f503f3aea080fe21c68c82c4f0c48d025620821af98c9a0f838077a5eedf8842bd872030bf32fa4280f25f9c027d32fcce85d54a66a48ddfd3f714b47681419786db9a4841bf97b1586edbd3e8c9b50c94bc6f8283ee3613d2c777c1e12c6e1ab23cbd2b9e30aa77770309450db41a506dcb0999706f604de41676d6eeeaef15a0c8ad858a4549d50de0addd3e589337f5c8f7e1138434c6ec0bb757e82e3d8ddf40214d1d8bab63bd7e4f04d'
    //             }
    //         },);
    //         console.log("", response.data);
    //         setSubtotal(response.data.sub_total);
    //         setTax(response.data.tax);
    //         setcoupon(response.data.coupon_price);
    //         setshipping_cost(response.data.shipping_cost);
    //         setTotal(response.data.total_price);
    //         let result = response.map(a => a.sub_total)
    //         console.log('----------updated------->>>>', result)

    //         setproductdata(response.data.data);

    //         setuseraddress(response.data.address_lists);
    //         console.log("Response _Address-GET  my add-------------->>>>>>::::", response.data.address_lists);


    //         // console.log("User_token_not_received+yet!!!>>>", response.data.message);

    //         // setIsLoading(false)
    //     }
    //     catch (error) {
    //         console.log("ShippingProductserror:::", error.response.data.message);
    //         // setIsLoading(false)
    //     }

    // };

    const ProductRemovecart = async (item) => {
        const cartremoveid = item.cart_id;
        console.warn('item---------->', item)
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM} `, { "cart_id": cartremoveid }, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            GetShippingProducts();
            setIsLoading(false);
        }
        catch (error) {
              console.log(".ProductRemovecart.....error.........", error.response.data.message);
            setIsLoading(false);

        }

    };
    // const CouponListApi = async () => {


    //     try {
    //         const response = await axios.get(`${API.COUPON_LIST} `);
    //         // console.log("", response);
    //         console.log("Response_CouponListApi ::::", response.data.data);
    //         setCoupondata(response.data.data);


    //         // setIsLoading(false)
    //     }
    //     catch (error) {
    //         // setIsLoading(false)
    //     }

    // };

    // const CouponRemove = async () => {

    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(`${API.COUPON_REMOVE} `, { "cart_id": 1, "coupon_id": Selectcoupons.id }, {
    //             'headers': {
    //                 'Authorization': '228e273912a6b5718c5f2b1cbd857aba26c9cbf818436e51d8fea1b24eb71ec3c8e25cd398b45ccf8079aeb0825747d697d702536b212fd3cdcdeb656988f2d7aa6e1bb2cd4f6441ceb625eaa5aeac0ec88608afab00f850ed376837e6f7dd343972874e1cd245bdd2394229c895e082a9d1dc508d906868accd5ccae9345c0f503f3aea080fe21c68c82c4f0c48d025620821af98c9a0f838077a5eedf8842bd872030bf32fa4280f25f9c027d32fcce85d54a66a48ddfd3f714b47681419786db9a4841bf97b1586edbd3e8c9b50c94bc6f8283ee3613d2c777c1e12c6e1ab23cbd2b9e30aa77770309450db41a506dcb0999706f604de41676d6eeeaef15a0c8ad858a4549d50de0addd3e589337f5c8f7e1138434c6ec0bb757e82e3d8ddf40214d1d8bab63bd7e4f04d'
    //             }
    //         });

    //         alert("Coupon Removed Sussesfully....")
    //         Selectcoupons = null;
    //         setjustUpdate(!justUpdate)
    //         // console.log("status _CouponRemove:", response.data.status);

    //         // setProductitems(response.data.data)
    //         setIsLoading(false);
    //     }
    //     catch (error) {

    //         setIsLoading(false);
    //         Alert.alert("something went wrong")
    //     }

    // };
    const onChangePasswordHandler = landmark => {
        setlandmark(landmark);
    };
    const onChangeEmailHandler = area_village => {
        setarea_village(area_village);
    };
    const onChangeAddressHandler = address_type => {
        setaddress_type(address_type);
    }
    const onChangeCityHandler = city => {
        setCity(city);
    }
    const onChangeNameHandler = full_name => {
        setfull_name(full_name);
    }
    const onChangeHouseHandler = house_no => {
        sethouse_no(house_no);
    }
    const onChangePhoneHandler = phone => {
        setphone(phone);
    }
    const onChangePinHandler = pincode => {
        setpincode(pincode);
    }
    const onChangeStateHandler = state => {
        setstate(state);
    }
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
                BackicononClick={() => { props.navigation.navigate("CartAdded") }}

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
                (<ScrollView style={{ paddingTop: 10 }}>

                    {/* product flatlist   */}
                    {productdata.length > 0 ?
                        productdata.map((item, index) => {
                            return (
                                <View onPress={() => { gotoOrderDetail() }}>
                                    <View style={{
                                        marginHorizontal: 10,
                                        marginTop: 6,
                                        height: 140,
                                        width: WIDTH * 0.94,
                                        borderRadius: 20,
                                        marginBottom: 10,
                                        backgroundColor: 'white',
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

                                        // flex: 1
                                    }}>
                                        <TouchableOpacity onPress={() => ProductRemovecart(item)}
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
                                            height: 140,
                                            borderRadius: 20,
                                            flexDirection: 'row',
                                            width: WIDTH * 0.94,
                                            justifyContent: "flex-start",
                                            // backgroundColor: 'pink',
                                            alignItems: "center",
                                            paddingLeft: 20
                                        }}>

                                            <View style={{
                                                width: 100, height: 100,
                                                // backgroundColor: '#fceeb5', 
                                                justifyContent: "center",
                                                alignItems: "center",

                                            }}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={{
                                                        width: "100%",
                                                        borderRadius: 20,
                                                        height: "100%",
                                                        alignSelf: 'center',

                                                    }}
                                                    source={{ uri: item?.product_image }}
                                                />

                                            </View>

                                            <View style={{
                                                justifyContent: "flex-start",
                                                alignItems: "flex-start",
                                                width: WIDTH * 0.4,
                                                height: 100,
                                                marginLeft: 13,
                                                // backgroundColor: 'pink'
                                            }}>
                                                <Text style={{ textAlign: 'left', fontSize: 16, color: '#455A64', fontWeight: "500", }}>
                                                    {item.product_name.slice(0, 20)}
                                                </Text>
                                                <View style={{ width: WIDTH * 0.4, alignItems: "flex-start", justifyContent: "flex-start", marginTop: 6 }}>
                                                    <View>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Price: <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', }}>$
                                                            {item.product_price}
                                                        </Text></Text>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Quantity: <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', }}>
                                                            {item.qty}
                                                        </Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
                                    </View>
                                    {/* <View style={{
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
                                        shadowRadius: 6,
                                        shadowOpacity: 1.0,
                                        elevation: 6,
                                    }}>

                                        <TouchableOpacity onPress={() => ProductRemovecart(item)}
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
                                                <Text style={{ textAlign: 'left', fontSize: 15, color: '#000000', fontWeight: "bold" }}>{item.product_name}</Text>

                                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 60, width: WIDTH * 0.97 }}>


                                                    <View style={{ marginTop: 1, flexDirection: 'row', marginLeft: 15 }}>
                                                        <View style={{}}>
                                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Price : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 12, color: '#000000', }}>$ {item.product_price}</Text></Text>
                                                        </View>

                                                    </View>


                                                </View>
                                            </View>


                                        </View>
                                    </View> */}
                                </View>
                            )
                        })

                        : null}

                    {/* Choose Shipping Address */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 15 }}>
                        <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold' }}>Choose Shipping Address </Text>
                        <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}><View>
                            <Text style={{
                                marginTop: 23, fontFamily: 'Roboto', fontWeight: '400', fontSize: 15, color: '#FFCC00'
                            }} >Create Address</Text>
                        </View></TouchableOpacity>
                    </View>

                    {/* address Box */}

                    <View style={{
                        marginHorizontal: 10,
                        height: 100,
                        width: WIDTH * 0.95,
                        backgroundColor: 'white',
                        // backgroundColor: "pink",
                        marginTop: 10,
                        shadowColor: '#000000',
                        // shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 6,
                        shadowOpacity: 0.2,
                        elevation: 3,
                        borderRadius: 20,
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#FFFFFF"
                    }}>
                        <>
                            <View style={{ height: 90, width: WIDTH * 0.95, borderRadius: 20, }}>
                                <View style={{ height: 90, flexDirection: 'row', marginLeft: 15 }}>
                                    {/* <View style={{ width: 25, height: 80, justifyContent: "center",alignItems: "center",backgroundColor: 'white' }} >
                                             <Image 
                                             source={require('../assets/checked.png')}
                                             />
                                            
                                        </View> */}
                                    <View style={{ width: WIDTH * 0.67, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: '#000000', fontWeight: "500", fontSize: 16, textAlign: 'left' }}>{address.address_type}</Text>
                                        <View style={{ width: WIDTH * 0.67, height: 40, marginTop: 5 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>{address.house_no} {address.landmark} {address.area_village},  {address.city} {address.pincode}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <TouchableOpacity onPress={() => { props.navigation.navigate('Address', { address, setAddress }) }}
                                            disabled={Selectcoupons == null ? false : true}
                                            style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                                            <View style={{ width: 25, height: 25, justifyContent: "flex-end", alignItems: 'flex-end', right: 0, borderRadius: 25 / 2, backgroundColor: 'red', position: 'absolute' }}>
                                                <Image
                                                    style={{
                                                        width: 10,
                                                        height: 18,
                                                    }}
                                                    source={require('../assets/arrowPointToRight.png')}
                                                />
                                            </View>
                                        </TouchableOpacity> */}
                            </View>

                            <TouchableOpacity onPress={() => { props.navigation.navigate('Address', { address, setAddress }) }}
                                disabled={Selectcoupons == null ? false : true}
                                style={{ height: 100, width: 60, justifyContent: "center", alignItems: 'center', right: 0, borderRadius: 25 / 2, position: 'absolute' }}>

                                <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 12,
                                            height: 18,
                                            alignSelf: 'center',
                                        }}
                                        source={require('../assets/arrowPointToRight.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </>



                    </View>


                    {/* Coupon Box */}
                    <View
                        style={{
                            marginHorizontal: 10,
                            height: 80,
                            width: WIDTH * 0.95,
                            backgroundColor: 'white',
                            marginTop: 10,
                            shadowColor: '#000',
                            // shadowOffset: { width: 0, height: 4 },
                            shadowRadius: 6,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            borderRadius: 20,
                            marginBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: "center",
                            padding: 10,
                            // borderWidth:1,
                            // borderColor:"red"
                        }}>


                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', width: WIDTH * 0.9, height: 80, borderRadius: 20, }}>
                            {
                                Selectcoupons == null ?
                                    <>
                                        <View style={{ width: 25, height: 80, justifyContent: "center", alignItems: 'center' }}>
                                            <Image
                                                style={{
                                                    width: 30,
                                                    height: 30, alignSelf: 'center'
                                                }}


                                                source={require('../assets/discount.png')}
                                            />
                                        </View>

                                        < View style={{ justifyContent: "center", alignItems: 'flex-start', width: WIDTH * 0.8, height: 80 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: "500" }}>Apply Coupon</Text>
                                        </View>


                                        <TouchableOpacity
                                            onPress={() => { gotoApplyCoupon() }}
                                            disabled={Selectcoupons == null ? false : true}

                                            style={{
                                                width: 50, height: 75, justifyContent: "center", alignItems: 'center', borderRadius: 25, position: 'absolute', right: 0
                                            }} >

                                            <Image
                                                style={{
                                                    width: 12,
                                                    height: 18, alignSelf: 'center',
                                                }}
                                                source={require('../assets/arrowPointToRight.png')}
                                            />

                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        {/* <TouchableOpacity onPress={() => { }}
                                        style={{ position: "absolute", width: 31, height: 30, right: 20, top: 7, }}
                                    >
                                    </TouchableOpacity> */}
                                        <View style={{ width: 25, height: 80, justifyContent: "center", alignItems: 'center' }}>
                                            <Image
                                                style={{
                                                    width: 30,
                                                    height: 30, alignSelf: 'center'
                                                }}


                                                source={require('../assets/yellowcheck.png')}
                                            />
                                        </View>

                                        < View style={{ justifyContent: "center", alignItems: 'flex-start', width: WIDTH * 0.6, height: 80, marginLeft: 15 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: "500" }}>{Selectcoupons?.name}</Text>
                                            <Text style={{ textAlign: 'left', fontSize: 13, color: '#676767', fontWeight: "500" }}>- ${Selectcoupons?.discount}</Text>
                                        </View>
                                        <View style={{ paddingVertical: 20, justifyContent: "center", alignItems: 'center', height: 80, width: WIDTH * 0.2, }}>
                                            <TouchableOpacity
                                                onPress={() => { props.navigation.navigate('ApplyCoupon') }}
                                                style={{ justifyContent: "center", alignItems: 'center', width: WIDTH * 0.15, height: 25, borderRadius: 50 }}>

                                                <Text style={{ textAlign: 'left', fontSize: 13, color: '#FFCC00' }}>Change</Text>

                                            </TouchableOpacity>
                                        </View>
                                        {/* <View style={{ right: -12, }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ textAlign: 'left', fontSize: 19, color: 'black', fontWeight: 'bold' }}>Used Cupon</Text>
                                                <View style={{ right: 12 }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 15, color: 'black', marginTop: 10, left: 100 }}>- $ {Selectcoupons?.discount}</Text></View>
                                            </View>
                                            <View style={{ justifyContent: 'space-between', width: WIDTH * 0.65, flex: 1, flexDirection: 'row' }}>
                                                <View >
                                                    <Text style={{ textAlign: 'left', fontSize: 15, color: '#FFCC00', marginTop: 10 }}>{Selectcoupons?.name}</Text></View>
                                                <View style={{ right: 12 }}>
                                                    <TouchableOpacity onPress={() => { props.navigation.navigate('ApplyCoupon') }}>
                                                        <Text style={{ textAlign: 'left', fontSize: 15, color: 'black', marginTop: 10 }}>Change Offer</Text></TouchableOpacity></View>
                                            </View>


                                        </View> */}
                                    </>
                            }

                        </View>
                    </View>

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
                            onChangeText={(text) => (setoptComment(text)
                                //  console.log('selected_Coupon::::', Selectcoupons)
                            )}

                        />
                    </View>

                    {/* order details and discout  */}
                    <View style={{
                        backgroundColor: '#fffcee',
                        height: 160,
                        width: WIDTH * 0.99,
                        marginTop: 20,
                        shadowColor: '#efe8c7',
                        // shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        elevation: 6,
                        marginBottom: 20, justifyContent: "flex-start", alignItems: 'flex-start'
                    }}>
                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Subtotal:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>${subtotal}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Tax:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>{tax}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Shipping charges:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>${shippingcost}</Text>
                            </View>
                        </View>
                        {
                            Selectcoupons == null ?
                                <>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                                        <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Coupon:</Text>
                                        </View>
                                        <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 40, fontWeight: "500" }}>-</Text>
                                        </View>
                                    </View>
                                </> :
                                <>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                                        <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#FFCC00', fontWeight: "500" }}>{Selectcoupons?.name}</Text>
                                        </View>
                                        <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>- ${Selectcoupons?.discount}</Text>
                                        </View>
                                    </View>
                                    {/* <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#FFCC00' }}>{Selectcoupons?.name}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>- ${Selectcoupons?.discount}</Text>
                                        </View>
                                    </View> */}
                                </>}
                    </View>

                    <View style={{
                        backgroundColor: '#fffcee',
                        height: 40,
                        width: WIDTH * 0.99,
                        // marginTop: 20,
                        shadowColor: '#efe8c7',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        elevation: 2,
                        marginBottom: 20, justifyContent: "center", alignItems: 'center',
                        flex: 1
                    }}>
                        <View style={{ marginTop: 10, height: 40, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.94 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Total Amout:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                {
                                    Selectcoupons == null ? <>
                                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>${ammont}</Text></>
                                        :
                                        <><Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>{`${parseInt(total) - parseInt(Selectcoupons?.discount)}`}</Text></>
                                }
                            </View>
                        </View>
                    </View>

                    {/* footer button   */}
                    <View style={{ justifyContent: "center", marginBottom: 30, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { gotoCardPayment() }}>
                            <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
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

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            height: "100%",
                                            width: WIDTH * 0.99,
                                            // paddingTop: 20,
                                            padding: 10,
                                            // marginHorizontal: 10,
                                            // justifyContent: "center",
                                            // marginHorizontal: 15,
                                            borderRadius: 32,
                                            //marginBottom: 10,
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}>

                                            <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                                <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 20, color: '#000000', fontFamily: 'Inter', fontWeight: '500' }}>Add Address</Text>


                                            </View>

                                            <TextInput style={styles.textInput}
                                                placeholder='Address Title'
                                                label="area_village"
                                                value={area_village}
                                                onChangeText={e => onChangeEmailHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter your landmark'
                                                label="landmark"
                                                value={landmark}
                                                onChangeText={e => onChangePasswordHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter Address type'
                                                label="Address type"
                                                value={address_type}
                                                onChangeText={e => onChangeAddressHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter your City'
                                                label="Address type"
                                                value={city}
                                                onChangeText={e => onChangeCityHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter full name'
                                                label="Address type"
                                                value={full_name}
                                                onChangeText={e => onChangeNameHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter house number'
                                                label="Address type"
                                                value={house_no}
                                                onChangeText={e => onChangeHouseHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter phone number'
                                                label="Address type"
                                                value={phone}
                                                onChangeText={e => onChangePhoneHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter pincode'
                                                label="Address type"
                                                value={pincode}
                                                onChangeText={e => onChangePinHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder='Enter State'
                                                label="Address type"
                                                value={state}
                                                onChangeText={e => onChangeStateHandler(e)}
                                            />
                                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 30 }}>
                                                <TouchableOpacity
                                                    onPress={() => { gotocurrentpage() }} >
                                                    <View style={{ justifyContent: 'center', width: 120, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                                                        <Text style={styles.text}>Save </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>
                    ) : null}
                </ScrollView>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView >
    )
};
export default ShippingDetail;


const styles = StyleSheet.create({
    textInput: {
        width: '98%', marginTop: 14, borderRadius: 10, marginHorizontal: 20,
        flexDirection: 'row',
        height: 45,
        shadowColor: '#11032586',
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: "#D7D7D7",
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: "center", color: '#8F93A0',
        fontWeight: '400',
        fontSize: 14,
    },
    text: { textAlign: 'center', fontSize: 15, color: 'white', fontWeight: '500' }
})
{/*809 <View style={{ borderColor: "gray", borderWidth: 0.5, height: 60, backgroundColor: "gray", right: -100, flexDirection: 'row' }} /> */ }
