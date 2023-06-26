import React, { useState, useEffect, useRef } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions, ScrollView, Modal, RefreshControl } from 'react-native'

import Headers from '../../Routes/Headers';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';

// import { useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
// import TrackPlayer, {
//   Capability,
//   usePlaybackState,
//   State,
//   useProgress,
//   RepeatMode,
// } from 'react-native-track-player';
import CustomLoader from '../../Routes/CustomLoader';
//svg
import VideoPlayer from 'react-native-video-player'
// import { createThumbnail } from "react-native-create-thumbnail";
import { VideoModel } from '../../Routes/VideoModel';
import { useTranslation } from 'react-i18next';
import {AudioPlayer} from 'react-native-simple-audio-player';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Training = (props) => {

  const { t } = useTranslation();

  const [trainingBlog_list, setTrainingBlog_list] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagebaseurl, setImagebaseurl] = useState("");
  const [youtubelinks, setyoutubelinks] = useState([]);
  // const [audiobaseurl, setAudiobaseurl] = useState("");
  const [reload, setReload] = useState(false)
  const [audio, setAudio] = useState([]);
  const [videobaseurl, setVideobaseurl] = useState([]);
  const songSlider = useRef(null);
  // const playBackState = usePlaybackState();
  // const progress = useProgress();

  const [showModal, setShowModal] = useState({ isVisible: false, data: null });
  // console.log("showModalvideo", showModal);
  // const [showVideoModal, setShowVideoModal] = useState(false)
  // const [selectedVideo, setSelectedVideo] = useState({})

  // const [videoDetails, setVideoDetails] = useState([
  //   { url: `https://dev.pop-fiit.com/upload/training_video/20230117_1673935024_37940.mp4` },
  //   { url: `https://dev.pop-fiit.com/upload/training_video/20230117_1673935024_37940.mp4` },

  // ])
  // url: `${audio}`,
  // {
  //   id: 1,
  //   title: '19th Floor',
  //   artist: 'Bobby Richards',
  //   artwork: require('../../Screens/assets/logohome.png'),
  //   url: require('../../Screens/assets/MusicMp3/powerful-beat.mp3'),
  // url: 'https://dev.pop-fiit.com/upload/training_audio/20230117_1673935024_26761.mp3',
  // },


  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    WorkoutSubCategorytraininglist()
    setrefreshing(false)
  }

  // const { position, duration } = useProgress(250);
  // const [flag, setFlag] = useState(false);
  // console.log(flag);
  // const audioPercentage = (position / duration) * 100;

  useEffect(() => {
    WorkoutSubCategorytraininglist();
    // return () => {
    //   TrackPlayer.reset()
    //   TrackPlayer.pause()
    //   // TrackPlayer.destroy();
    // };
  }, []);

  // const songs = [
  //   {
  //     id: 1,
  //     title: 'Training Audio',
  //     artist: 'PopFiit',
  //     artwork: require('../../Screens/assets/app-logo-popfiit.png'),
  //     url: `${audio}`,
  //   },

  // ];

  // const setupPlayer = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.updateOptions({
  //       capabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         // Capability.Stop,
  //       ],
  //     });
  //     await TrackPlayer.reset()
  //     await TrackPlayer.add(songs);
  //     await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  //   } catch (error) {

  //     console.log("SetupPlayer:", error);
  //   }
  // };
  // const togglePlayBack = async (playBackState) => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   console.log(currentTrack, playBackState, State.Playing);
  //   if (currentTrack != null) {
  //     if (playBackState == State.Paused) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // };


  // const playAudio = async () => {
  //   setFlag(true)
  //   await TrackPlayer.play()
  //   }
  // const pauseAudio = async () => {
  //   setFlag(false)
  //   await TrackPlayer.pause()
  //   }
  // const stopAudio = async () => {
  //   setFlag(false)
  //   await TrackPlayer.stop()
  // }

  // const MycustomonShare = async () => {

  //   const shareOptions = {
  //     title: 'Popfiit Blog Contents',
  //     icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
  //     // type: 'data:image/png;base64,<imageInBase64>',
  //     message: "Popfiit Blog Post !!!",
  //     url: `${trainingBlog_list?.youtube_link}`,
  //   }
  //   try {
  //     const shareResponse = await Share.open(shareOptions);
  //     console.log('====================================');
  //     console.log(JSON.stringify(shareResponse));
  //     console.log('====================================');
  //   }
  //   catch (error) {
  //     console.log('ERROR=>', error);
  //   }
  // };

  // const gotoAudiolist = () => {
  //   props.navigation.navigate("Audiolist", {
  //     catgid: props?.route?.params?.Tainingcat_id,
  //     subcatid: Trainingsubcat_data
  //   })
  // }
  const gotoVideolist = () => {
    props.navigation.navigate("Videolist", {
      Id: props?.route?.params?.Tainingcat_item})
  }
  
  // console.log("Tainingcat_id_item...............:", props?.route?.params?.Tainingcat_id);
  // const Tainingcat_id = props?.route?.params?.Tainingcat_id
  // console.log("Trainingsubcat_Data...............:", props?.route?.params?.Trainingsubcat_data?.id);
  // const Trainingsubcat_data = props?.route?.params?.Trainingsubcat_data?.id


   console.log("Tainingcat_idssssssssssssss..........:", props?.route?.params?.Tainingcat_item);
  const Tainingcat_item = props?.route?.params?.Tainingcat_item;

  const WorkoutSubCategorytraininglist = async () => {

    const usertkn = await AsyncStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.TRAINING_LIST_GET_DETAILS}`, { "id": Tainingcat_item},
        { headers: { "Authorization": ` ${usertkn}` } }
      );
   
      // console.log("AUDIO_url::", response.data.blog_list[0].training_audio[0].url);
      // console.log("Video_url::", response.data.blog_list);

      if (response?.data?.status == '1') {
        console.log("TrainingCategoryListAPI_Response>>>", response.data.blog_list);
        setTrainingBlog_list(response?.data?.blog_list);
        setImagebaseurl(response?.data?.training_image);
        // setAudiobaseurl(response?.data.training_audio);
        setVideobaseurl(response?.data.blog_list?.training_video);
       
        setAudio(response?.data?.blog_list?.training_audio);
        setReload(!reload)
        // const musicData = {
        //   id: 1,
        //   url: `${response.data.blog_list[0].training_audio[0].audies}`,
        //   title: 'Popfiit',
        //   artist: 'popfiit',
        // }
        // console.log('addAudio(musicData)', musicData);
        setyoutubelinks(response?.data?.blog_list[0].youtube_link)

      }
      else {
        // console.log(".WorkoutSubCategorytraininglist.....error.........", error.response.data.message);

        // Alert.alert('Technical Issue', '')
      }



    }
    catch (error) {
      // Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log(".WorkoutSubCategorytraininglist.....error.........", error );
    }
    setIsLoading(false);
  };

 

//   const GetworkoutCategoryAPI = async (id) => {
//     const usertkn = await AsyncStorage.getItem("authToken");
//     setIsLoading(true);
//     try {

//         const response = await axios.get(`${API.TRAINING_LIST_GET_DETAILS + id}`,
//             { headers: { "Authorization": ` ${usertkn}` } }
//         );
//         // console.log("::::GetworkoutCategoryAPI_Response>>>::", response.data);
        
//         setImagebaseurl(response.data.training_image);
//         // setAudiobaseurl(response?.data.training_audio);
//         setVideobaseurl(response.data.blog_list[0].training_video);
//         setTrainingBlog_list(response.data.blog_list);
//         setAudio(response.data.blog_list[0].training_audio);
//         setReload(!reload)

//     }
//     catch (error) {
//         // console.log(".....TrainingDetails.error.........", error.response.data.message);
//         Alert.alert("", t('Check_internet_connection'))

//     }
//     setIsLoading(false);
// };
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };
  // const generateThumb = async () => {
  //   // setLoading(true)
  //   const thumbs = []
  //   try {
  //     for (let i = 0; i < videoDetails?.length; i++) {
  //       const resp = await createThumbnail({
  //         url: videoDetails[0].url,
  //         timeStamp: 10000,
  //         // cacheName: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
  //       })
  //       thumbs.push(resp.path)
  //     }
  //     // const resp = await createThumbnail({
  //     //   url: videoDetails?.url,
  //     //   timeStamp: 10000,
  //     //   // cacheName: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
  //     // })
  //     const videoDetailsCopy = [...videoDetails]
  //     const updatedVideoDetails = videoDetailsCopy.map((el, index) => {
  //       return { ...el, thumbnail: thumbs[index] }
  //     })
  //     setVideoDetails([...updatedVideoDetails])
  //     // setVideoDetails({...videoDetails, thumbnail: resp.path})
  //   } catch (error) {
  //     console.log('thumbnail creating error', error);
  //   }
  //   // setLoading(false)
  // }
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
          console.log(".................",trainingBlog_list)
        }
          <ScrollView
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
                        trainingBlog_list?.training_image?.map((itm, index) => {
                         
                          return (
                            <View key={String(index)}
                              style={{
                                height: 190, width: WIDTH * 0.96, borderRadius: 20
                              }}>
                              <Image
                                source={{ uri: `${imagebaseurl + itm}` }}
                                // resizeMode="stretch"
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
                    <Text style={{ textAlign: 'left', fontSize: 17, color: '#000', fontWeight: "500" }} >{trainingBlog_list?.training_title}</Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginTop: 1, height: "auto", width: WIDTH * 0.92, justifyContent: 'center', alignItems: "flex-start", padding: 6 }}>
                    <Text style={{ textAlign: 'left', fontSize: 12, color: '#000' }}>{trainingBlog_list?.image_description}</Text>
                  </View>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
                            marginTop: 10,
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
                  {/* Training video */}
                  {videobaseurl.length > 0 ?
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
                    :
                    null
                  }

                  {/* //flastlist  for videos */}

                  {showModal.isVisible ? (
                    <VideoModel
                      isVisible={showModal.isVisible}
                      toggleModal={toggleModal}
                      videoDetail={showModal.data}
                      {...props}
                    />
                  ) : null}

                  <View style={{ width: WIDTH * 0.99, alignSelf: 'flex-start', marginTop: 10, marginBottom: 0, height: 200 }}>
                    <FlatList
                      // ref={songSlider}
                      data={videobaseurl}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, index) => String(index)}
                      renderItem={({ item }) => {
                        // console.log("FlastlistVideo:", item)
                        return (
                          <View style={styles.VideoThumbWrapper}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowModal({
                                  isVisible: true,
                                  data: item,
                                });
                              }}>
                              <View style={styles.PlayIconContainer}>
                                <View style={styles.PlayIconWrapper}>
                                  {/* <PlayIcon width={28} height={28} /> */}
                                  <View style={{ width: 55, height: 55, borderRadius: 55 / 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/play-button-yellow.png')} style={{ width: 30, height: 30 }} />
                                  </View>
                                </View>

                              </View>
                              <Image
                                style={styles.BackGroundImage}
                                // theme={theme}
                                source={{ uri: 'https://dev.pop-fiit.com/images/logo.png' }}
                                // source={{ uri: item?.thumbnail }}
                                resizeMode={'stretch'}
                              />
                            </TouchableOpacity>
                            {/* <LinearGradient
                            colors={['#000', 'transparent']}
                            style={{
                              height: 40, width: WIDTH - 80, borderRadius: 15, paddingHorizontal: 15,
                              justifyContent: 'center'
                            }}
                            start={{ x: 0.2, y: 0.4 }}
                            end={{ x: 0.2, y: 0.4 }}
                          > */}

                            {/* <View style={{ width: '100%', height: 40, justifyContent: "center", alignItems: "center", paddingHorizontal: 15, }}>
                            <Text style={{ color: 'black', fontSize: 13, }}> Play Title</Text>
                          </View> */}



                            {/* </LinearGradient> */}
                          </View>
                        )
                      }
                      }

                    />
                  </View>

                  {/* Training Audio */}
                  {audio.length > 0 ?
                    <View style={{ marginTop: 1, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                      <View style={{ flex: 0.8 }}>
                        <Text style={{ marginLeft: 20, fontSize: 17, color: 'black', fontWeight: "500" }}>Training Audio</Text>
                      </View>
                      {/* <View style={{ flex: 0.25, right: 10, }}>
                      <TouchableOpacity onPress={() => {
                        gotoAudiolist()
                      }}>
                        <View style={{ borderRadius: 50, height: 30, backgroundColor: '#ffcc00', alignItems: 'center', justifyContent: 'center', }}>
                          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 12, color: 'white', fontWeight: "500" }}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}

                    </View>
                    : null
                  }
                  {/* //flastlist  for AUDIO */}
                  <FlatList
                    horizontal={true}
                    ref={songSlider}
                    data={audio}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      // console.log("audioFlatlist", item);
                      return (
                        <>
                          <View
                            style={{
                              flex: 1,
                              width: WIDTH * 0.93,
                              marginVertical: 10,
                              paddingVertical: 10,
                              marginHorizontal: 10,
                              borderRadius: 15,
                              backgroundColor: '#313131',
                              justifyContent: 'center',
                              alignSelf:"center",
                              shadowColor:'#000',
                              shadowOffset: {width: 0,height: 3},
                              shadowRadius: 1,
                              shadowOpacity: 0.03,
                              elevation: 4,
                            }}>
                            <AudioPlayer
                              url={item.url}
                              
                            />
                          </View>
                          {/* <View style={{ position: "absolute", top: 20, left: 70, overflow: 'hidden', zIndex: 999 }}><Text style={{ color: 'black', fontSize: 14, fontWeight: "400" }}>{item.title}</Text></View> */}
                          {/* <View style={styles.audioPlayerView}>

                            {
                              flag
                              playBackState === State.Playing
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
                            onPress={pauseAudio}
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
                          </View> */}
                        </>
                      )
                    }}
                  />

                </View>

                <View style={{ height: 50 }} />

              </ScrollView>

              
              {/* (<View style={{
                justifyContent: "center", alignItems: "center", backgroundColor: "white", flex: 1,
              }}>
                <Image
                  resizeMode='contain'
                  source={require('../assets/Nodatafound.png')}
                  style={{
                    width: 200,
                    height: 120, alignSelf: 'center'
                  }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>{t('Oops_No_data_found')}</Text>
              </View>) */}
          



        </>)
        :
        (<CustomLoader showLoader={isLoading} />)}
    </SafeAreaView >

  );
}
const styles = StyleSheet.create({
  VideoThumbWrapper: {
    position: 'relative',
    // width: '48%',
    // marginRight: 8,
    marginBottom: 4,
    marginHorizontal: 10,
    width: WIDTH / 2.22,
    height: 190,
    marginRight: 10,
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset: {width: 0,height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.03,
    elevation: 4,
  },
  PlayIconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  PlayIconWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundImage: {
    backgroundColor: "black",
    width: '100%',
    height: 190,
    justifyContent: 'center',
    borderRadius: 15
  },
  audioPlayerView: {
    width: WIDTH * 0.75,
    height: 70,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  audioTimeDurationView: {
    width: "50%",
    // height:30,
    justifyContent: "center",
    backgroundColor: "#FFCC00",
    // marginRight:15
  },
  audioProgressView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  audioActiveProgress: {
    height: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#f7d54a",
  },
  audioInAtiveProgress: {
    height: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  audioActiveDotView: {
    height: 15,
    width: 15,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#FFCC00",
  },
});
export default React.memo(Training);
