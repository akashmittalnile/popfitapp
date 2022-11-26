//import : react components
import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//import : styles
// import {styles} from './CancelSubscriptionStyle';
//import : svg
import CheckSvg from '../assets/Vector.svg';
 
const CancelSubscription = ({visible, setVisibility}) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
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
            <CheckSvg />
            <Text style={styles.bulletTextStyle}>Open the Settings app.</Text>
          </View>
          <View style={styles.bulletView}>
            <CheckSvg />
            <Text style={styles.bulletTextStyle}>Tap your name.</Text>
          </View>
          <View style={styles.bulletView}>
            <CheckSvg />
            <Text style={styles.bulletTextStyle}>Tap Subscriptions.</Text>
          </View>
          <View style={styles.bulletView}>
            <CheckSvg />
            <Text style={styles.bulletTextStyle}>Tap the subscription.</Text>
          </View>
          <View style={styles.bulletView}>
            <CheckSvg />
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
 
import {StyleSheet} from 'react-native';
 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black" + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '10%',
  },
  TitleText: {
     
    fontSize: 18,
    textAlign: 'center',
  },
  bulletView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletTextStyle: {
   
    color: 'gray',
    marginLeft: 10,
  },
});






