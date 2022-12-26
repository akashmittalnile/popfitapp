import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Headers from '../../Routes/Headers';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';
import { useTranslation } from 'react-i18next';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const OutDoorCycleDetails = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [trainingdetails, setTrainingDetails] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    TrainingDetailsAPI();
  }, []);

  const MycustomonShare = async () => {
    const shareOptions = {
      title: 'Popfiit Blog Contents',
      icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
      // type: 'data:image/png;base64,<imageInBase64>',
      message: "Popfiit Blog Post !!!",
      url: 'https://www.youtube.com/embed/R2frjzrC5Jg&feature=youtu.be',
    }
    try {
      const shareResponse = await Share.open(shareOptions);
      
      // console.log(JSON.stringify(shareResponse));
     
    }
    catch (error) {
      // console.log('ERROR=>', error);
    }
  };

  // console.log("TainingDATA_...............:", props?.route?.params?.TrainingDATA?.id);
  const TrainingDATA = props?.route?.params?.TrainingDATA?.id

  const TrainingDetailsAPI = async () => {
    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_LIST_DETAILS}`, { "training_id": TrainingDATA }, { headers: { "Authorization": ` ${usertkn != null ? usertkn : null}` } });
      // console.log(":::::::::TrainingDetails_ResponseMessage>>>", response.data.message);
      // console.log("TrainingDetails__data::::::", response.data.training_detail);
      ;
      setTrainingDetails(response.data.training_detail)
   

    }
    catch (error) {
      // console.log("......error.........", error.response.data.message);
      Alert.alert("",t('Check_internet_connection'))
      } setIsLoading(false);
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1, backgroundColor: "white",
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
      {!isLoading ?
        (<>
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
              <View style={{ height: 60 }}>
                <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 17, color: 'black', fontWeight: "bold" }}>{trainingdetails?.youtube_title}</Text>
              </View>
              <View style={{
                marginHorizontal: 20, height: 200, borderRadius: 20, marginVertical: 1, width: WIDTH * 0.9,
              }}>
                <View style={{
                  height: '100%',
                  overflow: "hidden",
                  width: WIDTH * 0.9,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignSelf: "auto"

                }}>
                  <WebView
                    source={{ uri: trainingdetails?.youtube_link }}
                  />


                </View>

              </View>

              <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: '#000', }}>{trainingdetails?.youtube_description}</Text>

              <Text style={{ marginLeft: 20, textAlign: 'left', marginTop: 20, fontSize: 17, color: '#000', fontWeight: "bold" }} >{trainingdetails?.image_title}</Text>


              <View style={{ backgroundColor: "white", borderRadius: 20, marginTop: 20, height: HEIGHT * 0.2, width: WIDTH * 0.9, marginHorizontal: 18, }}>
                <Image resizeMode='contain'
                  source={{ uri: trainingdetails?.image != "" ? `${trainingdetails?.image}` : 'https://dev.pop-fiit.com/images/logo.png' }} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center', borderRadius: 20, }}
                />
              </View>

              <Text style={{ marginHorizontal: 20, marginTop: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>{trainingdetails?.image_description}</Text>
            </View>

            {/* <View style={{ paddingBottom: 65 }}>
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
        </View> */}



          </ScrollView>
          {/* <View
            style={{
              position: "absolute",
              bottom: 20,
              flexDirection: 'row',
              height: 45,
              marginHorizontal: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignSelf: "center"


            }}>
            <TouchableOpacity
              onPress={() => { MycustomonShare() }}>
              <View
                style={{
                  width: 160,
                  flex: 1,
                  backgroundColor: '#ffcc00',
                  borderRadius: 35,
                  justifyContent: "center",
                  alignSelf: "center"
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/share.png')}
                    style={{
                      width: 15,
                      height: 15,
                      alignSelf: 'center',
                      marginRight: 10,
                    }}
                  />

                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: 'white',

                    }}>
                    Share
                  </Text>
                </View>
              </View>
            </TouchableOpacity>


          </View> */}
        </>)
        :
        ( <CustomLoader showLoader={isLoading}/>)}
    </SafeAreaView>
  );
}
export default OutDoorCycleDetails;
