//import : react components
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
//import : styles
import { styles } from './CancelSubscriptionStyle';
//import : svg
// import CheckSvg from '../assets/Vector.svg';

const CancelSubscription = ({ visible, setVisibility }) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  console.log("in IOS cancel modal open ");
  //UI
  return (

    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <Text style={styles.TitleText}>Cancel subscription</Text>
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 10,
              borderColor: "gray",
            }}
          />
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20, 
              }} />
            <Text style={styles.bulletTextStyle}>Open the Settings app.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20,  
              }} />
            <Text style={styles.bulletTextStyle}>Tap your name.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height:20, 
              }} />
            <Text style={styles.bulletTextStyle}>Tap Subscriptions.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20,  
              }} />
            <Text style={styles.bulletTextStyle}>Tap the subscription.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20, 
              }} />
            <Text style={styles.bulletTextStyle}>
              Tap Cancel Subscription. You might need to scroll down to find the
              Cancel Subscription button. If there is no Cancel button or you
              see an expiration message in red text, the subscription is already
              canceled.
            </Text>
          </View>
        </View>
      </View>
    </Modal>

  );
};
export default React.memo(CancelSubscription);







