import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Pressable, Modal, SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style';
import { DrawerActions } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import Headers from '../../Routes/Headers';


const Recipecategory = props => {
  
  const newData = [
    {
      key: '1',
      text: 'Breakfast',
      uri: 'https://picsum.photos/id/1/200',
    },
    {
      key: '2',
      text: 'Main Dish',
      uri: 'https://picsum.photos/id/10/200',
    },

    {
      key: '3',
      text: 'Low Carb',
      uri: 'https://picsum.photos/id/1002/200',
    },
    {
      key: '4',
      text: 'High Protein',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Dishcategory5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Dishcategory 6',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Dishcategory 7',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Dishcategory 8',
      uri: 'https://picsum.photos/id/1006/200',
    },
  ];
  // const buttonClickedHandler = () => {
  //   props.navigation.goBack();

  // };

  const gotoRecipeDetails = () => {
    props.navigation.navigate('Recipesubcategory');
  };

  // const gotoNotification = () => {
  //   props.navigation.navigate('Notifications');
  // };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%', backgroundColor: 'black', flexGrow: 1
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
      <ScrollView >


        <View style={{ marginTop: 20, height: 45, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 18,
                color: 'white'
              }}>
              Recipes Category
            </Text>
          </View>
        </View>
        <FlatList
          vertical
          // scrollEnabled={false}
          // contentContainerStyle={{
          //   alignSelf: 'flex-start',
          // }}
          // ItemSeparatorComponent={({ highlighted }) => (
          //   <View style={[highlighted && { marginLeft: 0 }]} />
          // )}
          numColumns={2}
          // showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={true}
          data={newData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                gotoRecipeDetails();
              }}>
              <BackgroundImage
                source={{ uri: item.uri }}
                style={{
                  marginBottom: 20,
                  marginTop: 15,
                  marginLeft: 20,
                  justifyContent: 'space-between',
                  width: 180,
                  height: 120,
                  overflow: 'hidden',
                  borderRadius: 15,
                  backgroundColor: 'pink',
                }}>
                <View
                  style={{
                    width: 100,
                    backgroundColor: '#c9bca0',
                    height: 20,
                    borderBottomRightRadius: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 9,
                      color: 'black',

                    }}>
                    {item.text}
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    borderBottomRightRadius: 10,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <View style={{ height: 30, width: 50 }}>
                    <Image
                      source={require('../assets/arrowWhiteBack.png')}
                      style={{
                        width: 40,
                        height: 30,
                        alignSelf: 'center',
                        borderBottomRightRadius: 10,
                        marginRight: -8,
                      }}
                    />
                  </View>
                </View>
              </BackgroundImage>
            </TouchableOpacity>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
};
export default Recipecategory;
