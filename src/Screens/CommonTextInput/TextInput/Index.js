import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
 
import styles from '../TextInput/Style';

const Textinput = ({ onChangeText, keyboardType, placeholder,InputColor="black",
    
    value, placeholderTextColor, style,isPass,autoCapitalize }) => {
    const [isToggle, setToggle] = useState(false)
    const [secureText, setSecureText] = useState(true)

    console.log("passs", isPass)

    const showPass = () => {
        setToggle(true)
        setSecureText(false)
    }
    const hidePass = () => {
        setToggle(false)
        setSecureText(true)
    }

    return (

        <View>
        {isPass == false ?
            <View style={[styles.Selectedsignup, style,]}>
                <TextInput style={{...styles.textstyles2,
                color:InputColor}    
            }
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureText}
                />
                {isToggle == false ?
                    <TouchableOpacity onPress={() => showPass()}>
                        <Image style={{ width: 25, height: 20, marginRight: 20}} source={require('../../assets/hide_eye.png')} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => hidePass()}>
                        <Image resizeMode='contain' style={{ width: 30, height: 25, marginRight: 20}} source={require('../../assets/show_eye.png')}  />
                    </TouchableOpacity>
                }
            </View>
            :
            <View style={[styles.Selectedsignup, style]}>
                <TextInput style={styles.textstyles}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    bodyText={value}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    //maxLength={maxLength}
                    //multiline={multiline}
                    placeholderTextColor={placeholderTextColor}
                //   onSubmitEditing={onSubmitEditing}
                />
            </View>

        }
    </View>
         

    )
}



export default  Textinput;