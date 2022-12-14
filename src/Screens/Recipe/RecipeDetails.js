import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, SafeAreaView, Dimensions,ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Headers from '../../Routes/Headers';
import styles from '../../Routes/style'
import axios from 'axios';
import { API } from '../../Routes/Urls';
import { WebView } from 'react-native-webview';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const RecipeDetails = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [recipedetails, setRecipeDetails] = useState([]);

  useEffect(() => {
    PostRecipecategoryDetail()

  }, []);

  console.log("RecipeDATA Details...............:", props?.route?.params?.getHomeRecipelistID?.id);
  const RecipeID = props?.route?.params?.RecipeID?.id

  const PostRecipecategoryDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API.RECIPE_DETAILS}`, { "recipe_id": RecipeID });
      console.log("::::Recipe_List_Response:::::", response.data.recipe_details);
      console.log("Recipe_List....", response.data.recipe_details)
      setRecipeDetails(response.data.recipe_details)
      setIsLoading(false);
    }
    catch (error) {
      console.log("......error.........", error.response.data.message);
      Alert.alert("Something went wrong!", error.response.data.message);
      setIsLoading(false);
    }
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
        (<View style={{ marginBottom: 60 }}>
      <ScrollView>
        <View style={{ paddingBottom: 65 }}>
          <View style={{ height: 60 }}>
            <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 17, color: 'black', fontWeight: "bold" }}>{recipedetails?.title}</Text>
          </View>
          <View style={{
            marginHorizontal: 20, height: 200, borderRadius: 20, marginVertical: 1, width: WIDTH * 0.9}}>
            <View style={{
              height: '100%',
              overflow: "hidden",
              width: WIDTH * 0.9,
              borderRadius: 20,
              justifyContent: 'center',
              alignSelf: "auto",
              }}>
              <WebView
                source={{ uri: recipedetails?.youtube_link }}
              />
</View>

          </View>

          <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'left', fontSize: 12, color: '#000', }}>{recipedetails?.youtube_description}</Text>

          <Text style={{ marginLeft: 20, textAlign: 'left', marginTop: 20, fontSize: 17, color: '#000', fontWeight: "bold" }} >{recipedetails?.recipe_title}</Text>


          <View style={{ backgroundColor: "white", borderRadius: 20, marginTop: 20, height: HEIGHT * 0.2, width: WIDTH * 0.9, marginHorizontal: 18, }}>
            <Image resizeMode='contain'
              source={{ uri: recipedetails?.image }} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: 'center', borderRadius: 20,backgroundColor: "lightgray" }}
            />
          </View>

          <Text style={{ marginHorizontal: 20, marginTop: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>{recipedetails?.recipe_description}</Text>
        </View>
      </ScrollView>
      </View>)
       :
       (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color="#ffcc00" />
       </View>)}
    </SafeAreaView>
  );
}
export default RecipeDetails;
