import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import Headers from '../../Routes/Headers';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const FitnessEquipment = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [shopitems, setshopitems] = useState([]);
  const [imagepath, setimagepath] = useState('');
  // const [FilterPopup, setFilterPopUp] = useState(false);
  const { t } = useTranslation();

  const gotoDumbleSet = (item) => {

    props.navigation.navigate("DumbleSet", {
      categoryID: item.id,
      SHOPID: FitnessID
    })


  }

  // console.log("FITNESS_storeId......:", props?.route?.params?.FitnessstoreId);
  const FitnessID = props?.route?.params?.FitnessstoreId;
  useEffect(() => {
    FitnessStoresProduct();

    // const unsubscribe = props.navigation.addListener('focus', () => {


    // });
    // return unsubscribe;

  }, []);

  const FitnessStoresProduct = async () => {
    const Token = await AsyncStorage.getItem("authToken");

    // var fitnessdata = new FormData();
    // fitnessdata.append('shop_id', FitnessID);
    // console.log("FitnessStoresProduct_append data::::",fitnessdata);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.SHOP_CATEGORY}`, { 'shop_id': FitnessID },
        { headers: { "Authorization": ` ${Token}` } }
      );
      // console.log(":::::::::FitnessEquipmentStore_Response>>>", response.data.shop_category);
      // console.log("status _FitnessEquipment", response.data.status);
      setimagepath(response.data.image_path);
      if (response.data.shop_category.length != 0) {
        setshopitems(response.data.shop_category)

        // setIsLoading(false);
      } else {
        // Alert.alert("Fitness product status==0 found from backend side");
        // setIsLoading(false);
      }

    }
    catch (error) {
      Alert.alert("", t('Check_internet_connection'))
      // console.log("......error.........", error.response.data.message);
      // Alert.alert("FitnessEquipment Store!", error.response.data.message)
    
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
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
        (<View>

          <ScrollView >

            <View style={{ height: 50, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width: "95%", marginHorizontal: 16 }}>
              <View style={{ justifyContent: "center", alignItems: "center", }}>
                <Text
                  style={{
                    // marginLeft: 10,
                    marginTop: 20,
                    textAlign: 'left',
                    fontSize: 18,
                    color: 'black',
                    fontWeight: "500"
                  }}>
                  {t('Fitness_Equipment')}
                </Text>
              </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", position: "absolute", right: 20, top: 18, flex: 1, width: 40, height: 30 }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center', flex: 0.5
                    // marginRight: 5,
                  }}
                  onPress={() => {
                    setFilterPopUp(true);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ffcc00',
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30 / 2,
                    }}>
                    <Image source={require('../assets/filter.png')} />
                  </View>
                </TouchableOpacity>

              </View> */}
            </View>

            <FlatList
              vertical
              // showsHorizontalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: "space-between"
              }}
              // style={{ margin: 10 }}
              keyExtractor={(item, index) => String(index)}
              data={shopitems}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    gotoDumbleSet(item)
                  }}>
                    <View
                      style={{
                        marginBottom: 6,
                        marginTop: 15,
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
                          source={{ uri: item?.image !=  null ? `${imagepath + item?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignSelf: 'center',
                          }}
                        />
                        <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                          <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "500" }}>{item?.name?.slice(0, 15) + '...'}</Text>

                        </View>

                      </View>


                    </View>
                    {/* <BackgroundImage
                    source={{ uri: `${imagepath + item?.image}` }}
                    style={{
                      marginBottom: 6,
                      marginTop: 6,
                      marginHorizontal: 6,
                      // justifyContent: 'space-between',
                      height: 180,
                      width: WIDTH * 0.45,
                      overflow: 'hidden',
                      borderRadius: 15,
                      backgroundColor: '#f7f7f7',
                      // backgroundColor: "lightgray",
                      shadowColor: '#000000',
                      shadowRadius: 5,
                      shadowOpacity: 1.0,
                      elevation: 6,


                    }}>

                    <View style={{ width: 115, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                      <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', fontWeight: "bold" }}>{item.name.slice(0, 15) + '...'}</Text>

                    </View>

                  </BackgroundImage> */}
                  </TouchableOpacity>
                )
              }}
            />


            
          </ScrollView>
        </View>)
        :
        ( <CustomLoader showLoader={isLoading}/>)}
    </SafeAreaView>
  );
};

export default FitnessEquipment;
