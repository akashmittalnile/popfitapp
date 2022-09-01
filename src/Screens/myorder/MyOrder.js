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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Headers from '../../Routes/Headers';

const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];

const MyOrder = (props) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);

    // const [Myorderslist, setMyorderslist] = useState("");
    const [ordereditem, setordereditem] = useState([]);
    const [ordermsg, setordermsg] = useState("");
    const [msg, setMsgAlert] = useState(false);

    const gotoOrderDetail = () => {
        props.navigation.navigate("OrderDetail")

    }
    const buttonClickedHandler = () => {
        props.navigation.goBack()
    };
    const gotoNotification = () => {
        props.navigation.navigate("Notifications")
    }
    useEffect(() => {
        getusertoken();
        MyorderApi();
        SearchOrder_filter();
    }, [props]);

    const getusertoken = async () => {
        const ordertoken = await AsyncStorage.getItem("authToken");
        console.log(".....MY_order token get::", ordertoken);
        // setMyorderslist(ordertoken)
    }
    console.log("select filter", value);
    const MyorderApi = async () => {
        console.log("MY_order.....OrderIN...", ordertoken);

        //   setIsLoading(true)
        try {
            const response = await axios.get(`${API.MY_ORDER}`, { headers: { "Authorization": ` ${ordertoken}` } });
            // console.log("", response);
            console.log("ResponseProfile ::::", response.data.success);
            if (response.data.status == 1) {
                setordereditem(response.data.order);
                //   console.log("User_token_not_received+yet!!!>>>", response.data.success.first_name);
            }
            // setIsLoading(false)
        }
        catch (error) {
            console.log("Countryerror:", error.response.data.message);
            setordermsg(response.data.message)
            setMsgAlert(true);
            // setIsLoading(false)
        }



    }
    const SearchOrder_filter = async () => {
        console.log("SearchOrder_filter.....");
        // setIsLoading(true);
        try {
            const response = await axios.post(`${API.SEARCH_ORDER_FILTER}`, { "search": 1 });
            console.log(":::::::::ProductRemovecart_Response>>>", response.data.data);
            console.log("status _ProductRemovecart:", response.data.status);

            // setProductitems(response.data.data)
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
            height: '100%', backgroundColor: 'white', flexGrow: 1
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
                {
                    msg ?
                        (<View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#ffcc00", fontSize: 17, }}>{ordermsg}</Text></View>)
                        :
                        (null)
                }
                <View style={{ height: 50, marginHorizontal: 10, marginTop: 20 }}>
                    <DropDownPicker
                        items={[
                            { label: 'Today', value: 'today' },
                            { label: '30 Days', value: ' 30_days' },
                            { label: '60 Days', value: ' 60_days' },
                            { label: '90 Days', value: ' 90_days' },
                            { label: '120 Days', value: ' 120_days' },
                            { label: 'Last Year', value: 'last_year' },
                            { label: 'Last 3 Year', value: 'last_3_year' },
                        ]}
                        listParentContainerStyle={{
                            justifyContent: "center",
                            alignItems: "center", paddingLeft: 25
                        }}
                        listParentLabelStyle={{
                            fontWeight: "600", fontSize: 16
                        }}

                        backgroundColor='white'
                        // loading={loading}
                        placeholder="Select History"
                        containerStyle={{ height: 70 }}
                        dropDownDirection="BOTTOM"
                        // defaultValue={changeCountry}
                        itemStyle={{ justifyContent: 'flex-start', }}
                        textStyle={{
                            fontSize: 14
                        }}
                        listMode="MODAL"
                        open={open}
                        setOpen={setOpen}
                        value={value}
                        setValue={setValue}
                        scrollViewProps={{
                            decelerationRate: "medium", ScrollView: "#ffcc00"
                        }}
                        onChangeText={(item) => setValue(item)}
                        defaultValue={null}
                        dropDownContainerStyle={{
                            // backgroundColor:"red",
                            borderColor: '#8F93A0',
                            color: '#8F93A0',
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                            borderWidth: 1,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 1.0,
                            elevation: 5,
                            zIndex: 999,

                        }}
                        style={{
                            borderColor: 'white', backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            elevation: 2,
                            alignItems: "center"
                            , justifyContent: "center", zIndex: 3, paddingLeft: 20
                        }}
                    />

                </View>
                <FlatList
                    vertical
                    data={DATA}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { gotoOrderDetail() }}>

                            <View style={{
                                marginHorizontal: 15,
                                marginTop: 20,
                                height: 240,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                width: 380,
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
                                },
                            }}>
                                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', flex: 1, padding: 10 }}>
                                    <View style={{ height: 30, flex: 0.6, marginTop: 1, justifyContent: 'center', alignItems: "flex-start", marginLeft: 10 }}>

                                        <Text style={{ fontSize: 14, color: 'black', }}>Order No. : U3423568 </Text>

                                    </View>

                                    <View style={{ backgroundColor: '#ffcc00', flex: 0.4, borderRadius: 20, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ width: 30, marginLeft: 5 }}>
                                            <Image source={require('../assets/download1.png')}
                                                style={{
                                                    width: 10,
                                                    height: 13,
                                                }} />
                                        </View>
                                        <View style={{ marginLeft: -10 }}>
                                            <TouchableOpacity>
                                                <Text style={{ textAlign: 'left', fontSize: 10, color: 'white', }}>Download Invoice</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>
                                <View style={{
                                    height: 120, marginLeft: 20, flexDirection: 'row', width: "90%", justifyContent: "center", flex: 2
                                }}>
                                    <View style={{
                                        width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: '#fceeb5', flex: 0.3,
                                    }}>
                                        <Image
                                            resizeMode="contain"
                                            style={{
                                                width: 110, marginTop: 20,
                                                height: 100, alignSelf: 'center'
                                            }}
                                            source={require('../assets/dumble.png')} />

                                    </View>
                                    <View style={{
                                        flex: 0.7, height: 110, marginLeft: 10,
                                    }}>
                                        <Text style={{ marginLeft: 15, marginTop: 10, textAlign: 'left', fontSize: 15, color: '#000000', }}>The Flexibell</Text>
                                        <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 15 }}>
                                            <View style={{}}>
                                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total Paid Price :</Text>
                                            </View>
                                            <View style={{}}>
                                                <Text style={{ marginLeft: 10, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  498.00</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", flex: 1, margin: 10,
                                }}>
                                    <View style={{ marginTop: 8, height: 20, justifyContent: "center", alignItems: "center", flex: 0.3, }}>
                                        <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', fontWeight: "bold" }}>Order Status :</Text>
                                    </View>
                                    <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'column', height: 55, flex: 0.6, }}>
                                        <View style={{}}>
                                            <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', fontWeight: "bold" }}>Order Placed</Text>
                                        </View>
                                        <View style={{ marginTop: 10, }}>
                                            <Text style={{ textAlign: 'left', fontSize: 9, color: 'black' }}>on Sat 23 Jan 2022, 09:23 AM</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, flex: 0.1 }}>
                                        <TouchableOpacity>
                                            <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                                <Image source={require('../assets/rightArrow.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default MyOrder;