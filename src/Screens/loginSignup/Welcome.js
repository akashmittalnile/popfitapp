import React, { useState,useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert,FlatList } from 'react-native'


const Welcome = (props) => {

  const [imageString, setImageString] = useState('');
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };
  function padding(a, b, c, d) {
    return {
        paddingTop: a,
        paddingRight: b ? b : a,
        paddingBottom: c ? c : a,
        paddingLeft: d ? d : (b ? b : a)
    }
}
  return (

    <View style={{ backgroundColor: 'yellow', flex: 1 }}>
   <View style={{ marginTop: 30, height: 550, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
    <View style={{
           height: 500
        }}>
  <View style={{ marginTop :70,marginHorizontal:20, height: 250,width:350}}>
  <View style={{
                    width: 220,
                    height: 220,
                    justifyContent: 'center',
                    alignItems: 'center', alignSelf: 'center',
                    marginTop: 5,
                  
                }}>
                    <Image source={require('../assets/profileImage.png')}
                        style={{
                            width: 220,
                            height: 220,
                        }}
                    />
  </View>
  </View>
   <View style={{ marginTop :30,marginHorizontal:20, height: 25,width:350}}>
  <Text style={{  textAlign: 'center', fontSize: 18, color: '#3E4350' }}>Welcome to KarryGO</Text>
  </View>
   
    </View>
    
  </View>
 </View>
  )
}
const styles = StyleSheet.create({
  containeInquiryButton: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:1
  },
  gradientInquiryButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
    marginHorizontal :1
  },
  buttonInquiryButton: {
    width: '90%',
    height: 65,
  },
  textInquiryButton: {
    color: 'white',
    fontSize: 16,
     
  },
   sliderImageLogo: {
    width : '100%',
    height : '100%',
    borderTopLeftRadius: 20, borderTopRightRadius: 20 
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
      alignItems : 'center',
    },
    submitButtonText: {
      color: 'white'
    },
    tinyLogo: {
      backgroundColor: 'white',
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain'
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      leftContainer: {
        height: 60,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'yellow'
      },
      leftContainerOne: {
       
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'orange'
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
        borderRadius:35
      },
      containerGradient: {
        flex: 1,
    },
    linearGradient: {
        padding: 10,
        height: 50,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        alignItems : 'center',
        
      },
      viewInsider: {
        backgroundColor: '#ffb0ba',paddingLeft : 0,paddingRight : 0,height : 60
      },
      screen: {
        justifyContent: 'center',
        alignItems: 'center',
        left : '42%',
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
        right : 10
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
      settingImageWrapper:{
         width:30,
         height:30,
         borderRadius:20 
      },
      settingButton:{
        width:30,
        height:30,
        padding: 5,
      },chatImageWrapper:{
        width:45,
        height:45,
        borderRadius:20 
     },
      chatButton:{
        width:45,
        height:45,
        right : 15,
      },
      text:{
        fontSize:40,
        color:'white',
        lineHeight:42
      },
      buttonCancel: {
        top : 30,
        left : 30,
        alignSelf: 'center',
        justifyContent: 'center', alignItems: 'center',position:'absolute'
      },
      container_style: {
        flex: 1,
        top: 0,
      },
      item_style: {
        backgroundColor: '#fff0f0',
        borderRadius:10 ,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      imageItem: {
        backgroundColor: '#fff0f0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:10 ,
        height :80,
      },
      titleItemOne: {
        fontSize: 10,
      },
      titleItemTwo:{
        fontSize:12 , marginLeft:10
      }
  });
export default Welcome;
