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

        checklogin();
        gotoCoupon()
        GetShippingProducts();
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

    const ProductRemovecart = async (productdata) => {
        console.warn('item---------->', productdata)
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM} `, { "cart_id": cartaddid }, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            GetShippingProducts()
            setIsLoading(false);
        }
        catch (error) {
            //   console.log("......error.........", error.response.data.message);
            setIsLoading(false);

        }

    };
    const CouponListApi = async () => {


        try {
            const response = await axios.get(`${API.COUPON_LIST} `);
            // console.log("", response);
            console.log("Response_CouponListApi ::::", response.data.data);
            setCoupondata(response.data.data);


            // setIsLoading(false)
        }
        catch (error) {

            // setIsLoading(false)
        }

    };

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
            {!isLoading ?
                (<ScrollView>

                    {/* product flatlist   */}
                    {productdata.length > 0 ?
                        productdata.map((item, index) => {
                            return (
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
                                    </View>
                                </View>
                            )
                        })

                        : <Text>hiii</Text>}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 15 }}>
                        <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 16, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold' }}>Choose Shipping Address </Text>
                        <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}><View>
                            <Text style={{
                                marginTop: 23, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: '#FFCC00'
                            }} >Create Address</Text>
                        </View></TouchableOpacity>
                    </View>
                    <View
                        style={{
                            justifyContent: "center", alignItems: "center", flexDirection: "row",
                            height: 150, marginHorizontal: 6,
                        }
                        }>
                        <View style={{
                            marginHorizontal: 6,
                            height: 100,
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
                            < >
                                <>
                                    <View style={{ marginHorizontal: 6, flexDirection: 'column', height: 80, width: WIDTH * 0.92, }}>
                                        <View style={{ height: 65, flexDirection: 'row', marginLeft: 15 }}>
                                            <View style={{ width: 25, height: 50, justifyContent: "center" }} >
                                                <TouchableOpacity>
                                                    <Image source={
                                                        require('../assets/checked.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: WIDTH * 0.34, marginLeft: 23, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Inter', fontWeight: "500", marginTop: 10, fontSize: 16 }}>{address.address_type}</Text>
                                                <View style={{ width: WIDTH * 0.67, height: 40 }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#676767', fontFamily: 'Inter', marginTop: 5, fontWeight: '400' }}>{address.house_no} {address.landmark} {address.area_village},  {address.city} {address.pincode}
                                                    </Text>
                                                    {/* <View style={{ borderColor: "gray", borderWidth: 0.5, height: 60, backgroundColor: "gray", right: -100, flexDirection: 'row' }} /> */}
                                                    {/* <TouchableOpacity onPress={() => { props.navigation.navigate('Address', { address, setAddress }) }}
                                                        disabled={Selectcoupons == null ? false : true}
                                                        style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                                                        <View style={{ marginRight: 30, width: 25, height: 25, justifyContent: "flex-end", alignItems: 'center', right: 12, borderRadius: 25 / 2, backgroundColor: 'red' }}>
                                                            <Image
                                                                style={{
                                                                    width: 10,
                                                                    height: 18, alignSelf: 'center',
                                                                }}
                                                                source={require('../assets/arrowPointToRight.png')}
                                                            />
                                                        </View>
                                                    </TouchableOpacity> */}
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
                                        style={{ height: 60, width: 40, marginTop: 14 }}>

                                        <View style={{ width: 25, height: 25, justifyContent: "flex-end", alignItems: 'flex-end', right: 60, borderRadius: 25 / 2, position: 'absolute' }}>
                                            <Image
                                                style={{
                                                    width: 10,
                                                    height: 18,
                                                }}
                                                source={require('../assets/arrowPointToRight.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </>

                            </>

                        </View>


                    </View>

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


                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', width: WIDTH * 0.85, marginLeft: 10, height: 60 }}>
                            {
                                Selectcoupons == null ?
                                    <>
                                        <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2, marginTop: 20 }}>
                                            <Image
                                                style={{
                                                    width: 25,
                                                    height: 25, alignSelf: 'center'
                                                }}


                                                source={require('../assets/discount.png')}
                                            />
                                        </View>
                                        <View style={{
                                            flexDirection: 'column', justifyContent: 'center',
                                            alignItems: "center", marginTop: 10
                                        }}>
                                            < View style={{ justifyContent: "flex-start", alignItems: 'flex-start', }}>
                                                <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', marginTop: 14, right: 35 }}>Apply Coupon</Text>
                                            </View>
                                        </View>
                                        <View style={{

                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            width: 40,

                                        }}>
                                        </View>
                                        <TouchableOpacity onPress={() => { gotoApplyCoupon() }}
                                            disabled={Selectcoupons == null ? false : true}
                                            style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                                            <View style={{ marginRight: 30, width: 25, height: 25, justifyContent: "flex-end", alignItems: 'center', borderRadius: 25 / 2, marginTop: 5, position: 'absolute', left: 30 }}>
                                                <Image
                                                    style={{
                                                        width: 10,
                                                        height: 18, alignSelf: 'center',
                                                    }}
                                                    source={require('../assets/arrowPointToRight.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <><TouchableOpacity onPress={() => { }}
                                        style={{ position: "absolute", width: 31, height: 30, right: 20, top: 7 }}
                                    >
                                    </TouchableOpacity>
                                        <View style={{ right: -12, }}>
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


                                        </View></>
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
                            onChangeText={(text) => (setoptComment(text), console.log('selected_Coupon::::', Selectcoupons))}


                        />
                    </View>
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
                        <View style={{
                            marginTop: 70, height: 30, flexDirection: 'row', marginLeft: 75, marginRight: 70, shadowColor: '#efe8c7', backgroundColor: '#fffcee',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2, width: WIDTH * 0.86
                        }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Subtotal  </Text>
                            </View>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', left: -29 }}>${subtotal}</Text>
                        </View>
                        <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Tax  :</Text>
                            </View>
                            <View style={{ flex: 1 }}>


                                <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>${tax}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Shipping  :</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>${shippingcost}</Text>
                            </View>
                        </View>
                        {
                            Selectcoupons == null ?
                                <>
                                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Coupon  :</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>0</Text>
                                        </View>
                                    </View>
                                </> : <>
                                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#FFCC00' }}>{Selectcoupons?.name}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>- $ {Selectcoupons?.discount}</Text>
                                        </View>
                                    </View>
                                </>}


                        <View style={{
                            backgroundColor: '#fffcee',
                            height: 40,
                            // marginTop: 20,
                            shadowColor: '#efe8c7',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            elevation: 2,
                            marginBottom: 20, justifyContent: "center", alignItems: 'center'
                        }}>
                            <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total Price  :</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {
                                        Selectcoupons == null ? <>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>${ammont}</Text></> : <><Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>{`${parseInt(total) - parseInt(Selectcoupons?.discount)}`}</Text></>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 40 }}>
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
                                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 45, marginHorizontal: 20, marginTop: 30 }}>
                                                <TouchableOpacity
                                                    onPress={() => { gotocurrentpage() }} >
                                                    <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>
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
        width: '98%', marginTop: 30, borderRadius: 10, marginHorizontal: 20,
        flexDirection: 'row',
        height: 50,
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