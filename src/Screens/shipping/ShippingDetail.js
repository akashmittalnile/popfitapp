import React, { useState, useEffect } from 'react'
//import { StyleSheet } from 'react-native';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import * as yup from 'yup'
import { Formik } from 'formik'
import Headers from '../../Routes/Headers';
import Address from './Address';

// let unsubscribe;
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row'];


const ShippingDetail = (props) => {

    const [producttoken, setproducttoken] = useState("");
    const [useraddress, setuseraddress] = useState([]);
    const [type, setType] = useState('');
    const [pin, setPin] = useState('');
    const [productdata, setproductdata] = useState([]);

    const [selectedcoupn, setSelectedcoupon] = useState("");
    const [coupondata, setCoupondata] = useState([]);
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
    const validate = () => {
        if (area_village == '') {
            alert('please enter email');
            return false
        }


        else {
            //  return true
        }
    }


    const pass = () => {

        // input validation
        if (landmark == '') {
            alert('please enter password')
            return false;
        }

        else {
            //landmark(true)

        }
    }
    const buttonClickedHandler1 = () => {
        props.navigation.goBack();
    }
    const gotocurrentpage = async (values) => {

        if (landmark && area_village) {
            validate();
            pass();
            setShippingAddressPopUp(false);
            try {
                //axios.post(`${baseUrl}/login`,
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
                    })
                    .then(function (response) {
                        console.log('res----->', response.data)
                        // if (response.data.status) {
                        //     const jsonValue = JSON.stringify(response.data.id);
                        //     const json = JSON.stringify(response.data.shiftTime);
                        //     AsyncStorage.setItem(
                        //         '@id', jsonValue
                        //     );


                        //     AsyncStorage.setItem(
                        //         '@time', json
                        //     );
                        //     // AsyncStorage.setItem(
                        //     //     '@id', jsonValue
                        //     // );
                        //     navigation.navigate(navigationStrings.HOME)
                        //     setIsSignIn(true);
                        // } else {
                        //     console.log(error)
                        //     //alert(response.data.msg)
                        // }
                    })
                    .catch(function (error) {
                        alert("Please enter valid email or password")
                        console.log(error)

                    })
            } catch (error) {
                alert("An error has occurred");
                console.log({ ...error })

            }
        }
        else {
            alert("Please enter both fields")
        }


        // const onChangePasswordHandler = landmark => {
        //     setlandmark(landmark);
        // };
        // const onChangeEmailHandler = email => {
        //     setEmail(email);
        // };






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
        let result = useraddress.map(a => a.address_type)
        setType(result[0]);
        let re = useraddress.map(a => a.pincode)
        setPin(re[0])
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
            console.log("Response _Address-GET  my add-------------->>>>>>::::", response.data.address_lists);


            // console.log("User_token_not_received+yet!!!>>>", response.data.message);

            // setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            // setIsLoading(false)
        }

    };
    const addAddresss = async () => {

        // console.log(".....usertoken.....GetShippingProducts...", producttoken);

        // setIsLoading(true)


    };
    const ProductRemovecart = async (productdata) => {
        const cartaddid = productdata.cart_id.cart_id;
        //   console.log("Remove_productin shippingpage.....", cartaddid);
        // setIsLoading(true);
        try {
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM} `, { "cart_id": cartaddid });
            //console.log(":::::::::ProductRemovecart_Response>>>", response.data.data);
            // console.log("status _ProductRemovecart:", response.data.status);
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
            const response = await axios.get(`${API.COUPON_LIST} `);
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
            const response = await axios.post(`${API.COUPON_REMOVE} `, { "cart_id": 1, "coupon_id": Selectcoupons.id });
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 15 }}>
                    <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 16, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold' }}>Choose Shipping Address </Text>
                    <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}><View>
                        <Text style={{
                            marginTop: 23, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: '#FFCC00'
                        }} >Create Address</Text></View></TouchableOpacity>
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

                        <TouchableOpacity onPress={() => { props.navigation.navigate('Address') }}>
                            {
                                useraddress.map((y, index) => {
                                    if (index == 0) {
                                        return (
                                            <>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <View style={{ height: 30, flexDirection: 'row', marginLeft: 15 }}>
                                                        <View style={{ width: 25, height: 50, justifyContent: "center", alignItems: 'center', marginTop: 15, left: 6 }} >
                                                            <TouchableOpacity onPress={() => {

                                                            }}>

                                                                <Image source={


                                                                    require('../assets/checked.png')}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', fontFamily: 'Inter', fontWeight: "500", marginTop: 10, left: 20, fontSize: 16 }}>{y.address_type}</Text>
                                                        </View>

                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ marginHorizontal: 10, textAlign: 'left', fontSize: 14, color: '#676767', fontFamily: 'Inter', marginTop: 5, marginLeft: 65, marginRight: 40, fontWeight: '400' }}>{y.house_no} {y.landmark} {y.area_village},  {y.city} {y.pincode}
                                                    </Text>
                                                    <View style={{ borderColor: "gray", borderWidth: 0.5, height: 60, backgroundColor: "gray", right: -100, flexDirection: 'row' }} />

                                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Address') }}
                                                        disabled={Selectcoupons == null ? false : true}
                                                        style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                                                        <View style={{ marginRight: 30, width: 25, height: 25, justifyContent: "flex-end", alignItems: 'center', right: 12, borderRadius: 25 / 2 }}>
                                                            <Image
                                                                style={{
                                                                    width: 10,
                                                                    height: 18, alignSelf: 'center',
                                                                }}
                                                                source={require('../assets/arrowPointToRight.png')}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                            </>
                                        );
                                    }
                                })}
                            {/* <Text style={{ marginTop: -5, marginHorizontal: 10, textAlign: 'center', fontSize: 17, color: '#000000', fontFamily: 'Raleway-Light', }}>Select a delivery address
                            </Text> */}
                        </TouchableOpacity>

                    </View>


                    {/* <View style={{
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
                    </View> */}
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
                {/* <View
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
                                        <View style={{}}>
                                            <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>{Selectcoupons?.name}</Text>

                                        </View></>
                            }

                        </View>



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
                </View> */}



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
                    {/* <View style={{

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

                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', width: WIDTH * 0.85, marginLeft: 10, height: 60 }}>

                        {/* <View style={{
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: "center", marginTop: 10
                        }}>
                            < View style={{ justifyContent: "flex-start", alignItems: 'flex-start', }}>
                                <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', }}>Apply Coupon</Text>
                            </View>
                        </View> */}
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

                                        {/* <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2 }}>
                                            <Image
                                                style={{
                                                    width: 25,
                                                    height: 25, alignSelf: 'center'
                                                }}


                                                source={require('../assets/discount.png')}
                                            />
                                        </View> */}

                                    </View>
                                    <TouchableOpacity onPress={() => { gotoApplyCoupon() }}
                                        disabled={Selectcoupons == null ? false : true}
                                        style={{ height: 60, justifyContent: "flex-start", width: 40, marginTop: 14 }}>

                                        <View style={{ marginRight: 30, width: 25, height: 25, justifyContent: "flex-end", alignItems: 'center', borderRadius: 25 / 2, marginTop: 5 }}>
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
                                    <View style={{ right: -12 }}>
                                        <Text style={{ textAlign: 'left', fontSize: 19, color: 'black', fontWeight: 'bold' }}>Used Cupon</Text>
                                        <View style={{ justifyContent: 'space-between', width: WIDTH * 0.65, flex: 1, flexDirection: 'row' }}>
                                            <View >
                                                <Text style={{ textAlign: 'left', fontSize: 15, color: '#FFCC00', marginTop: 10 }}>{Selectcoupons?.name}</Text></View>
                                            <View style={{ right: 12 }}>
                                                <Text style={{ textAlign: 'left', fontSize: 15, color: 'black', marginTop: 10 }}>- $ {Selectcoupons?.discount}</Text></View>
                                        </View>


                                    </View></>
                        }

                    </View>



                    {/* <TouchableOpacity onPress={() => { gotoApplyCoupon() }}
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
                    </TouchableOpacity> */}

                    {/* </View> */}
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



                        {
                            productdata.map((y, index) => {

                                return (
                                    <>

                                        <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>${y.total_price}</Text>

                                    </>
                                );

                            })}






                    </View>

                    <View style={{ marginTop: 6, height: 30, flexDirection: 'row', marginLeft: 25 }}>
                        <View style={{ flex: 1 }}>

                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Tax  :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                productdata.map((y, index) => {

                                    return (
                                        <>

                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>{y.tax}</Text>

                                        </>
                                    );

                                })}

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
                            {
                                productdata.map((y, index) => {

                                    return (
                                        <>

                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>${y.total_price}</Text>

                                        </>
                                    );

                                })}

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
            </ScrollView>
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