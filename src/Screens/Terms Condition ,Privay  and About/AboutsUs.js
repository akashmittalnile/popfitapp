import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import Headers from '../../Routes/Headers';

const AboutsUs = (props) => {
    const [aboutus, setAboutus] = useState([]);
    const [About_usimage, setAbout_usimage] = useState("");

    // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());
    const gotoNotification = () => {
        props.navigation.navigate("Notifications")
    }
    const gotobackscreen = () => {
        props.navigation.goBack();
    }
    useEffect(() => {
        About_USApi();

    }, [props]);

    const About_USApi = async () => {

        // setIsLoading(true)
        try {
            const response = await axios.get(`${API.ABOUT_US}`);
            // console.log("", response);
            console.log("ResponseAbout_US ::::", response.data.data);
            setAboutus(response.data.data);
            setAbout_usimage(response.data.aboutus_image);
            console.log("....", response.data.aboutus_image);
            // setIsLoading(false)
        }
        catch (error) {
            console.log("Terms_condition_error:", error.response.data.message);
            // setIsLoading(false)
        }


    };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%', flexGrow: 1
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
            {/* <View style={styles.navigationBarColor}>
                <View style={styles.navigationBarLeftContainer}>
                    <TouchableOpacity onPress={() => { gotobackscreen() }}>
                        <Image source={require('../assets/leftArrowWhite.png')}
                            style={{
                                width: 30,
                                height: 25, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>

                <View style={styles.navigationBarCenterContainer}>
                    <TouchableOpacity>
                        <Image resizeMode='contain'
                            source={require('../assets/layerCenter.png')}
                            style={{
                                width: 80,
                                height: 50, alignSelf: 'center'
                            }} />

                    </TouchableOpacity>
                </View>
                <View style={styles.navigationBarRightContainer}>
                    <TouchableOpacity onPress={() => { gotoNotification() }}>
                        <Image source={require('../assets/bellRight.png')}
                            style={{
                                width: 20,
                                height: 25, alignSelf: 'center', marginRight: 10
                            }} />

                    </TouchableOpacity>
                </View>
            </View> */}
            <ScrollView>
                <View style={{ justifyContent: "center", padding: 10, height: "100%", width: "99.8%", }}>

                    <View style={{ marginLeft: 15, marginTop: 10, }}>
                        <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', fontWeight: "500" }}>{aboutus.title}</Text>
                    </View>
                    <View style={{
                        marginHorizontal: 10, marginTop: 10, height: 190, borderRadius: 20,
                    }}>

                        <Image resizeMode='stretch'
                            source={{ uri: About_usimage }}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: "center",
                                alignItems: 'center', borderRadius: 20
                            }}>

                        </Image>

                    </View>



                    <View style={{ marginLeft: 20, marginTop: 20, height: "auto" }}>
                        <Text style={{ textAlign: 'left', fontSize: 11, color: 'black', fontWeight: "400" }}>{aboutus.description}</Text>
                    </View>




                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AboutsUs;