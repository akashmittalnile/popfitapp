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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const MyOrder = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [value, setValue] = useState('');
    const [Myorderslist, setMyorderslist] = useState("");
    const [ordereditem, setordereditem] = useState([]);
    const [ordermsg, setordermsg] = useState("");
    const [msg, setMsgAlert] = useState(false);

    const gotoOrderDetail = (item) => {
        props.navigation.navigate("OrderDetail", {
            Gotoorderdetails: item
        })
    };


    useEffect(() => {
        MyorderApi(null);
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     MyorderApi(value);
        //     return unsubscribe;
    }, []);


    // console.log("select filter", value);

    const MyorderApi = async (values) => {
        // console.log("select filter", values);

        const ordertoken = await AsyncStorage.getItem("authToken");
        console.log(".....MY_order token get_in MYORDER::", ordertoken);
        console.log('====================================');
        console.log("Search VAlue in api", values);
        console.log('====================================');

        setIsLoading(true);
        try {
            const response = await axios.post(`${API.MY_ORDER}`, { "search": values == null? values:null }, { headers: { "Authorization": ` ${ordertoken}` } });
            // console.log("", response);
            // console.log("Response_MYorders  ::::", response.data.success);
            // console.log('====================================');
            console.log("Response MY_Orders  ::::", response.data.order);
            // console.log('====================================');
            // if (response.data.status == 1) {
            console.log("................", response.data.order.length);
            if (response.data.order.length == 0) {

                setordereditem(null)
                setIsLoading(false);
            } else {
                setordereditem(response.data.order);
                setIsLoading(false);
                // setrefresh(!refresh)
            }
            //   console.log("User_token_not_received+yet!!!>>>", response.data.success.first_name);


        }
        catch (error) {
            // console.log("Countryerror:", error.response.data.message);
            Alert.alert("something went wrong !", error.response.data.message);
            setordermsg(response.data.message)
            setMsgAlert(true);
            setIsLoading(false);
        }
    };
    // const SearchOrder_filter = async () => {
    //     console.log("SearchOrder_filter.....");
    //     // setIsLoading(true);
    //     try {
    //         const response = await axios.post(`${API.SEARCH_ORDER_FILTER}`, { "search": 1 });
    //         console.log(":::::::::ProductRemovecart_Response>>>", response.data.data);
    //         console.log("status _ProductRemovecart:", response.data.status);

    //         // setProductitems(response.data.data)
    //         // setIsLoading(false);
    //     }
    //     catch (error) {
    //         console.log("......error.........", error.response.data.message);
    //         // setIsLoading(false);

    //     }

    // };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, backgroundColor: 'white', flexGrow: 1
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
                        msg ?
                            (<View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#ffcc00", fontSize: 17, }}>{ordermsg}</Text></View>)
                            :
                            (null)
                    }
                    <View style={{ height: 50, marginHorizontal: 10, marginVertical: 20 }}>
                        <DropDownPicker
                            items={[
                                { label: 'Today', value: 'today' },
                                { label: '30 Days', value: '30_days' },
                                { label: '60 Days', value: '60_days' },
                                { label: '90 Days', value: '90_days' },
                                { label: '120 Days', value: '120_days' },
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
                            // setValue={(v) => {
                            //     setValue(v)
                            //     MyorderApi(v)
                            // }
                            // }
                            scrollViewProps={{
                                decelerationRate: "medium", ScrollView: "#ffcc00"
                            }}
                            onChangeText={(item) => setValue(item)}

                            onChangeValue={(value) => {
                                MyorderApi(value)

                            }}

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
                    <ScrollView>
                        {
                            ordereditem.length > 0 ?
                            ( <>
                                <FlatList
                                    vertical
                                    data={ordereditem}
                                    keyExtractor={(_e, index) => index}
                                    // style={{ margin: 10 }}
                                    scrollEnabled={false}
                                    renderItem={({ item }) => {
                                        return <View style={{
                                            marginHorizontal: 10,
                                            height: 240,
                                            width: WIDTH * 0.95,
                                            borderRadius: 10,
                                            backgroundColor: 'white',
                                            // width: 380,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            shadowColor: '#000000',
                                            shadowRadius: 6,
                                            shadowOpacity: 1.0,
                                            elevation: 6,
                                            flexDirection: "column",
                                            marginBottom: 10
    
                                        }}>
    
                                            <View style={{ height: 50, width: WIDTH * 0.92, flexDirection: 'row', padding: 10, justifyContent: "space-between", }}>
    
                                                <View style={{ height: 30, marginTop: 1, justifyContent: 'flex-start', alignItems: "flex-start", marginLeft: 1, }}>
    
                                                    <Text style={{ fontSize: 14, color: '#455A64', fontWeight: "500" }}>Order No. : <Text style={{ fontSize: 14, color: '#FFCC00', }}> {item.order_number}</Text></Text>
    
    
                                                </View>
    
                                                <View style={{ backgroundColor: '#ffcc00', borderRadius: 20, height: 30, width: 140, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                                    <View style={{ width: 30, marginLeft: 6 }}>
                                                        <Image source={require('../assets/download1.png')}
                                                            style={{
                                                                width: 10,
                                                                height: 13,
                                                            }} />
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={{marginLeft:-10}}>
                                                            <Text style={{ textAlign: 'left', fontSize: 10, color: 'white', }}>Download Invoice</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
    
    
                                            </View>
    
                                            <View style={{
                                                height: 120,
                                                flexDirection: 'row',
                                                width: WIDTH * 0.92,
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                // backgroundColor: 'red',
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
                                                            borderRadius: 10,
                                                            height: "100%", alignSelf: 'center',
    
                                                        }}
                                                        source={{ uri: item.product_image }} />
    
                                                </View>
    
                                                <View style={{
                                                    justifyContent: "flex-start", alignItems: "flex-start", width: WIDTH * 0.97, marginLeft: 15,
                                                }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 15, color: '#455A64', fontWeight: "600" }}>{item.product_name.slice(0, 25) + '...'}</Text>
    
                                                    <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", height: 60, width: WIDTH * 0.97 }}>
    
    
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View>
                                                                <Text style={{ textAlign: 'left', fontSize: 14, color: '#455A64' }}>Price : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#77869E' }}>$ {item.product_price}</Text></Text>
                                                            </View>
    
                                                        </View>
    
                                                        {/* <View style={{ flexDirection: 'row', marginLeft: 17,marginTop: 3 }}>
                                                    <View style={{}}>
                                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000',fontWeight:"bold" }}>Tax : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 10, color: '#000000', }}>$ {item?.tax}</Text></Text>
                                                    </View>
    
                                                </View>
    
                                                <View style={{ flexDirection: 'row', marginLeft: 25 ,marginTop: 3,}}>
                                                    <View style={{}}>
                                                        <Text style={{ textAlign: 'left', fontSize: 12, color: '#000000',fontWeight:"bold" }}>Total : <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 10, color: '#000000' }}>$ {item.total_price}</Text></Text>
                                                    </View>
    
                                                </View> */}
                                                    </View>
                                                </View>
    
    
                                            </View>
                                            {/* <View style={{
                                                height: 120, marginLeft: 0, flexDirection: 'row', width: WIDTH * 0.9, justifyContent: "center", flex: 2, backgroundColor: "pink",marginTop:10
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
                                                            <Text style={{ marginLeft: 10, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  {item.total_price}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View> */}
    
                                            <View style={{
                                                marginTop: 10, flexDirection: 'row', justifyContent: "flex-start", flex: 1, margin: 10, height: 70, width: WIDTH * 0.92
                                            }}>
                                                <View style={{ marginTop: 9, height: 20, justifyContent: "center", alignItems: "center", flex: 0.3, }}>
                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: '#353535', fontWeight: "500" }}>Order Status :</Text>
                                                </View>
    
                                                {item.order_status == "1" ?
                                                    (<View style={{ flexDirection: 'column', height: 55, flex: 0.6, }}>
                                                        <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "400" }}>Order placed</Text>
                                                        <View style={{ marginTop: 6, }}>
                                                            <Text style={{ textAlign: 'left', fontSize: 9, color: '#455A64',fontWeight: "400" }}>on {item.created_at}</Text>
                                                        </View>
                                                    </View>)
                                                    :
                                                    (
                                                        <View style={{ flexDirection: 'column', height: 55, flex: 0.6, }}><Text style={{ marginTop: 10, textAlign: 'left', fontSize: 14, color: '#455A64', fontWeight: "400" }}>data not available</Text>
                                                        </View>)
    
                                                }
                                                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, flex: 0.1 }}>
                                                    <TouchableOpacity
                                                        onPress={() => gotoOrderDetail(item)}>
                                                        <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                                            <Image source={require('../assets/rightArrow.png')}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
    
                                    }
                                    }
                                />
                            </>)
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
                                marginTop:160,
                                shadowColor: '#000000',
                            shadowRadius: 6,
                            shadowOpacity: 1.0,
                            elevation: 6,
                            }}>
                                <Image resizeMode='contain'
                                    source={require('../assets/Nodatafound.png')}
                                    style={{
                                        width: 200,
                                        height: 120, alignSelf: 'center'
                                    }} />
                                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black'  }}>Oops, Order list is empty !</Text>
                            </View>)
                        }
                       
                    </ScrollView>
                </>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView>
    )
}

export default MyOrder;