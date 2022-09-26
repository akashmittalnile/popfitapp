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
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter} from '../../Redux/actions/UpdateCounter';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Notifications = (props) => {

    // const myNoticount = useSelector((state) => state.changeTheNumber);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        GetShippingProducts();
        // AsyncStorage.clear();
        // AsyncStorage.removeItem('notification')
    }, []);
    const GetShippingProducts = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");

        // console.log('heloooooo')
        setIsLoading(true)
        try {
            const response = await axios.get(`${API.NOTIFICATION}`, { headers: { "Authorization": ` ${usertkn}` } });
            let data = response.data.data.length;
            console.log('incrementCounter', data
            );
            dispatch(incrementCounter(parseInt(data)));
            // AsyncStorage.setItem("notification", JSON.stringify(data));
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
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: "white"
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
                (<ScrollView style={{ paddingTop: 6 }}>
                    {noti.length > 0 ?
                        noti.map((item, index) => {
                            return (

                                <View onPress={() => { gotoOrderDetail() }}>
                                    {item.is_read != "1" ?
                                        <>
                                            <View style={{
                                                marginHorizontal: 10,
                                                marginTop: 6,
                                                height: 75,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                backgroundColor: '#FFFFFF',
                                                width: WIDTH * 0.95,
                                                justifyContent: "center",
                                                // alignItems: "center",
                                                // shadowColor: '#000000',
                                                shadowColor: '#cdcbcb',
                                                shadowRadius: 6,
                                                shadowOpacity: 0.1,
                                                elevation: 6,
                                                borderWidth: 1,
                                                borderColor: '#F4F4F4'

                                            }}>
                                                <TouchableOpacity onPress={() => ItemRemove(item)}
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: 'red',
                                                        width: 30, height: 30,
                                                        justifyContent: "center",
                                                        alignItems: 'center',
                                                        borderRadius: 20 / 2,
                                                        top: 20,
                                                        right: 10
                                                    }}>

                                                    <Image resizeMode='contain'
                                                        source={require('../assets/delete.png')}

                                                    />

                                                </TouchableOpacity>
                                                

                                                <View style={{ marginHorizontal: 10, width: WIDTH * 0.8, height: 75, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                                                    <View style={{ marginRight: 20, justifyContent: "center", alignItems: "center", top: 20, }}>
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30, alignSelf: 'center'
                                                            }}


                                                            source={require('../assets/notification.png')}
                                                        />
                                                    </View>
                                                    <View style={{ height: 70, width: WIDTH * 0.7, marginTop: 3, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                                                        <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 15, color: 'black', fontFamily: 'Inter', fontWeight: 'bold' }}>{item.title}</Text>
                                                        <Text style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: '#455A64', fontFamily: 'Inter', fontWeight: '400' }}>{item.message}</Text>
                                                        <Text style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: '#455A64', fontWeight: '400' }}>{item.created_at}</Text>

                                                    </View>
                                                </View>







                                            </View>

                                        </>
                                        :
                                        <>
                                            <View style={{
                                                marginHorizontal: 10,
                                                marginTop: 6,
                                                height: 75,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                backgroundColor: '#F4F4F4',
                                                width: WIDTH * 0.95,
                                                justifyContent: "center",
                                                // alignItems: "center",
                                                // shadowColor: '#000000',
                                                shadowColor: '#cdcbcb',
                                                shadowRadius: 6,
                                                shadowOpacity: 0.1,
                                                elevation: 6,
                                                borderWidth: 1,
                                                borderColor: '#F4F4F4'

                                            }}>
                                                 <TouchableOpacity onPress={() => ItemRemove(item)}
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: 'red',
                                                        width: 30, height: 30,
                                                        justifyContent: "center",
                                                        alignItems: 'center',
                                                        borderRadius: 20 / 2,
                                                        top: 20,
                                                        right: 10
                                                    }}>

                                                    <Image resizeMode='contain'
                                                        source={require('../assets/delete.png')}

                                                    />

                                                </TouchableOpacity>

                                                <View style={{ marginHorizontal: 10, width: WIDTH * 0.8, height: 75, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                                                    <View style={{ marginRight: 20, justifyContent: "center", alignItems: "center", top: 20, }}>
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30, alignSelf: 'center'
                                                            }}


                                                            source={require('../assets/notification.png')}
                                                        />
                                                    </View>
                                                    <View style={{ height: 70, width: WIDTH * 0.7, marginTop: 3, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                                                        <Text style={{ marginTop: 2, textAlign: 'left', fontSize: 15, color: 'black', fontFamily: 'Inter', fontWeight: 'bold' }}>{item.title}</Text>
                                                        <Text style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: '#455A64', fontFamily: 'Inter', fontWeight: '400' }}>{item.message}</Text>
                                                        <Text style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: '#455A64', fontWeight: '400' }}>{item.created_at}</Text>

                                                    </View>
                                                </View>







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