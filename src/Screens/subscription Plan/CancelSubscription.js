//import : react components
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
//import : styles
import { styles } from './CancelSubscriptionStyle';
//import : svg
// import CheckSvg from '../assets/Vector.svg';
import { useTranslation } from 'react-i18next';
const CancelSubscription = ({ visible, setVisibility }) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  // console.log("in IOS cancel modal open ");
  //UI
  const { t } = useTranslation();
  return (

    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <Text style={styles.TitleText}>{t('Cancel_subscription')}</Text>
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
            <Text style={styles.bulletTextStyle}>{t('Open_the_Settings_app')}.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20,  
              }} />
            <Text style={styles.bulletTextStyle}>{t('Tap_your_name')}.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height:20, 
              }} />
            <Text style={styles.bulletTextStyle}>{t('Tap_Subscriptions')}.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20,  
              }} />
            <Text style={styles.bulletTextStyle}>{t('Tap_the_subscription')}.</Text>
          </View>
          <View style={styles.bulletView}>
            <Image source={require('../assets/Vector_ios.png')}
              style={{
                width: 20,
                height: 20, 
              }} />
            <Text style={styles.bulletTextStyle}>
              {t('Ios_Cancelled_mgs')}.
            </Text>
          </View>
        </View>
      </View>
    </Modal>

  );
};
export default React.memo(CancelSubscription);







