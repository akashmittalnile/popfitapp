import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Pages } from 'react-native-pages';
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import Share from 'react-native-share';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const TrainingDetail = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [TrainingWorkCatgry, setTrainingWorkCatgry] = useState([]);

    const [subscriptiontoken, setsubscriptiontoken] = useState("");
    const [planid, setPlanId] = useState("");

    const gotoTrainingpersondetails = () => {
        props.navigation.navigate("TrainingPersonaDetail")
    };

    const MycustomonShare = async () => {
        const shareOptions = {
            title: 'App link',
            icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
            // type: 'data:image/png;base64,<imageInBase64>',
            message: "'Please install this app and stay safe!",
            url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        }
        try {
            const shareResponse = await Share.open(shareOptions);
            console.log('====================================');
            console.log(JSON.stringify(shareResponse));
            console.log('====================================');
        }
        catch (error) {
            console.log('ERROR=>', error);
        }
    };
    useEffect(() => {
        // const getusertoken = async () => {
        //     const usertoken = await AsyncStorage.getItem("authToken");
        //     console.log("Training>>>>>..", usertoken);
        //     setsubscriptiontoken(usertoken)
        //     if (usertoken == null) {
        //         console.log("..........USER..NOT LOGIN...................");
        //         props.navigation.navigate('LoginMain', {
        //             screen: 'LoginSignUp',
        //         });
        //     }
        //     else {
        //         // props.navigation.navigate("SubscriptionPlan")
        //         console.log("............USER LOGIN...................");
        //     }
        // }
        // getusertoken();
        workoutCategoryAPI();
    }, []);


    const Checkedtoken = (item) => {
        props.navigation.navigate("OutdoorTrainning", {
            TrainingData: planid,
            categoryId: item
        })

    }

    const workoutCategoryAPI = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {

            const response = await axios.get(`${API.TRAINING_WORKOUT_CATEGORY}`,
                // { headers: { "Authorization": ` ${usertkn}` } }
            );
            console.log("::::Traing_Workout_Response>>>::", response.data);
            // console.log("Traing_Workout_data:::>:::", response.data.data);
            setPlanId(response.data);
            const Selectplainid = JSON.stringify(response.data?.plan_id);
            await AsyncStorage.setItem('Planid', Selectplainid)
            console.log("storeplanid:", Selectplainid);
            setTrainingWorkCatgry(response.data.data)
            setIsLoading(false);
        }
        catch (error) {
            console.log(".....TrainingDetails.error.........", error.response.data.message);
            setIsLoading(false);

        }
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
        }} >
            <Headers
                Drawericon={{
                    visible: true,
                }}
                DrawericononClick={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}

                CartIcon={{
                    visible: true,
                }}
                CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

                Bellicon={{
                    visible: true,

                }}
                BelliconononClick={() => { props.navigation.navigate('Notifications') }}
            />
            {!isLoading ?
                (<>

                    {/* <View style={styles.navigationBarBlack1}>
                <View style={styles.navigationBarLeftContainer}>
                    <TouchableOpacity onPress={() => { openDrawer() }}>
                        <Image source={require('../assets/hamburgerLeft.png')}
                            style={{
                                width: 25,
                                height: 25, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>

                <View style={styles.navigationBarCenterContainer}>
                    <TouchableOpacity>
                        <Image resizeMode='contain'
                            source={require('../assets/layerCenter.png')}
                            style={{
                                width: 80,
                                height: 50, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>

               <View style={styles.navigationBarRight2Container}>
              <TouchableOpacity onPress={() => { gotoCartAdded() }}>
                <Image resizeMode="contain"
                  source={require('../assets/cart.png')}
                  style={{
                    width: 25,
                    height: 30, alignSelf: 'center', 
                    marginRight: 10
                  }} />

              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: '#ec1f1f',
                  width: 10,
                  height: 10,
                  borderRadius: 10 / 2,
                  // marginLeft: 30,
                  marginTop: -15,
                  right: 15
                }}>

              </View>
            </View>

            <View style={styles.navigationBarRightContainer}>
              <TouchableOpacity onPress={() => { gotoNotification() }}>
                <Image source={require('../assets/bellRight.png')}
                  style={{
                    width: 20,
                    height: 25, alignSelf: 'center', marginRight: 19
                  }} />

              </TouchableOpacity>
            </View>
            </View> */}
                    <Divider color='#393939' width={1.2} />
                    <ScrollView>
                        <View style={{ backgroundColor: '#262626', height: 180, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                            <Pages indicatorColor='#ffcc00' >
                                <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                                    <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image source={require('../assets/trainningLogo.png')}
                                            style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                        <View style={{ height: 30, marginTop: 30, }}>
                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { gotoTrainingpersondetails() }}>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 120, flex: 1, backgroundColor: 'white', borderRadius: 50 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 9, color: '#ffcc00', }}>Save & Edit Details</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                                    <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image source={require('../assets/trainningLogo.png')}
                                            style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                        <View style={{ height: 30, marginTop: 30, }}>
                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Save Detail</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { MycustomonShare() }}>
                                                <View style={{ marginLeft: 10, borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Invite Friends</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                            </Pages>
                        </View>

                        {/* Workout Category */}
                        <Text style={{ marginTop: 20, marginLeft: 15, textAlign: 'left', fontSize: 18, color: 'white', fontWeight: "bold" }}>Workout Categories</Text>
                        <FlatList
                            columnWrapperStyle={{
                                flex: 1,
                                justifyContent: "space-around"
                            }}
                            keyExtractor={(item, index) => index}
                            numColumns={2}
                            data={TrainingWorkCatgry}
                            style={{ paddingBottom: 20 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => { Checkedtoken(item) }}>
                                    <View
                                        style={{
                                            marginTop: 20,
                                            backgroundColor: 'white',
                                            height: 180,
                                            width: WIDTH * 0.45,
                                            borderRadius: 25,
                                            // marginBottom: 10,
                                            marginHorizontal: 10,
                                            justifyContent: "center",
                                            alignItems: 'center',
                                        }}>

                                        <View
                                            style={{
                                                width: WIDTH * 0.45, height: 150, borderTopRightRadius: 20,
                                                borderTopLeftRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                                            }}>
                                            <Image
                                                source={{ uri: `${item.image}` }}
                                                resizeMode="stretch"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderTopLeftRadius: 20,
                                                    borderTopRightRadius: 20,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                            <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name}</Text>

                                            </View>

                                        </View>
                                        <View style={{ width: WIDTH * 0.45, height: 30, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>Subscription {item?.plan_name} @ {item?.plan_price} {item.plan_type} </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </>)
                :
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ffcc00" />
                </View>)}
        </SafeAreaView>

    );
}
export default TrainingDetail;
