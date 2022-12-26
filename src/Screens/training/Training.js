import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ScrollView, Modal,RefreshControl } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler';
import Headers from '../../Routes/Headers';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from 'react-native-video-controls';
// third parties
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
// import { useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import { useProgress } from 'react-native-track-player';

//styles
import { styles } from "./styles";
import CustomLoader from '../../Routes/CustomLoader';
//svg
// import PauseSvg from "../../Screens/assets/pause-button.png";
// import PlaySvg from "../../Screens/assets/play-button.png";
// import MoreSvg from "../../Screens/assets/stop-audio.png";
import { useTranslation } from 'react-i18next';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Training = (props) => {

  const { t } = useTranslation();
  // const DATA = ['first row', 'second row', 'third row'];
  const [videomodal, setVideoModal] = useState(false);
  const [trainingBlog_list, setTrainingBlog_list] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagebaseurl, setImagebaseurl] = useState("");
  const [audiobaseurl, setAudiobaseurl] = useState("");
  const [videobaseurl, setVideobaseurl] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [youtubelinks, setyoutubelinks] = useState([]);

  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    WorkoutSubCategorytraininglist()
    setrefreshing(false)
  }
  // console.log("links:",youtubelinks);

  // console.log('audio123456:', audiobaseurl + "" + trainingBlog_list[0]?.training_audio[0]);
  // const { position, duration } = useTrackPlayerProgress(250);
  const { position, duration } = useProgress(250);
  const [flag, setFlag] = useState(false);
  const audioPercentage = (position / duration) * 100;

  useEffect(() => {
    WorkoutSubCategorytraininglist()
    // addAudio()
    return () => {
      pauseAudio()
      // stopAudio()
    }
  }, []);

  // useEffect(() => {
  //   addAudio()

  // }, [trainingBlog_list]);



  //function : music function
  // const musicData = {
  //   id: 'trackId',
  //   url: `${audiobaseurl + trainingBlog_list[0]?.training_audio[0]}`,
  //   title: 'brandnue',
  //   artist: 'brandnue',
  // }
  // "https://dev.pop-fiit.com/upload/training_audio/20220915_1663232323_13199.mp3"
  //function : audio function
  const addAudio = async (musicData) => {
    // RepeatMode(musicData)

    await TrackPlayer?.setupPlayer();

    // Add a track to the queue
    // console.log('amittracklist:', musicData);
    // setRepeatMode(Track)
    await TrackPlayer.add(musicData);
  }

  const playAudio = async () => {
    await TrackPlayer?.play()
    setFlag(true)
  }
  const pauseAudio = async () => {
    await TrackPlayer?.pause()
    setFlag(false)
  }
  // const stopAudio = async () => {
  //   await TrackPlayer?.stop()
  // }

  const MycustomonShare = async () => {

    const shareOptions = {
      title: 'Popfiit Blog Contents',
      icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
      // type: 'data:image/png;base64,<imageInBase64>',
      message: "Popfiit Blog Post !!!",
      url: `${trainingBlog_list?.youtube_link}`,
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

  const gotoAudiolist = () => {
    props.navigation.navigate("Audiolist", {
      catgid: props?.route?.params?.Tainingcat_id,
      subcatid: Trainingsubcat_data
    })
  }
  const gotoVideolist = () => {
    props.navigation.navigate("Videolist", {
      catgid: props?.route?.params?.Tainingcat_id,
      subcatid: Trainingsubcat_data
    })
  }

  // console.log("Tainingcat_id_item...............:", props?.route?.params?.Tainingcat_id);
  const Tainingcat_id = props?.route?.params?.Tainingcat_id

  // console.log("Trainingsubcat_Data...............:", props?.route?.params?.Trainingsubcat_data?.id);
  const Trainingsubcat_data = props?.route?.params?.Trainingsubcat_data?.id

  const WorkoutSubCategorytraininglist = async () => {

    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_LIST}`, { "category_id": Tainingcat_id, "subcategory_id": Trainingsubcat_data },
        { headers: { "Authorization": ` ${usertkn != null ? usertkn : null}` } }
      );
      // console.log(":::::::::TrainingCategoryListAPI_Response>>>", response.data);


      if (response?.data?.status == 1) {
        // console.log("TrainingCategoryListAPI_data::::::", response.data.blog_list);
        // console.log("imageurl::", response.data.training_image);
        // console.log("AUDIO_url::", response.data.training_audio);
        // console.log("Video_url::", response.data.training_video);
        setImagebaseurl(response?.data?.training_image);
        setAudiobaseurl(response?.data?.training_audio);
        setVideobaseurl(response?.data?.training_video);
        setTrainingBlog_list(response?.data?.blog_list);

        // const musicData = {
        //   id: 'trackId',
        //   url: `${response.data.training_audio + response.data.blog_list[0]?.training_audio}`,
        //   title: 'brandnue',
        //   artist: 'brandnue',
        // }
        // console.log('addAudio(musicData)',musicData);
        setyoutubelinks(response?.data?.blog_list[0].youtube_link)

      }
      else {
        console.log(".WorkoutSubCategorytraininglist.....error.........", error.response.data.message);

        // Alert.alert('Technical Issue', '')
      }



    }
    catch (error) {
      // Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log(".WorkoutSubCategorytraininglist.....error.........", error );
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1,
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
          {
            trainingBlog_list?.length != 0 ?
              (<ScrollView 
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={{ justifyContent: "flex-start", flex: 1, alignItems: "flex-start" }}>
                  <View style={{
                    marginBottom: 5,
                    // backgroundColor: '#f7f7f7',
                    backgroundColor: 'gray',
                    height: 190,
                    width: WIDTH * 0.96,
                    marginTop: 15,
                    borderRadius: 20,
                    marginHorizontal: 8,
                    flex: 1,
                  }}>

                    <Pages indicatorColor='#ffcc00'>
                      {
                        trainingBlog_list[0]?.training_image.map((itm, index) => {
                          return (
                            <View key={String(index)}
                              style={{
                                height: 190, width: WIDTH * 0.96, borderRadius: 20
                              }}>
                              <Image
                                source={{ uri: `${imagebaseurl + itm}` }}
                                resizeMode="contain"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: 20,
                                  alignSelf: 'center',
                                }}
                              />
                            </View>)
                        })}
                    </Pages>

                  </View>
                  <View style={{ marginLeft: 15, height: 50, width: WIDTH * 0.92, justifyContent: 'center', alignItems: "flex-start", padding: 6 }} numberOfLines={1}>
                    <Text style={{ textAlign: 'left', fontSize: 17, color: '#000', fontWeight: "500" }} >{trainingBlog_list[0]?.training_title}</Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 1, height: "auto", width: WIDTH * 0.92, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}>
                    <Text style={{ textAlign: 'left', fontSize: 12, color: '#000' }}>{trainingBlog_list[0]?.image_description}</Text>
                  </View>

                  {/* Training video */}
                  <View style={{ marginTop: 30, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ flex: 0.8 }}>
                      <Text style={{ marginLeft: 20, fontSize: 17, color: 'black', fontWeight: "500" }}>{t('Training_Videos')}</Text>
                    </View>
                    <View style={{ flex: 0.25, right: 10, }}>
                      <TouchableOpacity onPress={() => {
                        gotoVideolist()
                      }}>
                        <View style={{ borderRadius: 50, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 12, color: 'white', fontWeight: "500" }}>{t('View_All')}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>

                  {/* //flastlist  for videos */}
                  <FlatList
                    horizontal
                    // showsHorizontalScrollIndicator={false}
                    // ref={ref}
                    data={youtubelinks}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      // console.log("1st flastlist video:", item)
                      return (

                        <>
                          <View style={{
                            height: 170,
                            overflow: "hidden",
                            width: WIDTH * 0.7,
                            borderRadius: 20,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            justifyContent: 'center',


                          }}>
                            <WebView
                              source={{
                                uri: `${item}`
                              }}
                            />


                          </View>
                        </>
                      )
                    }}
                  />

                  {/* Training Audio */}
                  {/* <View style={{ marginTop: 1, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ flex: 0.8 }}>
                      <Text style={{ marginLeft: 20, fontSize: 17, color: 'black', fontWeight: "500" }}>Training Audio</Text>
                    </View>
                    <View style={{ flex: 0.25, right: 10, }}>
                      <TouchableOpacity onPress={() => { 
                        // gotoAudiolist() 
                        }}>
                        <View style={{ borderRadius: 50, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 12, color: 'white', fontWeight: "500" }}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View> */}
                  {/* //flastlist  for AUDIO */}
                  {/* <FlatList
                    horizontal

                    data={trainingBlog_list}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {

                      return (
                        <View style={styles.audioPlayerView}>
                          {
                            flag
                              ?
                              <TouchableOpacity
                                onPress={pauseAudio}
                              >
                               
                                <Image
                                  source={require('../assets/pause-button.png')}
                                  resizeMode="contain"
                                  style={{
                                    width: 30,
                                    height: 30,
                                    alignSelf: 'center',
                                  }}
                                />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity
                                onPress={playAudio}
                              >
                                
                                <Image
                                  source={require('../assets/play-button.png')}
                                  resizeMode="contain"
                                  style={{
                                    width: 30,
                                    height: 30,
                                    alignSelf: 'center',
                                  }}
                                />

                              </TouchableOpacity>
                          }
                          <Text style={{ color: 'black' }}>
                            {(position / 60).toFixed(2)}
                          </Text>
                          <View style={styles.audioTimeDurationView}>
                            <View style={styles.audioProgressView}>
                              <View style={{ ...styles.audioActiveProgress, width: `${audioPercentage}%` }} />
                              <View style={{ ...styles.audioInAtiveProgress, width: `${100 - audioPercentage}%` }} />
                            </View>
                            <View style={{ ...styles.audioActiveDotView, left: `${audioPercentage}%` }} />
                          </View>
                          <Text style={{ color: 'black' }}>
                            {(duration / 60).toFixed(2)}
                          </Text>
                          <TouchableOpacity
                            onPress={stopAudio}
                          >
                           
                            <Image
                                source={require('../assets/stop-audio.png')}
                                resizeMode="contain"
                                style={{
                                  width: 30,
                                  height: 30,
                                  alignSelf: 'center',
                                }}
                              />
                          </TouchableOpacity>
                        </View>
                      )
                    }}
                  /> */}

                </View>


                {
                  videomodal ?
                    (<Modal
                      animationType="slide"
                      transparent={true}
                      visible={videomodal}
                      onRequestClose={() => {
                        setVideoModal(false);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          backgroundColor: 'rgba(140, 141, 142, 0.7)',
                        }}>
                        <View
                          style={{
                            // backgroundColor: 'red',
                            // borderRadius: 20,
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: 'center',

                          }}>
                          <VideoPlayer
                            paused={true}
                            controls={true}
                            onBack={() => { props.navigation.navigate("Training"), setVideoModal(false) }}
                            source={{
                              isNetwork: true,
                              uri: 'https://dev.pop-fiit.com/upload/training_video/20220929_1664457751_54648.mp4'
                            }}
                            style={{
                              height: "100%",
                              width: "100%",
                              // borderRadius: 20
                            }}
                            videoStyle={{
                              height: HEIGHT * 0.99,
                              width: WIDTH * 0.99

                            }}

                            resizeMode={"contain"}
                            showOnStart={false}
                            tapAnywhereToPause={true}
                          // id={}
                          // disableFullscreen

                          />
                        </View>
                      </View>
                    </Modal>)
                    :
                    null
                }

              </ScrollView>

              )
              :
              (<View style={{
                justifyContent: "center", alignItems: "center", backgroundColor: "white", flex: 1,
              }}>
                <Image resizeMode='contain'
                  source={require('../assets/Nodatafound.png')}
                  style={{
                    width: 200,
                    height: 120, alignSelf: 'center'
                  }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>{t('Oops_No_data_found')}</Text>
              </View>)
          }



        </>)
        :
        (<CustomLoader showLoader={isLoading} />)}
    </SafeAreaView >

  );
}
export default React.memo(Training);
