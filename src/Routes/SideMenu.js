import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, FlatList,  Dimensions, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';


const DATA = ['first row', 'second row', 'third row'];
var deviceHeight = Dimensions.get('window').height;


const SideMenu = (props) => {
    const buttonClickedHandler = () => {
        props.navigation.navigate("MyProfile");
        props.navigation.reset({
        index: 0,
        routes: [{ name: "MyProfile" }],
      });
        // do something
      };
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <ScrollView style={{ backgroundColor: 'purple' }} >
         <LinearGradient colors={['yellow', 'orange']} style={{height: deviceHeight,
                width :'70%'}}>

          <View style={{
               // backgroundColor: 'green',
                height: deviceHeight,
                width :250
            }}>
            </View>
            </LinearGradient>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    linearGradientMainView: {
        borderRadius: 25,
        height: 380,
        marginHorizontal: 15,
        marginTop: 190,
    },
    buttonTextMainView: {
        fontSize: 18,
         
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    cameraButtonContainer: {
        right: 40,
        position: 'absolute',
        width: 50,
        height: 55,
        marginTop: 6
    },
    cameraButtonSend: {
        width: 25,
        height: 25,
        resizeMode: 'strech'
    }, cameraImageCroper: {
        width: 20,
        height: 20,
    },
    sendButtonContainer: {
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        width: 35,
        backgroundColor: '#fee3e3',
        height: 35,
        borderRadius: 35,
    },
    sendButtonSend: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center'
    }, sendImageCroper: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        borderColor: 'white',
        borderWidth: 1
    },
    passwordButton: {
        borderRadius: 20,
        padding: 10,
    },
    passwordContainer: {
        flex: 1,
        backgroundColor: '#F5EEDC',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    passwordInputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#d7d7d7'
    },

    passwordInputField: {
        padding: 14,
        fontSize: 22,
        width: '90%'
    }

    ,
    pickercontainer: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    textInput: {
        width: 275,
        height: 55,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: '#DFDDDD0D',
        borderWidth: 1,
        fontSize: 12,
        paddingHorizontal: 20,
        marginTop: 10

    },
    textContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -8

    },
    textBusinessContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        marginTop: 10,
    }
    ,
    radio: {
        flexDirection: 'row',
    },
    radioImage: {
        height: 20,
        width: 20,
        marginHorizontal: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftNavigationContainer: {
        height: 60,
        position: 'absolute',
        left: 10,
        width: "20%",
        justifyContent: 'center',
    },
    containerForgotPasswordButton: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 10,
        height: 60
    },
    textForgotPassword: {
        color: '#133072',
        fontSize: 16,
         
    },
    containeInquiryButton: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginHorizontal: 10,
        marginBottom: 20
    },
    gradientInquiryButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonInquiryButton: {
        width: '100%',
        height: 60,
    },
    textInquiryButton: {
        color: 'white',
        fontSize: 16,
         
        fontWeight: '700',
    },
    input: {
        left: 15,
        width: 220,
        marginTop: 10,
        height: 40,
        padding: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#01c853',
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    input: {
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        borderRadius: 10
    },
    submitButton: {
        backgroundColor: 'red',
        padding: 10,
        height: 50,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white'
    },
    tinyLogo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    navBar: {
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#133072',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    leftContainer: {
        height: 60,
        position: 'absolute',
        left: 10,
        width: "20%",
        justifyContent: 'center',

    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    SquareShapeView: {
        width: 60,
        height: 60,
        backgroundColor: '#e30f50',
        borderRadius: 35
    },
    containerGradient: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
    viewInsider: {
        backgroundColor: '#ffb0ba', paddingLeft: 0, paddingRight: 0, height: 60
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        left: '42%',
        marginTop: '-7%'
    },
    rightIcon: {
        height: 45,
        width: 45,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: 100,
        right: 10
    },
    roundButton1: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: 100,
        backgroundColor: 'orange',

    },
    containerSettingButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 64,
        backgroundColor: '#ecf0f1',
    },
    settingImageWrapper: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    settingButton: {
        width: 30,
        height: 30,
        padding: 5,
    }, chatImageWrapper: {
        width: 30,
        height: 25,
        marginTop: 5

    },
    chatButton: {
        width: 45,
        height: 45,
        right: 15,
    },
    text: {
        fontSize: 40,
        color: 'white',
        lineHeight: 42
    }

});
export default SideMenu;
