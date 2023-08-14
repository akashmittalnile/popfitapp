import React from 'react';
import {Animated, Text, View,Dimensions} from 'react-native';
 
//styles
import {styles} from './BannerStyle';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height; 
 
 
const BannerDots = ({scrollX, index}) => {
  const inputRange = [
    (index - 1) * WIDTH,
    index * WIDTH,
    (index + 1) * WIDTH,
  ];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
    extrapolate: 'clamp',
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: [
      'rgba(255,185,15, 0.8)',
      'rgba(255,185,15, 1)',
      'rgba(255,185,15, 0.8)',
    ],
  });
  return (
    <Animated.View
      style={[styles.circle, {opacity, backgroundColor, transform: [{scale}]}]}
    />
  );
};
export default BannerDots;