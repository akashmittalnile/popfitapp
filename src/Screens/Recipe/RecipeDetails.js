import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Headers from '../../Routes/Headers';
import styles from '../../Routes/style'


const RecipeDetails = (props) => {
  const DATA = ['first row', 'second row', 'third row'];


  const gotoNotification = () => {
    props.navigation.navigate("Notifications")
  }
  const buttonClickedHandler = () => {
    props.navigation.goBack()
    console.log('You have been clicked a button!');
  };


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
        BackicononClick={() => { props.navigation.goBack() }}

        CartIcon={{
          visible: true,
        }}
        CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

        Bellicon={{
          visible: true,

        }}
        BelliconononClick={() => { props.navigation.navigate("Notifications") }}
      />
      <ScrollView>
        <View style={{ paddingBottom: 60 }}>
          <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 15, color: 'black', fontWeight: "bold" }}>Breakfast</Text>

          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000', }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>
          <View style={{
            marginHorizontal: 20, marginTop: 10, height: 160, borderRadius: 20,
          }}>

            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                <View style={{ height: 170, backgroundColor: 'red', width: 50, height: 50, justifyContent: "center", alignItems: 'center', borderRadius: 50 / 2 }}>
                  <Image source={require('../assets/play.png')}
                  />
                </View>
              </BackgroundImage>


            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 20, marginTop: 50, textAlign: 'left', fontSize: 9, color: '#000', }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>

          <View style={{
            marginHorizontal: 20, marginTop: 10, height: 160, borderRadius: 20
          }}>
            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center' }}>

              </BackgroundImage>
            </TouchableOpacity>
          </View>
          <View style={{
            marginHorizontal: 20, marginTop: 10, height: 160, borderRadius: 20
          }}>
            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center' }}>

              </BackgroundImage>
            </TouchableOpacity>
          </View>
          <View style={{
            marginHorizontal: 20, marginTop: 10, height: 160, borderRadius: 20
          }}>
            <TouchableOpacity>
              <BackgroundImage source={require('../assets/blogLogo1.png')} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center' }}>

              </BackgroundImage>
            </TouchableOpacity>
          </View>
          <Text style={{ marginLeft: 1, marginTop: 20, textAlign: 'center', fontSize: 15, color: 'black', }}>New Food Article</Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000', }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>
          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 9, color: '#000', }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
          </Text>

        </View>



      </ScrollView>

    </SafeAreaView>
  );
}
export default RecipeDetails;
