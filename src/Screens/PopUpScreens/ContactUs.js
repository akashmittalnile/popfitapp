import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';




const ContactUs = (props) => {
    const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

    const DATA = ['first row', 'second row', 'third row'];
    const buttonClickedHandler = () => {
        props.navigation.goBack()
    };

    return (
         

        <View style={{
            // marginHorizontal: 15,
            borderRadius: 20,
            backgroundColor: 'white',
            //marginTop: 150,
            borderColor: "white",
            borderWidth: 1,
            height: "100%",
            width: "100%",
            padding: 10,
            alignItems: 'center',
            // justifyContent:"center",
          }}>
            <View style={{ marginTop: 15, marginHorizontal: 20, height: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>


              <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
                <Image source={require('../Screens/assets/contactUs.png')}
                  style={{
                    width: 20,
                    height: 20, alignSelf: 'center'
                  }} />

              </View>
              <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 17, color: 'black', }}>Contact Us</Text>

            </View>

            <View style={{
              marginTop: 30, borderRadius: 25, marginHorizontal: 20,
              flexDirection: 'row',
              height: 45,
              shadowColor: '#11032586',
              backgroundColor: 'white',
              alignItems: 'center',
              borderColor: "#D7D7D7",
              borderWidth: 1,
              // backgroundColor: 'red', 
              justifyContent: "center",
            }}
            >
              <TextInput
                placeholder="Name"
                value={UserName}
                onChangeText={(text) => setUserName(text)}
                fontWeight='normal'
                placeholderTextColor='#D7D7D7'
                style={{
                  width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                  fontSize: 14
                }} />
            </View>
            {/* <View style={{ height: 50, marginHorizontal: 25, marginTop: 15 }}>
            <DropDownPicker
              items={[
                { label: 'France', value: 'fr' },
                { label: 'Spain', value: 'es' },
                { label: 'India', value: 'In' },
              ]}

              backgroundColor='white'
              //defaultNull
              placeholder="Select Object"
              placeholderTextColor='#D7D7D7'
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
              containerStyle={{ height: 40 }}

              style={{
                borderColor: '#D7D7D7', backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.2,
                // elevation: 2,
              }}
            />
          </View> */}
            <View style={{
              marginTop: 25, borderRadius: 25, marginHorizontal: 20, flexDirection: 'row',
              height: 45,
              shadowColor: '#11032586',
              backgroundColor: 'white',
              alignItems: 'center',
              borderColor: "#D7D7D7",
              borderWidth: 1,
              justifyContent: "center", alignItems: 'center'
            }}
            ><TextInput
                placeholder="Please Enter Your Email ID"
                value={Useremail}
                //editable={!isLoading}
                onChangeText={(text) => setUseremail(text)}
                keyboardType="email-address"
                fontWeight='normal'
                placeholderTextColor='#D7D7D7'
                style={{
                  width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, color: "black",
                  fontSize: 14
                }} />


            </View>
            <View style={{
              borderRadius: 15,
              backgroundColor: 'white',
              marginTop: 20,
              borderColor: "#D7D7D7",
              borderWidth: 1,
              height: 140,
              width: 300,
              justifyContent: "center", alignItems: 'center'
            }}>
              <TextInput
                placeholder="Type Message here"
                value={Typemessage}
                //editable={!isLoading}
                onChangeText={(text) => setTypemessage(text)}
                fontWeight='normal'
                placeholderTextColor='#D7D7D7'
                numberOfLines={10}
                multiline={true}
                textAlignVertical='top'
                style={{
                  width: '95%', justifyContent: 'center', alignItems: 'center', paddingLeft: 6, color: "black",
                  fontSize: 14
                }} />
            </View>

            <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
              <TouchableOpacity onPress={() => {
                GetContactUs()

              }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                  <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>Send OTP</Text>

                </View>
              </TouchableOpacity>
            </View>

          </View>
        );
}

export default ContactUs;
