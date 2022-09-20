 
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//globals
import {ScreensName, Server} from '../../global/Index';
//styles
import {styles} from './BannerStyle';
const BannerItem = ({item}) => {
    //console.log("data on banner item",item);
  //variables
  const navigation = useNavigation();
  //function : navigation function
  // const gotoDetailPage = id =>
  //   navigation.navigate(ScreensName.REVIEW, {productId: id});
  //UI
  return (
    <TouchableOpacity
      // onPress={() => gotoDetailPage(item.product_id)}
      activeOpacity={0.5}
      style={styles.itemCon}>
      <Image
        resizeMode="stretch"
        source={{uri:item.image}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
          alignItems:"center",
          justifyContent:"center"
          
        //  padding:20,
        //  marginRight:10,backgroundColor:"red"
        }}
      />
    </TouchableOpacity>
  );
};
export default BannerItem;