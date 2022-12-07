import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions, ActivityIndicator,KeyboardAvoidingView,Platform } from 'react-native'
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
import CustomLoader from '../../Routes/CustomLoader';

// let unsubscribe;
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row'];


const Address = (props) => {
    // const [producttoken, setproducttoken] = useState("");
    const [useraddress, setuseraddress] = useState([]);
    const [isSecureEntry, setisSecureEntry] = useState('false')
    const [checkedItem, setCheckedItem] = useState('')
    const [productdata, setproductdata] = useState([]);
    const [data, setData] = useState(false);
    const [editdata, setEditData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
    // const [justUpdate, setjustUpdate] = useState(false);
    // const [type, setType] = useState('');

    // console.log('type&&&&&&&&', type);

    const validate = () => {
       
        if (pincode == '') {
            alert('please enter piccode')
        }
        // else if (pincode.length < 4 || pincode.length > 10) {
        //     alert("Zipcode should be min 4 characters");
          
        //     return false;
        // } else {
        //     //  setPassword(true)

        // }
    }
    const pass = () => {

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
    const aa = (item) => {

        // console.log('aa_function$$$$$$item$$$4', item)
        setarea_village(item.area_village);
        setlandmark(item.landmark);
        setaddress_type(item.address_type);
        setCity(item.city);
        setfull_name(item.full_name);
        sethouse_no(item.house_no);
        setphone(item.phone);
        setpincode(item.pincode);
        setstate(item.state);
        setData(true);
        setEditData(item)
        setTimeout(() => {
            setShippingAddressPopUp(true)
        }, 2000);

    }
    // const buttonClickedHandler1 = () => {
    //     props.navigation.goBack();
    // }
    const clearState = () => {
        setarea_village('');
        setlandmark('');
        setaddress_type('');
        setCity('');
        setfull_name('');
        sethouse_no('');
        setphone('');
        setpincode('');
        setstate('');
    }
    const gotocurrentpage = async (values) => {
       
        const usertkn = await AsyncStorage.getItem("authToken");
        if (area_village && address_type && city && full_name && house_no && phone && pincode && state) {
            validate();
            pass();
            setShippingAddressPopUp(false);
            setIsLoading(true);
            // console.log("res data-------->", data);
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
                        // setIsLoading(false);
                        // console.log('res----->', response.data)
                        GetShippingProducts()
                       
                        setData(false)
                    })
                    .catch(function (error) {
                        // setIsLoading(false)
                        alert("Please enter valid email or password")
                        // console.log(error)

                    })
            } catch (error) {
                // setIsLoading(false)
                Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")

                // console.log("gotocurrentpage_error in address ...", error)

            }
        }
        else {
            validate();
            alert("All the fields are required!")
        } setIsLoading(false)

    }
    // console.log('item check-->>>>>', checkedItem);
    AsyncStorage.setItem("item", JSON.stringify(checkedItem));

    useEffect(() => {
        checklogin();
        let address = props?.route?.params?.address;
        let setaddres = props?.route?.params?.setAddress;

        // gotocurrentpage();
        console.warn('addresss----->', address)
        GetShippingProducts();
    }, []);

    const checklogin = async () => {
        let Usertoken = await AsyncStorage.getItem("authToken");
        // setproducttoken(Usertoken);
        // console.log("token.......", Usertoken);
        if (Usertoken == null) {
            props.navigation.navigate('LoginMain', {
                screen: 'LoginSignUp',
            });
        }
        else {
            // Alert.alert("all ready login current screen address.js")
        }
    }
    const GetShippingProducts = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");

        setIsLoading(true);
        try {
            const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            // console.log("Response_ShippingProducts ::::", response.data);
            setproductdata(response.data.data);
            setuseraddress(response.data.address_lists);
            setCheckedItem(props?.route?.params?.address)
            // setIsLoading(false);
        }
        catch (error) {
            Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
            // console.log("ShippingProductserror::Address_screen:", error.response.data.message);
            // setIsLoading(false);
        }
        setIsLoading(false);
    };


    const ItemRemove = async (item) => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        // console.log('ItemRemove$$$$$$id---->', item.id)
        try {

            const response = await axios.delete(`${API.DELETE_ITEM + '/' + item.id}`, { 'headers': { "Authorization": ` ${usertkn}` } });
            // console.log(":::::::::ItemRemove_Response>>>", response.data);
            if (response.data.status == "1") {
                GetShippingProducts();
                // setIsLoading(false);
            }
            else if (response.data.status == "0") {
                alert("something went wrong");
                // setIsLoading(false);
            }
        }
        catch (error) {
            Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
            // console.log("..ItemRemove....error.........", error.response.data.message);
            // setIsLoading(false);
        }
        setIsLoading(false);
    };
    const ItemUpdate = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        // console.log('edit dtaaaa--------->', editdata)
        setIsLoading(true);
        try {

            const response = await axios.post(`${API.UPDATE_ITEM}`, {
                address_id: editdata.id,
                full_name: full_name,
                phone: phone,
                pincode: pincode,
                state: state,
                city: city,
                address_type: address_type,
                house_no: house_no,
                area_village: area_village,
                landmark: landmark,
            }, { 'headers': { "Authorization": ` ${usertkn}` } });
            // console.log("Response itemupdate", response.data.status);
            setShippingAddressPopUp(false);
            clearState();
            setData(false)
            GetShippingProducts();
            // setIsLoading(false);
        }

        catch (error) {
            Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
            // console.log("..ItemUpdate....error.........", error);
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
                (<>
                    {
                        useraddress.length > 0 ?
                            (<View style={{ flex: 1 }}>
                                <Text style={{ marginLeft: 15, marginTop: 15, textAlign: 'left', fontSize: 18, color: '#000000', fontWeight: "500" }}>Select a Delivery Address</Text>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                        flexDirection: "row",
                                        height: '78%',
                                        marginHorizontal: 10,
                                        marginTop: 10,
                                    }}>
                                    {/* Please Enter Your Shipping Address */}
                                    <ScrollView nestedScrollEnabled={true}>
                                        <FlatList
                                            vertical
                                            data={useraddress}
                                            keyExtractor={(item, index) => String(index)}

                                            renderItem={({ item, index }) => {
                                                // console.warn('checked ----------->', item, props?.route?.params?.address)
                                                return <View style={{
                                                    width: '95%',
                                                    height: 150,
                                                    marginHorizontal: 10,
                                                    // marginLeft: 10,
                                                    // marginRight: 15,
                                                    shadowColor: '#000000',
                                                    // shadowOffset: { width: 0, height: 4 },
                                                    shadowRadius: 6,
                                                    shadowOpacity: 0.2,
                                                    //elevation: 3,
                                                    borderRadius: 20,
                                                    borderColor: "#ffcc00",
                                                    borderWidth: 1,
                                                    // backgroundColor: 'red'
                                                    marginTop: 10,
                                                    marginBottom: 10
                                                }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={{ height: 30, flexDirection: 'row', marginLeft: 15 }}>
                                                            <View style={{ width: 25, height: 50, justifyContent: "center", alignItems: 'center', marginTop: 15, left: 6 }} >
                                                                <TouchableOpacity onPress={() => {
                                                                    (isSecureEntry => !isSecureEntry);
                                                                    props?.route?.params?.setAddress(item)
                                                                    setCheckedItem(item)

                                                                }}>

                                                                    <Image source={
                                                                        checkedItem.id != item.id
                                                                            ? require('../assets/unchecked.png')
                                                                            : require('../assets/checked.png')}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ flex: 1, marginTop: 10, left: 20, }}>
                                                                <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "500", fontSize: 16 }}>{item.address_type}</Text>
                                                            </View>

                                                        </View>
                                                    </View>

                                                    <View style={{ marginHorizontal: 10, marginLeft: 50, width: "80%", right: -9, height: 65, marginTop: 5, paddingVertical: 4 }}>
                                                        <ScrollView>
                                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#676767', fontWeight: '400' }}>{item.full_name}, {item.house_no}, {item.area_village},  {item.city}, {item.landmark}, {item.state}, {item.pincode}, {item.phone}
                                                            </Text>
                                                        </ScrollView>
                                                    </View>


                                                    <View style={{ flexDirection: 'row', left: 30, marginTop: 10, position: "absolute", bottom: 10 }}>

                                                        <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', marginTop: 10, left: 27 }}>
                                                            <TouchableOpacity onPress={() => { aa(item) }}>
                                                                <Image source={require('../assets/Pen.png')}
                                                                />
                                                            </TouchableOpacity>

                                                        </View>



                                                        <View style={{ width: 29, height: 29, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, marginTop: 10, left: 57, }}>
                                                            <TouchableOpacity onPress={() => { ItemRemove(item) }}>
                                                                <Image source={require('../assets/dustbin.png')}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <TouchableOpacity style={{ width: 170, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 20, marginTop: 9, left: 80, backgroundColor: "#FFCC00" }}
                                                            onPress={() => {
                                                                setisSecureEntry(true)
                                                                setCheckedItem(item),
                                                                    props.navigation.navigate("ShippingDetail", {
                                                                        setselectaddress: item
                                                                    })
                                                            }}>
                                                            <View style={{}}>
                                                                {/* <Image source={require('../assets/buttonSave.png')}
                                                    /> */}
                                                                <Text style={{ color: '#FFFFFF', fontWeight: "400", fontSize: 12, textAlign: 'left' }}>Select this Address</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            }
                                            }
                                        /></ScrollView>
                                </View>

                                <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }} style={{ height: 70, backgroundColor: 'white', position: "absolute", bottom: 0 }}>
                                    <View
                                        style={{
                                            // padding:10,
                                            marginHorizontal: 18,
                                            height: 60,
                                            width: "89%",
                                            // backgroundColor:"transparent",
                                            // paddingVertical:6,
                                            backgroundColor: 'white',
                                            borderWidth: 1,
                                            borderColor: '#FFCC00',
                                            borderRadius: 20,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center",

                                            // marginTop:10
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
                                                        height: 35, alignSelf: 'center', left: 27
                                                    }}


                                                    source={require('../assets/MapPin.png')}
                                                />
                                            </View>

                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'flex-start', width: WIDTH * 0.85, marginLeft: 10, height: 60 }}>

                                            <View style={{
                                                flexDirection: 'column', justifyContent: 'center',
                                                alignItems: "center", marginTop: 12
                                            }}>
                                                < View style={{ justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 17, color: 'black', fontWeight: '500', left: 34, marginTop: 5 }}>Add a new address</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>




                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={ShippingAddressPopUp}
                                    onShow={() => {
                                        console.warn('re------>', pincode);
                                    }}
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
                                                backgroundColor: 'rgba(140, 141, 142, 0.7)',
                                            }}>
                                            <ScrollView nestedScrollEnabled={true}>
                                                <View
                                                    style={{
                                                        //margin: 10,
                                                        width: "100%",
                                                        height: HEIGHT * 0.99,
                                                        // backgroundColor: '#FFFFFF',
                                                        borderRadius: 20,
                                                        // marginTop: 111,
                                                        justifyContent: "flex-end",
                                                        alignItems: 'center',
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
                                                        // height: "100%",
                                                        width: WIDTH * 0.99,
                                                        height: "auto",
                                                        // paddingTop: 20,
                                                        // padding: 10,
                                                        marginHorizontal: 10,
                                                        // justifyContent: "center",
                                                        // marginHorizontal: 15,
                                                        borderRadius: 20,
                                                        //marginBottom: 10,
                                                        alignItems: 'center',
                                                        flexDirection: 'column'
                                                    }}>

                                                        <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                                            <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 20, color: '#000000', fontWeight: '500' }}>Add Address</Text>


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
                                                        <TextInput style={styl.textInput}
                                                            placeholder='Full Name(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="Full Name"
                                                            value={full_name}
                                                            onChangeText={e => onChangeNameHandler(e)}
                                                        />
                                                        <TextInput style={styl.textInput}
                                                            placeholder='Phone number(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="phone"
                                                            value={phone}
                                                            onChangeText={e => onChangePhoneHandler(e)}
                                                        />
                                                        <TextInput style={styl.textInput}
                                                            placeholder='Zip code(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="pin code"
                                                            value={pincode.toString()}
                                                            onChangeText={e => onChangePinHandler(e)}
                                                        />
                                                        <TextInput style={styl.textInput}
                                                            placeholder='State(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="State"
                                                            value={state}
                                                            onChangeText={e => onChangeStateHandler(e)}
                                                        />
                                                        <TextInput style={styl.textInput}
                                                            placeholder='City(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="city"
                                                            value={city}
                                                            onChangeText={e => onChangeCityHandler(e)}
                                                        />

                                                        <TextInput style={styl.textInput}
                                                            placeholder='House number(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="house no"
                                                            value={house_no}
                                                            onChangeText={e => onChangeHouseHandler(e)}
                                                        />

                                                        <TextInput style={styl.textInput}
                                                            placeholder='Roard name,Area,Colony(Required)*'
                                                            placeholderTextColor="#8F93A0"
                                                            label="area village"
                                                            value={area_village}
                                                            onChangeText={e => onChangeAreaHandler(e)}
                                                        />
                                                        <TextInput style={styl.textInput}
                                                            placeholder='Landmark(optional)'
                                                            placeholderTextColor="#8F93A0"
                                                            label="landmark"
                                                            value={landmark}
                                                            onChangeText={e => onChangeLandmarkHandler(e)}
                                                        />

                                                        {/* <TextInput style={styl.textInput}
                                                            placeholder='Type of address'
                                                            label="Address type"
                                                            value={address_type}
                                                            onChangeText={e => onChangeAddressHandler(e)}
                                                        /> */}
                                                        <View style={{ height: 45, width: "98%", marginTop: 14, alignItems: 'flex-start', justifyContent: "flex-start", marginLeft: 10 }}>

                                                            <Text style={{ color: 'black', textAlign: "left", fontSize: 16, fontWeight: "400" }}>Address Type</Text>

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
                                                                                Home
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
                                                                                Work
                                                                            </Text>
                                                                        </View>

                                                                    </TouchableOpacity>
                                                                </View>

                                                            </View>
                                                        </View>
                                                        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 38, marginHorizontal: 20, marginTop: 60 }}>
                                                            <TouchableOpacity
                                                                onPress={() => { data == true ? ItemUpdate() : gotocurrentpage() }} >
                                                                <View style={{ justifyContent: 'center', width: 110, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                                                                    <Text style={styl.text}>Save </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </KeyboardAvoidingView>
                                </Modal>

                            </View>)
                            :
                            (<View style={{
                                justifyContent: "center", alignItems: "center", width: WIDTH,
                                height: 200, backgroundColor: "white", flex: 1,
                            }}>
                                <Image resizeMode='contain'
                                    source={require('../assets/Nodatafound.png')}
                                    style={{
                                        width: 200,
                                        height: 120, alignSelf: 'center'
                                    }} />
                                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>Oops! No data found</Text>
                            </View>)}
                </>)
                :
                (<CustomLoader showLoader={isLoading} />)}
        </SafeAreaView >
    )
};
export default Address;
const styl = StyleSheet.create({
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
        justifyContent: "center", color: '#8F93A0',
        fontWeight: '400',
        fontSize: 14,
    },
    text: { textAlign: 'center', fontSize: 15, color: 'white', fontWeight: '500' }
})

