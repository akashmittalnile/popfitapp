import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity,TextInput, Image, Alert, Pressable, Keyboard, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

 


const VerificationCode = (props) => {

    const { t } = useTranslation();
    const firstCodeRef = useRef();
    const secondCodeRef = useRef();
    const thirdCodeRef = useRef();
    const forthCodeRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [otp1, setotp1] = useState('');
    const [otp2, setotp2] = useState('');
    const [otp3, setotp3] = useState('');
    const [otp4, setotp4] = useState('');
    const [alertMsg, setAlertMsg] = useState("");
    const [msg, setMsgAlert] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pin, setPin] = useState('');
    const [countrycod, setcountrycod] = useState("");

    const buttonClickedHandler1 = () => {
        props.navigation.goBack()
    }

    // console.log("props.route.params::", props.route.params)
    const { phone, codeotp, Countrycode } = props.route.params

    useEffect(() => {
        // VerifyOtp();
        setcountrycod(Countrycode);
        setPhoneNumber(phone);
        setPin(codeotp);
    }, []);

    const Validation = () => {
        const otp = otp1 + otp2 + otp3 + otp4;
        if (otp.length < 4) {
            // Alert.alert('Invalid Otp');
        } else return true;
    };
    const getMobileNumber = async () => {

        const phone_number = phoneNumber;

        const country_code = countrycod;
        setIsLoading(true);
        // console.log('====================================');
        // console.log("on");
        // console.log('====================================');
        try {
            const response = await axios.post(`${API.MOBILE_NO_VERIFY}`, { phone_number, country_code });
            // console.log("Mobile_Response>>>", response.data);
            setPin(response.data.code);
            // setIsLoading(false);
            //   Alert.alert("Your OTP is ",response.data.country_code);
            // props.navigation.navigate("VerificationCode", {
            //     Countrycode: response.data.country_code,
            //     codeotp1: response.data.code,
            //     phone: phone_number,
            // })

            // console.log("off");
        }
        catch (error) {
            Alert.alert("", t('Check_internet_connection'))
//  console.log("......error.........", error.response.data);
           }
        setIsLoading(false);
    };
    const VerifyOtp = async () => {

        if (Validation()) {
            setIsLoading(true);
            try {
                const otps = otp1 + otp2 + otp3 + otp4;
                const data = {
                    otp: otps,
                    phone_number: phoneNumber,
                }

                axios({
                    url: API.VERIFY_OTP,
                    method: 'POST',
                    data: data,
                })

                    .then(function (response) {
                        // setIsLoading(false);
                        // console.log("responseVerify :", response.data);
                        if (response.data.status == 1) {
                            //alert("otp matched!!");
                            props.navigation.navigate("SignUp");

                            // setIsLoading(false);
                        }
                        else if(response.data.status == 0) {
                            setAlertMsg(response.data.message);
                            setMsgAlert(true);
                            // setIsLoading(false);
                        }
                    })
                //  setIsLoading(false);


            }
            catch (error) {
                Alert.alert("", t('Check_internet_connection'))
                }
            setIsLoading(false);
        } setIsLoading(false);
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            // width: WIDTH,
            // height: HEIGHT,
             flexGrow: 1
          }} >
        <ScrollView style={{ backgroundColor: '#272727' }} >
            {!isLoading ?
                (<View>
                    <View style={{
                        marginTop: 20,
                    }}>
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            // backgroundColor: "red"
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                marginLeft: 10,
                            }}>
                                <TouchableOpacity onPress={() => { buttonClickedHandler1() }}>
                                    <Image
                                        source={require('../assets/leftArrowWhite.png')}
                                        style={{
                                            width: 25,
                                            height: 20,
                                            alignSelf: 'center',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ textAlign: 'left', fontSize: 19, color: 'white', marginLeft: 30, alignItems: 'center', justifyContent: "center" }}>{t('Verification_Code')}</Text>


                        </View>

                        <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, height: 60 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: 'white', }}>{t('Enter_the_code_sent')}</Text>
                            <Text style={{ marginLeft: 5, textAlign: 'left', fontSize: 14, color: 'white' }}>{'('+countrycod + ") -" + phoneNumber + "  " + pin}</Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            height: 70, marginLeft: 20, width: "56%", justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'
                        }}>

                            <View style={{
                                borderTopLeftRadius: 30, borderBottomLeftRadius: 30, width: 50, borderWidth: 1, borderColor: '#ffcc00',
                                height: 50,
                                backgroundColor: 'white'
                            }}>
                                <TextInput
                                    ref={firstCodeRef}
                                    style={{
                                        flex: 1, fontSize: 20,
                                        color: 'black',
                                        marginLeft: 16,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: 'bold',

                                    }}
                                    placeholderTextColor="#d3d3d3"
                                    onChangeText={text => {
                                        if (text.length == 1) {
                                            secondCodeRef.current.focus();
                                        } else {
                                            firstCodeRef.current.focus();
                                        }
                                        setotp1(text);
                                    }}
                                    keyboardType='number-pad'
                                    onSubmitEditing={() => secondCodeRef.current.focus()}
                                    maxLength={1}
                                />
                            </View>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                            }}>
                                <TextInput
                                    ref={secondCodeRef}
                                    style={{
                                        flex: 1, fontSize: 20,
                                        color: 'black',
                                        marginLeft: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: 'bold',

                                    }}
                                    placeholder=''
                                    placeholderTextColor="#d3d3d3"
                                    onChangeText={text => {
                                        if (text.length == 1) {
                                            thirdCodeRef.current.focus();
                                        } else {
                                            firstCodeRef.current.focus();
                                        }
                                        setotp2(text);
                                    }}
                                    onSubmitEditing={() => thirdCodeRef.current.focus()}
                                    keyboardType='number-pad'
                                    maxLength={1}
                                />
                            </View>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00'
                            }}>
                                <TextInput
                                    ref={thirdCodeRef}
                                    style={{
                                        flex: 1, fontSize: 20,
                                        color: 'black',
                                        marginLeft: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: 'bold',

                                    }}
                                    placeholder=''
                                    placeholderTextColor="#d3d3d3"
                                    onChangeText={text => {
                                        if (text.length == 1) {
                                            forthCodeRef.current.focus();
                                        } else {
                                            secondCodeRef.current.focus();
                                        }
                                        setotp3(text);
                                    }}
                                    onSubmitEditing={() => forthCodeRef.current.focus()}
                                    keyboardType='number-pad'
                                    maxLength={1}
                                />
                            </View>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'white', borderWidth: 1, borderColor: '#ffcc00', borderBottomRightRadius: 30, borderTopRightRadius: 30
                            }}>
                                <TextInput
                                    ref={forthCodeRef}
                                    style={{
                                        flex: 1, fontSize: 20,
                                        color: 'black',
                                        marginLeft: 14,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: 'bold',

                                    }}
                                    placeholder=''
                                    placeholderTextColor="#d3d3d3"
                                    onChangeText={text => {
                                        if (text.length == 1) {
                                            Keyboard.dismiss();
                                        } else {
                                            thirdCodeRef.current.focus();
                                        }
                                        setotp4(text);
                                    }}
                                    onSubmitEditing={() => forthCodeRef.current.focus()}
                                    keyboardType='number-pad'
                                    maxLength={1}
                                />
                            </View>

                        </View>



                    </View>
                    <View style={{ height: 40 }}>
                        {
                            msg ?
                                (<View style={{ justifyContent: "center", marginHorizontal: 40, marginTop: 7 }}><Text style={{ color: "red", fontSize: 15, }}>{alertMsg}</Text></View>)
                                :
                                (null)
                        }
                    </View>
                    <View style={{
                        height: 200
                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { VerifyOtp() }}>
                                <View style={{ marginTop: 40, borderRadius: 25, width: 150, height: 40, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white', }}>{t('Next')}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={() => { getMobileNumber() }} style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ marginTop: 10, width: 200, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 16, color: '#ffcc00', textDecorationLine: 'underline' }}>{t('Resend_Otp')}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>)
                :
                (<CustomLoader showLoader={isLoading}/>
                // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 400 }}>
                //     <ActivityIndicator size="large" color="#ffcc00" />
                // </View>
                )}

        </ScrollView>
        </SafeAreaView>
    );
};

export default VerificationCode;
