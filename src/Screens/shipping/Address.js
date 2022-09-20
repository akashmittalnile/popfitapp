import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
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


const Address = (props) => {
    const [producttoken, setproducttoken] = useState("");
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
    const [justUpdate, setjustUpdate] = useState(false);
    const [type, setType] = useState('');
    console.log('type&&&&&&&&', type)
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
    const aa = (item) => {

        console.log('$$$$$$item$$$4', item)
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
    const buttonClickedHandler1 = () => {
        props.navigation.goBack();
    }
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

        if (landmark && area_village) {
            validate();
            pass();
            setIsLoading(true)
            setShippingAddressPopUp(false);


            // console.log("res data-------->", data);
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
                        console.log('res----->', response.data)
                        GetShippingProducts()
                        setData(false)
                    })
                    .catch(function (error) {
                        setIsLoading(false)
                        alert("Please enter valid email or password")
                        console.log(error)

                    })
            } catch (error) {
                setIsLoading(false)
                alert("An error has occurred");
                console.log({ ...error })

            }
        }
        else {
            setIsLoading(false)
            alert("Please enter both fields")
        }

    }
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
        setproducttoken(Usertoken);
        console.log("token.......", Usertoken);
        if (Usertoken == null) {
            props.navigation.navigate('LoginMain', {
                screen: 'LoginSignUp',
            });
        }
        else {
        }
    }
    const GetShippingProducts = async () => {


        setIsLoading(true)
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            console.log("Response_ShippingProducts ::::", response.data);
            setproductdata(response.data.data);
            setuseraddress(response.data.address_lists);
            setCheckedItem(props?.route?.params?.address)
            setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            setIsLoading(false)
        }

    };
    // console.log('item check-->>>>>', checkedItem);
    AsyncStorage.setItem("item", JSON.stringify(checkedItem));
    const ItemRemove = async (item) => {
        // setIsLoading(true);
        // console.log('$$$$$$id---->', item.id)
        try {

            const response = await axios.delete(API.DELETE_ITEM + '/' + item.id);
            //  console.log(":::::::::item_Response>>>", response.data);
            if (response.data.status == "1") {
                GetShippingProducts();
            }
            else {
                alert("something went wrong")
            }
        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            setIsLoading(false);
        }
    };
    const ItemUpdate = async () => {
        // console.log('edit dtaaaa--------->', editdata)
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.UPDATE_ITEM}`, {
                address_id: editdata.id, area_village: area_village,
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
            }
            );
            setShippingAddressPopUp(false);
            clearState();
            setData(false)
            GetShippingProducts()
        }

        catch (error) {
            console.log("......error.........", error);
        } setIsLoading(false);
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
            {!isLoading ?

                (
                    <>


                        <Text style={{ marginLeft: 15, marginTop: 20, textAlign: 'left', fontSize: 24, color: '#000000', }}>{type}Select a Delivery Address</Text>

                        <View
                            style={{
                                justifyContent: "center", alignItems: "center", flexDirection: "row",
                                height: '70%', marginHorizontal: 6
                            }
                            }
                        >
                            {/* Please Enter Your Shipping Address */}
                            <ScrollView>
                                <FlatList
                                    vertical
                                    data={useraddress}
                                    renderItem={({ item, index }) => {
                                        console.warn('checked ----------->', item, props?.route?.params?.address)
                                        return <View style={{
                                            width: '95%',
                                            height: 140,
                                            marginLeft: 10,
                                            marginRight: 15,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowRadius: 6,
                                            shadowOpacity: 0.2,
                                            //elevation: 3,
                                            borderRadius: 15,
                                            borderColor: "#ffcc00",
                                            borderWidth: 1,
                                            // backgroundColor: 'red',
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
                                                            props.navigation.navigate("ShippingDetail")
                                                        }}>

                                                            <Image source={
                                                                props?.route?.params?.address.id != item.id
                                                                    ? require('../assets/unchecked.png')
                                                                    : require('../assets/checked.png')}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', fontFamily: 'Inter', fontWeight: "500", marginTop: 10, left: 20, fontSize: 16 }}>{item.address_type}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                            <Text style={{ marginHorizontal: 10, textAlign: 'left', fontSize: 14, color: '#676767', fontFamily: 'Inter', marginTop: 5, marginLeft: 50, right: -9, fontWeight: '400' }}>{item.house_no},{item.area_village} {item.landmark},{item.city},{item.state},{item.pincode}
                                            </Text>

                                            <View style={{ flexDirection: 'row', left: 30, marginTop: 10 }}>

                                                <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', marginTop: 10, left: 27 }}>
                                                    <TouchableOpacity onPress={() => { aa(item) }}>
                                                        <Image source={require('../assets/Pen.png')}
                                                        />
                                                    </TouchableOpacity>

                                                </View>



                                                <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, marginTop: 10, left: 57 }}>
                                                    <TouchableOpacity onPress={() => { ItemRemove(item) }}>
                                                        <Image source={require('../assets/dustbin.png')}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <TouchableOpacity onPress={() => {
                                                    setCheckedItem(item)
                                                }}>
                                                    <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, marginTop: 17, left: 130 }}>
                                                        <Image source={require('../assets/buttonSave.png')}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>







                                        </View>







                                    }
                                    }
                                /></ScrollView>
                        </View>
                        <TouchableOpacity onPress={() => { setShippingAddressPopUp(true) }}>
                            <View
                                style={{
                                    marginHorizontal: 6,
                                    height: 60,
                                    width: "80%",
                                    backgroundColor: 'white',
                                    marginTop: 10,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    flexDirection: 'row',
                                    left: 35,
                                    alignItems: "center",

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
                                        alignItems: "center", marginTop: 10
                                    }}>
                                        < View style={{ justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: '500', fontFamily: 'Inter', left: 34, marginTop: 5 }}>Add Address</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>



                        {ShippingAddressPopUp ? (
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

                                                <TextInput style={styl.textInput}
                                                    placeholder='Address Title'
                                                    label="area_village"
                                                    value={area_village}
                                                    onChangeText={e => onChangeEmailHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter your landmark'
                                                    label="landmark"
                                                    value={landmark}
                                                    onChangeText={e => onChangePasswordHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter Address type'
                                                    label="Address type"
                                                    value={address_type}
                                                    onChangeText={e => onChangeAddressHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter your City'
                                                    label="Address type"
                                                    value={city}
                                                    onChangeText={e => onChangeCityHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter full name'
                                                    label="Address type"
                                                    value={full_name}
                                                    onChangeText={e => onChangeNameHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter house number'
                                                    label="Address type"
                                                    value={house_no}
                                                    onChangeText={e => onChangeHouseHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter phone number'
                                                    label="Address type"
                                                    value={phone}
                                                    onChangeText={e => onChangePhoneHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter pincode iiiiii'
                                                    label="Address type"
                                                    value={pincode.toString()}
                                                    onChangeText={e => onChangePinHandler(e)}
                                                />
                                                <TextInput style={styl.textInput}
                                                    placeholder='Enter State'
                                                    label="Address type"
                                                    value={state}
                                                    onChangeText={e => onChangeStateHandler(e)}
                                                />
                                                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 45, marginHorizontal: 20, marginTop: 30 }}>
                                                    <TouchableOpacity
                                                        onPress={() => { data == true ? ItemUpdate() : gotocurrentpage() }} >
                                                        <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>
                                                            <Text style={styl.text}>Save </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </Modal>
                        ) : null}

                    </>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView >
    )
};
export default Address;
const styl = StyleSheet.create({
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

