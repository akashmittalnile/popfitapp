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
import { AudioPlayer } from 'react-native-simple-audio-player';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const SubCategorylist2 = (props) => {

    const { t } = useTranslation();

    const [trainingBlog_list, setTrainingBlog_list] = useState([]);
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

    const gotoOutdoorCycle = (item) => {
        console.log("ACTIVE plan::::::", item.id);
        props.navigation.navigate("Training", {
            Tainingcat_item: item.id})
         // Tainingcat_id: props?.route?.params?.Tainingcat_id,
            // Trainingsubcat_data: props?.route?.params?.Trainingsubcat_data

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
                { headers: { "Authorization": ` ${usertkn}` } }
            );
            // console.log("TrainingCategoryListAPI_Response>>>", response.data);
            // console.log("AUDIO_url::", response.data.blog_list[0].training_audio[0].url);
            // console.log("Video_url::", response.data.blog_list[0].training_video);

            if (response.data.status == '1') {
                setImagebaseurl(response.data.training_image);
                // setAudiobaseurl(response?.data.training_audio);
                setVideobaseurl(response.data.blog_list[0].training_video);
                setTrainingBlog_list(response.data.blog_list);
                setAudio(response.data.blog_list[0].training_audio);
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
            height: HEIGHT, flexGrow: 1, backgroundColor: '#000000'
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
                        trainingBlog_list?.length > 0 ?
                            (<ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            >
                                <View style={{
                                    backgroundColor: '#000000', width: "100%", marginBottom: 30, justifyContent: "center", marginTop: 20,
                                }}>
                                    <FlatList
                                        numColumns={2}
                                        columnWrapperStyle={{
                                            flex: 1,
                                            justifyContent: "space-between"
                                        }}
                                        keyExtractor={(item, index) => String(index)}
                                        data={trainingBlog_list}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { gotoOutdoorCycle(item) }}>
                                                    <View
                                                        style={{
                                                            marginTop: 6,
                                                            backgroundColor: 'lightgray',
                                                            height: 160,
                                                            width: WIDTH * 0.45,
                                                            borderRadius: 20,
                                                            marginBottom: 6,
                                                            marginHorizontal: 10,
                                                            justifyContent: "flex-start",
                                                            alignItems: 'center',
                                                        }}>
                                                        <View
                                                            style={{
                                                                width: WIDTH * 0.45, height: 160, borderRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                                                            }}>
                                                            <Image
                                                                source={{ uri: `${imagebaseurl + item?.training_image[0]}` }}
                                                                resizeMode="stretch"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    borderRadius: 20,
                                                                    // borderTopRightRadius: 20,
                                                                    alignSelf: 'center',
                                                                    backgroundColor: "black"
                                                                }}
                                                            />
                                                            <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.training_title?.lenght >= 18 ? item?.training_title.slice(0, 18) + '...' : item?.training_title.slice(0, 18)}</Text>

                                                            </View>

                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ height: 50 }} />

                            </ScrollView>

                            )
                            :
                            (<View style={{
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
                            </View>)
                    }



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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
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
export default React.memo(SubCategorylist2);
