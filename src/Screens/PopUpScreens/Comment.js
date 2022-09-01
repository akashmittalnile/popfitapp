import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'




const Comment = (props) => {
    const DATA = ['first row', 'second row', 'third row'];
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
                height: 320,
                marginHorizontal: 10,
                marginTop: 390,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <View style={{ marginTop: 20, marginHorizontal: 20, height: 25, flexDirection: "row", }}>


                    <View style={{ backgroundColor: '#f2f2f2', width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 40 / 2 }}>
                        <Image source={require('../assets/export.png')}
                        />

                    </View>
                    <Text style={{ marginTop: 5, marginLeft: 10, textAlign: 'center', fontSize: 12, color: 'black',   }}>Post Your Comment</Text>

                </View>
             

               <View style={{
   marginHorizontal: 15,
   borderRadius: 15,
   backgroundColor: 'white',
   marginTop: 20,
   borderColor: "#bbbaba",
   borderWidth: 1,
   height :  140  ,
   width :"90%"
    }}>
          <TextInput placeholder="   Type Your comment here" 
                      
                     fontWeight='normal'
              style={{ width:'70%'}}/>
 </View>

                <View style={{ marginLeft: 30, marginBottom: 20, flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
                <TouchableOpacity  onPress={buttonClickedHandler}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',    }}>Post</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>)
}

export default Comment;
