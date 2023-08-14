import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../../Routes/Urls';
import * as yup from 'yup'
import { Formik } from 'formik'
import Headers from '../../Routes/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const ChangePassword = (props) => {

    const { t } = useTranslation();
    const oldpsswdvld = t('Enter_your_old_password');
    const newpswdvld = t('Please_enter_new_password');
    const psswdminvld = t('Your_password_short_minimum_8characters');
    const cnfrmpsswdvld = t('Confirm_password_required');
    const cnfrmvldmsg = t('Your_passwords_donot_match')

    const [ChangePasswordPopUp, setChangePasswordPopUp] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    const [Msg, setMsgAlert] = useState(false);
    const [userphoneno, setUserPhoneno] = useState(props?.route?.params?.PhoneNo)

    // const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // console.log('user Phone no.::',props?.route?.params?.PhoneNo)




    }, []);

    const buttonClickedHandler = () => {
        setChangePasswordPopUp(false)
        // props.navigation.navigate("MyProfile")
        props.navigation.reset(
            {
                index: 0,
                routes: [{ name: 'MyProfile' }]
            });
    };


    const ChangeAPI = async (values) => {
        const usertkn = await AsyncStorage.getItem("authToken");
        const data = {
            old_password: values.old_pswd,
            new_password: values.password,
            confirm_new_password: values.cfm_password,
            phone: userphoneno
        };
        // console.log(".......userInputdata", data);
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.CHANGE_PSWD}`, data, { headers: { "Authorization": ` ${usertkn}` } });
            // console.log("inputdata...", response.data);
            // console.log("ResponseChangePsswd ::::", response.data.status);
            if (response.data.status == 1) {
                setChangePasswordPopUp(!ChangePasswordPopUp)
                // console.log("User_change_psswd_successfully...>>>", response.data.message);

            }
            else {
                setAlertMsg(response.data.message);
                setMsgAlert(true);

            }
        }
        catch (error) {
            Alert.alert("", t('Check_internet_connection'))
            // console.log("Countryerror:", error.response.data.message);

        }
        setIsLoading(false);

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1

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
            {
                !isLoading ?
                    (<View style={{ height: "100%", width: "100%", flex: 1 }}>

                        <Formik
                            initialValues={{
                                old_pswd: '',
                                password: '',
                                cfm_password: '',
                            }}
                            onSubmit={values => ChangeAPI(values)}

                            validationSchema={yup.object().shape({
                                old_pswd: yup
                                    .string()
                                    .required(oldpsswdvld),

                                password: yup
                                    .string()
                                    .required(newpswdvld)
                                    .min(8, psswdminvld),

                                cfm_password: yup
                                    .string()
                                    .required(cnfrmpsswdvld)
                                    .oneOf([yup.ref('password')], cnfrmvldmsg)
                            })}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <View style={{ height: 1390, marginTop: 15 }}>
                                    <View style={{
                                        marginHorizontal: 15,
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        marginTop: 20,
                                        borderColor: "#bbbaba",
                                        borderWidth: 1,
                                        height: 310
                                    }}>
                                        <View style={{ marginLeft: 15, marginTop: 20, }}>
                                            <Text style={{ textAlign: 'left', fontSize: 18, color: '#455A64', fontWeight: "500" }}>{t('Change_Password')}</Text>
                                        </View>


                                        <View style={{ marginTop: 15 }}>
                                            <View style={{
                                                borderRadius: 20, margin: 10,
                                                height: 45,
                                                shadowColor: '#11032586',
                                                backgroundColor: 'white',
                                                borderColor: "#bbbaba",
                                                borderWidth: 1,
                                                marginTop: 10,
                                            }}
                                            >
                                                <TextInput
                                                    placeholder={t('Old_Password')}
                                                    fontWeight='normal'

                                                    autoCapitalize='none'
                                                    placeholderTextColor='#D7D7D7'
                                                    value={values.old_pswd}
                                                    onChangeText={handleChange('old_pswd')}
                                                    onBlur={() => setFieldTouched('old_pswd')}

                                                    style={{ width: '70%', paddingLeft: 20, color: "black", height: "100%" }} />

                                                {touched.old_pswd && errors.old_pswd &&
                                                    <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, }}>{errors.old_pswd}</Text>
                                                }
                                            </View>


                                            <View style={{
                                                borderRadius: 25, margin: 10,
                                                shadowColor: '#11032586',
                                                backgroundColor: 'white',
                                                height: 45,
                                                borderColor: "#bbbaba",
                                                borderWidth: 1,
                                                marginTop: 14
                                            }}>


                                                <TextInput
                                                    placeholder={t('New_Password')}
                                                    fontWeight='normal'

                                                    autoCapitalize='none'
                                                    placeholderTextColor='#D7D7D7'
                                                    value={values.password}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={() => setFieldTouched('password')}
                                                    style={{ width: '70%', justifyContent: 'center', alignItems: 'center', color: "black", paddingLeft: 20, height: "100%" }} />
                                                {touched.password && errors.password &&
                                                    <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, }}>{errors.password}</Text>
                                                }

                                            </View>

                                            <View style={{
                                                borderRadius: 25, margin: 10,
                                                shadowColor: '#11032586',
                                                backgroundColor: 'white',
                                                height: 45,
                                                borderColor: "#bbbaba",
                                                borderWidth: 1,
                                                marginTop: 14
                                            }}>


                                                <TextInput
                                                    placeholder={t('Confirm_Password')}
                                                    fontWeight='normal'

                                                    autoCapitalize='none'
                                                    placeholderTextColor='#D7D7D7'
                                                    value={values.cfm_password}
                                                    onChangeText={handleChange('cfm_password')}
                                                    onBlur={() => setFieldTouched('cfm_password')}
                                                    style={{ height: "100%", width: '70%', justifyContent: 'center', alignItems: 'center', color: "black", paddingLeft: 20 }}
                                                />
                                                {touched.cfm_password && errors.cfm_password &&
                                                    <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft: 20, }}>{errors.cfm_password}</Text>
                                                }
                                                {
                                                    Msg ?
                                                        (<View style={{ justifyContent: "center", marginHorizontal: 20, marginVertical: 5 }}><Text style={{ color: "red", fontSize: 12, }}>{AlertMsg}</Text></View>)
                                                        :
                                                        (null)
                                                }
                                            </View>

                                        </View>


                                    </View>


                                    <View style={{ marginBottom: 20, flexDirection: 'row', height: 50, marginTop: 40, justifyContent: 'center' }}>


                                        <TouchableOpacity onPress={() => {
                                            handleSubmit(values);
                                            // ChangeAPI(values)
                                        }}>
                                            <View style={{ justifyContent: 'center', width: 120, height: 34, backgroundColor: '#ffcc00', borderRadius: 50, marginLeft: 10 }}>

                                                <Text style={{ textAlign: 'center', fontSize: 16, color: 'white', }}>{t('Save')}</Text>

                                            </View>
                                        </TouchableOpacity>
                                    </View>




                                </View>
                            )}
                        </Formik>
                        {ChangePasswordPopUp ? (
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={ChangePasswordPopUp}
                                onRequestClose={() => {
                                    setChangePasswordPopUp(false);
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(140, 141, 142, 0.7)',
                                    }}>
                                    <View
                                        style={{
                                            margin: 2,
                                            backgroundColor: 'white',
                                            borderRadius: 20,
                                            width: "98%",
                                            alignItems: 'center',
                                            shadowColor: '#000',
                                            shadowOpacity: 0.25,
                                            shadowRadius: 4,
                                            elevation: 6,
                                        }}>

                                        <View style={{
                                            height: 320,
                                            width: "100%",
                                            marginHorizontal: 30,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}>
                                            <View style={{ width: 150, height: 120, marginTop: 20 }}>
                                                <Image source={require('../assets/congrats.png')}
                                                    style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 15 }} />
                                            </View>
                                            <View style={{ marginTop: 25, width: "50%" }}>
                                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', }}>{t('Password_Changed_Successfully')}</Text>
                                            </View>

                                            <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>


                                                <TouchableOpacity onPress={() => { buttonClickedHandler() }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 110, height: 34, backgroundColor: '#ffcc00', borderRadius: 50 }}>

                                                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', fontWeight: "400" }}>{t('Close')}</Text>

                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        ) : null}
                    </View>) :
                    (<CustomLoader showLoader={isLoading} />)
            }


        </SafeAreaView>
    )
}

export default ChangePassword;
