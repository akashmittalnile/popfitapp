import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    Pressable,
    Modal,
    SafeAreaView,
    Dimensions,
    ScrollView,
    RefreshControl
} from 'react-native';
import Headers from '../../Routes/Headers';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import CustomLoader from '../../Routes/CustomLoader';
import { async } from 'regenerator-runtime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Exploreshop = props => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [shopcategory, setShopcategory] = useState([]);
    const [planid, setPlanId] = useState("");


    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = () => {
        setrefreshing(true)
        GetRecipecategory()
        setrefreshing(false)
    }
    const gotoRecipeDetails = async (item) => {
        const usertkn = await AsyncStorage.getItem("authToken");
        if (usertkn == null) {
            // Alert.alert('', t('Please_login_first'))
            props.navigation.navigate("ClothesType", {
                Clothexploreid: item.id
            })
        }
        else if (usertkn != null) {
            props.navigation.navigate("ClothesType", {
                Clothexploreid: item.id
            })
        }
    };

    useEffect(() => {
        GetRecipecategory()
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     GetRecipecategory()
        // })
        // return unsubscribe;


    }, []);
    const GetRecipecategory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API.EXPLORE_SHOP}`);
            // console.log(":::::::::Recipe_Category_Response>>>", response.data.recipeData);
            // console.log(".....Recipe_category....", response.data.recipeData)
            setShopcategory(response.data.shops);
            setPlanId(response.data);

        }
        catch (error) {
            // console.log("......error.........", error.response.data.message);
            //Alert.alert("Something went wrong!", error.response.data.message);
            Alert.alert("", t('Check_internet_connection'))
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, backgroundColor: 'black', flexGrow: 1
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
                (<View style={{ paddingBottom: 60 }}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    >


                        <View style={{ marginTop: 15, height: 30, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 17,
                                        color: 'white'
                                    }}>
                                    {t('Store_Categories')}
                                </Text>
                            </View>
                        </View>
                        <FlatList
                            vertical
                            numColumns={2}
                            // style={{ margin: 0 }}
                            keyExtractor={(item, index) => String(index)}
                            data={shopcategory}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        gotoRecipeDetails(item);
                                    }}>
                                    <View
                                        style={{
                                            marginBottom: 10,
                                            marginTop: 10,
                                            marginHorizontal: 10,
                                            height: 180,
                                            width: WIDTH * 0.45,
                                            overflow: 'hidden',
                                            borderRadius: 20,
                                            backgroundColor: '#f7f7f7',
                                            backgroundColor: "lightgray",
                                            shadowColor: '#000000',
                                            shadowRadius: 5,
                                            shadowOpacity: 1.0,
                                            elevation: 6,
                                        }}>

                                        <View
                                            style={{
                                                width: WIDTH * 0.45, height: 180, borderTopRightRadius: 20,
                                                borderTopLeftRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                                            }}>
                                            <Image
                                                source={{ uri: item?.image != null ? `${planid?.image_path + item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                                                resizeMode="stretch"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderTopLeftRadius: 20,
                                                    borderTopRightRadius: 20,
                                                    alignSelf: 'center',
                                                    backgroundColor: "black"
                                                }}
                                            />
                                            <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.shop_name?.length >= 13 ? item?.shop_name?.slice(0, 13) + ' ...' : item?.shop_name?.slice(0, 13)}</Text>

                                            </View>

                                        </View>


                                    </View>
                                </TouchableOpacity>
                            )}
                        />

                    </ScrollView>
                </View>)
                :
                (<CustomLoader showLoader={isLoading} />)}

        </SafeAreaView>
    );
};
export default Exploreshop;
