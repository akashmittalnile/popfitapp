import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import Headers from '../../Routes/Headers';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];


const Notifications = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        GetShippingProducts();

    }, []);
    const GetShippingProducts = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");

        // console.log('heloooooo')
        setIsLoading(true)
        try {
            const response = await axios.get(`${API.NOTIFICATION}`, { headers: { "Authorization": ` ${usertkn}` } });
            let data = response.data.data.length;
            AsyncStorage.setItem("notification", JSON.stringify(data));
            if (response?.data?.status == '1') {
                setIsLoading(false)
                setNoti(response.data.data);
            }
        }
        catch (error) {
            setIsLoading(false)
            //  console.log("ShippingProductserror:::", error);

        }

    };
    //console.log('notiii------>', noti)
    const ItemRemove = async (item) => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        console.warn('$$$$$$id---->', item.id)
        let id = item.id;
        const url = API.NOTIFICATION_DELETE + '/' + id
        console.log('url------>', url);
        axios({
            url: url,
            method: 'DELETE',
            // data: data,
            headers: {
                "Authorization": ` ${usertkn}`
            }
        })
            .then(function (response) {

                if (response.data.status == "1") {
                    GetShippingProducts();
                }
                else {
                    alert("something went wrong")
                }

                setIsLoading(false);
            })
            .catch(function (error) {
                console.log("......error.........", error);
                alert("something went wrong in catch")
                setIsLoading(false);
            })

        // try {

        //     const response = await axios.delete(`${API.NOTIFICATION_DELETE + '/' + id}`, {
        //         headers: {
        //             "Authorization": ` ${usertkn}`
        //         }
        //     });
        //     //  console.log(":::::::::item_Response>>>", response.data);
        //     if (response.data.status == "1") {
        //         GetShippingProducts();
        //     }
        //     else {
        //         alert("something went wrong")
        //     }
        // }
        // catch (error) {
        //     console.log("......error.........", error);
        //     alert("something went wrong in catch")
        //     setIsLoading(false);
        // }
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%', flexGrow: 1, backgroundColor: "white"
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
                    {/* <View style={{ marginHorizontal: 10, marginTop: 10, height: 120, borderRadius: 10, backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, height: 50, flexDirection: 'row' }}>
                            <View style={{ height: 50, flex: 1 / 2, marginTop: 20 }}>

                                <Text style={{ fontSize: 14, color: 'black', }}>Order No. : U3423568 </Text>

                            </View>

                            <View style={{ marginTop: 15, marginLeft: 5, backgroundColor: '#ffcc00', flex: 1 / 3, borderRadius: 20, height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, marginLeft: 20 }}>
                                    <Image source={require('../assets/download1.png')}
                                        style={{
                                            width: 10,
                                            height: 13,
                                        }} />
                                </View>
                                <View style={{ flex: 1, marginLeft: -10 }}>
                                    <TouchableOpacity>
                                        <Text style={{ textAlign: 'left', fontSize: 8, color: 'white', }}>Download Invoice</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                        <View style={{
                            height: 70, marginLeft: 20, flexDirection: 'row'
                        }}>
                            <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 12, color: 'black', }}>Order Status :</Text>
                            <View style={{ marginTop: 20, marginLeft: 20, flex: 1, flexDirection: 'column' }}>
                                <View style={{ flex: 1 / 2, }}>
                                    <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>Order Placed</Text>
                                </View>
                                <View style={{ marginTop: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 8, color: 'black' }}>on Sat 23 Jan 2022, 09:23 AM</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <TouchableOpacity>
                                    <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                        <Image source={require('../assets/rightArrow.png')}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}



                    {noti.length > 0 ?
                        noti.map((item, index) => {

                            return (

                                <View onPress={() => { gotoOrderDetail() }}>
                                    {item.is_read == "1" ?
                                        <>
                                            <View style={{
                                                marginHorizontal: 6,
                                                marginTop: 15,
                                                height: 70,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                backgroundColor: 'white',
                                                width: WIDTH * 0.97,
                                                justifyContent: "center",
                                                // alignItems: "center",
                                                shadowColor: '#000000',
                                                shadowRadius: 6,
                                                shadowOpacity: 1.0,
                                                elevation: 6,
                                            }}>
                                                <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 50, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                    <View style={{ marginRight: 23, }}>
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30, alignSelf: 'center'
                                                            }}


                                                            source={require('../assets/notification.png')}
                                                        />
                                                    </View>
                                                    <Text style={{ marginTop: -2, textAlign: 'left', fontSize: 14, color: 'black', fontFamily: 'Inter', fontWeight: '600' }}>{item.title}</Text>



                                                    <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: 20, height: 20, position: 'absolute', right: 0 }} onPress={() => { ItemRemove(item) }}>
                                                        <Image style={{ width: 19, height: 20, justifyContent: "center", alignItems: 'center', marginTop: 7 }} source={require('../assets/dustbin.png')}
                                                        />
                                                    </TouchableOpacity>


                                                </View>
                                                <View style={{ marginHorizontal: 10, justifyContent: 'flex-start', alignItems: 'flex-start', left: 63 }}>
                                                    <Text style={{ marginTop: 1, textAlign: 'center', fontSize: 13, color: '#455A64', fontFamily: 'Inter', fontWeight: '400' }}>{item.message}</Text></View>
                                            </View></>
                                        :
                                        <>
                                            <View style={{
                                                marginHorizontal: 6,
                                                marginTop: 15,
                                                height: 70,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                backgroundColor: '#F4F4F4',
                                                width: WIDTH * 0.97,
                                                justifyContent: "center",
                                                // alignItems: "center",
                                                shadowColor: '#000000',
                                                shadowRadius: 6,
                                                shadowOpacity: 1.0,
                                                elevation: 6,
                                            }}>
                                                <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 50, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                    <View style={{ marginRight: 23, }}>
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30, alignSelf: 'center'
                                                            }}


                                                            source={require('../assets/notification.png')}
                                                        />
                                                    </View>
                                                    <Text style={{ marginTop: -2, textAlign: 'left', fontSize: 14, color: 'black', fontFamily: 'Inter', fontWeight: '600' }}>{item.title}</Text>



                                                    <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: 20, height: 20, position: 'absolute', right: 0 }} onPress={() => { ItemRemove(item) }}>
                                                        <Image style={{ width: 19, height: 20, justifyContent: "center", alignItems: 'center', marginTop: 7 }} source={require('../assets/dustbin.png')}
                                                        />
                                                    </TouchableOpacity>


                                                </View>
                                                <View style={{ marginHorizontal: 10, justifyContent: 'flex-start', alignItems: 'flex-start', left: 63 }}>
                                                    <Text style={{ marginTop: 1, textAlign: 'center', fontSize: 13, color: '#455A64', fontFamily: 'Inter', fontWeight: '400' }}>{item.message}</Text></View>
                                            </View>
                                        </>}
                                </View>
                            )
                        })

                        : <Text style={{ color: 'white' }}>Loading</Text>}
                </ScrollView>)
                :

                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView >
    )
}

export default Notifications;