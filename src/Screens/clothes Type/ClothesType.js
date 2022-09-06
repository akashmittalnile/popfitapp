import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import styles from '../../Routes/style'
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;


const ClothesType = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const buttonClickedHandler = () => {
    props.navigation.goBack()
  }
  const gotoMensTshirts = () => {
    props.navigation.navigate('MenTshirts');
  }
  const DATA = ['first row', 'second row', 'third row', 'fourth row', 'five row', 'six row'];
  const newData = [{
    key: '1',
    text: 'Item text 1',
    uri: 'https://picsum.photos/id/1/200',
  },
  {
    key: '2',
    text: 'Item text 2',
    uri: 'https://picsum.photos/id/10/200',
  },

  {
    key: '3',
    text: 'Item text 3',
    uri: 'https://picsum.photos/id/1002/200',
  },
  {
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '5',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '6',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '7',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '5',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '8',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '9',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '10',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
  {
    key: '11',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '12',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  }
  ];

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
    }} >
      {!isLoading ?
        (<View>
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
          <ScrollView >
          <View style={{marginBottom:60}}>
            <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 14, color: 'black', }}>Clothes</Text>

            <FlatList
               
              // contentContainerStyle={{
              //   alignSelf: 'flex-start',
              // }}
              // ItemSeparatorComponent={({ highlighted }) => (
              //   <View style={[highlighted && { marginLeft: 20, }]} />
              // )}

              numColumns={Math.ceil(DATA.length / 2)}
              // showsVerticalScrollIndicator={true}
              // showsHorizontalScrollIndicator={false}

              data={newData}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => { gotoMensTshirts() }}>

                  <BackgroundImage source={{ uri: item.uri }}
                    style={{
                      marginTop: 20,
                      marginLeft:15,
                      //  alignItems:"center",
                      justifyContent: 'space-between',
                      width: WIDTH*0.44,
                      height: HEIGHT*0.2,
                      overflow: 'hidden',
                      borderRadius: 15,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1.0,
                      elevation: 5,
                      zIndex: 999,
                      labelStyle: {
                        color: "#fff",
                        lineHeight: 0
                      },
                    }}>
                    <View style={{ width: 100, backgroundColor: '#c9bca0', height: 20, borderBottomRightRadius: 10, justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'center', fontSize: 9, color: 'black', }}>Men’s Tshirts</Text>
                    </View>

                  </BackgroundImage>
                </TouchableOpacity>
              )}
            />
</View>
          </ScrollView>
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  )
}

export default ClothesType;
