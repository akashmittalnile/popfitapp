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
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';


const CancellationPolicy = (props) => {

    const { t } = useTranslation();
    const [Termsandcnddata, setTermsandcnddata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        GetCancel_Policy();

    }, []);

    const GetCancel_Policy = async () => {

        // console.log(".....usertoken.....ProfileIN...", userprofile);

        setIsLoading(true);
        try {
            const response = await axios.get(`${API.CANCELLATION_POLICY}`);
            // console.log("", response);
            console.log("ResponseTerms_condition ::::", response.data.data);
            setTermsandcnddata(response.data.data)

        }
        catch (error) {
            Alert.alert("", t('Check_internet_connection'))
            // console.log("Terms_condition_error:", error.response.data.message);

        }
        setIsLoading(false);

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
            <ScrollView>
                {
                    !isLoading ?
                        (<View style={{ justifyContent: "center", padding: 10, height: "100%", width: "99%", }}>

                            <Text style={{ marginLeft: 10, marginTop: 10, textAlign: 'left', fontSize: 18, color: 'black', fontWeight: "500" }}>{Termsandcnddata.title}</Text>

                            <Text style={{ marginLeft: 10, textAlign: 'left', fontSize: 12, color: 'black', marginTop: 20, }}>{Termsandcnddata.description}</Text>


                        </View>) :
                        (<CustomLoader showLoader={isLoading} />)
                }

            </ScrollView>
        </SafeAreaView>
    );
}

export default CancellationPolicy;