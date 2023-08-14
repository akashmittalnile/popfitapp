import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../Routes/style';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';


const ApplyCoupon = (props) => {
    const { t } = useTranslation();
    const [coupondata, setCoupondata] = useState([]);
    const [response, setRespone] = useState([]);
    const [visible, setVisible] = useState(true);
    const [Id, setId] = useState()
    const [isLoading, setIsLoading] = useState(false);

    // const setSelectedcoupon = (item) => {
    //     props.navigation.navigate("ShippingDetail", {
    //         Selectcoupon: item
    //     });
    // }

    useEffect(() => {
        CouponListApi();
        setVisible(true);
    }, [])
    const resetStacks = (page, item) => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: page }],
            params: { Selectcoupon: item },
        });
    }
    // const resetStacks = (page) => {
    //     props.navigation.reset({
    //         index: 0,
    //         routes: [{ name: page }],
    //     });
    // }
    const CouponListApi = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {
            const response = await axios.get(`${API.COUPON_LIST}`, {
                'headers': { "Authorization": ` ${usertkn}` }
            });
            // console.log("", response);
            // console.log("Response_CouponListApi ::::", response.data.data);
            setCoupondata(response.data.data);
            // let result = coupondata.map(a => a.id)
            // setId(result);
            // console.log("");

            // setIsLoading(false)
        }
        catch (error) {
            Alert.alert("", t('Check_internet_connection'))
            // console.log("ShippingProductserror:::", error.response.data.message);
            // setIsLoading(false)
        }
        setIsLoading(false)
    };

    //   console.log("Orderamount_item...............:", props?.route?.params?.Orderamount);
    let Orderamount = props?.route?.params?.Orderamount


    const CouponApplyed = async (item) => {
        // console.log(item);
        // const Orderamt = Orderamount.substring(1, 14)
        console.log("CouponApplyed Price....%%%%%%%%%%%%", Orderamount.substring(1, 14));
        setIsLoading(true);
        try {
            const usertkn = await AsyncStorage.getItem("authToken");
            const response = await axios.post(`${API.COUPON_APPLYED}`, { "coupon_id": item.id, "order_amount": Orderamount.substring(1, 14) },
                {
                    'headers': { "Authorization": ` ${usertkn}` }
                }
            );
            // console.log(":::::::::CouponApplyed_Response-----------$$$$$$$$$$$$$$>>>", response.data.message);
            // setRespone(response?.data?.message);

            // console.log("status _CouponRemove:", response.data);
            if (response.data.message == "Coupon Added Successfully") {
                // AsyncStorage.setItem("cupon", JSON.stringify(item));
                //  resetStacks('ShippingDetail', item)
                // Alert.alert("CouponApplyed Sussesfully....");
                props.navigation.navigate("ShippingDetail", {
                    Selectcoupon: item,


                });
            }
            else if (response.data.status == 1) {
                Alert.alert("",response.data.message)
                console.log("Coupon", response.data.message);
            }
            else {
                setVisible(false);
                Alert.alert("",response.data.message)
            }
            // setProductitems(response.data.data)

        }
        catch (error) {
            // Alert.alert("", "Internet connection appears to be offline. Please check your internet connection and try again.")
            console.log("......error.........", error.response.data.message);
            setIsLoading(false);

        }
        setIsLoading(false)
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

            {!isLoading ?
                <View style={{ paddingBottom: 80, justifyContent: "center" }}>

                    {
                        coupondata.length > 0 ?
                            (<View style={{ marginTop: 20, marginLeft: 15, }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 17, color: '#000000', fontWeight: "500" }}>{t('Select_Coupons')}</Text>
                            </View>)
                            :
                            null
                    }


                    <FlatList
                        data={coupondata}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) =>
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
                                    marginBottom: 4,
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
                                        <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 12, color: '#c9bca0', textAlign: 'left', }}>{t('Expiry_Date')}: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 12, color: 'black', textAlign: 'left', }}>{item.end_date}</Text> </Text>
                                    </View>
                                </View>
                                <View style={{ marginRight: 50, marginTop: 28, width: 25, height: 34, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2 }}>
                                    <TouchableOpacity onPress={() => {
                                        CouponApplyed(item)
                                    }}>
                                        <View style={{ width: 80, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35, justifyContent: "center" }}>
                                            <Text style={{ textAlign: 'center', fontSize: 13, color: 'white', }}>{t('Apply')}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                :
                (<CustomLoader showLoader={isLoading} />)}

        </SafeAreaView>
    )
}

export default ApplyCoupon;
