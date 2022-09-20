import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import Headers from '../../Routes/Headers';


const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];

const Notifications = (props) => {
    

    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%', flexGrow: 1, backgroundColor: "black"
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
            <ScrollView>
                <View style={{ marginHorizontal: 10, marginTop: 10, height: 120, borderRadius: 10, backgroundColor: 'white' }}>
                    <View style={{ marginLeft: 20, height: 50, flexDirection: 'row' }}>
                        <View style={{ height: 50, flex: 1 / 2, marginTop: 20 }}>

                            <Text style={{ fontSize: 14, color: 'black', }}>Order No. : U3423568 </Text>

                        </View>

                        <View style={{ marginTop: 15, marginLeft: 5, backgroundColor: '#ffcc00', flex: 1 / 3, borderRadius: 20, height: 30, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 30, marginLeft: 20 }}>
                                <Image source={require('../assets/download1.png')}
                                    style={{
                                        width: 10,
                                        height: 13,
                                    }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: -10 }}>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'left', fontSize: 8, color: 'white', }}>Download Invoice</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                    <View style={{
                        height: 70, marginLeft: 20, flexDirection: 'row'
                    }}>
                        <Text style={{ marginTop: 20, textAlign: 'left', fontSize: 12, color: 'black', }}>Order Status :</Text>
                        <View style={{ marginTop: 20, marginLeft: 20, flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1 / 2, }}>
                                <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', }}>Order Placed</Text>
                            </View>
                            <View style={{ marginTop: 10, flex: 1 }}>
                                <Text style={{ textAlign: 'left', fontSize: 8, color: 'black' }}>on Sat 23 Jan 2022, 09:23 AM</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                            <TouchableOpacity>
                                <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                                    <Image source={require('../assets/rightArrow.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <FlatList
                    vertical
                    data={DATA}
                    renderItem={({ item }) => <View style={{ marginHorizontal: 10, marginTop: 40, flexDirection: "row" }}>
                        <View style={{ backgroundColor: '#ffcc00', borderRadius: 20, height: 10, width: 10 }}>
                        </View>
                        <Text style={{ marginTop: -2, marginLeft: 7, textAlign: 'left', fontSize: 14, color: 'white', }}>Resume your training outdoor cycle</Text>
                    </View>
                    }
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Notifications;