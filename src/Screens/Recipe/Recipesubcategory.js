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
  Pressable, Modal, SafeAreaView, Dimensions, ActivityIndicator
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
import axios from 'axios';
import { API } from '../../Routes/Urls';
import CustomLoader from '../../Routes/CustomLoader';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const Recipesubcategory = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [recipedata, setRecipeData] = useState([]);

  const gotoRecipeDetails = (item) => {
    props.navigation.navigate('RecipeDetails', {
      RecipeID: item
    });
  };

  // console.log("Home_RecipeLIST...............:", props?.route?.params?.getHomeRecipelistID?.id);
  const getHomeRecipelistID = props?.route?.params?.getHomeRecipelistID?.id

  // console.log("REcipe_datalist...............:", props?.route?.params?.RecipecategoryID?.id);
  const RecipecategoryID = props?.route?.params?.RecipecategoryID?.id

  useEffect(() => {
    PostRecipecategoryList()

  }, []);
  const PostRecipecategoryList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.RECIPE_LIST}`, { "category_id": getHomeRecipelistID ? getHomeRecipelistID : RecipecategoryID });
      // console.log("::::Recipe_List_Response:::::", response.data.blog_list);
      // console.log("Recipe_List....", response.data.blog_list)
      setRecipeData(response.data.blog_list)
     
    }
    catch (error) {
      Alert.alert("","Internet connection appears to be offline. Please check your internet connection and try again.")
      // console.log("......error.........", error.response.data.message);
      // Alert.alert("Something went wrong!", error.response.data.message);
       }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, backgroundColor: 'black', flexGrow: 1
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
            recipedata.length != 0 ?
              (<View style={{ paddingBottom: 60,flex: 1, }}>
              <ScrollView>


                <View style={{ marginTop: 10, height: 30, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        color: 'white'
                      }}>
                      Recipes Sub-Category
                    </Text>
                  </View>
                </View>
                <FlatList
                  vertical
                  numColumns={2}
                  // style={{ margin: 6 }}
                  keyExtractor={(item, index) => String(index)}
                  data={recipedata}
                  renderItem={({ item ,index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        gotoRecipeDetails(item);
                      }}>
                      <View
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          marginHorizontal: 10,
                          height: 180,
                          width: WIDTH * 0.45,
                          overflow: 'hidden',
                          borderRadius: 20,
                          backgroundColor: '#f7f7f7',
                          backgroundColor: "lightgray",
                          shadowColor: '#000000',
                          shadowRadius: 5,
                          shadowOpacity: 1.0,
                          elevation: 6,
                        }}>

                        <View
                          style={{
                            width: WIDTH * 0.45, height: 180, borderTopRightRadius: 20,
                            borderTopLeftRadius: 20, justifyContent: "flex-start", alignItems: "flex-start"
                          }}>
                          <Image
                            source={{ uri: `${item?.recipe_image}` }}
                            resizeMode="contain"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderTopLeftRadius: 20,
                              borderTopRightRadius: 20,
                              alignSelf: 'center',
                            }}
                          />
                          <View style={{ width: 125, backgroundColor: '#c9bca0', height: 25, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: "center", position: "absolute", zIndex: 1, borderTopLeftRadius: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 11, color: 'black', fontWeight: "bold" }}>{item?.recipe_title?.slice(0, 13) + '...'}</Text>

                          </View>

                        </View>


                      </View>
                      {/* <BackgroundImage
                    resizeMode='stretch'
                    source={{ uri: `${item.recipe_image}` }}
                    style={{
                      marginBottom: 6,
                      marginTop: 6,
                      marginHorizontal: 6,
                      justifyContent: 'space-between',
                      width: WIDTH * 0.45,
                      height: 180,
                      overflow: 'hidden',
                      borderRadius: 15,
                      backgroundColor: 'gray',

                    }}>
                    <View
                      style={{
                        width: 115,
                        backgroundColor: '#c9bca0',
                        height: 25,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center', alignItems: "center"
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 11,
                          color: 'black',
                          fontWeight: "bold"
                        }}>
                        {item.recipe_title.slice(0, 13) + '...'}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 30,
                        borderBottomRightRadius: 10,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={{ height: 30, width: 50 }}>
                        <Image resizeMode='stretch'
                          source={require('../assets/arrowWhiteBack.png')}
                          style={{
                            width: 40,
                            height: 30,
                            alignSelf: 'center',
                            borderBottomRightRadius: 10,
                            right: -5
                          }}
                        />
                      </View>
                    </View>
                  </BackgroundImage> */}
                    </TouchableOpacity>
                  )}
                />

              </ScrollView>
              </View>)
              :
              (<View style={{
                justifyContent: "center", alignItems: "center", width: WIDTH,
                height: 200,backgroundColor:"white",flex: 1,
              }}>
                <Image resizeMode='contain'
                  source={require('../assets/Nodatafound.png')}
                  style={{
                    width: 200,
                    height: 120, alignSelf: 'center'
                  }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: 'black' }}>Oops!, No data found</Text>
              </View>)
          }
        </>)
        :
        ( <CustomLoader showLoader={isLoading}/>)}

    </SafeAreaView>
  );
};
export default Recipesubcategory;
