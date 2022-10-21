import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const OrderDetail = (props) => {

    const [orderitemdata, setOrderitemdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        MyOrderDetails();

    }, []);

    console.log("MY order list...............:", props?.route?.params?.Gotoorderdetails?.order_id);
    const Gotoorderdetails = props?.route?.params?.Gotoorderdetails?.order_id;
    console.log("From profileorder list...............:", props?.route?.params?.gotoprofileOrderdetails?.order_id);
    const gotoprofileOrderdetails = props?.route?.params?.gotoprofileOrderdetails?.order_id;


    const MyOrderDetails = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.ORDER_DETAIL}`, { "order_id": Gotoorderdetails ? Gotoorderdetails : gotoprofileOrderdetails }, { headers: { "Authorization": ` ${usertkn}` } });
            console.log(":::::::::MyOrderDetailst_Response>>>", response.data.order);
            console.log("status _OrderDetails:", response.data.status);
            if (response.data.status == 1) {
                setOrderitemdata(response.data.order)
                setIsLoading(false);
            } else {
                Alert.alert("Myorder details status 0",'');
                setIsLoading(false);
            }

        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            setIsLoading(false);

        }

    };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: '#ffffff',
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
                (<View style={{ paddingBottom: 50 }}>
                    <ScrollView>
                        {
                            orderitemdata.length > 0 ?
                                orderitemdata.map((item) => {
                                    return (
                                        <View style={{ paddingBottom: 30 }} >
                                            {/* order no deisgn*/}
                                            <View style={{
                                                // backgroundColor: '#fffcee',
                                                width: "99.9%",
                                                height: 70,
                                                marginTop: 20,
                                                marginBottom: 20,
                                                marginHorizontal: 2,
                                                justifyContent: "center",
                                                alignItems: 'center',
                                                // shadowColor: '#000000',

                                                // shadowRadius: 6,
                                                // shadowOpacity: 1.0,
                                                // elevation: 6,

                                            }}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center", flex: 1 }}>

                                                    <View style={{ height: 40, flexDirection: "column", flex: 1, justifyContent: 'flex-start', alignItems: "flex-start", paddingLeft: 15 }}>

                                                        <View style={{ flex: 1, }}>
                                                            <Text style={{ fontSize: 12, color: 'black', }}>{item?.order_createdDate}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', flex: 1, }}>

                                                            <Text style={{ fontSize: 14, color: 'black', fontWeight: "500" }}>Order No. :</Text
                                                            >
                                                            <Text style={{ fontSize: 14, color: '#FFCC00', }}> {item?.order_no}</Text>

                                                        </View>

                                                    </View>
                                                    <TouchableOpacity
                                                        style={{
                                                            flex: 1,
                                                            borderRadius: 5,
                                                            height: 40,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: "absolute",
                                                            width: 150,
                                                            right: 10,
                                                            backgroundColor: "#FFCC00",
                                                            // Top: 119,
                                                            // Left: 234
                                                        }}>
                                                        <View style={{ width: 30, }}>
                                                            <Image source={require('../assets/download1.png')}
                                                                style={{
                                                                    width: 10,
                                                                    height: 13,
                                                                }} />
                                                        </View>
                                                        <View style={{ marginLeft: -10 }}>

                                                            <Text style={{ textAlign: 'left', fontSize: 10, color: 'white', }}>Download Invoice</Text>

                                                        </View>
                                                    </TouchableOpacity>


                                                </View>

                                            </View>

                                            <View style={{
                                                marginHorizontal: 6,
                                                marginTop: 4,
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
                                                        <Text style={{ textAlign: 'left', fontSize: 16, color: '#000000', fontWeight: "600" }}>{item.product_name.slice(0, 20) + '...'}</Text>

                                                        <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 60, width: WIDTH * 0.97 }}>

                                                            <View style={{ flexDirection: 'column', }}>
                                                                <View>
                                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000' }}>Total Amount: <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$ {item.total_price}</Text></Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000' }}>Quantity: <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>{item.qty}</Text></Text>
                                                                </View>

                                                            </View>
                                                        </View>


                                                    </View>


                                                </View>
                                            </View>
                                            <Text style={{ marginLeft: 15, marginTop: 20, textAlign: 'left', fontSize: 17, color: '#000000', fontWeight: "500" }}>Your Shipping Address</Text>

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
                                                // shadowColor: '#000000',
                                                // shadowRadius: 6,
                                                // shadowOpacity: 1.0,
                                                // elevation: 6,
                                                borderWidth: 1,
                                                borderColor: "#FFCC00",
                                                flex: 1,

                                            }}>
                                                <View style={{ position: "absolute", right: 10, top: 30, justifyContent: "center", alignItems: "center" }}>
                                                    <Image source={require('../assets/Vector.png')}
                                                        style={{
                                                            width: 30,
                                                            height: 30, alignSelf: 'center', marginLeft: 15
                                                        }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", width: "99%", flex: 0.4 }}>
                                                    <View style={{ flex: 0.9 }}>
                                                        <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "bold" }}>Address</Text>
                                                    </View>

                                                </View>

                                                <View style={{ flex: 0.5, width: "95%", paddingLeft: 15, paddingRight: 50 }}>

                                                    <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000', }}>{item?.shipping_address}</Text>
                                                </View>

                                            </View>

                                            {/* Order status , Order dispatched,Order for delivery,Order delivered*/}
                                            <Text style={{ marginLeft: 15, marginTop: 10, textAlign: 'left', fontSize: 17, color: '#000000', fontWeight: "500" }}>Order status</Text>

                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", height: 300, width: WIDTH * 0.9, marginTop: 20, marginHorizontal: 20,  }}>

                                                {
                                                    item.order_status >= "1" ?

                                                        (<View style={{ backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: WIDTH * 0.63, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Vector.png')}
                                                                    style={{
                                                                        width: 22,
                                                                        height: 22, alignSelf: 'center',
                                                                    }} />

                                                                {/* <Image source={require('../assets/Ellipse_187.png')}
                                                                style={{
                                                                    width: 20,
                                                                    height: 20, alignSelf: 'center',
                                                                }} /> */}

                                                            </View>

                                                            <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order placed</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>{item.order_createdDate}</Text>
                                                            </View>
                                                        </View>)
                                                        :
                                                        (<View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: "row", width: WIDTH * 0.51, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Ellipse_187.png')}
                                                                    style={{
                                                                        width: 20,
                                                                        height: 20, alignSelf: 'center',
                                                                    }} />
                                                            </View>

                                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order placed</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>Data not available</Text>
                                                            </View>
                                                        </View>)
                                                }


                                                <View style={{ backgroundColor: "white", justifyContent: "space-between", alignItems: "flex-start", width: WIDTH * 0.5, height: 30, }}>
                                                    {
                                                        item.order_status >= "1" ?
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                            :
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                    }


                                                </View>

                                                {
                                                    item.order_status >= "2" ?

                                                        (<View style={{ backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: WIDTH * 0.63, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Vector.png')}
                                                                    style={{
                                                                        width: 22,
                                                                        height: 22, alignSelf: 'center',
                                                                    }} />
                                                            </View>

                                                            <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order dispatched</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>{item.order_createdDate}</Text>
                                                            </View>
                                                        </View>)
                                                        :
                                                        (<View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: "row", width: WIDTH * 0.51, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Ellipse_187.png')}
                                                                    style={{
                                                                        width: 20,
                                                                        height: 20, alignSelf: 'center',
                                                                    }} />
                                                            </View>

                                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order dispatched</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>Data not available</Text>
                                                            </View>
                                                        </View>)
                                                }

                                                <View style={{ backgroundColor: "white", justifyContent: "space-between", alignItems: "flex-start", width: WIDTH * 0.5, height: 30, }}>
                                                    {
                                                        item.order_status >= "2" ?
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                            :
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                    }
                                                </View>

                                                {
                                                    item.order_status >= "3" ?

                                                        (<View style={{ backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: WIDTH * 0.63, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Vector.png')}
                                                                    style={{
                                                                        width: 22,
                                                                        height: 22, alignSelf: 'center',
                                                                    }} />

                                                                {/* <Image source={require('../assets/Ellipse_187.png')}
                                                                style={{
                                                                    width: 20,
                                                                    height: 20, alignSelf: 'center',
                                                                }} /> */}

                                                            </View>

                                                            <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order for delivery</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>{item.order_createdDate}</Text>
                                                            </View>
                                                        </View>)
                                                        :
                                                        (<View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: "row", width: WIDTH * 0.51, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Ellipse_187.png')}
                                                                    style={{
                                                                        width: 20,
                                                                        height: 20, alignSelf: 'center',
                                                                    }} />
                                                            </View>

                                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order for delivery</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>Data not available</Text>
                                                            </View>
                                                        </View>)
                                                }

                                                <View style={{ backgroundColor: "white", justifyContent: "space-between", alignItems: "flex-start", width: WIDTH * 0.5, height: 30, }}>
                                                    {
                                                        item.order_status >= "3" ?
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                            :
                                                            (<View style={{ position: "absolute", left: 18, justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                                <Image source={require('../assets/Ellipse_183_gray.png')}
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6, alignSelf: 'center', marginBottom: 6
                                                                    }} />
                                                            </View>)
                                                    }
                                                </View>

                                                {
                                                    item.order_status == "4" ?

                                                        (<View style={{ backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: WIDTH * 0.63, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Vector.png')}
                                                                    style={{
                                                                        width: 22,
                                                                        height: 22, alignSelf: 'center',
                                                                    }} />

                                                                {/* <Image source={require('../assets/Ellipse_187.png')}
                                                                style={{
                                                                    width: 20,
                                                                    height: 20, alignSelf: 'center',
                                                                }} /> */}

                                                            </View>

                                                            <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order delivered</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>{item.order_createdDate}</Text>
                                                            </View>
                                                        </View>)
                                                        :
                                                        (<View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: "row", width: WIDTH * 0.48, height: 45, paddingBottom: 5 }}>

                                                            <View style={{ position: "absolute", left: 10, justifyContent: "center", alignItems: "center", top: 15 }}>

                                                                <Image source={require('../assets/Ellipse_187.png')}
                                                                    style={{
                                                                        width: 20,
                                                                        height: 20, alignSelf: 'center',
                                                                    }} />
                                                            </View>

                                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                                <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#000000', fontWeight: "400" }}>Order delivered</Text>
                                                                <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 12, color: '#000000', fontWeight: "400" }}>Data not available</Text>
                                                            </View>
                                                        </View>)
                                                }

                                            </View>

                                        </View>
                                        )
                                })
                                :
                                (<View style={{
                                marginHorizontal: 6,
                                height: HEIGHT,
                                width: WIDTH * 0.97,
                                borderRadius: 10,
                                // backgroundColor: 'white',
                                // width: 380,
                                // justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                marginTop:160
                            }}>
                                <Image resizeMode='contain'
                                    source={require('../assets/Nodatafound.png')}
                                    style={{
                                        width: 200,
                                        height: 120, alignSelf: 'center'
                                    }} />
                                <Text style={{fontSize: 14, fontWeight: "500", color: 'black' }}>Oops, order list is empty !</Text>
                            </View>)
                        }
                    </ScrollView>
                </View>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}

        </SafeAreaView>
    );
}

export default OrderDetail;