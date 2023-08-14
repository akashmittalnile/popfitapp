// import React, { useState, useEffect } from 'react'
// import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Modal } from 'react-native'
 
// import { ScrollView } from 'react-native-gesture-handler';
 
// import Headers from '../../Routes/Headers';


// const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];

// const CardPayment = (props) => {
//     const [OrderPlacedPopUp, setOrderPlacedPopUp] = useState(false);
//     const [isToggle, setToggle] = useState(false);
//     const [isToggle2, setToggle2] = useState(false);
//     const [isToggle3, setToggle3] = useState(false);
//     const [checkbox, ischeckbox] = useState(false);

//     const [cardno, setcardno] = useState("");

//     const CardsToggle = () => {
//         if (setToggle == true) {
//             setToggle(true)
//             setToggle2(false)
//         } else {
//             setToggle2(true)
//             setToggle(false)
//         }
//     }

//     const showPass = () => {
//         setToggle(true)
//     }
//     const hidePass = () => {
//         setToggle(false)
//     }
//     const showPass2 = () => {
//         setToggle2(true)
//     }
//     const hidePass2 = () => {
//         setToggle2(false)
//     }
//     const showPass3 = () => {
//         setToggle3(true)
//     }
//     const hidePass3 = () => {
//         setToggle3(false)
//     }

   
//     const gotoOrderDetail = () => {
//         props.navigation.navigate("MyOrder")
//     }


//     return (
//         <SafeAreaView style={{
//             flex: 1,
//             width: '100%',
//             height: '100%', flexGrow: 1, backgroundColor: 'white'
//         }} >

//             <Headers
//                 Backicon={{
//                     visible: true,
//                 }}
//                 BackicononClick={() => { props.navigation.goBack() }}

//                 CartIcon={{
//                     visible: true,
//                 }}
//                 CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

//                 Bellicon={{
//                     visible: true,

//                 }}
//                 BelliconononClick={() => { props.navigation.navigate("Notifications") }}
//             />
//             <ScrollView>
//                 <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 18, color: '#000000', }}>Pay by Card</Text>


//                 <TouchableOpacity onPress={() => { CardsToggle ? setToggle : setToggle2 }} style={{
//                     marginHorizontal: 15,
//                     marginTop: 20,
//                     // backgroundColor: "pink"

//                 }}>

//                     {/* VISA card  */}
//                     <TouchableOpacity onPress={() => { setToggle(!isToggle) }}
//                         style={{
//                             borderRadius: 15,
//                             backgroundColor: 'white',
//                             borderColor: isToggle == false ? "#DADADA" : "#ffcc00",
//                             borderWidth: 1,
//                             height: 90,

//                         }}>
//                         <View style={{ flexDirection: "row", flex: 1 }}>
//                             {/* CheckBOx */}
//                             <View style={{ flex: 0.1, flexDirection: "row", width: 50, justifyContent: "center", alignItems: "center", paddingLeft: 15 }}>
//                                 {isToggle == false ?
//                                     <TouchableOpacity onPress={() => showPass()}>
//                                         <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#DADADA", justifyContent: "center", borderWidth: 1 }}>
//                                         </View>
//                                     </TouchableOpacity>
//                                     :
//                                     <TouchableOpacity onPress={() => hidePass()}>
//                                         <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#DADADA", backgroundColor: "#ffcc00", justifyContent: "center", borderWidth: 1 }}>
//                                         </View>
//                                     </TouchableOpacity>
//                                 }
//                             </View>
//                             {/* card Name */}
//                             <View style={{ flex: 0.6, marginTop: 20, justifyContent: "flex-start" }}>
//                                 <Text style={{ marginLeft: 10, textAlign: 'left', fontSize: 18, color: '#000000', justifyContent: "flex-start" }}>VISA</Text>

//                                 <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 11, color: '#c9bca0', marginLeft: 10, textAlign: 'left', }}>Expires on 16/24 </Text>
//                             </View>
//                             {/* Image */}
//                             <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
//                                 <Image source={require('../assets/visaCard.png')}
//                                     style={{
//                                         width: 90,
//                                         height: 90, alignSelf: 'center', marginRight: 10
//                                     }} />
//                             </View>

//                         </View>
//                     </TouchableOpacity>

//                     {/* MASTER card  */}
//                     <TouchableOpacity onPress={() => { setToggle2(!isToggle2) }}
//                         style={{
//                             marginTop: 20,
//                             borderRadius: 15,
//                             backgroundColor: 'white',
//                             borderColor: isToggle2 == false ? "#DADADA" : "#ffcc00",
//                             borderWidth: 1,
//                             height: 90,

//                         }}>
//                         <View style={{ flexDirection: "row", flex: 1 }}>
//                             {/* CheckBOx */}
//                             <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 15 }}>
//                                 {isToggle2 == false ?
//                                     <TouchableOpacity onPress={() => showPass2()}>
//                                         <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#DADADA", justifyContent: "center", borderWidth: 1 }}>
//                                         </View>
//                                     </TouchableOpacity>
//                                     :
//                                     <TouchableOpacity onPress={() => hidePass2()}>
//                                         <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#DADADA", backgroundColor: "#ffcc00", justifyContent: "center", borderWidth: 1 }}>
//                                         </View>
//                                     </TouchableOpacity>
//                                 }
//                             </View>
//                             {/* card Name */}
//                             <View style={{ flex: 0.6, marginTop: 20, }}>
//                                 <Text style={{ marginLeft: 10, textAlign: 'left', fontSize: 18, color: '#000000', }}>MASTER CARD</Text>

