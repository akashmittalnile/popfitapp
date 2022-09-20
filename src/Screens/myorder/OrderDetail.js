import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView } from 'react-native'
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


const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];

const OrderDetail = (props) => {

    const [orderitemdata, setOrderitemdata] = useState([]);
   
    useEffect(() => {
        MyOrderDetails();

    }, []);

    console.log("MY order list...............:", props?.route?.params?.Gotoorderdetails?.id);
    const Gotoorderdetails = props?.route?.params?.Gotoorderdetails?.id

    const MyOrderDetails = async () => {
        // console.log("MyOrderDetails id.....;;;;;", ITEM);

        try {
            const response = await axios.post(`${API.ORDER_DETAIL}`, { "order_id": Gotoorderdetails });
            console.log(":::::::::MyOrderDetailst_Response>>>", response.data.order);
            console.log("status _OrderDetails:", response.data.status);

            setOrderitemdata(response.data.order)
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
            width: '100%',
            height: '100%', flexGrow: 1, backgroundColor: '#ffffff',
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
                <View style={{
                  width: "95%",
                  height: 200,
                  marginTop: 10,
                  // marginLeft: 15,
                  marginHorizontal: 10,
                  shadowColor: '#000',
                  // shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 6,
                  shadowOpacity: 0.2,
                  elevation: 3,
                  borderRadius: 15,
                  backgroundColor: '#F7F7F7',
                  marginTop: 20,
                  borderRadius: 20,
                  justifyContent: "center", alignItems: 'center',
                }}>

                    <View style={{
                        height: 130, marginTop: 2, justifyContent: "center", alignItems: 'center', backgroundColor: 'white', width: '50%', marginTop: 10,
                    }}>
                        <View style={{
                   width: "100%",
                   height: 200, justifyContent: "center", alignItems: 'center',
                   //  backgroundColor: '#F7F7F7',
                   // backgroundColor: 'pink'
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: 110, marginTop: 20, borderRadius: 100 / 2,
                                    height: 100, alignSelf: 'center',  
                                }}
                                source={{ uri: orderitemdata?.product_image  }} />

                        </View>
                    </View>

                    <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 16, color: '#000000', justifyContent: "center", alignItems: 'center' }}>{orderitemdata?.product_name}</Text>

                    <View
                        style={{ marginTop: 10, textAlign: 'left', fontSize: 15, color: '#000000', justifyContent: "flex-start", flex: 1, width: 350, margin: 10, padding: 5 }}>

                        <View style={{ flexDirection: 'row', backgroundColor: "white", flex: 0.3 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Price  :</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#000000', marginLeft: 20, }}>$  {orderitemdata?.price}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: "white", flex: 0.3 }}>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Tax     :</Text>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  {orderitemdata?.tax}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: "white", flex: 0.3 }}>

                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Total  :</Text>
                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  {orderitemdata?.total_price}</Text>

                        </View>
                    </View>
                </View>

                <Text style={{ marginLeft: 15, marginTop: 20, textAlign: 'left', fontSize: 15, color: '#000000', fontWeight: "bold" }}>Your Shipping Address</Text>

                <View style={{
                    height: 95,
                    width: "92%",
                    marginHorizontal: 15,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    marginTop: 20,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1.0,
                    elevation: 6,
                    zIndex: 999,
                    labelStyle: {
                        color: "#fff",
                        lineHeight: 0
                    }, flex: 1
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", width: "99%", flex: 0.4 }}>
                        <View style={{ flex: 0.9 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "bold" }}>Home Address</Text>
                        </View>
                        {/* <TouchableOpacity style={{ flex: 0.1 }}>
                            <View style={{ marginRight: 5, backgroundColor: 'red', width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, }}>
                                <Image source={require('../assets/delete.png')}
                                />
                            </View>
                        </TouchableOpacity> */}
                    </View>

                    <View style={{ flex: 0.5, width: "95%", paddingLeft: 15, paddingRight: 50 }}>

                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', }}>{orderitemdata?.shipping_address}</Text>
                    </View>

                </View>

                {/* order no deisgn*/}
                <View style={{
                    backgroundColor: '#fffcee',
                    width: "99.9%",
                    height: 70,
                    marginTop: 20,
                    marginBottom: 20,
                    marginHorizontal: 2,
                    justifyContent: "center",
                    alignItems: 'center',
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1.0,
                    elevation: 6,
                    zIndex: 999,
                    labelStyle: {
                        color: "#fff",
                        lineHeight: 0
                    },
                }}>

                    <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <View style={{ height: 50, marginTop: 20, flexDirection: 'row', flex: 0.55, }}>

                            <Text style={{ fontSize: 14, color: 'black', fontWeight: "bold" }}>Order No. :</Text
                            >
                            <Text style={{ fontSize: 14, color: 'black', }}> {orderitemdata?.order_no}</Text>

                        </View>

                        <TouchableOpacity style={{ backgroundColor: '#ffcc00', flex: 0.35, borderRadius: 20, height: 30, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 30, marginLeft: 20, }}>
                                <Image source={require('../assets/download1.png')}
                                    style={{
                                        width: 10,
                                        height: 13,
                                    }} />
                            </View>
                            <View style={{ marginLeft: -10 }}>

                                <Text style={{ textAlign: 'left', fontSize: 9, color: 'white', }}>Download Invoice</Text>

                            </View>
                        </TouchableOpacity>


                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default OrderDetail;