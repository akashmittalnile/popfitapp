import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, Alert, SafeAreaView, Dimensions, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler';
import Headers from '../../Routes/Headers';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';
// import TrackPlayer, { State } from 'react-native-track-player';
import { useTranslation } from 'react-i18next';
import { VideoModel } from '../../Routes/VideoModel';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Videolist = (props) => {

    const { t } = useTranslation();
    const [trainingBlog_list, setTrainingBlog_list] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [youtubelinks, setyoutubelinks] = useState([]);
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });

    const [refreshing, setrefreshing] = useState(false)
    const onRefresh = () => {
        setrefreshing(true)
        WorkoutSubCategorytraininglist();
        setrefreshing(false)
    }
    useEffect(() => {
        WorkoutSubCategorytraininglist();
    }, []);

    const toggleModal = state => {
        setShowModal({
            isVisible: state.isVisible,
            data: state.data,
        });
    };
    console.log("Tainingcat_id_item...............:", props?.route?.params?.catgid);
    const Tainingcat_id = props?.route?.params?.catgid

    console.log("Trainingsubcat_Data...............:", props?.route?.params?.subcatid);
    const Trainingsubcat_data = props?.route?.params?.subcatid

    const WorkoutSubCategorytraininglist = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.TRAINING_LIST}`, { "category_id": Tainingcat_id, "subcategory_id": Trainingsubcat_data },
                { headers: { "Authorization": ` ${usertkn}` } }
            );
            // console.log(":::::::::TrainingCategoryListAPI_Response>>>", response.data.message);

            // console.log("TrainingCategoryListAPI_data::::::", response.data);
            setIsLoading(false);
            // console.log("Video_url::", response.data.training_video);
            setyoutubelinks(response.data.blog_list[0].training_video);
            // setVideobaseurl(response.data.training_video);
            setTrainingBlog_list(response.data.blog_list);
            // setyoutubelink(response.data.blog_list.youtube_link)



        }
        catch (error) {
            Alert.alert("", t('Check_internet_connection'))
            // console.log("......error.........", error.response.data.message);
            setIsLoading(false);

        } setIsLoading(false);
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
                        trainingBlog_list.length != 0 ?
                            (<ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            >
                                <View style={{ justifyContent: "flex-start", flex: 1, alignItems: "flex-start" }}>
                                    {/* Training video */}
                                    <View style={{ marginTop: 10, height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>

                                        <Text style={{ marginLeft: 15, fontSize: 18, color: 'black', fontWeight: "500" }}>{t('Training_Videos')}</Text>

                                    </View>
                                    {showModal.isVisible ? (
                                        <VideoModel
                                            isVisible={showModal.isVisible}
                                            toggleModal={toggleModal}
                                            videoDetail={showModal.data}
                                            {...props}
                                        />
                                    ) : null}
                                    {/* //flastlist  for videos */}
                                    <FlatList

                                        showsHorizontalScrollIndicator={true}

                                        data={youtubelinks}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item, index }) => {
                                            console.log("liknsvideos:", item)
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
                                                                    <Image source={require('../assets/play-button-yellow.png')} style={{ width: 40, height: 40 }} />
                                                                </View>
                                                            </View>

                                                        </View>
                                                        <Image
                                                            style={styles.BackGroundImage}
                                                            // theme={theme}
                                                            source={{ uri: 'https://dev.pop-fiit.com/images/logo.png' }}
                                                            // source={{ uri: item?.thumbnail }}
                                                            resizeMode={'contain'}
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
                                        }}
                                    />

                                </View>
                            </ScrollView>)
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
const styles = StyleSheet.create({
    VideoThumbWrapper: {
        position: 'relative',
        // width: '48%',
        // marginRight: 8,
        marginBottom: 16,
        marginHorizontal: 10,
        width: WIDTH * 0.95,
        height: 190,
        marginRight: 10,
        borderRadius: 15,
        // shadowColor:'#000',
        // shadowOffset: {width: 0,height: 3},
        // shadowRadius: 1,
        // shadowOpacity: 0.03,
        // elevation: 1,
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
export default Videolist;
