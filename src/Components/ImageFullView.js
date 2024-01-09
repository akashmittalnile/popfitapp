import {View, Text,Image} from 'react-native';
import React from 'react';
 
 

const CustomFastImage = React.memo(props => {
  let {img, containerStyle, resizeMode, imageStyle} = props;
  return (
    <View>
      <Image source={img} style={imageStyle} resizeMode={resizeMode} />
    </View>
  );
});

export default CustomFastImage;
