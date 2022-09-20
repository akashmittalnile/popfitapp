import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'


const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
};

const LoginPhoneVerify = (props) => {


    return (
        <View style={{
            backgroundColor: 'black',
            flex: 1
        }}>
            <View style={{
                backgroundColor: 'white',
                height: 250,
                marginHorizontal: 10,
                marginTop: 460,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <Text style={{ marginTop: 15, marginHorizontal: 70, textAlign: 'center', fontSize: 14, color: 'black',   }}>Please Enter Your Registered Mobile Number</Text>



                <View style={{
                    marginHorizontal: 15,
                    borderRadius: 40,
                    backgroundColor: 'white',
                    marginTop: 40,
                    borderColor: "#bbbaba",
                    borderWidth: 1,
                    height: 40,
                    width: "90%"
                }}>
                    <TextInput placeholder="   Enter Mobile Number"
                         
                        fontWeight='normal'
                        style={{ width: '70%' }} />
                </View>

                <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 50 }}>
                    <TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',    }}>Send OTP</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>)
}

export default LoginPhoneVerify;
