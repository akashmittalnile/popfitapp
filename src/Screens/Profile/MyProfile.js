import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

const MyProfile = (props, navigation) => {

    const [isLoading, setIsLoading] = useState(false);
    // const [Username,setUsername]=useState("");
    // const[Useremail,setUseremail]=useState("");
    // const[Userphone,setUserphone]=useState("");
    const [Userprofile, setUserprofile] = useState([]);
    const [userprofile, setuserprofile] = useState("");
    const [profiledata, setprofiledata] = useState([]);

    const gotoEditMyProfile = () => {
        props.navigation.navigate("EditMyProfile")
    }
    const gotoChangePassword = () => {
        props.navigation.navigate("ChangePassword")
    }
    const gotoOrderdetails = () => {
        props.navigation.navigate("OrderDetail")
    }
    const gotoOutDoorCycle = () => {
        props.navigation.navigate("Training")
    }
    
    const gotoMyOrder = () => {
        props.navigation.navigate("MyOrder")
    }
    
    const getusertoken = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setuserprofile(usertkn)
    }

    // console.log("props.route.params::", props.route.params)
    const { UserProfile } = props.route.params

    useEffect(() => {
        getusertoken();
        // const checklogin = async () => {
        //     let Usertoken = await AsyncStorage.getItem("authToken");
        //     console.log("token.......", Usertoken);
        //     if (Usertoken == null) {
        //         props.navigation.navigate('LoginMain', {
        //             screen: 'LoginSignUp',
        //         });
        //         console.log("...............................");
        //     }
        //     else {
        //         console.log("??????????????error");
        //     }
        // };
        // checklogin();

        const unsubscribe = props.navigation.addListener('focus', () => {
            //  GetProfile()
            var str = UserProfile;
            setUserprofile(str)
        });
        return unsubscribe;

    }, [props, navigation]);

    const GetProfile = async () => {
        setIsLoading(true)
        console.log("sertoken.....ProfileIN...", userprofile);
        if (userprofile != null) {

            try {
                const response = await axios.get(`${API.GET_PROFILE}`, { headers:{ "Authorization": ` ${userprofile}` } });
                // console.log("", response);
                console.log("ResponseProfile ::::", response.data.success);
                if (response.data.success != null) {
                    setprofiledata(response.data.success)
                    console.log("User_token_not_received+yet!!!>>>", response.data.success.first_name);
                }
                setIsLoading(false)
            }
            catch (error) {
                console.log("Countryerror:", error.response.data.message);
                setIsLoading(false)
            }

        };
    };
    const DATA = ['first row', 'second row', 'third row'];
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
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
    }
    ];
    // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());


    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%', flexGrow: 1, backgroundColor: 'black'
        }} >
            {!isLoading ?
                (
                    <View style={{paddingBottom:50}}>
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
                        <View style={{ marginHorizontal: 10, marginTop: 30, height: 150, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                            <View style={{ margin: 5, flex: 1 / 3, borderRadius: 15 }}>
                                <Image source={{ uri: Userprofile.user_profile }} resizeMode="contain"
                                    style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 15, borderWidth: 1, backgroundColor: "black" }} />
                            </View>
                            <View style={{ margin: 5, flex: 1 / 1.2, flexDirection: 'column' }}>
                                <Text style={{ marginTop: 15, fontSize: 16, color: 'black' }}>{Userprofile.first_name ? Userprofile.first_name : profiledata.first_name + " " + Userprofile.last_name ? Userprofile.last_name : profiledata.last_name}</Text>
                                <View style={{ flex: 1 / 3, flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1.4, flexDirection: 'row' }}>
                                        <View style={{ width: 30, height: 30, marginTop: 5 }} >
                                            <Image source={require('../assets/message.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 23,
                                                    height: 16, alignSelf: 'center',
                                                }} />
                                        </View>
                                        <View style={{ width: 100, height: 20, marginTop: 3, marginLeft: 4 }} >
                                            <Text style={{ fontSize: 12, color: 'black', textAlign: 'left' }}>{Userprofile.email ? Userprofile.email : profiledata.email}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 15, flex: 1.5, flexDirection: 'row' }}>
                                        <View style={{ width: 30, height: 30, marginTop: 2 }} >
                                            <Image source={require('../assets/telephone.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20, alignSelf: 'center'
                                                }} />
                                        </View>
                                        <View style={{ width: 80, height: 20, marginTop: 3, marginLeft: 4 }} >
                                            <Text style={{ fontSize: 11, color: 'black', textAlign: 'left' }}>{Userprofile.phone ? Userprofile.phone : profiledata.phone}</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ flex: 1, height: 50, marginTop: 20, flexDirection: 'row' }}>

                                    <TouchableOpacity style={{ flex: 0.9 / 2 }} onPress={() => { gotoEditMyProfile() }}>
                                        <View style={{ borderWidth: 1, borderColor: '#ffcc00', borderRadius: 20, backgroundColor: 'white', height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 30, marginLeft: 17 }}>
                                                <Image source={require('../assets/edit.png')}
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                    }} />
                                            </View>

                                            <View style={{ flex: 1 }}>

                                                <Text style={{ marginLeft: -10, textAlign: 'left', fontSize: 10, color: '#ffcc00', }}>Edit Profile</Text>


                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flex: 1.1 / 2 }} onPress={() => { gotoChangePassword() }}>
                                        <View style={{ marginLeft: 6, borderWidth: 1, borderColor: '#ffcc00', borderRadius: 20, backgroundColor: 'white', height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 30, marginLeft: 14 }}>
                                                <Image source={require('../assets/lock2.png')}
                                                    style={{
                                                        width: 11,
                                                        height: 15,
                                                    }} />
                                            </View>
                                            <View style={{ flex: 1 }}>

                                                <Text style={{ marginLeft: -10, textAlign: 'left', fontSize: 10, color: '#ffcc00', }}>Change Password</Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                        
                        <View style={{ marginTop: 30, height: 45, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', }}>Recent Orders</Text>
                            </View>
                            <View style={{ flex: 1 / 3, right: 10 }}>
                                <TouchableOpacity onPress={() => { gotoMyOrder() }}>
                                    <View style={{ borderRadius: 24, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 9, color: 'white', }}>View All Orders</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ marginHorizontal: 10, marginTop: 10, height: 260, borderRadius: 10, backgroundColor: 'white' }}>
                            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', }}>
                                <View style={{ height: 50, flex: 1 / 2, marginTop: 20 }}>

                                    <Text style={{ fontSize: 14, color: 'black', }}>Order No. : U3423568 </Text>

                                </View>

                                <View style={{ marginTop: 15, marginLeft: 75, backgroundColor: '#ffcc00', flex: 1 / 3, borderRadius: 20, height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 30, marginLeft: 20 }}>
                                        <Image source={require('../assets/download1.png')}
                                            style={{
                                                width: 10,
                                                height: 13,
                                            }} />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: -10 }}>
                                        <TouchableOpacity>
                                            <Text style={{ textAlign: 'left', fontSize: 10, color: 'white', }}>Download Invoice</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </View>
                            <View style={{
                                height: 120, marginTop: 20, marginLeft: 30, flexDirection: 'row'
                            }}>
                                <View style={{
                                    width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#fceeb5'
                                }}>
                                    <Image
                                        style={{
                                            width: 110, marginTop: 20,
                                            height: 90, alignSelf: 'center'
                                        }}
                                        source={require('../assets/dumble.png')} />

                                </View>
                                <View style={{
                                    flex: 1, height: 100, marginLeft: 25
                                }}>
                                    <Text style={{ marginLeft: 22, marginTop: 10, textAlign: 'left', fontSize: 15, color: '#000000', }}>The Flexibell</Text>
                                    <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 22 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total Paid Price:</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  498.00</Text>
                                        </View>
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
                                    <TouchableOpacity onPress={() => { gotoOrderdetails() }}>
                                        <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                            <Image source={require('../assets/rightArrow.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, height: 45, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginLeft: 20, fontSize: 14, color: 'white', }}>Recent Training Activity</Text>
                            </View>


                        </View>
                        <FlatList
                            horizontal
                            data={newData}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { gotoOutDoorCycle() }}>

                                    <BackgroundImage source={{ uri: item.uri }} style={{ marginTop: 20, marginLeft: 20, justifyContent: 'space-between', width: 170, height: 120, overflow: 'hidden', borderRadius: 15 }}>
                                        <View style={{ width: 130, backgroundColor: '#c9bca0', height: 20, borderBottomRightRadius: 10, justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: 'black', }}>Resume Outdoor Cycle</Text>
                                        </View>
                                        <View style={{ height: 40, borderBottomRightRadius: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <View style={{ height: 30, width: 50 }}>
                                                <Image source={require('../assets/arrowWhiteBack.png')}
                                                    style={{
                                                        width: 40,
                                                        height: 30, alignSelf: 'center', borderBottomRightRadius: 10, marginRight: -8
                                                    }} />
                                            </View>
                                        </View>
                                    </BackgroundImage>
                                </TouchableOpacity>
                            }
                        />
                    </View>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView>
    );
}

export default MyProfile;
