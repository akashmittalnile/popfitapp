import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const CartAdded = (props) => {

    const [productdata, setproductdata] = useState([]);
    const [useraddress, setuseraddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countnums, setCountnum] = useState(1);
    const [subtotal, setSubtotal] = useState('');
    const [tax, setTax] = useState('');
    const [total, setTotal] = useState('');
    const [coupon, setcoupon] = useState('');
    const [shippingcost, setshipping_cost] = useState('');
    const DATA = ['first row', 'second row', 'third row', 'third row', 'third row'];


    const gotoShippingDetail = () => {

        props.navigation.navigate("ShippingDetail");
    }



    const Productincrease = async (item, i) => {
        // console.log("iitem-------------->>>>>>>>>>>>>>>>", item)
        // console.log(".before.", countnums);
        var Num = countnums
        // console.log('nummmmm->>>>>>>>>>', Num)
        if (i == 'inc') {
            Num = Num + 1;
        } else if (Num > 1) {
            Num = Num - 1;
        } {

        }

        if (Num < 10) {

            setCountnum(Num);

            // console.log(".numm.", Num);

            ProductADDcart(Num, item.product_id)
            // console.log("..", countnums);
            setIsLoading(true)

        }
    };

    useEffect(() => {
         const unsubscribe = props.navigation.addListener('focus', () => {
      
            GetShippingProducts();
    });
    return unsubscribe;
        
    }, []);

    const ProductADDcart = async (num, productids) => {
        // console.log('productttttttt---------->', productids)
        // console.log("ADD_productin_QNTY cart.....", countnums);
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.PRODUCT_DETAILS_ADD_ITEM}`, { "qty": num, "product_id": productids }, {
                'headers': { "Authorization": ` ${usertkn}` }
            }
            );
            // console.log(":::::::::ProductADD_Response>>>", response.data.message);
            // console.log("status _ProductADD:", response.data.status);

            if (response.data.status == 1) {
                GetShippingProducts();
                // Alert.alert("Added to cart")
                // setSubtotal(response.data.sub_total);
                setIsLoading(false);
            }


        }
        catch (error) {
            console.log("......error ProductADD.........", error.response.data.message);
            setIsLoading(false);

        }

    };
    const GetShippingProducts = async () => {

        // console.log(".....usertoken.....GetShippingProducts...", producttoken);

        setIsLoading(true)
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.get(`${API.SHIPPING_DETAILS}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            },
            );
            // console.log("", response);
            // console.log("ResponseShippingProducts(product) ::::", response.data.data);
            setproductdata(response.data.data);
            setuseraddress(response.data.address_lists);
            setSubtotal(response.data.sub_total);
            setTax(response.data.tax);
            setcoupon(response.data.coupon_price);
            setshipping_cost(response.data.shipping_cost);
            setTotal(response.data.amount);
            // console.log("User_token_not_received+yet!!!>>>", response.data.message);

            setIsLoading(false)
        }
        catch (error) {
            console.log("ShippingProductserror:::", error.response.data.message);
            setIsLoading(false)
        }

    };


    // const ProductAcart = async (num, productids) => {
    //     console.log('productttttttt---------->', productids)
    //     console.log("ADD_productin_QNTY cart.....", countnums);
    //     //setIsLoading(true);


    //     let formdata = new FormData();
    //     formdata.append("qty", num);
    //     formdata.append("product_id", productids);
    //     const usertkn = await AsyncStorage.getItem("authToken");
    //     fetch('https://dev.pop-fiit.com/api/add_to_cart', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': '228e273912a6b5718c5f2b1cbd857aba26c9cbf818436e51d8fea1b24eb71ec3c8e25cd398b45ccf8079aeb0825747d697d702536b212fd3cdcdeb656988f2d7aa6e1bb2cd4f6441ceb625eaa5aeac0ec88608afab00f850ed376837e6f7dd343972874e1cd245bdd2394229c895e082a9d1dc508d906868accd5ccae9345c0f503f3aea080fe21c68c82c4f0c48d025620821af98c9a0f838077a5eedf8842bd872030bf32fa4280f25f9c027d32fcce85d54a66a48ddfd3f714b47681419786db9a4841bf97b1586edbd3e8c9b50c94bc6f8283ee3613d2c777c1e12c6e1ab23cbd2b9e30aa77770309450db41a506dcb0999706f604de41676d6eeeaef15a0c8ad858a4549d50de0addd3e589337f5c8f7e1138434c6ec0bb757e82e3d8ddf40214d1d8bab63bd7e4f04d'
    //         },
    //         body: formdata,
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             console.log('Chick in ,check out', responseJson)
    //             if (responseJson.status) {

    //                 GetShippingProducts();
    //                 setIsLoading(false)
    //             } else {

    //             }
    //         }).catch((error) => {
    //             console.log(error)

    //         });


    // };

    const ProductRemovecart = async (item) => {
        const cartaddid = item.cart_id;
        // console.log("Remove_productin cart.....", cartaddid);
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.PRODUCT_DETAILS_REMOVE_ITEM}`, { "cart_id": cartaddid }, {
                'headers': { "Authorization": ` ${usertkn}` }
            },);
            // console.log(":::::::::ProductRemovecart_Response>>>", response.data.message);
            // console.log("status _ProductRemovecart:", response.data.status);
            GetShippingProducts();
            // props.navigation.goBack();
            // setProductitems(response.data.data)
            setIsLoading(false);
        }
        catch (error) {
            console.log("....ProductRemovecart..error. cartscreen........", error.response.data.message);
            setIsLoading(false);

        }

    };



    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'white',
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
                    <View style={{ marginBottom: 60 }}>

                        <ScrollView>

                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: "100%",
                                    width: "100%",
                                    // marginHorizontal: 10,
                                    padding: 2,
                                    // borderRadius: 20,
                                    marginBottom: 10,
                                    // alignItems: 'flex-start',
                                    justifyContent: "center",
                                    flex: 1,

                                }}>

                                {/* Mycart text */}
                                <View
                                    style={{
                                        height: 50,
                                        // width: "100%",
                                        marginHorizontal: 20,
                                        // marginTop: 10,
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        // backgroundColor: 'red',
                                        // flex: 1
                                    }}>
                                    {/* <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image resizeMode="contain"
                                    style={{
                                        width: 15,
                                        height: 20, alignSelf: 'center'
                                    }}
                                    source={require('../assets/bag2.png')} />
                            </View> */}

                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                textAlign: 'left',
                                                fontSize: 15,
                                                color: '#000000',
                                                fontWeight: "bold",
                                            }}>
                                            My Cart
                                        </Text>
                                    </View>
                                    {/* <View
                                style={{
                                    marginLeft: -15,
                                    borderRadius: 25,
                                    backgroundColor: '#ffcc00',
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: 'white',

                                    }}>
                                    1
                                </Text>
                            </View> */}
                                </View>

                                {/* item list */}
                                <View style={{ justifyContent: "center" }}>
                                    <FlatList
                                        vertical
                                        data={productdata}
                                        renderItem={({ item }) =>
                                            <View>
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

                                                    {/* min to max button */}
                                                    <View style={{ backgroundColor: '#f2f2f2', flexDirection: 'row', borderRadius: 10, justifyContent: "center", alignItems: "center", height: 50, marginTop: 35, width: 110, marginLeft: 90, position: "absolute", bottom: 6, right: 6,paddingLeft:6,paddingRight:6 }}>
                                                        <View style={{
                                                            height: 44, marginRight: 5, justifyContent: "center", alignItems: "center",
                                                        }}>
                                                            <TouchableOpacity onPress={() => { Productincrease(item, '') }}>
                                                                <View style={{ backgroundColor: '#d6d6d6', width: 36, height: 36, padding: 1, justifyContent: "center", alignItems: 'center', borderRadius: 15 / 2 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 37, color: 'black', marginBottom: 8, height: 50, justifyContent: "center", alignItems: "center", }}>-</Text>

                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                        
                                                        <View style={{
                                                            height: 44, marginRight: 5, justifyContent: "center", alignItems: 'center', flex: 1,
                                                        }}>
                                                            <View style={{ justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', fontWeight: "bold" }}>{item.qty}</Text>

                                                            </View>
                                                        </View>

                                                        <View style={{
                                                            height: 44, justifyContent: "center", alignItems: "center",
                                                        }}>
                                                            <TouchableOpacity onPress={() => { Productincrease(item, "inc") }}>
                                                                <View style={{ backgroundColor: '#dbdbdb', width: 36, height: 36, padding: 1, justifyContent: "center", alignItems: 'center', borderRadius: 15 / 2 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 28, color: 'black', marginTop: 8, height: 50, justifyContent: "center", alignItems: "center", }}>+</Text>

                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    {/* <TouchableOpacity onPress={() => { ProductRemovecart(item) }}
                                                        style={{
                                                            position: "absolute",
                                                            width: 30,
                                                            backgroundColor: 'red',
                                                            borderRadius: 35,
                                                            height: 35,
                                                            right: 10,
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            top: 6
                                                        }}>
                                                        <Image
                                                            source={require('../assets/cancelWhite.png')}
                                                            style={{
                                                                width: 35,
                                                                height: 35, alignSelf: 'center'
                                                            }}

                                                        />
                                                    </TouchableOpacity> */}
                                                    {/* <TouchableOpacity onPress={() => { ProductRemovecart() }}
                                                style={{
                                                    position: "absolute",
                                                    backgroundColor: 'red',
                                                    width: 30, height: 30,
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    borderRadius: 20 / 2,
                                                    top: -13,
                                                    right: 10
                                                }}>

                                                <Image
                                                    source={require('../assets/delete.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 20, alignSelf: 'center'
                                                    }}
                                                />

                                            </TouchableOpacity> */}

                                                    <View style={{
                                                        height: 140,
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
                                            </View>
                                        }
                                    />
                                </View>

                                {/* <View style={{
                                    backgroundColor: '#fffcee',
                                    height: 100,
                                    marginTop: 20,
                                    shadowColor: '#efe8c7',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    elevation: 2,
                                    marginBottom: 20, justifyContent: "center", alignItems: 'center'
                                }}>
                             on: 2,
                            co        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
                                        </View>
                                    </View>



                                </View> */}
                                <View style={{
                                    backgroundColor: '#fffcee',
                                    height: 120,
                                    width: WIDTH *0.99,
                                    marginTop: 20,
                                    shadowColor: '#efe8c7',
                                    shadowOffset:
                                    {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.2,
                                    elevation: 6,
                                    marginBottom: 20, 
                                    justifyContent: "flex-start", 
                                    alignItems: 'flex-start',
                                    flex: 1
                                }}>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row',justifyContent: "space-between",alignItems: 'flex-start', marginLeft: 15,width: WIDTH*0.9 }}>
                                        <View style={{width: WIDTH*0.9 ,height: 30,justifyContent: "flex-start",alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Subtotal:</Text>
                                        </View>
                                        <View style={{justifyContent: "flex-end",alignItems: 'flex-end' }}>
                                        <Text style={{   textAlign: 'center', fontSize: 14, color: '#77869E', right: 50,fontWeight: "500" }}>${subtotal}</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row',justifyContent: "space-between",alignItems: 'flex-start', marginLeft: 15,width: WIDTH*0.9 }}>
                                        <View style={{width: WIDTH*0.9 ,height: 30,justifyContent: "flex-start",alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Tax:</Text>
                                        </View>
                                        <View style={{justifyContent: "flex-end",alignItems: 'flex-end' }}>
                                        <Text style={{  textAlign: 'center', fontSize: 14, color: '#77869E', right: 50,fontWeight: "500" }}>{tax}</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row',justifyContent: "space-between",alignItems: 'flex-start', marginLeft: 15,width: WIDTH*0.9 }}>
                                        <View style={{width: WIDTH*0.9 ,height: 30,justifyContent: "flex-start",alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Shipping charges:</Text>
                                        </View>
                                        <View style={{justifyContent: "flex-end",alignItems: 'flex-end' }}>
                                        <Text style={{  textAlign: 'center', fontSize: 14, color: '#77869E', right: 50,fontWeight: "500" }}>${shippingcost}</Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{
                                    backgroundColor: '#fffcee',
                                    height: 40,
                                    width: WIDTH *0.99,
                                    marginTop: 10,
                                    shadowColor: '#efe8c7',
                                    // shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    elevation: 6,
                                    marginBottom: 20, 
                                    justifyContent: "center", 
                                    alignItems: 'center',
                                    flex:1
                                }}>
                                  
                                  <View style={{ marginTop: 10, height: 40, flexDirection: 'row',justifyContent: "space-between",alignItems: 'flex-start', marginLeft: 15,width: WIDTH*0.94 }}>
                                        <View style={{width: WIDTH*0.9 ,height: 30,justifyContent: "flex-start",alignItems: 'flex-start' }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "500" }}>Total Amout:</Text>
                                        </View>
                                        <View style={{justifyContent: "flex-end",alignItems: 'flex-end' }}>
                                        <Text style={{   textAlign: 'center', fontSize: 14, color: '#77869E', right: 55,fontWeight: "500" }}>${total}</Text>
                                        </View>
                                    </View>



                                </View>
                                {/* futter buttons */}
                                < View
                                    style={{
                                        // bottom: 40,
                                        // position: "absolute",
                                        // marginBottom: 20,
                                        flexDirection: 'row',
                                        height: 34,
                                        marginHorizontal: 20,
                                        alignItems: 'center',
                                        justifyContent: "center"


                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate("Home")
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                width: 200,
                                                flex: 1,
                                                backgroundColor: '#ffcc00',
                                                borderRadius: 50,
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 15,
                                                    color: 'white',

                                                    fontWeight: '700',
                                                }}>
                                                Continue Shopping
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            gotoShippingDetail()

                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                width: 120,
                                                flex: 1,
                                                backgroundColor: '#ffcc00',
                                                borderRadius: 50,
                                                marginLeft: 10,
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 15,
                                                    color: 'white',

                                                    fontWeight: '700',
                                                }}>
                                                Check Out
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View >
                            </View >

                        </ScrollView >

                    </View >)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView >
    )
}

export default CartAdded;
