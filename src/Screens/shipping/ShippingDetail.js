import React, { useState, useEffect } from 'react'
//import { StyleSheet } from 'react-native';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions, ActivityIndicator, KeyboardAvoidingView, Platform,ScrollView,RefreshControl } from 'react-native'

// import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

// let unsubscribe;
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row'];


const ShippingDetail = (props) => {
    const { t } = useTranslation();
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
    const [currenysymbol, setCurrenysymbol] = useState('');
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
    // const [checked, setChecked] = React.useState('first');
    const [isSecureEntry, setisSecureEntry] = useState('false')
    const [priorityChecked, setPriorityChecked] = useState('');

    const [shippingcost, setshipping_cost] = useState('');
    const [arrayordername, setArrayordername] = useState('')
    
  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    GetShippingProducts();
    setrefreshing(false)
  }
    // console.log("arrayordername", arrayordername);
    useEffect(() => {
        GetShippingProducts();
        // const unsubscribe = props.navigation.addListener('focus', () => {

        //     GetShippingProducts();
        // });
        // return unsubscribe;
}, []);
    const validate = () => {
        if (pincode == '') {
            alert('please enter piccode')
        }
        // else if (pincode.length < 0 || pincode.length > 10) {
        //     alert("Zipcode should be min 4 characters");

        //     return false;
        // } else {
        //     //  setPassword(true)

        // }
    }


    const pass = () => {

        // input validation
        if (phone == '') {
            alert('please enter phone no.')
        }
        if (phone.length < 0 || phone.length > 10) {
            alert("Phone no. should be min 10 char and max 16 char");

            return false;
        } else {
            //  setPassword(true)

        }
    }

    const gotocurrentpage = async (e) => {
        // console.log("ADDRESS-TYPE::", address_type);
        const usertkn = await AsyncStorage.getItem("authToken");
        if (area_village && address_type && city && full_name && house_no && phone && pincode && state) {
            validate();
            pass();
            setShippingAddressPopUp(false);
            setIsLoading(true)
            try {
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
                        GetShippingProducts();
                        console.log('res----->', response)
                    })
                    .catch(function (error) {
                        Alert.alert("", t('Check_internet_connection'))
                        // alert("gotocurrentpage...error", error)
                        console.log("select-address::::::", error)

                    })
            } catch (error) {
                console.log("add-address", error)
                Alert.alert("", t('Check_internet_connection'))
            } setIsLoading(false)
        }
        else {
            alert("All the fields are required!")
        } setIsLoading(false)
    }



    // let selected_address = setselectaddress?.address_type + "," + setselectaddress?.house_no + "," + setselectaddress?.area_village + "," + setselectaddress?.city + "," + setselectaddress?.landmark + "," + setselectaddress?.pincode

    // let Default_address =  address?.address_type + "," + address?.house_no + "," + address?.area_village + "," + address?.city + "," + address?.landmark + "," + address?.pincode


    const gotoCardPayment = () => {

        // console.log(",,as,f,asfa,f,a,fa,,fa,f,:", setselectaddress);
        // console.log("Selected address:", address);
        if (setselectaddress || address != undefined) {
            props.navigation.navigate("PaymentScreen", {
                Instruction: optComment,
                Coupomid:Selectcoupons?.id,
                Orderlistname: arrayordername,
                Totalprice: Selectcoupons == null ? ammont : total,
                SetAddrs: setselectaddress == null ?

                    (address?.address_type + "," + address?.full_name + "," + address?.house_no + "," + address?.area_village + "," + address?.city + "," + address?.landmark + "," + address?.state + "," + address?.pincode + "," + address?.phone)
                    :
                    (setselectaddress?.address_type + "," + setselectaddress?.full_name + "," + setselectaddress?.house_no + "," + setselectaddress?.area_village + "," + setselectaddress?.city + "," + setselectaddress?.landmark + "," + setselectaddress?.state + "," + setselectaddress?.pincode + "," + setselectaddress?.phone)
            })

        } else {

            Alert.alert("", t('Choose_Shipping_Address'))
        }

    }
    const gotoApplyCoupon = () => {
        props.navigation.navigate("ApplyCoupon", {
            Orderamount: ammont
        });
    }
    const gotoProductDetailsview = (item) => {
        props.navigation.navigate("ProductDetail", {
            Isshippingview: item
        });
    }
    const CouponDelete= async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
       
        console.warn('Coupon_id---REmove------->', Selectcoupons.id)
        setIsLoading(true);
        try {

            const response = await axios.post(`${API.COUPON_REMOVE} `, { "coupon_id": Selectcoupons.id  }, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            console.log("response_remove couon",response.data);
            gotoApplyCoupon()

        }
        catch (error) {
            console.log("couponRemovecart.....error.........", error.response.data.message);
            Alert.alert("remove coupon", t('Check_internet_connection'))

        }
        setIsLoading(false);
    };
    // const gotoCoupon = async () => {
    // const user = await AsyncStorage.getItem("item");
    //  console.log('999999999999999999999999999------------');
    // console.log('item-gotoCoupon-------&&&&&&&&&&>', user);
    // setuser(setselectaddress);
    // var a = JSON.parse(user)
    //  setSelectcoupons(a);
    // }

    // console.log("Selectcoupon_item...............:", props?.route?.params?.Selectcoupon);
    // console.log("Selectcoupon_item...............:", props?.route?.params?.coupon_id);
    // let coupon_id = props?.route?.params?.coupon_id
    //console.warn("Selectcoupon_item...............:", address);
    let Selectcoupons = props?.route?.params?.Selectcoupon
    // console.log("Selectaddress_item.FRom Address..:", props?.route?.params?.setselectaddress);
    let setselectaddress = props?.route?.params?.setselectaddress

    // console.log("...........", Selectcoupons);

    // const checklogin = async () => {
    //     let Usertoken = await AsyncStorage.getItem("authToken");
    //     setproducttoken(Usertoken);

    //     if (Usertoken == null) {
    //         props.navigation.navigate('LoginMain', {
    //             screen: 'LoginSignUp',
    //         });

    //     }
    //     else {

    //     }
    // }
    const GetShippingProducts = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {

            const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            // console.log("shipping::", response.data);
            if (response.data.status == '1') {


                let ordernamelength = response.data.data.length
                var arraylist = []

                for (let i = 1; i <= ordernamelength; i++) {
                    arraylist.push(response.data.data[i - 1].product_name)
                }
                console.log("arraylist", arraylist);
                setArrayordername(arraylist.toString())

                setCurrenysymbol(response.data.currency)
                var address0 = response.data.address_lists[0];
                // console.log('adreeesss----------->', address)
                setuseraddress(response.data.address_lists);
                setAddress(address0);
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
            Alert.alert("", t('Check_internet_connection'))


        }
        setIsLoading(false);
    };

    const ProductRemovecart = async (item) => {
        const usertkn = await AsyncStorage.getItem("authToken");
        const cartremoveid = item.cart_id;
        // console.warn('item---------->', item)
        setIsLoading(true);
        try {

            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM} `, { "cart_id": cartremoveid }, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            GetShippingProducts();

        }
        catch (error) {
            // console.log(".ProductRemovecart.....error.........", error.response.data.message);
            Alert.alert("", t('Check_internet_connection'))

        }
        setIsLoading(false);
    };

    const onChangeLandmarkHandler = landmark => {
        setlandmark(landmark);
    };
    const onChangeAreaHandler = area_village => {
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
                (<ScrollView style={{ paddingTop: 10 }}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                >

                    {/* product flatlist   */}
                    {productdata.length > 0 ?
                        productdata.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { gotoProductDetailsview(item) }}>
                                    <View key={String(index)} style={{
                                        marginHorizontal: 10,
                                        marginTop: 6,
                                        height: 140,
                                        width: WIDTH * 0.94,
                                        borderRadius: 20,
                                        marginBottom: 10,
                                        backgroundColor: 'white',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        borderColor: "#FFFFFF",
                                        shadowColor: '#000000',
                                        // shadowOffset: {
                                        //     width: 0,
                                        //     height: 3
                                        // },
                                        shadowRadius: 6,
                                        shadowOpacity: 0.3,
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
                                                    source={{ uri: item?.product_image != "" ? `${item?.product_image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
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
                                                    {item?.product_name?.length >=20 ? item?.product_name?.slice(0, 20)+' ...' : item?.product_name?.slice(0, 20)}
                                                </Text>
                                                <View style={{ width: WIDTH * 0.4, alignItems: "flex-start", justifyContent: "flex-start", marginTop: 6 }}>
                                                    <View>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Price')}: <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', }}>{item?.product_price}
                                                        </Text></Text>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Quantity')}: <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', }}>
                                                            {item?.qty}
                                                        </Text></Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>
                                    </View>

                                </TouchableOpacity>
                            )
                        })

                        : null}

                    {/* Choose Shipping Address */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 12, marginRight: 15, marginTop: 8, }}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: '#000000', fontWeight: '500' }}>{t('Choose_Shipping_Address')}</Text>
                        <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}><View>
                            <Text style={{
                                fontWeight: '400', fontSize: 13, color: '#FFCC00',marginTop:2
                            }} >{t('Create_Address')}</Text>
                        </View></TouchableOpacity>
                    </View>

                    {/* address Box */}

                    <View style={{
                        marginHorizontal: 10,
                        height: 110,
                        width: WIDTH * 0.95,
                        backgroundColor: 'white',
                        // backgroundColor: "pink",
                        marginTop: 14,
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
                            <View style={{ height: 105, width: WIDTH * 0.95, borderRadius: 20, }}>
                                <View
                                    style={{ height: 85, flexDirection: 'row', marginLeft: 15 }}
                                >

                                    {
                                        setselectaddress == null ?
                                            <>
                                                {
                                                    address != null ?
                                                        (<View style={{ height: 105, width: WIDTH * 0.90, borderRadius: 20, paddingTop: 4 }}>
                                                            <View style={{ width: WIDTH * 0.67, marginLeft: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                                <Text style={{ color: '#000000', fontWeight: "500", fontSize: 16, textAlign: 'left' }}>{address?.address_type}</Text>
                                                                <View style={{ width: WIDTH * 0.67, height: 50, marginTop: 5 }}>
                                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>{address?.full_name}, {address?.house_no}, {address?.area_village}, {address?.city},{address?.landmark}, {address?.state}, {address?.pincode}
                                                                    </Text>
                                                                    <Text style={{ marginTop: 5, textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>
                                                                        {address?.phone}
                                                                    </Text>
                                                                </View>

                                                            </View>
                                                            <TouchableOpacity onPress={() => { props.navigation.navigate('Address', { address, setAddress }) }}
                                                                disabled={Selectcoupons == null ? false : true}
                                                                style={{ height: 100, width: 60, justifyContent: "center", alignItems: 'center', right: 0, borderRadius: 25 / 2, position: 'absolute', }}>

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
                                                        </View>
                                                        )
                                                        : <View style={{ justifyContent: "center", alignItems: "center", height: 100, }}>
                                                            <Text style={{ fontSize: 15, textAlign: "center", color: "#455A64", fontWeight: "500" }}>{t('Add_new_address')}</Text>
                                                        </View>
                                                }
                                            </>
                                            :
                                            (<View style={{ height: 105, width: WIDTH * 0.90, borderRadius: 20, paddingTop: 4 }}>
                                                <View style={{ width: WIDTH * 0.67, marginLeft: 10, justifyContent: 'center', alignItems: 'flex-start', }}>

                                                    <Text style={{ color: '#000000', fontWeight: "500", fontSize: 16, textAlign: 'left' }}>{setselectaddress?.address_type}</Text>
                                                    <View style={{ width: WIDTH * 0.67, height: 40, marginTop: 5 }}>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>{setselectaddress?.full_name}, {setselectaddress?.house_no}, {setselectaddress?.area_village}, {setselectaddress?.city}, {setselectaddress?.landmark}, {setselectaddress?.state}, {setselectaddress?.pincode}
                                                        </Text>
                                                        <Text style={{ marginTop: 5, textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>
                                                            {setselectaddress?.phone}
                                                        </Text>
                                                    </View>

                                                </View>
                                                <TouchableOpacity onPress={() => { props.navigation.navigate('Address', { address, setAddress }) }}
                                                    disabled={Selectcoupons == null ? false : true}
                                                    style={{ height: 100, width: 60, justifyContent: "center", alignItems: 'center', right: 0, borderRadius: 25 / 2, position: 'absolute', }}>

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

                                            </View>
                                            )

                                    }

                                </View>

                            </View>


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
                                            <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: "500" }}>{t('Apply_Coupon')}</Text>
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
                                            <Text style={{ textAlign: 'left', fontSize: 13, color: '#676767', fontWeight: "500" }}>- {currenysymbol}{Selectcoupons?.discount}</Text>
                                        </View>
                                        <View style={{ paddingVertical: 20, justifyContent: "center", alignItems: 'center', height: 80, width: WIDTH * 0.2, }}>
                                            <TouchableOpacity
                                                onPress={() => { CouponDelete() }}
                                                style={{ justifyContent: "center", alignItems: 'center', width: WIDTH * 0.15, height: 25, borderRadius: 50 }}>

                                                <Text style={{ textAlign: 'left', fontSize: 13, color: '#FFCC00' }}>{t('Change')}</Text>

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
                        height: "auto",
                        width: WIDTH * 0.95,
                        marginHorizontal: 10,
                        marginTop: 10,
                        marginHorizontal: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        elevation: 3,
                        borderRadius: 15,
                        marginBottom: 20,
                        justifyContent: "center",
                        paddingVertical: 10
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
                            placeholder={t('Add_Delivery_Instruction')}
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
                        marginTop: 4,
                        shadowColor: '#efe8c7',
                        // shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        elevation: 6,
                        marginBottom: 20, justifyContent: "flex-start", alignItems: 'flex-start'
                    }}>
                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Subtotal')}:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>{subtotal}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Tax')}:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>{tax}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                            <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Shipping_charges')}:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 50, fontWeight: "500" }}>{shippingcost}</Text>
                            </View>
                        </View>
                        {
                            Selectcoupons == null ?
                                <>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', marginLeft: 15, width: WIDTH * 0.9 }}>
                                        <View style={{ width: WIDTH * 0.9, height: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Coupon')}:</Text>
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
                                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 60, fontWeight: "500" }}>- {currenysymbol}{Selectcoupons?.discount}</Text>
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
                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>{t('Total_Amount')}:</Text>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                                {
                                    Selectcoupons == null ? <>
                                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 54, fontWeight: "500" }}>{ammont}</Text></>
                                        :
                                        <><Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 54, fontWeight: "500" }}>{total}</Text></>
                                }
                            </View>
                        </View>
                    </View>

                    {/* footer button   */}

                    <TouchableOpacity onPress={() => { gotoCardPayment() }}
                        style={{ justifyContent: "center", marginBottom: 30, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 20, marginHorizontal: 110 }}
                    >
                        <View style={{ justifyContent: 'center', flex: 1, backgroundColor: '#ffcc00', borderRadius: 50, width: 160, alignItems: "center" }}>
                            <Text style={{ textAlign: 'center', fontSize: 13, color: 'white', }}>{t('Proceed_to_Pay')}</Text>
                        </View>
                        {/* <View style={{justifyContent:"flex-end",alignItems:"flex-end" ,    }}>
                                {
                                    Selectcoupons == null ? <>
                                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 53, fontWeight: "500" }}>${ammont}</Text></>
                                        :
                                        <><Text style={{ textAlign: 'center', fontSize: 14, color: '#77869E', right: 53, fontWeight: "500" }}>${total}</Text></>
                                }
                            </View> */}
                    </TouchableOpacity>



                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={ShippingAddressPopUp}
                        onRequestClose={() => {
                            setShippingAddressPopUp(false);
                        }}>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View
                                style={{
                                    flex: 1,
                                    // justifyContent: 'flex-end',
                                    // alignItems: 'center',
                                    backgroundColor: 'rgba(140, 141, 142, 0.7)'

                                }}>

                                <ScrollView nestedScrollEnabled={true}>

                                    <View
                                        style={{
                                            //margin: 10,
                                            width: "100%",
                                            height: HEIGHT * 0.99,
                                            // backgroundColor: 'red',
                                            // backgroundColor: '#FFFFFF',
                                            borderRadius: 20,

                                            // marginTop: 62,
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            // shadowColor: '#000',
                                            // shadowOffset: {
                                            //     width: 0,
                                            //     height: 2,
                                            // },
                                            // shadowOpacity: 0.25,
                                            // shadowRadius: 4,
                                            // elevation: 6,

                                        }}>

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            // height: 670,
                                            height: "auto",
                                            width: WIDTH * 0.99,
                                            // paddingTop: 20,
                                            // padding: 10,
                                            // marginHorizontal: 10,
                                            // justifyContent: "center",
                                            marginHorizontal: 10,
                                            borderRadius: 20,
                                            //marginBottom: 10,
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}>

                                            <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                                <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 20, color: '#000000', fontWeight: '500' }}>{t('Add_Address')}</Text>


                                            </View>
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
                                            <TextInput style={styles.textInput}
                                                placeholder={t('Full_Name')}
                                                placeholderTextColor="#8F93A0"
                                                label="full_name"
                                                value={full_name}
                                                onChangeText={e => onChangeNameHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('Phone_number_Required')}
                                                placeholderTextColor="#8F93A0"
                                                maxLength={12}
                                                label="phone"
                                                value={phone}
                                                onChangeText={e => onChangePhoneHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('Zip_code_Required')}
                                                placeholderTextColor="#8F93A0"
                                                label="pincode"

                                                maxLength={9}
                                                value={pincode}
                                                onChangeText={e => onChangePinHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('State_Required')}
                                                placeholderTextColor="#8F93A0"
                                                label="state"
                                                value={state}
                                                onChangeText={e => onChangeStateHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('City_Required')}
                                                placeholderTextColor="#8F93A0"
                                                label="ity"
                                                value={city}
                                                onChangeText={e => onChangeCityHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('House_number_Required')}
                                                placeholderTextColor="#8F93A0"
                                                label="house_no"
                                                value={house_no}
                                                onChangeText={e => onChangeHouseHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('Road_nameArea_Colony')}
                                                placeholderTextColor="#8F93A0"
                                                label="area_village"
                                                value={area_village}
                                                onChangeText={e => onChangeAreaHandler(e)}
                                            />
                                            <TextInput style={styles.textInput}
                                                placeholder={t('Landmark_optional')}
                                                placeholderTextColor="#8F93A0"
                                                label="landmark"
                                                value={landmark}
                                                onChangeText={e => onChangeLandmarkHandler(e)}
                                            />
                                            {/* <TextInput style={styles.textInput}
                                                    placeholder='Type of address'
                                                    placeholderTextColor="#8F93A0"
                                                    label="address_type"
                                                    value={address_type}
                                                    onChangeText={e => onChangeAddressHandler(e)}
                                                /> */}
                                            <View style={{ height: 45, width: "98%", marginTop: 14, alignItems: 'flex-start', justifyContent: "flex-start", marginLeft: 10 }}>

                                                <Text style={{ color: 'black', textAlign: "left", fontSize: 16, fontWeight: "400" }}>{t("Address_Type")}</Text>

                                                <View style={{ height: 45, width: "90%", marginTop: 5, alignItems: 'center', justifyContent: "flex-start", flexDirection: "row" }}>

                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            justifyContent: 'center',
                                                            flexDirection: 'row',
                                                            height: 40,
                                                        }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                (isSecureEntry => !isSecureEntry);
                                                                onChangeAddressHandler("Home")
                                                            }}>

                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    alignItems: 'center',
                                                                }}>
                                                                <Image
                                                                    source={address_type === 'Home' ? require('../assets/checked.png') : require('../assets/unchecked.png')}
                                                                    style={{
                                                                        width: 25,
                                                                        height: 25,
                                                                        alignSelf: 'center',
                                                                        marginRight: 10,
                                                                    }}
                                                                />

                                                                <Text
                                                                    style={{
                                                                        fontWeight: "500",
                                                                        textAlign: 'left',
                                                                        fontSize: 11,
                                                                        color: "black"

                                                                    }}>
                                                                    {t('Home')}
                                                                </Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 30,
                                                            justifyContent: 'center',
                                                            flexDirection: 'row',
                                                            height: 40,
                                                        }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                (isSecureEntry => !isSecureEntry);
                                                                onChangeAddressHandler("Work")
                                                            }}>

                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-start',
                                                                    alignItems: 'center',
                                                                }}>
                                                                <Image
                                                                    source={address_type === 'Work' ? require('../assets/checked.png') : require('../assets/unchecked.png')}
                                                                    style={{
                                                                        width: 25,
                                                                        height: 25,
                                                                        alignSelf: 'center',
                                                                        marginRight: 10,
                                                                    }}
                                                                />

                                                                <Text
                                                                    style={{
                                                                        fontWeight: "500",
                                                                        textAlign: 'left',
                                                                        fontSize: 11,
                                                                        color: "black"

                                                                    }}>
                                                                    {t('Work')}
                                                                </Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                    </View>
                                                    {/* <TouchableOpacity
                                                            style={{ width: "50%", flexDirection: "row", alignItems: 'center', justifyContent: "c" }}
                                                            onPress={(e) => { onChangeAddressHandler(e) }}>
                                                                
                                                                <RadioButton.IOS
                                                                value="Home"
                                                                underlayColor='#FA4616'
                                                                status={address_type === 'Home' ? 'checked' : 'unchecked'}
                                                                onPress={() => {
                                                                    onChangeAddressHandler("Home");
                                                                     
                                                                }}
                                                                color= "#ffcc00" 
                                                            />
                                                              
                                                           <Text style={{ fontSize: 12, }}>Home</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{ width: "50%", flexDirection: "row", alignItems: 'center', justifyContent: "flex-start" }}
                                                            onPress={(e) => { onChangeAddressHandler(e) }}>
                                                            <RadioButton.IOS
                                                            underlayColor='#FA4616'
                                                                value="Work"
                                                                status={address_type === 'Work' ? 'checked' : 'unchecked'}
                                                                onPress={() => {
                                                                    onChangeAddressHandler("Work");
                                                                     
                                                                }}
                                                                color="#ffcc00"
                                                            />
                                                            <Text style={styles.priorityText}>Work</Text>
                                                        </TouchableOpacity> */}
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 60 }}>
                                                <TouchableOpacity
                                                    onPress={() => { gotocurrentpage() }} >
                                                    <View style={{ justifyContent: 'center', width: 110, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                                                        <Text style={styles.text}>{t('Save')}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>

                </ScrollView>)
                :
                (<CustomLoader showLoader={isLoading} />)}
        </SafeAreaView >
    )
};
export default ShippingDetail;


const styles = StyleSheet.create({
    textInput: {
        width: '98%', marginTop: 14, borderRadius: 10, marginHorizontal: 20, paddingLeft: 15,
        flexDirection: 'row',
        height: 45,
        shadowColor: '#11032586',
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: "#D7D7D7",
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: "center", color: 'black',
        fontWeight: '400',
        fontSize: 14,
    },
    text: { textAlign: 'center', fontSize: 13, color: 'white', fontWeight: '500' }
})

