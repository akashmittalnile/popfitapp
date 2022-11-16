import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const CustomLoader = ({showLoader}) => {
  return (
    <>
      {showLoader ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: HEIGHT,
            width: WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000' + '66',
          }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null}
    </>
  );
};
export default CustomLoader;