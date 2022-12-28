import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, Alert, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Headers from '../../Routes/Headers';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Routes/CustomLoader';
// import TrackPlayer, { State } from 'react-native-track-player';
import { useTranslation } from 'react-i18next';


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Audiolist = (props) => {
    const { t } = useTranslation();
    const [trainingBlog_list, setTrainingBlog_list] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [audiobaseurl, setAudiobaseurl] = useState('');


    useEffect(() => {
        WorkoutSubCategorytraininglist();
    }, []);

    console.log("Tainingcat_id_item...............:", props?.route?.params?.catgid);
    const Tainingcat_id = props?.route?.params?.catgid

    console.log("Trainingsubcat_Data...............:", props?.route?.params?.subcatid);
    const Trainingsubcat_data = props?.route?.params?.subcatid

    const WorkoutSubCategorytraininglist = async () => {
        const usertkn = await AsyncStorage.getItem("authToken");
        setIsLoading(true);
        try {
            const response = await axios.post(`${API.TRAINING_LIST}`, { "category_id": Tainingcat_id, "subcategory_id": Trainingsubcat_data }, { headers: { "Authorization": ` ${usertkn}` } });
            console.log(":::::::::TrainingCategoryListAPI_Response>>>", response.data.message);

            console.log("TrainingCategoryListAPI_data::::::", response.data.blog_list);
            
            
            console.log("AUDIO_url::", response.data.training_audio);
            

            setAudiobaseurl(response.data.training_audio);

            setTrainingBlog_list(response.data.blog_list);
            // setyoutubelink(response.data.blog_list.youtube_link)



        }
        catch (error) {
            console.log("......error.........", error.response.data.message);
            //Alert.alert("Something went wrong!", error.response.data.message);
            Alert.alert("", t('Check_internet_connection'))

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
                            (<ScrollView>
                                <View style={{ justifyContent: "flex-start", flex: 1, alignItems: "flex-start" }}>
                                    {/* Training Audio */}
                                    <View style={{ marginTop: 10,  height: 45, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                                        
                                            <Text style={{ marginLeft: 15, fontSize: 16, color: 'black', fontWeight: "500" }}>{t('Training_Audio')}</Text>
                                       


                                    </View>
                                    {/* //flastlist  for AUDIO */}
                                    <FlatList

                                        // numColumns={2}
                                        data={trainingBlog_list}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item, index }) => {
                                            console.log("1st flastlist video:", item.id)
                                            return (
                                                
                                                    <View style={{
                                                        marginVertical: 10,
                                                        height: 200,
                                                        // padding:10,
                                                        overflow: "hidden",
                                                        backgroundColor: "gray",
                                                        width: WIDTH * 0.95,
                                                        borderRadius: 20,
                                                        marginHorizontal: 10,
                                                        justifyContent: 'center',
                                                        // alignSelf: "auto"
                                                        // alignItems:"center"

                                                    }}>
                                                        <WebView
                                                            style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: -10, backgroundColor: "lightgray", }}
                                                            source={{
                                                                uri: `${audiobaseurl + item?.training_audio}`
                                                                // "https://dev.pop-fiit.com/upload/training_video/20220929_1664457751_54648.mp4" 
                                                            }}
                                                        />


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
                ( <CustomLoader showLoader={isLoading}/>)}
        </SafeAreaView >

    );
}
export default Audiolist;
