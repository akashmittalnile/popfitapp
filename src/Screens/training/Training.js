import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import { DrawerActions } from '@react-navigation/native';
import Headers from '../../Routes/Headers';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Training = (props) => {

  const [trainingBlog_list, setTrainingBlog_list] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const openDrawer = () => props.navigation.dispatch(DrawerActions.openDrawer());

  const gotoOutDoorCycleDetail = (item) => {
    props.navigation.navigate("OutDoorCycleDetails", {
      TrainingDATA: item
    })
  }
  // const buttonClickedHandler = () => {
  //   props.navigation.goBack()
  //   console.log('You have been clicked a button!');
  //   // do something
  // };
  const MycustomonShare = async () => {
    console.log('====================================');
    console.log(`${trainingBlog_list.youtube_link}`);
    console.log('====================================');
    const shareOptions = {
      title: 'Popfiit Blog Contents',
      icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
      // type: 'data:image/png;base64,<imageInBase64>',
      message: "Popfiit Blog Post !!!",
      url: `${trainingBlog_list.youtube_link}`,
    }
    try {
      const shareResponse = await Share.open(shareOptions);
      console.log('====================================');
      console.log(JSON.stringify(shareResponse));
      console.log('====================================');
    }
    catch (error) {
      console.log('ERROR=>', error);
    }
  };
  useEffect(() => {
    WorkoutSubCategorytraininglist();
  }, [props]);

  console.log("Tainingcat_id_item...............:", props?.route?.params?.Tainingcat_id);
  const Tainingcat_id = props?.route?.params?.Tainingcat_id
  // console.log('====================================');
  // console.log( props?.route?.params?.Trainingsubcat_data?.id);
  // console.log('====================================');
  console.log("Trainingsubcat_Data...............:", props?.route?.params?.Trainingsubcat_data?.id);
  const Trainingsubcat_data = props?.route?.params?.Trainingsubcat_data?.id

  const WorkoutSubCategorytraininglist = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_LIST}`, { "category_id": Tainingcat_id, "subcategory_id": Trainingsubcat_data });
      console.log(":::::::::TrainingCategoryListAPI_Response>>>", response.data.message);
     
      console.log("TrainingCategoryListAPI_data::::::", response.data.blog_list);
      ;
      setTrainingBlog_list(response.data.blog_list)
      // setyoutubelink(response.data.blog_list.youtube_link)

      // setIsLoading(false);

    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      Alert.alert("Something went wrong!", error.response.data.message);
      // setIsLoading(false);

    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
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
          <ScrollView>
            <View style={{
                width: WIDTH,
              height: HEIGHT, justifyContent: "center", alignItems: "center"
            }}>
              <FlatList
                vertical
                style={{ margin: 10 }}
                data={trainingBlog_list}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginTop: 1,
                      height: HEIGHT,
                      width: WIDTH * 0.99,
                      // justifyContent: "center",
                      // alignItems:"center",
                      marginHorizontal: 5,
                      // backgroundColor: "white"
                    }}>
                    <View style={{ height: 50, }}>
                      <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', fontWeight: "bold" }}>{item.training_title}</Text>
                    </View>
                    <View style={{
                      height: 200, borderRadius: 20, marginVertical: 1, width: WIDTH * 0.93, 
                    }}>
                      <View style={{
                        height: '100%',
                        overflow: "hidden",
                        width: WIDTH * 0.93,
                        borderRadius: 20,

                        justifyContent: 'center',
                        alignSelf: "auto"

                      }}>
                        <WebView
                          source={{ uri: item.youtube_link }}
                        /></View>

                    </View>

                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => { gotoOutDoorCycleDetail(item) }}>
                        <View style={{ backgroundColor: '#ffcc00', width: 35, height: 35, justifyContent: "center", alignItems: 'center', borderRadius: 35 / 2 }}>
                          <Image source={require('../assets/rightArrow.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{ height: 35, marginTop: 5 }}>
                      <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', fontWeight: "bold" }}>{item.image_title}</Text>
                    </View>
                    <View style={{  padding: 15, width: WIDTH * 0.93 }}>
                      <Text style={{ textAlign: 'justify', fontSize: 14, color: '#000', }}>{item.training_description}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 40,
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


          </View>
        </>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}
export default Training;
