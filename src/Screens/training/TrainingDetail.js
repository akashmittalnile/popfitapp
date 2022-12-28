import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, Image, SafeAreaView, Dimensions, RefreshControl, Alert ,ScrollView} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { Pages } from 'react-native-pages';
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';
import Share from 'react-native-share';
import { async } from 'regenerator-runtime';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const TrainingDetail = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [TrainingWorkCatgry, setTrainingWorkCatgry] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const [userToken, setUserToken] = useState("");

    const { t } = useTranslation();
    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = () => {
      setrefreshing(true)
      workoutCategoryAPI();
      setrefreshing(false)
    }
    // const [subscriptiontoken, setsubscriptiontoken] = useState("");
    const [planid, setPlanId] = useState("");

    const gotoTrainingpersondetails = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        if (usertkn == null) {

            Alert.alert('', t('Please_login_first'))
        }
        else if (usertkn != null) {
            props.navigation.navigate("TrainingPersonaDetail")
        }


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

            // console.log(JSON.stringify(shareResponse));

        }
        catch (error) {
            // console.log('ERROR=>', error);
        }
    };
    useEffect(() => {
        workoutCategoryAPI()
        // const checktoken = async () => {
        //     const usertkn = await AsyncStorage.getItem("authToken");
        //     setUserToken(usertkn);
        // }
        // checktoken();
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     workoutCategoryAPI();
        // })
        // return unsubscribe;
    }, []);

    const gotoSubscriptionPlan = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        if (usertkn == null) {
            Alert.alert('', t('Please_login_first'))
        }
        else if (usertkn != null) {
            props.navigation.navigate("SubscriptionPlan")
        }

    }

    const Checkedtoken = async (item) => {
        // console.log("item:", item);
        const usertkn = await AsyncStorage.getItem("authToken");
        if (usertkn == null) {
            Alert.alert('', t('Please_login_first'))
        }
        else if (usertkn != null) {
            if (planid.plan_status == "Inactive" || planid.plan_id == "0") {
                if (item.plan_id.includes('1')) {
                    props.navigation.navigate("OutdoorTrainning", {
                        TrainingData: item,
                        categoryId: planid
                    })
                }
                else if (item.plan_id.includes('2')) {
                    props.navigation.navigate("SubscriptionPlan")
                    // console.log("ncludes+2:",item.plan_id.includes('2'));
                    // props.navigation.navigate("OutdoorTrainning", {
                    //     TrainingData: item,
                    //     categoryId: planid
                    // })
                }
                else if (item.plan_id.includes('3')) {
                    props.navigation.navigate("SubscriptionPlan")
                    // console.log("ncludes+3:",item.plan_id.includes('3'));
                    // props.navigation.navigate("OutdoorTrainning", {
                    //     TrainingData: item,
                    //     categoryId: planid
                    // })
                }

                else {
                    //   console.log("Buy+plan" );
                    props.navigation.navigate("SubscriptionPlan")
                }

            }
            else if (planid.plan_status == "Active" && planid.plan_id == "1") {
                if (item.plan_id.includes("1")) {
                    props.navigation.navigate("OutdoorTrainning", {
                        TrainingData: item,
                        categoryId: planid
                    })
                } else if (item.plan_id.includes("2") && item.user_plan_id == "2") {
                    props.navigation.navigate("OutdoorTrainning", {
                        TrainingData: item,
                        categoryId: planid
                    })
                } else {
                    props.navigation.navigate("SubscriptionPlan")
                }

            }
            else if (planid.plan_status == "Active" && planid.plan_id == "2") {
                if (item.user_plan_id == "2" && item.plan_id.includes("1")) {
                    props.navigation.navigate("OutdoorTrainning", {
                        TrainingData: item,
                        categoryId: planid
                    })
                } else if (item.plan_id.includes("2")) {
                    props.navigation.navigate("OutdoorTrainning", {
                        TrainingData: item,
                        categoryId: planid
                    })
                } else {
                    props.navigation.navigate("SubscriptionPlan")
                }

            }
            else if (planid.plan_status == "Active" && planid.plan_id == "3") {
                props.navigation.navigate("OutdoorTrainning", {
                    TrainingData: item,
                    categoryId: planid
                })
            }


        }

    }

    const workoutCategoryAPI = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {

            const response = await axios.get(`${API.TRAINING_WORKOUT_CATEGORY}`,
                { headers: { "Authorization": ` ${usertkn}` } }
            );
            // console.log("::::Traing_Workout_Response>>>::", response.data);
            // console.log("Traing_Workout_data:::>:::", response.data.data);
            setPlanId(response.data);
            // const Selectplainid = JSON.stringify(response.data?.plan_id);
            // await AsyncStorage.setItem('Planid', Selectplainid)
            // console.log("storeplanid:", Selectplainid);
            setTrainingWorkCatgry(response.data.data)
            setRecommendation(response.data.recommendation_category)

        }
        catch (error) {
            // console.log(".....TrainingDetails.error.........", error.response.data.message);
            Alert.alert("", t('Check_internet_connection'))

        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'black'
        }} >
            <Headers
                // navigation={props.navigation}
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
                BelliconononClick={() => {
                    props.navigation.navigate('Notifications')
                }}
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

                    <ScrollView nestedscrollenabled={true}
                  
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    >
                        <View style={{ backgroundColor: '#262626', height: 180, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                            <Pages indicatorColor='#ffcc00' >
                                <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                                    <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image source={require('../assets/trainningLogo.png')}
                                            style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                        <View style={{ height: 30, marginTop: 30, }}>
                                            <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', }}>{t('SetUp_Your_Training_Workout')}</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { gotoTrainingpersondetails() }}>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 150, flex: 1, backgroundColor: 'white', borderRadius: 50,padding:2 }}>
                                                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 9, color: '#ffcc00', }}> 
                                                        {t('Save_Edit_Details')}
                                                        </Text>
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
                                            <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', }}>{t('SetUp_Your_Training_Workout')}</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { gotoSubscriptionPlan() }}>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 140, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 9, color: '#ffcc00', }}>{t('View_Subscription_Plan')}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>

                            </Pages>
                        </View>
                        {/* Recommended category */}
                        <View style={{ flexDirection: "column" }}>
                            {
                                recommendation.length > 0 ?
                                    (<View style={{ marginTop: 20, marginLeft: 15, }}>
                                        <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 17, color: 'white', fontWeight: "500" }}>{t('Recommended_Categories')}</Text>
                                    </View>)
                                    :
                                    null
                            }

                            <FlatList
                                columnWrapperStyle={{
                                    flex: 1
                                }}
                                keyExtractor={(item, index) => String(index)}
                                numColumns={2}
                                data={recommendation}
                                style={{ paddingBottom: 20 }}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity onPress={() => { Checkedtoken(item) }}>
                                            <View
                                                style={{
                                                    marginTop: 20,
                                                    backgroundColor: 'white',
                                                    height: 180,
                                                    width: WIDTH * 0.45,
                                                    borderRadius: 20,
                                                    // marginBottom: 10,
                                                    marginHorizontal: 10,
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                }}>

                                                <View style={{ width: WIDTH * 0.45, backgroundColor: '#c9bca0', height: 25, justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.length >= 26 ? item?.cat_name?.slice(0, 26) + '...' : item?.cat_name?.slice(0, 26)}</Text>

                                                </View>
                                                <View
                                                    style={{
                                                        width: WIDTH * 0.45,
                                                        height: 130,
                                                        // borderTopRightRadius: 20,
                                                        // borderTopLeftRadius: 20, 
                                                        justifyContent: "flex-start", alignItems: "flex-start"
                                                    }}>
                                                    <Image
                                                        source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                                                        resizeMode="stretch"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            alignSelf: 'center',
                                                        }}
                                                    />


                                                </View>
                                                <View style={{ width: WIDTH * 0.45, height: 25, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                                                    <Text numberOfLines={1}  style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>{t('Subscription')} {item?.plan_name} {t('Plan')} </Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                        {/* Workout Category */}
                        <View style={{ flexDirection: "column" }}>
                            {
                                TrainingWorkCatgry.length > 0 ?
                                    (<View style={{ marginTop: 1, marginLeft: 15, }}>
                                        <Text numberOfLines={1} style={{ textAlign: 'left', fontSize: 17, color: 'white', fontWeight: "500" }}>{t('Workout_Categories')}</Text>
                                    </View>)
                                    : null
                            }

                            <FlatList
                                columnWrapperStyle={{
                                    flex: 1,

                                }}
                                keyExtractor={(item, index) => String(index)}
                                numColumns={2}
                                data={TrainingWorkCatgry}
                                style={{ paddingBottom: 20 }}
                                renderItem={({ item, index }) => {
                                    return (


                                        <TouchableOpacity onPress={() => { Checkedtoken(item) }}>
                                            <View
                                                style={{
                                                    marginTop: 20,
                                                    backgroundColor: 'white',
                                                    height: 180,
                                                    width: WIDTH * 0.45,
                                                    borderRadius: 20,
                                                    // marginBottom: 10,
                                                    marginHorizontal: 10,
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                }}>

                                                <View style={{ width: WIDTH * 0.45, backgroundColor: '#c9bca0', height: 25, justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.cat_name?.lenght >= 26 ? item?.cat_name?.slice(0, 26) + '...' : item?.cat_name?.slice(0, 26)}</Text>

                                                </View>
                                                <View
                                                    style={{
                                                        width: WIDTH * 0.45,
                                                        height: 130,
                                                        // borderTopRightRadius: 20,
                                                        // borderTopLeftRadius: 20, 
                                                        justifyContent: "flex-start", alignItems: "flex-start"
                                                    }}>
                                                    <Image
                                                        source={{ uri: item?.image != "" ? `${item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                                                        resizeMode="stretch"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundColor: "black",
                                                            alignSelf: 'center',
                                                        }}
                                                    />


                                                </View>
                                                <View style={{ width: WIDTH * 0.45, height: 25, borderBottomRightRadius: 20, justifyContent: 'center', borderBottomLeftRadius: 20, backgroundColor: '#262626' }}>
                                                    <Text numberOfLines={1}  style={{ textAlign: 'center', fontSize: 9, color: '#c9bca0' }}>{t('Subscription')} {item?.plan_name} {t('Plan')}</Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                </>)
                :
                (<CustomLoader showLoader={isLoading} />)}
        </SafeAreaView>

    );
}
export default TrainingDetail;
