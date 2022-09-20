import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'




const MyProfileUpdatedPopUp = (props) => {
    const DATA = ['first row', 'second row', 'third row'];
    const buttonClickedHandler = () => {
        props.navigation.goBack()
    };
    const gotoNotification = () => {
        props.navigation.navigate("Notifications")
      }

    return (
        <View style={{
            backgroundColor: 'black',
            flex: 1
        }}>
            <View style={{
                backgroundColor: 'white',
                height: 320,
                marginHorizontal: 10,
                marginTop: 390,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <View style={{ width: 150, height: 120, marginTop: 20 }}>
                    <Image source={require('../assets/congrats.png')}
                        style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 15 }} />
                </View>
                <Text style={{ marginTop: 25, marginHorizontal: 80, textAlign: 'center', fontSize: 15, color: 'black',   }}>Profile Details Update
                    Successfully</Text>
                <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>


                    <TouchableOpacity onPress={()=>{buttonClickedHandler()}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',    }}>Close</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>)
}

export default MyProfileUpdatedPopUp;
