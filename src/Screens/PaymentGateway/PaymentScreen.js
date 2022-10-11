import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button, ActivityIndicator, TextInput, Image, Alert, SafeAreaView, Modal } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Headers from '../../Routes/Headers';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from 'regenerator-runtime';




export default function PaymentScreen(props) {

  const [OrderPlacedPopUp, setOrderPlacedPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setName] = useState('');
  const [carddata, setcardata] = useState("");
  const { confirmPayment, loading, createToken } = useStripe();
  const [adddrs, setAdddrs] = useState(props?.route?.params?.SetAddrs);
  const [amout, setAmout] = useState(props?.route?.params?.SubscriptionPlan)
  // console.log("Data Get from Subscription Plans::",amout);

  // const fetchPaymentIntentClientSecret = async () => {
  //   // console.log("user name::", username);
  //   const response = await fetch(`${API_URL}/create-payment-intent`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       paymentMethodType: 'card',
  //       currency: 'usd',
  //     }),
  //   });
  //   const { clientSecret } = await response.json();
  //   return clientSecret;
  //   // const { paymentIntent, error } = await confirmPayment(clientSecret, {
  //   //   type: 'Card',
  //   //   billingDetails: { username },
  //   // })
  //   // if (error) {
  //   //   Alert.alert(`Error code : ${error.code}`,error.message)
  //   //   console.log('Payment confirmation error', error);
  //   // } else if (paymentIntent) {
  //   //   Alert.alert('Success from promise', `payment successful: ${paymentIntent.id}`)
  //   //   console.log('Success from promise', paymentIntent);
  //   // }
  // };

  // const gotoOrderDetail = () => {
  //   OrderPlacedAfterpaymentdone();
  // }

  const handlePayPress = async () => {
    // setIsLoading(true);
    console.log('card', carddata);
    await createToken({ carddata, type: 'Card' })
      .then((res, error) => {
        // setIsLoading(false);
        console.log('res====>', res.token);
        // setStripeToken(res.token.id);
        gotostipepayment(res.token.id);


      })
      .catch((e) => {
        // setIsLoading(false)
        Alert.alert("Please Enter Valid Card details!", e);
        // setAlertVisibility(true);
        // setAlert_msg('Please Enter Valid Card details!')
      }
      )
  };

  console.log("Set_Order_Amount:", props?.route?.params?.Totalprice);
  // console.log("ADDRESS seleted::", props?.route?.params?.SetAddrs);
  const Totalprice = props?.route?.params?.Totalprice


  const gotostipepayment = async (id) => {
    const PlanId = await AsyncStorage.getItem("Planid");

    console.log("selected plain price:",
      amout, id, PlanId);
    const Token = await AsyncStorage.getItem("authToken");
    const Plan_amout = amout != undefined ? amout.price : Totalprice;
    const plan_id = amout != undefined ? amout.id : PlanId;
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.STRIPE_PAYMENT}`, { 'method_id': id, 'plan_amount': JSON.stringify(Plan_amout), 'plan_id': plan_id },

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": ` ${Token}`
          }
        })
      console.log("Response.Stripe:", response.data);


      if (response.data.status == 1) {
        setIsLoading(false);
        setOrderPlacedPopUp(true);
        // Alert.alert("Payment Successfull", '',
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel"
        //     },
        //     { text: "OK", onPress: () => props.navigation.navigate("Home") }
        //   ]
        // )
      } else {
        Alert.alert("Please Enter Card Details!");
        setIsLoading(false);
      }
      // Alert.alert("payment failed not valid status !");
    }
    catch (error) {
      // console.log("payment error:",error.response.data.message);
      setIsLoading(false)
      Alert.alert("something went wrong", error);
    }

  };

  const OrderPlacedAfterpaymentdone = async () => {
    console.log("afterplaced Address:", adddrs);
    const Token = await AsyncStorage.getItem("authToken");

    setIsLoading(true);
    try {
      const response = await axios.post(`${API.ORDER_PLACED}`, { 'shipping_address': adddrs }, {
        headers: { "Authorization": ` ${Token}` }
      })
      console.log("Orderplaced_response:", response.data);
      if (response.data.status == 1) {
        setIsLoading(false);
        props.navigation.navigate("MyOrder")
        console.log("status1:", response.data.message);
      } else if (response.data.status == 1) {
        setIsLoading(false);
        console.log("status0:", response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("order catch error:", error);
      // Alert.alert(JSON.stringify("something went wrong Save order:", error));
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      flexGrow: 1, backgroundColor: 'white'
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
        (<ScrollView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
          <>
            <View style={{
              // marginLeft: 15,
              marginTop: 20,
              justifyContent: "center",
              alignContent: "flex-start"
            }}>
              <Text style={{ textAlign: 'left', fontSize: 18, color: '#000000', fontWeight: "500" }}>Pay by Card</Text>
            </View>
            {/* <TextInput
            autoCapitalize='none'
            placeholder='Name'
            keyboardType="name-phone-pad"
            onChange={(value) => setName(value)}
            style={{ fontSize: 16, color: "#000000", textAlign: "left", borderBottomColor: "gray", borderBottomWidth: 1, marginTop: 20 }}
          /> */}

            <CardField
              showIcon={true}
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                placeholderColor: "gray",
                backgroundColor: '#F4F4F4',
                textColor: '#000000',
                fontSize: 14,
                // borderWidth: 1,
                // borderColor: "#8F93A0",
                // borderRadius: 8,
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
                // marginHorizontal: 10
              }}
              onCardChange={(cardDetails) => {
                setcardata(cardDetails),
                  console.log('cardDetails:', JSON.stringify(cardDetails));
              }}
              onFocus={(focusedField) => {
                console.log('focusField:', focusedField);
              }}
            />
            <View style={{ justifyContent: "center", marginBottom: 30, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 20 }}>
              <TouchableOpacity disabled={loading} onPress={
                () => {
                  if (carddata == '') {
                    Alert.alert('Please Enter card Details!')
                    return
                  }
                  handlePayPress()
                }
              }>
                <View style={{ justifyContent: 'center', width: 120, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                  <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Pay</Text>
                </View>
              </TouchableOpacity>

            </View>
          </>

          {OrderPlacedPopUp ?
            (<Modal
              animationType="fade"
              transparent={true}
              visible={OrderPlacedPopUp}
              onRequestClose={() => {
                setOrderPlacedPopUp(false);
              }}
            >
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'rgba(140, 141, 142, 0.7)',
              }}>
                <View style={{
                  // margin: 10,
                  backgroundColor: "white",
                  borderRadius: 20,
                  width: "100%",
                  // padding: 15,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5
                }}>

                  <View style={{
                    // backgroundColor: 'white',
                    height: 250,
                    marginHorizontal: 10,
                    // marginTop: 10,
                    width: "98%",
                    borderRadius: 10,
                    // marginBottom: 20,
                    alignItems: 'center',
                    flexDirection: 'column',

                  }}>

                    <View style={{
                      justifyContent: "center", alignItems: 'center', flexDirection: 'row'
                    }}>
                      {/* <View style={{
                        marginTop: -40, width: 90, height: 90, borderRadius: 90 / 2, backgroundColor: '#fceeb5'
                      }}>

                        <Image
                          style={{
                            width: 120, marginTop: 20,
                            height: 110, alignSelf: 'center'
                          }}
                          source={require('../assets/dumble.png')}
                          resizeMode="contain" />

                      </View> */}
                      <View style={{
                        width: 60, height: 60, marginTop: 20
                      }}>
                        <Image source={require('../assets/yellowcheck.png')}
                          style={{
                            width: 60,
                            height: 60, alignSelf: 'center'
                          }} />

                      </View>
                    </View>

                    <Text style={{ marginTop: 15, marginLeft: 10, textAlign: 'center', fontSize: 18, color: 'black', fontWeight: "500" }}>Order Placed Successfully</Text>
                    <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: 'black', }}>It is a long established fact that a reader will be distracted by
                      The readable of a page when looking its layout.
                    </Text>
                    <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 30, marginTop: 30 }}>
                      <TouchableOpacity onPress={() => { OrderPlacedAfterpaymentdone() }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                          <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>View Order Detail</Text>

                        </View>
                      </TouchableOpacity>
                    </View>



                  </View>

                </View>
              </View>
            </Modal>)
            :
            null
          }
        </ScrollView>)
        :

        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}


