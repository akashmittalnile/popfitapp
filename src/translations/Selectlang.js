import React from 'react';
import { View, Text, StyleSheet, Pressable,Image,SafeAreaView,Dimensions } from 'react-native';
 
import { useTranslation } from 'react-i18next';
import Headers from '../Routes/Headers';
import {CommonActions } from '@react-navigation/native'; 

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' }
  ];
  
  const Selector = (props) => {
    const {t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;
    console.log("selected lang::",selectedLanguageCode);
  
    const setLanguage = code => {
      console.log("code",code);
      return i18n.changeLanguage(code);
    };
  
    return (
      <SafeAreaView style={{
        flex: 1,
        width: WIDTH,
        height: HEIGHT, flexGrow: 1, backgroundColor: '#fff'
    }} >
      <View style={styles.container}>
        <Headers
                Backicon={{
                    visible: true,
                }}
                BackicononClick={() => {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }]
                          })
                        
                    )
                }}
                // Drawericon={{
                //     visible: true,
                //   }}
                //   DrawericononClick={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}
                CartIcon={{
                    visible: true,
                }}
                CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

                Bellicon={{
                    visible: true,

                }}
                BelliconononClick={() => { props.navigation.navigate("Notifications") }}
            />
        <View style={styles.row}>
          <Text style={styles.title}>{t('Select_Language')}</Text>
          {/* <Image source={require('../Screens/assets/bell.png')}
                                    style={{
                                        width: 25,
                                        height: 24, alignSelf: 'center', marginRight: 19
                                    }} /> */}
           
        </View>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;
  
          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => {setLanguage(language.code),console.log("language-onpress",language.code)}}
            >
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}
              >
                {language.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      // paddingTop: 60,
      // paddingHorizontal: 16
    },
    row: {
      paddingTop: 20,
       paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      color: '#444',
      fontSize: 20,
      fontWeight: '600'
    },
    buttonContainer: {
      marginTop: 10,paddingHorizontal: 16,
    },
    text: {
      fontSize: 18,
      color: '#000000',
      paddingVertical: 4
    },
    selectedText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'tomato',
      paddingVertical: 4
    }
  });
  
  export default Selector;