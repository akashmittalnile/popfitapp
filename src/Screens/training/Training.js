import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable,SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import Headers from '../../Routes/Headers';



const Training = (props) => {
  const DATA = ['first row', 'second row', 'third row'];
  const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

  const gotoNotification = () => {
    props.navigation.navigate("Notifications")
  }
  const gotoOutDoorCycleDetail = () => {
    props.navigation.navigate("OutDoorCycleDetails")
  }
  const buttonClickedHandler = () => {
    props.navigation.goBack()
    console.log('You have been clicked a button!');
    // do something
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',flexGrow: 1
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

        <View style={{
          marginHorizontal: 20, marginTop: 30, height: 170, borderRadius: 20
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
        <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 15, color: 'black',   }}>Outdoor Cycle</Text>
        <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000',    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
        </Text>
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
          <TouchableOpacity onPress={()=>{gotoOutDoorCycleDetail()}}>
            <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
              <Image source={require('../assets/rightArrow.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          vertical
          data={DATA}
          renderItem={({ item }) =>

            <View style={{ marginTop: 20, borderWidth: 1, borderColor: '#e3e3e3', height: 130, flexDirection: 'row', backgroundColor: '#f7f7f7', borderRadius: 15, marginHorizontal: 20 }}>
              <View style={{ marginLeft: 20, flex: 1 / 3, borderRadius: 15, justifyContent: 'center', }}>
                <Image source={require('../assets/profileImage.png')}
                  style={{ alignSelf: 'center', width: 100, height: 100, borderRadius: 100 / 2 }} />
              </View>



              <View style={{ marginLeft: 20, flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 35, alignItems: 'flex-end' }}>
                  <View style={{ width: 150, borderColor: '#e3e3e3', borderWidth: 1, height: 35, borderTopRightRadius: 10, borderBottomLeftRadius: 30, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 9, color: 'black',   }}>Category 1</Text>
                  </View>
                </View>
                <View style={{
                  height: 90
                }}>
                  <TouchableOpacity>
                    <View style={{ height: 170, backgroundColor: 'red', width: 50, height: 50, justifyContent: "center", alignItems: 'center', borderRadius: 50 / 2 }}>
                      <Image source={require('../assets/play.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{
                    height: 1, backgroundColor: '#d3d3d3', marginTop: 15, marginRight: 20
                  }}>
                  </View>
                  <View style={{ marginTop: 5, height: 30, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ textAlign: 'left', fontSize: 8, color: '#000000',    }}>05:46 Mins</Text>
                    </View>
                    <View style={{ flex: 1, marginRight: 20 }}>
                      <Text style={{ textAlign: 'right', fontSize: 8, color: '#000000',    }}>05:46 Mins</Text>
                    </View>
                  </View>
                </View>
              </View>

            </View>

          }
        />

        <View style={{ marginTop: 30, height: 180, marginHorizontal: 20, borderRadius: 20 }}>
          <Pages indicatorColor='#ffcc00' >
            <View style={{ height: 160, flexDirection: 'row' }}>
              <View style={{ flex: 1, height: 160 }}>
                <Image source={require('../assets/logo2.png')}
                  style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 20 }} />
              </View>
            </View>
            <View style={{ height: 160, flexDirection: 'row' }}>
              <View style={{ flex: 1, height: 160 }}>
                <Image source={require('../assets/logo2.png')}
                  style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 20 }} />
              </View>
            </View>
            <View style={{ height: 160, flexDirection: 'row' }}>
              <View style={{ flex: 1, height: 160 }}>
                <Image source={require('../assets/logo2.png')}
                  style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: 20 }} />
              </View>
            </View>

          </Pages>
        </View>

        <View style={{ justifyContent: 'center', marginBottom: 20, flexDirection: 'row', height: 50, marginTop: 20 }}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
export default Training;
