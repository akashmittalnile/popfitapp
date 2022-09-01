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
import Headers from '../../Routes/Headers';



const OutDoorCycleDetails = (props) => {
  const DATA = ['first row', 'second row', 'third row'];
  //const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

  const gotoNotification = () => {
    props.navigation.navigate("Notifications")
  }
  const buttonClickedHandler = () => {
    props.navigation.goBack()
    console.log('You have been clicked a button!');
  };
  const gotoBlog = () => {
    props.navigation.navigate("Blog")
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%', flexGrow: 1, backgroundColor: "white",
    }} >
      <Headers
        Backicon={{
          visible: true,
        }}
        BackicononClick={() => {props.navigation.goBack()}}

        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => {props.navigation.navigate("CartAdded")}}

        Bellicon={{
          visible: true,

        }}
        BelliconononClick={() => {props.navigation.navigate("Notifications")}}
      />
      {/* <View style={styles.navigationBarColor}>

        <View style={styles.navigationBarLeftContainer}>
          <TouchableOpacity onPress={()=>{buttonClickedHandler()}}>

            <Image source={require('../assets/leftArrowWhite.png')}
              style={{
                width: 30,
                height: 25, alignSelf: 'center', marginLeft: 10
              }} />

          </TouchableOpacity>
        </View>

        <View style={styles.navigationBarCenterContainer}>
          <TouchableOpacity>
            <Image resizeMode='contain'
            source={require('../assets/layerCenter.png')}
              style={{
                width: 80,
                height: 50, alignSelf: 'center'
              }} />

          </TouchableOpacity>
        </View>
        <View style={styles.navigationBarRightContainer}>
          <TouchableOpacity onPress={() => { gotoNotification() }}>
            <Image source={require('../assets/bellRight.png')}
              style={{
                width: 20,
                height: 25, alignSelf: 'center', marginRight: 10
              }} />

          </TouchableOpacity>
        </View>
      </View> */}
      <ScrollView>
        <View style={{ paddingBottom: 65 }}>
          <View style={{
            marginHorizontal: 20, marginTop: 30, height: 170, borderRadius: 20,
          }}>
            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center' }}>
                <View style={{ height: 170, backgroundColor: 'red', width: 50, height: 50, justifyContent: "center", alignItems: 'center', borderRadius: 50 / 2 }}>
                  <Image source={require('../assets/play.png')}
                  />
                </View>
              </BackgroundImage>
            </TouchableOpacity>
          </View>
          <Text style={{ marginLeft: 1, marginTop: 20, textAlign: 'center', fontSize: 15, color: 'black',   }}>Outdoor Cycle</Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000',    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>

          <View style={{
            marginHorizontal: 20, marginTop: 30, height: 170, borderRadius: 20
          }}>
            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center' }}>
                <View style={{ height: 170, width: 50, height: 50, justifyContent: "center", alignItems: 'center', borderRadius: 50 / 2 }}>
                  <Image source={require('../assets/play.png')}
                  />
                </View>
              </BackgroundImage>
            </TouchableOpacity>
          </View>
          <Text style={{ marginLeft: 1, marginTop: 20, textAlign: 'center', fontSize: 15, color: 'black',   }}>MyFitnessPal Blog</Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000',    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000',    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000',    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>
        </View>



      </ScrollView>
      <View style={{
        justifyContent: 'center', marginBottom: 10, flexDirection: 'row', height: 50, alignSelf: "center", backgroundColor: "transparent", position: "absolute",
        bottom: 0,
      }}>
        <TouchableOpacity>
          <View style={{ width: 160, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/share.png')}
                style={{
                  width: 15,
                  height: 15, alignSelf: 'center', marginRight: 10
                }} />

              <Text style={{ textAlign: 'center', fontSize: 15, color: 'white',   }}>Share</Text>

            </View>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
export default OutDoorCycleDetails;
