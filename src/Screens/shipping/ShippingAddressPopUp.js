import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'




const ShippingAddressPopUp = (props) => {
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
                height: 570,
                marginHorizontal: 10,
                marginTop: 150,
                marginHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                alignItems :'center'
            }}>
               <View style={{  width :'70%',justifyContent :'center',alignItems :'center',marginTop :20, flexDirection :'row',height: 55 }}>
                        <View style={{ marginRight: 5, width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2 }}>
                            <Image source={require('../assets/plusBlack.png')} style={{ marginRight: 5, width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 25 / 2 }}
                            />
                        </View>
                    <View style={{ flex: 1 ,marginLeft :10}}>
                        <Text style={{ textAlign: 'left', fontSize: 12, color: 'black',     }}>Add New Shipping Address</Text>
                    </View>
                   
                </View>


       <View style={styles.ShippingTextContainer}>
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='Address Line 1'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
          
          fontWeight='600'
        />
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='Address Line 2'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
          
          fontWeight='600'
        />
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='Zip/Pin Code'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
          
          fontWeight='600'
        />
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='State'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
          
          fontWeight='600'
        />
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='City'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
          
          fontWeight='600'
        />
        <TextInput
          style={styles.ShippingTextInput}
          placeholder='Save Address As'
          autoCapitalize="none"
          placeholderTextColor='#8F93A0'
           
        />
        <View style={{ justifyContent :"center",marginBottom :20,flexDirection: 'row', height: 50, marginHorizontal: 20, marginTop: 30 }}>
        <TouchableOpacity  onPress={()=>{buttonClickedHandler()}}>
                <View style={{ justifyContent :'center', width :200,flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>
                    
     

                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',   }}>Save & Continue</Text>

                   
                </View>
                </TouchableOpacity>

               
            </View>
     
    </View>
      </View>

        </View>


    )
}

export default ShippingAddressPopUp;