//                                 <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 11, color: '#c9bca0', marginLeft: 10, textAlign: 'left', }}>Expires on 21/26 </Text>
//                             </View>
//                             {/* Image */}
//                             <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
//                                 <Image source={require('../assets/mastCard.png')}
//                                     style={{
//                                         width: 80,
//                                         height: 80, alignSelf: 'center', marginRight: 10
//                                     }} />
//                             </View>

//                         </View>
//                     </TouchableOpacity>

//                 </TouchableOpacity>

//                 {/* HEADER2(Pay with a New Card) */}
//                 <Text style={{ marginLeft: 25, marginTop: 30, textAlign: 'left', fontSize: 18, color: '#000000', }}>Pay with a New Card</Text>

//                 {/* ADD CARD DETAILS */}


//                 <TouchableOpacity onPress={() => { setToggle3(!isToggle3) }}
//                     style={{
//                         borderRadius: 15,
//                         backgroundColor: '#F8F8F8',
//                         borderColor: isToggle3 == false ? "#DADADA" : "#ffcc00",
//                         borderWidth: 1,
//                         height: "23%",
//                         marginHorizontal: 15,
//                         marginTop: 20,
//                         justifyContent: "center",
//                         alignItems: "center",

//                     }}>
//                     <View style={{ flexDirection: "row", width: "100%" }}>
//                         {/* CheckBOx */}
//                         <View style={{ marginTop: 20, alignItems: "center", paddingLeft: 17, }}>
//                             {isToggle3 == false ?
//                                 <TouchableOpacity onPress={() => showPass3()}>
//                                     <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#bbbaba", justifyContent: "center", borderWidth: 1 }}>
//                                     </View>
//                                 </TouchableOpacity>
//                                 :
//                                 <TouchableOpacity onPress={() => hidePass3()}>
//                                     <View style={{ height: 25, width: 25, borderRadius: 25 / 2, borderColor: "#bbbaba", backgroundColor: "#ffcc00", justifyContent: "center", borderWidth: 1 }}>
//                                     </View>
//                                 </TouchableOpacity>
//                             }
//                         </View>

//                         {/*  enter card Details  */}
//                         <View style={{ marginTop: 5, marginLeft: 10, flexDirection: "column", width: "63%" }}>
//                             <View style={{
//                                 borderRadius: 25, margin: 5,
//                                 shadowColor: '#11032586',
//                                 backgroundColor: 'white',
//                                 height: 45,
//                                 borderColor: "#DADADA",
//                                 borderWidth: 1,
//                                 width: 200
//                             }}>
//                                 <TextInput placeholder="*** **** *****564"

//                                     fontWeight='normal'
//                                     onChangeText={(text) => setcardno(text)}
//                                     value={cardno}
//                                     autoCapitalize='none'
//                                     maxLength={16}
//                                     placeholderTextColor='#D7D7D7'
//                                     style={{ width: '100%', justifyContent: 'center', alignItems: 'center', color: "black", paddingLeft: 20 }} />
//                             </View>

//                             <View style={{ flexDirection: 'row', borderRadius: 25, height: 50, marginHorizontal: 5, marginTop: 15 }}>
//                                 <View style={{
//                                     borderRadius: 25,
//                                     height: 40,
//                                     width: 100,
//                                     shadowColor: '#11032586',
//                                     backgroundColor: 'white',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',

//                                     borderColor: "#DADADA",
//                                     borderWidth: 1,
//                                 }}
//                                 >
//                                     <TextInput placeholder="MM/YY"

//                                         fontWeight='normal'
//                                         placeholderTextColor='#D7D7D7'
//                                         keyboardType='number-pad'
//                                         style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, color: "black" }} />
//                                 </View>

//                                 <View style={{
//                                     borderRadius: 25,
//                                     height: 40,
//                                     shadowColor: '#11032586',
//                                     backgroundColor: 'white',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     borderColor: "#DADADA",
//                                     borderWidth: 1,
//                                     width: 75,
//                                     marginLeft: 10,
//                                 }}
//                                 >
//                                     <TextInput placeholder="CVV"

//                                         fontWeight='normal'
//                                         keyboardType='number-pad'
//                                         placeholderTextColor='#D7D7D7'
//                                         style={{ width: '70%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, color: "black" }} />
//                                 </View>
//                             </View>

//                             {/* Securely checkbox */}
//                             <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
//                                 <TouchableOpacity onPress={() => { ischeckbox(!checkbox) }}>

//                                     <View style={{ justifyContent: "center", borderColor: "#bbbaba", height: 25, width: 25, borderWidth: 1, borderRadius: 7 }}>
//                                         {checkbox == true ?
//                                             <Image source={require('../assets/blue-checkbox.png')}
//                                                 style={{
//                                                     width: 25,
//                                                     height: 25,
//                                                 }} />
//                                             : null}
//                                     </View>

