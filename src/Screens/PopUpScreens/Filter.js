import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'




const Filter = (props) => {

    
    const buttonClickedHandler = () => {
        props.navigation.goBack()
      };
    

    return (
        <View style={{
            backgroundColor: 'black',
            flex: 1
        }}>
            <View style={{
                backgroundColor: 'white',
                height: 550,
                marginHorizontal: 10,
                marginTop: 160,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <View style={{ marginTop: 20, marginHorizontal: 20, height: 25, flexDirection: "row", }}>


                    <View style={{  width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
                        <Image source={require('../assets/filterBlack.png')}
                         style={{
                            width: 20,
                            height: 15, alignSelf: 'center'
                        }} />

                    </View>
                    <Text style={{ marginTop: 5, marginLeft: 10, textAlign: 'center', fontSize: 12, color: 'black',   }}>Filter</Text>

                </View>

                <View style={{ width: "90%", height: 60, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', height: 40 }}>
                        <TouchableOpacity>
                            <View style={{
                                width: 160, flex: 1, borderRadius: 35, borderColor: "#bbbaba",
                                borderWidth: 1,
                            }}>

                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/updownYellow.png')}
                                        style={{
                                            width: 15,
                                            height: 15, alignSelf: 'center', marginRight: 10
                                        }} />

                                    <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Higher to Lower Price</Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginLeft: 10, justifyContent: 'center', flexDirection: 'row', height: 40 }}>
                        <TouchableOpacity>
                            <View style={{
                                width: 160, flex: 1, borderRadius: 35, borderColor: "#bbbaba",
                                borderWidth: 1,
                            }}>

                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/updownGrey.png')}
                                        style={{
                                            width: 15,
                                            height: 15, alignSelf: 'center', marginRight: 10
                                        }} />

                                    <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Lower to Higher Price</Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <Text style={{ marginTop: 30, marginHorizontal: 20, textAlign: 'left', fontSize: 14, color: 'black',    }}>Select From Category & Sub-Category</Text>

                <View style={{ width :'90%',marginTop: 20, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={{  borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 120, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Fitness Dumble</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ marginLeft: 10, borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 120, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Workout Equipment</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{  marginTop: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity>
                        <View style={{ borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 100, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Clothes</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ marginLeft: 10,borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 100, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Barbel Set</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ marginLeft: 10,borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 100, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Training Bench</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ width :'90%',marginTop: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={{  borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 120, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Pull-Up Frame & Bar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ marginLeft: 10, borderColor: '#8F93A0', borderWidth: 1, borderRadius: 25, width: 120, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontSize: 9, color: "#bbbaba",   }}>Kettlebell Set</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{
                    height: 200, marginTop: 40,
                }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <TouchableOpacity  onPress={buttonClickedHandler}>
                            <View style={{ marginTop: 30, borderRadius: 25, width: 200, height: 50, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white',    }}>Apply</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>

                </View>


            </View>
        </View>)
}

export default Filter;
