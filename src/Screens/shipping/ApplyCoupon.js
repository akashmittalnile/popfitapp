import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../Routes/style';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';




const ApplyCoupon = (props) => {
    const [coupondata, setCoupondata] = useState([]);

    const newData = [{
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
    },
    {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
    },

    {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
    },
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
    },



    ];
    const setSelectedcoupon = (item) => {
        props.navigation.navigate("ShippingDetail", {
            Selectcoupon: item
        });
    }
    const buttonClickedHandler1 = () => {
        props.navigation.goBack();
    }
    const gotoNotification = () => {
        props.navigation.navigate("Notifications");
    }
    useEffect(() => {
        CouponListApi();
    }, [])


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

    const CouponApplyed = async (item) => {
        console.log("CouponApplyed innn....", coupondata);
        // setIsLoading(true);
        try {
            const response = await axios.post(`${API.COUPON_APPLYED}`, { "cart_id": 1, "coupon_id": 1, "order_amount": 1200 });
            console.log(":::::::::CouponApplyed_Response>>>", response.data);
            //  alert("CouponApplyed Sussesfully....")
            console.log("status _CouponRemove:", response.data.status);

            // props.navigation.navigate("ShippingDetail", {
            //     Selectcoupon: item
            // });
            setProductitems(response.data.data)
            setIsLoading(false);
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
            height: '100%', backgroundColor: '#ffffff', flexGrow: 1
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
                <View style={{ paddingBottom: 80, justifyContent: "center" }}>
                    <Text style={{ marginLeft: 15, marginTop: 20, textAlign: 'left', fontSize: 18, color: '#000000' }}>Select Coupons</Text>

                    <FlatList
                        data={coupondata}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10,
                                    height: 90,
                                    backgroundColor: 'white',
                                    marginTop: 20,
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
                                    marginLeft: 20, marginTop: 20, height: 40,
                                    justifyContent: 'center'
                                }}>

                                    <View style={{ width: 25, height: 25, alignItems: 'center', borderRadius: 20 / 2 }}>
                                        <Image
                                            style={{
                                                width: 35,
                                                height: 35, alignSelf: 'center'
                                            }}


                                            source={require('../assets/coupon1.png')}
                                        />
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 25, }}>

                                    <View style={{ flex: 0.6, marginTop: 25, justifyContent: "flex-start" }}>

                                        <Text style={{ textAlign: 'left', fontSize: 15, color: 'black' }}>{item.name}</Text>
                                        <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 12, color: '#c9bca0', textAlign: 'left', }}>Expiry Date: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 12, color: 'black', textAlign: 'left', }}>{item.end_date}</Text> </Text>
                                    </View>
                                </View>
                                <View style={{ marginRight: 50, marginTop: 28, width: 25, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                                    <TouchableOpacity onPress={() => {
                                    CouponApplyed(item)
                                    }}>
                                        <View style={{ width: 80, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35, justifyContent: "center" }}>
                                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Apply</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ApplyCoupon;
