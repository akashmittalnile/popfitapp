import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableHighlight, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API } from '../../../Routes/Urls';
import CustomLoader from '../../../Routes/CustomLoader';

const EmailVerification = (props) => {

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
    const [emailVrfy, setEmail] = useState("");
    const [pin, setPin] = useState("");

    const buttonClickedHandler1 = () => {
        props.navigation.goBack()
    }

    console.log("props.route.params", props.route.params);
    const { code, Email } = props.route.params;

    useEffect(() => {

        var str = Email;
        var pin = code;
 
        setEmail(str)
        setPin(pin)
    }, []);

    const Validation = () => {
        const otp = otp1 + otp2 + otp3 + otp4;
        if (otp.length < 4) {
            Alert.alert('Invalid Otp');
        } else return true;
    };
    const VerifyOtp = async () => {

        if (Validation()) {
            setIsLoading(true);
            try {
                const otp = otp1 + otp2 + otp3 + otp4;
                const data = {
                    phone_number: null,
                    email: emailVrfy,
                    otp: otp,
                  
                }
                console.log("llllllllllllllll",data);
                axios({
                    url: API.VERIFY_OTP,
                    method: 'POST',
                    data: data,
                    
                })

                    .then(function (response) {
                        console.log("responseVerifyEmail:::", response.data);
                        console.log("responseEmailStatus:::", response.data.status);
                        if (response.data.status == 1) {
                           // alert("otp matched!!");
                             props.navigation.navigate("SignUp");
                            setIsLoading(false);
                        }
                        else {
                            setAlertMsg(response.data.message);
                            setMsgAlert(true);
                            setIsLoading(false);
                        }
                    })

                     

            } catch (error) {

                console.log("....EmailVrfyerror....:", error.response.data.message);
                setIsLoading(false);

            }

        };
    }; 

    return (
        <ScrollView style={{ backgroundColor: '#272727' }} >
            {!isLoading ?
                (<View>
                    <View style={{
                         marginTop: 20
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
                                        source={require('../../assets/leftArrowWhite.png')}
                                        style={{
                                            width: 25,
                                            height: 20,
                                            alignSelf: 'center',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={{   textAlign: 'left', fontSize: 19, color: 'white',    marginLeft: 30, alignItems: 'center', justifyContent: "center" }}>Verification Code</Text>


                        </View>
                     
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, height: 60 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: 'white',    }}>Enter the code sent to</Text>
                            <Text style={{ marginLeft: 5, textAlign: 'left', fontSize: 14, color: 'white' }}>{emailVrfy + "  " + pin}</Text>
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
                                (<View style={{ justifyContent: "center", marginHorizontal: 100, }}><Text style={{ color: "red", fontSize: 15 }}>{alertMsg}</Text></View>)
                                :
                                (null)
                        }
                    </View>
                    <View style={{
                        height: 200
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { VerifyOtp() }}>
                                <View style={{ marginTop: 40, borderRadius: 25, width: 200, height: 50, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white',    }}>Next</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>)
                :
                ( <CustomLoader showLoader={isLoading}/>)}

        </ScrollView>
    );
};

export default EmailVerification;
