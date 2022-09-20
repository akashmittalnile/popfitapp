import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'



const NewsLetter = (props) => {
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
                height: 350,
                marginHorizontal: 10,
                marginTop: 360,
                marginHorizontal: 15,
                borderRadius: 20,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>


<View style={{
                height: 150,
                width :"100%",
                borderRadius :20 
                
            }}>

<BackgroundImage source={require('../assets/newslogo.png')} style={{ flex: 1, height: 160 }}>
<Text style={{ marginTop: 15, textAlign: 'center', fontSize: 15, color: 'white',   }}>Subscribe News Letter</Text>

</BackgroundImage>


                 </View>

               <View style={{
   marginHorizontal: 15,
   borderRadius: 40,
   backgroundColor: 'white',
   marginTop: 40,
   borderColor: "#41BDB9",
   borderWidth: 0.5,
   height :  40  ,
   width :"90%"
    }}>
          <TextInput placeholder="   Please Enter Your Email Id" 
                      
                     fontWeight='normal'
                     placeholderTextColor= '#41BDB9'
              style={{ width:'70%'}}/>
 </View>

                <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 50 }}>
                <TouchableOpacity  onPress={buttonClickedHandler}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',    }}>Subscribe</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>)
}

export default NewsLetter;