//                                 </TouchableOpacity>
//                                 <View style={{ marginLeft: 10 }}>
//                                     <Text style={{ color: '#848484', fontSize: 14 }}>Securely save this card</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         {/* Image */}
//                         <View style={{ marginLeft: 5 }}>
//                             <Image source={require('../assets/SampleCard.png')}
//                                 style={{
//                                     width: 60,
//                                     height: 60, alignSelf: 'center', marginRight: 10
//                                 }} />
//                         </View>

//                     </View>

//                 </TouchableOpacity>


//                 {/* payment amount text */}
//                 <View style={{
//                     backgroundColor: '#fffcee',
//                     height: 70,
//                     marginTop: 50,
//                     shadowColor: '#efe8c7',
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.2,
//                     elevation: 2,
//                     marginBottom: 20, justifyContent: "center", alignItems: 'center'
//                 }}>
//                     <View style={{ marginTop: 10, height: 30, flexDirection: 'row', marginLeft: 25 }}>
//                         <View style={{ flex: 1 }}>
//                             <Text style={{ textAlign: 'left', fontSize: 14, color: '#000000', }}>Total Amount Paid :</Text>
//                         </View>
//                         <View style={{ flex: 1 }}>
//                             <Text style={{ marginLeft: 20, textAlign: 'center', fontSize: 14, color: '#000000', }}>$  516.00</Text>
//                         </View>
//                     </View>

//                 </View>

//                 {/* bottom button */}
//                 <View style={{ marginBottom: 20, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 30, justifyContent: "center", }}>
//                     <TouchableOpacity onPress={() => { }}>
//                         <View style={{ justifyContent: 'center', width: 120, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>



//                             <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Cancel</Text>

//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => { setOrderPlacedPopUp(!OrderPlacedPopUp) }}>
//                         <View style={{ justifyContent: 'center', width: 120, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50, marginLeft: 10 }}>



//                             <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>Pay</Text>

//                         </View>
//                     </TouchableOpacity>
//                 </View>
//                 {OrderPlacedPopUp ?
//                     (<Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={OrderPlacedPopUp}
//                         onRequestClose={() => {

//                             setOrderPlacedPopUp(!OrderPlacedPopUp);
//                         }}
//                     >
//                         <View style={{
//                             flex: 1,
//                             justifyContent: 'flex-end',
//                             alignItems: 'center',
//                             backgroundColor: 'rgba(140, 141, 142, 0.7)',
//                         }}>
//                             <View style={{
//                                 margin: 10,
//                                 backgroundColor: "white",
//                                 borderRadius: 20,
//                                 paddingTop: 50,
//                                 padding: 15,
//                                 alignItems: "center",
//                                 shadowColor: "#000",
//                                 shadowOffset: {
//                                     width: 0,
//                                     height: 2
//                                 },
//                                 shadowOpacity: 0.25,
//                                 shadowRadius: 4,
//                                 elevation: 5
//                             }}>

//                                 <View style={{
//                                     backgroundColor: 'white',
//                                     height: 250,
//                                     marginHorizontal: 10,
//                                     marginTop: 30,
//                                     marginHorizontal: 15,
//                                     borderRadius: 10,
//                                     marginBottom: 20,
//                                     alignItems: 'center',
//                                     flexDirection: 'column',

//                                 }}>

//                                     <View style={{
//                                         justifyContent: "center", alignItems: 'center', flexDirection: 'row'
//                                     }}>
//                                         <View style={{
//                                             marginTop: -40, width: 90, height: 90, borderRadius: 90 / 2, backgroundColor: '#fceeb5'
//                                         }}>

//                                             <Image
//                                                 style={{
//                                                     width: 120, marginTop: 20,
//                                                     height: 110, alignSelf: 'center'
//                                                 }}
//                                                 source={require('../assets/dumble.png')}
//                                                 resizeMode="contain" />

//                                         </View>
//                                         <View style={{
//                                             width: 60, height: 60, backgroundColor: 'white', marginTop: -70, borderRadius: 60 / 2, left: -10
//                                         }}>


//                                             <Image source={require('../assets/yellowcheck.png')}
//                                                 style={{
//                                                     width: 60,
//                                                     height: 60, alignSelf: 'center'
//                                                 }} />

//                                         </View>



//                                     </View>

//                                     <Text style={{ marginTop: 55, marginLeft: 10, textAlign: 'center', fontSize: 18, color: 'black', }}>Order Placed Successfully</Text>
//                                     <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: 'black', }}>Your order has been placed successfully you can click on View Orders to track the status and delivery.
//                                     </Text>
//                                     <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 30, marginTop: 30 }}>
//                                         <TouchableOpacity onPress={() => { gotoOrderDetail() }}>
//                                             <View style={{ alignItems: 'center', justifyContent: 'center', width: 190, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

//                                                 <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', }}>View Orders</Text>

//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>



//                                 </View>

//                             </View>
//                         </View>
//                     </Modal>)
//                     :
//                     null
//                 }
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// export default CardPayment;