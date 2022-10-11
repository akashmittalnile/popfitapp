// import { Platform } from 'react-native';

// export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4242' : 'http://127.0.0.1:4242'

import React, { useState, useEffect, useRef } from 'react';
import { StripeProvider, CardField, useStripe, } from '@stripe/stripe-react-native';
import { Text, View, TouchableOpacity, Image, Keyboard, ScrollView, Platform } from 'react-native';
import { COLORS } from '../CustomComponent/Colors';
import { Header } from '../CustomComponent/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './../Payment/styles';
import { ImagesUrl } from '../CustomComponent/ImageUrl';
import { InputField } from '../commonComponents';
import { STRING } from '../CustomComponent/string';
import { useNavigation } from '@react-navigation/native';
import APIConstants from '../Network/APIConstants';
import { requestGetApi, requestPostApiMedia } from '../Network/Service_fetch';
import Loader from '../CustomComponent/Loader';
import CustomAlert from '../CustomComponent/CustomAlert';
import { getAsyncStorage, setAsyncStorage } from '../CustomComponent/AsynstorageClass';
import { useSelector } from 'react-redux';
function StripePayment(props) {
  //const [publishableKey, setPublishableKey] = useState('pk_test_51K2OEZLLHLIz3pFE2dsbxOQdfQYN3eM7O3Pcplb05Kyn9WFvFdiKyXWnGsBIvGJJGXPvo5k9HBYpHf3xoUi8MjYw00o72ueWf0');
  const [publishableKey, setPublishableKey] = useState('pk_live_51K2OEZLLHLIz3pFE1AuNWhIrVYO3WrbLTsE4EjV4ijcNdnZA79Ulz7bAtDkKLpEQU7sG99OHOPoRqf6SETxIUlUV00IQPNjyvn');
  const { selectPlanData } = props.route.params
  console.log("selectPlanData", selectPlanData)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isCreditcard, setCreditcard] = useState(false);
  const [cardList, setCardList] = useState([]);
  const { confirmPayment, createToken } = useStripe();
  const [cardDetails, setCardDetails] = useState({})
  const [token, setToken] = useState()
  const [confirmData, setConfirmData] = useState({})
  const API_URL = 'https://rigorous-heartbreaking-cephalopod.glitch.me'
  const [name, setName] = useState("")
  const navigation = useNavigation();
  //console.log("isKeyboardOpen::", selectPlanData.data.plan_id)
  //const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  let isKeyboardOpen = useRef(false)
  const [alert_msg, setAlert_msg] = useState("");
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [selectedCardID, setSelectedCardID] = useState("");
  const user_d = useSelector(state => state.signup_reducer.signupDetails)
  console.log("user_d", user_d)
  useEffect(() => {
    let unsubscribe = props.navigation.addListener('focus', () => {
      if (user_d.SignUp_Screen != "SignUp_bussiness") {
        getCardList();
      }

    });
    return unsubscribe;
  }, []);

  const getCardList = async () => {
    //setLoading(true)
    const token = await getAsyncStorage("token")
    const body = {
    }
    const { responseJson, err } = await requestGetApi(APIConstants.get_card_list, body, 'GET', token)
    setLoading(false)
    // console.log("response", responseJson.data);
    setCardList(responseJson.data);
    for (let i = 0; i <= responseJson.data.length; i++) {
      //console.log(responseJson.data[i].status, "i.status")
      if (responseJson.data[i].status == "1") {
        setSelectedCardID(responseJson.data[i].card_id)
      }
    }
  }
  const getToken = (props) => {
    // createToken(cardDetails).then(res => { console.log("res::", res); setToken(res.token.id) })
    createToken(
      { cardDetails, type: 'Card' }).then((res, error) => {
        console.log("res.error::", res)
        // if (res.error.type == null) {
        //   setAlertVisibility(true);
        //   setAlert_msg('Please Enter Card details!')
        // } else {
        saveCard(res.token.card.last4, res.token.card.expMonth, res.token.card.expYear,
          res.token.id, res.token.card.brand)
        //}

      }).catch((e) => {
        setAlertVisibility(true);
        setAlert_msg('Please Enter Valid Card details!')
      }
      )
  }
  const billingDetails = {
    email: 'Xpede2022@gmail.com',
  };

  const saveCard = async (last4, expMonth, expYear, id, brand) => {
    setLoading(true)
    if (user_d.SignUp_Screen == "SignUp_bussiness") {
      if (user_d.screen == "") {
        // plateform_type(1:Android 2:ios ),login_width(1:Google Gmail 2:Facebook 3:Web") user_type:2(2:User 3:Drive)
        const formData = new FormData()
        formData.append('first_name', user_d.firstName);
        formData.append('last_name', user_d.lastName);
        formData.append('email', user_d.email);
        formData.append('mobile_number', user_d.phoneNumber);
        formData.append('password', user_d.Password);
        formData.append('account_type', 2);
        formData.append('user_type', 2);
        if (Platform.OS == 'ios') {
          formData.append('plateform_type', 2);
        } else {
          formData.append('plateform_type', 1);
        }
        formData.append('login_with', 3);
        formData.append('business_name', user_d.businessName);
        formData.append('business_contact_number', user_d.BusinessContactNo);
        formData.append('designation', user_d.designation);
        formData.append('business_email', user_d.businessEmailId);
        formData.append('fcm_token', user_d.fcm_token);
        formData.append('home_lat', user_d.home_lat);
        formData.append('home_lang', user_d.home_lang);
        formData.append('country_code', user_d.country_code)
        console.log("foem data", formData)
        const { responseJson, err } = await requestPostApiMedia(APIConstants.register, formData, 'POST');
        //setLoading(false)
        console.log("res::", responseJson);
        if (responseJson.status) {
          const token = responseJson?.token
          saveCardDetails(last4, expMonth, expYear, id, brand, token);
          await setAsyncStorage("token", token)
          await setAsyncStorage("Username", responseJson.data[0].first_name);
          setAsyncStorage("UserId", JSON.stringify(responseJson.data[0].id));
          setAsyncStorage("userType", JSON.stringify(responseJson.data[0].account_type));
          await setAsyncStorage("mobile_number", responseJson.data[0].mobile_number)
        } else {
          setAlertVisibility(true);
          setAlert_msg(responseJson.message)
        }
      } else {
        const formData = new FormData()
        formData.append('first_name', user_d.firstName);
        formData.append('last_name', user_d.lastName);
        formData.append('email', user_d.email);
        formData.append('mobile_number', user_d.phoneNumber);
        formData.append('password', user_d.Password);
        formData.append('account_type', 2);
        formData.append('user_type', 2);
        if (Platform.OS == 'ios') {
          formData.append('plateform_type', 2);
        } else {
          formData.append('plateform_type', 1);
        }
        if (user_d.screen == "FbLogin") {
          formData.append('login_with', 2);
        } else if (screen == "AppleLogin") {
          formData.append('login_with', 4);
        } else {
          formData.append('login_with', 1);
        }
        formData.append('business_name', user_d.businessName);
        formData.append('business_contact_number', user_d.BusinessContactNo);
        formData.append('designation', user_d.designation);
        formData.append('business_email', user_d.businessEmailId);
        formData.append('fcm_token', user_d.fcmToken);
        formData.append('auth_id', user_d.auth_id);
        formData.append('home_lat', user_d.home_lat);
        formData.append('home_lang', user_d.home_lang);
        formData.append('country_code', user_d.country_code)
        console.log("foem data", formData)
        const { responseJson, err } = await requestPostApiMedia(APIConstants.social_login, formData, 'POST');
        // setLoading(false)
        console.log("res::", responseJson);
        if (responseJson.status) {
          const token = responseJson?.token
          saveCardDetails(last4, expMonth, expYear, id, brand, token);
          await setAsyncStorage("token", token)
          await setAsyncStorage("Username", responseJson.data[0].first_name);
          setAsyncStorage("UserId", JSON.stringify(responseJson.data[0].id));
          setAsyncStorage("userType", JSON.stringify(responseJson.data[0].account_type));
          await setAsyncStorage("mobile_number", responseJson.data[0].mobile_number)
        } else {
          setAlertVisibility(true);
          setAlert_msg(responseJson.message)
        }
      }
    } else {
      const token = await getAsyncStorage("token")
      saveCardDetails(last4, expMonth, expYear, id, brand, token);
    }

  }
  const saveCardDetails = async (last4, expMonth, expYear, id, brand, token) => {
    //const token = await getAsyncStorage("token")
    console.log("token:::", token)
    if (name == "") {
      setAlertVisibility(true);
      setAlert_msg("Please Enter Card Holder Name!");
      return;
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('plan_id', selectPlanData.id);
    formData.append('card_number', last4);
    formData.append('expiry_month', expMonth);
    formData.append('expiry_year', expYear);
    formData.append('stripe_token', id);
    formData.append('card_type', brand);
    formData.append('card_holder_name', name);
    console.log('formData::::::', formData)
    const { responseJson, err } = await requestPostApiMedia(APIConstants.create_subscription, formData, 'POST', token)
    setLoading(false)
    console.log("Response +++", responseJson.status);
    if (responseJson.status) {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
    else {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
  }
  const subscriblePlan = async (card_id) => {
    const token = await getAsyncStorage("token")
    const formData = new FormData()
    formData.append('plan_id', selectPlanData.id);
    formData.append('card_id', selectedCardID);
    console.log("formData", formData);
    const { responseJson, err } = await requestPostApiMedia(APIConstants.create_subscription, formData, 'POST', token)
    //setLoading(false)
    console.log("Response +++", responseJson);
    if (responseJson.status) {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
    else {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
  }


  const openAlert = () => {
    if (alert_msg == "Please Enter Card Number!") {
      setAlertVisibility(false)
    }
    if (alert_msg == "Subscription has been purchased successfully ") {
      setAlertVisibility(false)
      props.navigation.navigate("DrawerNavs");
    } if (alert_msg == "Successfully Registered") {
      navigation.navigate("DrawerNavs");
      setAlertVisibility(false)
    } else {
      //props.navigation.navigate("DrawerNavs");
      setAlertVisibility(false)
    }
  }
  const closeAlert = () => {
    setAlertVisibility(false)
  }
  const makeCardDefault = async (id, status, item) => {
    setSelectedCardID(id)
    const token = await getAsyncStorage("token")
    const formData = new FormData()
    formData.append('id', id);
    formData.append('status', status);
    const { responseJson, err } = await requestPostApiMedia(APIConstants.make_card_default, formData, 'POST', token)
    console.log("formData +++", formData);
    console.log("Response +++", responseJson);
    getCardList();
    if (responseJson.status) {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
    else {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
  }
  const deleteCard = async (id) => {
    console.log("id::", id)
    const token = await getAsyncStorage("token")
    const formData = new FormData()
    formData.append('id', id);
    const { responseJson, err } = await requestGetApi(APIConstants.delete_card, formData, 'POST', token)
    console.log("formData +++", formData);
    console.log("Response +++", responseJson);
    getCardList();
    if (responseJson.status) {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
    else {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
  }

  const addCard = () => {
    props.navigation.navigate("AddCard", {
      screen: "",
      id: ''
    })
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.appBackgroundColor, height: '100%' }}>
      <Header title={"Payment"} navigation={props.navigation} />
      <View style={{ height: '100%', marginTop: '5%', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <ScrollView style={{ height: '100%', }}>
          <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier">
            <View style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              <View style={styles.signUpdetailsView}>
                <Image source={ImagesUrl.plan} />
                <View style={{ marginLeft: '5%' }}>
                  <Text style={styles.planText}>{selectPlanData.title}</Text>
                  <Text style={styles.text}>$<Text style={styles.text2}>{selectPlanData.price}<Text style={styles.text3}>/Month</Text></Text></Text>
                </View>
              </View>
              {cardList == "" ?
                <View style={{ height: '100%' }}>
                  <View style={styles.cardView}>
                    <CardField
                      showIcon={true}
                      postalCodeEnabled={false}
                      placeholder={{
                        number: '4242 4242 4242 4242',
                      }}
                      cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                        placeholderColor: COLORS.gry, fontSize: 14, fontFamily: 'Roboto-Regular',
                      }}
                      style={{
                        width: '100%',
                        height: 30,
                        marginVertical: 10,
                      }}
                      onCardChange={(cardDetails) => {
                        setCardDetails(cardDetails)
                        console.log('cardDetails::::', cardDetails);
                      }}
                      onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                      }}
                    />
                  </View>
                  <InputField
                    placeholder="Holder Name"
                    onChangeText={(name) => setName(name)}
                    value={name} autoCapitalize="none"
                    style={styles.userInput}
                    keyboardType='default'
                    multiline={true}
                    placeholdeColor={COLORS.placholderTextColor} />
                  <TouchableOpacity style={styles.sumbitClick2} onPress={() => getToken()}>
                    <Text style={styles.submitText}>{STRING.continue}</Text>
                  </TouchableOpacity>
                </View> : null
              }
            </View>
          </StripeProvider>
          {cardList != "" ?
            <ScrollView style={{ marginBottom: 20, height: '100%' }}>
              <View style={styles.paymentOption}>
                <Text style={styles.paymentOptionHeader}>Select Card</Text>
                <Text onPress={() => addCard()} style={styles.addAnotherCard}>Add Card</Text>
              </View>
              {cardList.map(function (item, index) {
                return (
                  <View key={index.toString()}>
                    {item.status == 1 ?
                      <View style={styles.defaultCard}>
                        <Image source={ImagesUrl.cardIcon} />
                        <View style={{ marginLeft: '5%' }}>
                          <Text style={styles.text7}>{"************" + item.card_number}</Text>
                          <Text style={styles.expirydate}>{"Expiry Date " + item.expiry_month + "/" + item.expiry_year}</Text>
                        </View>
                        <TouchableOpacity style={styles.deletebg} onPress={() => deleteCard(item.card_id)}>
                          <Image style={styles.deleteWhite} source={ImagesUrl.deleteWhite} />
                        </TouchableOpacity>
                      </View>
                      :
                      <TouchableOpacity style={styles.paymentView2} onPress={() => makeCardDefault(item.card_id, 1, item)}>
                        <Image source={ImagesUrl.cardIcon} />
                        <View style={{ marginLeft: '5%' }}>
                          <Text style={styles.text7}>{"************" + item.card_number}</Text>
                          <Text style={styles.expirydate}>{"Expiry Date " + item.expiry_month + "/" + item.expiry_year}</Text>
                        </View>
                        <TouchableOpacity style={styles.deletebg} onPress={() => deleteCard(item.card_id)}>
                          <Image style={styles.deleteWhite} source={ImagesUrl.deleteWhite} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    }
                  </View>
                )
              })}
            </ScrollView>
            : null}
          <TouchableOpacity style={styles.sumbitClick2} onPress={() => subscriblePlan()}>
            <Text style={styles.submitText}>{STRING.continue}</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
      <Loader isLoader={isloading}></Loader>
      <CustomAlert navigation={props.navigation} Alert_Visibility={alertVisibility} onPress={() => openAlert()} closeModal={() => closeAlert()} msg={alert_msg} />
    </SafeAreaView>

  );
}

export function PaymentScreen({ selectPlanData, props }) {
  const { confirmPayment, createToken } = useStripe();
  const [cardDetails, setCardDetails] = useState({})
  const [token, setToken] = useState()
  const [confirmData, setConfirmData] = useState({})
  const API_URL = 'https://rigorous-heartbreaking-cephalopod.glitch.me'
  const [name, setName] = useState("")
  const navigation = useNavigation();
  console.log("isKeyboardOpen::", selectPlanData.data.plan_id)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  let isKeyboardOpen = useRef(false)
  const [alert_msg, setAlert_msg] = useState("");
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  const getToken = (props) => {
    // createToken(cardDetails).then(res => { console.log("res::", res); setToken(res.token.id) })
    createToken(
      { cardDetails, type: 'Card' }).then((res, error) => {
        console.log("res.error::", res.error)
        saveCard(res.token.card.last4, res.token.card.expMonth, res.token.card.expYear,
          res.token.id, res.token.card.brand)
      })
  }
  const billingDetails = {
    email: 'Xpede2022@gmail.com',
  };

  const saveCard = async (last4, expMonth, expYear, id, brand) => {

    const token = await getAsyncStorage("token")
    if (name == "") {
      setAlertVisibility(true);
      setAlert_msg("Please Enter Card Holder Name!");
      return;
    }
    const formData = new FormData()
    formData.append('plan_id', selectPlanData.id);
    formData.append('card_number', last4);
    formData.append('expiry_month', expMonth);
    formData.append('expiry_year', expYear);
    formData.append('stripe_token', id);
    formData.append('card_type', brand);
    formData.append('card_holder_name', name);
    console.log('formData::::::', formData)
    const { responseJson, err } = await requestPostApiMedia(APIConstants.create_subscription, formData, 'POST', token)
    //setLoading(false)
    console.log("Response +++", responseJson.status);
    if (responseJson.status) {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
    else {
      setAlertVisibility(true);
      setAlert_msg(responseJson.message)
    }
  }

  const openAlert = () => {
    if (alert_msg == "Please Enter Card Number!") {
      setAlertVisibility(false)
    } else {
      props.navigation.navigate("DrawerNavs");
      setAlertVisibility(false)
    }
  }
  const closeAlert = () => {
    setAlertVisibility(false)
  }
  const ConfirmPayment = async () => {
    const { paymentIntent, error } = await confirmPayment('client_secret', {
      type: 'Card',
      billingDetails,
    });

  }
  // return (
  //   <View style={{ height: '100%' }}>
  //     <View style={{ height: '100%', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
  //       <View style={styles.signUpdetailsView}>
  //         <Image source={ImagesUrl.plan} />
  //         <View style={{ marginLeft: '5%' }}>
  //           <Text style={styles.planText}>{selectPlanData.title}</Text>
  //           <Text style={styles.text}>$<Text style={styles.text2}>{selectPlanData.price}<Text style={styles.text3}>/Month</Text></Text></Text>
  //         </View>
  //       </View>
  //       <View style={styles.cardView}>
  //         <CardField
  //           showIcon={true}
  //           postalCodeEnabled={false}
  //           placeholder={{
  //             number: '4242 4242 4242 4242',
  //           }}
  //           cardStyle={{
  //             backgroundColor: '#FFFFFF',
  //             textColor: '#000000',
  //             placeholderColor: COLORS.gry, fontSize: 14, fontFamily: 'Roboto-Regular',
  //           }}
  //           style={{
  //             width: '100%',
  //             height: 30,
  //             marginVertical: 10,
  //           }}
  //           onCardChange={(cardDetails) => {
  //             setCardDetails(cardDetails)
  //             console.log('cardDetails::::', cardDetails);
  //           }}
  //           onFocus={(focusedField) => {
  //             console.log('focusField', focusedField);
  //           }}
  //         />
  //       </View>
  //       <InputField
  //         placeholder="Holder Name"
  //         onChangeText={(name) => setName(name)}
  //         value={name} autoCapitalize="none"
  //         style={styles.userInput}
  //         keyboardType='default'
  //         multiline={true}
  //         placeholdeColor={COLORS.placholderTextColor} />
  //       <TouchableOpacity style={styles.sumbitClick2} onPress={() => getToken()}>
  //         <Text style={styles.submitText}>{STRING.continue}</Text>
  //       </TouchableOpacity>
  //     </View>
  //     <Loader isLoader={isloading}></Loader>
  //     <CustomAlert navigation={props.navigation} Alert_Visibility={alertVisibility} onPress={() => openAlert()} closeModal={() => closeAlert()} msg={alert_msg} />
  //   </View>
  // );
}
export default StripePayment;

 