import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'


 

const OrderPlaced = (props) => {


    return (
        <View style={{
            backgroundColor: 'black',
            flex: 1
        }}>
            <View style={{
                backgroundColor: 'white',
                height: 350,
                marginHorizontal: 10,
                marginTop: 360,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <View style={{
                    height: 100, marginTop: 40, justifyContent: "center", alignItems: 'center', flexDirection: 'row'
                }}>
                    <View style={{
                        marginTop: -30, width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#fceeb5'
                    }}>

                        <Image
                            style={{
                                width: 110, marginTop: 20,
                                height: 90, alignSelf: 'center'
                            }}
                            source={require('../assets/dumble.png')} />

                    </View>
                    <View style={{
                        width: 60, height: 60, backgroundColor: 'white', marginTop: -20, borderRadius: 60 / 2
                    }}>
                        <TouchableOpacity>

                            <Image source={require('../assets/yellowcheck.png')}
                                style={{
                                    width: 60,
                                    height: 60, alignSelf: 'center'
                                }} />
                        </TouchableOpacity>
                    </View>



                </View>

                <Text style={{ marginTop: 15, marginLeft: 10, textAlign: 'center', fontSize: 18, color: 'black',   }}>Order Placed Successfully</Text>
                <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: 'black',    }}>It is a long established fact that a reader will be distracted by
                    The readable of a page when looking its layout.
                </Text>
                <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
                    <TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',    }}>View Order Detail</Text>

                        </View>
                    </TouchableOpacity>
                </View>



            </View>
        </View>)
}

export default OrderPlaced;
