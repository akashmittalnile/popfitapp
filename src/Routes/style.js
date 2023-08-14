import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  ShippingTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal :10,
    width: "90%",

  },
  ShippingTextInput: {
    width: "100%",
    height: 45,
    backgroundColor: 'white',
    color: 'red',
    borderRadius: 5,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius :35,
    marginTop: 20,

  },
  inputText :{
    height: 50,
   width :'80%',
   color:'black',
  },
container: {
    flex: 1,
    marginTop: 20
},
imageItem: {
   backgroundColor: "red",
  padding: 15,
  marginHorizontal: 16,
  borderRadius:10 ,
  height :100,
  borderWidth:1,
  borderColor:"lightgrey",
  borderRadius:30,
  marginVertical:6,
  marginTop:10
},
container_style: {
  flex: 1,
  top: 0,
},
welcome: {
    textAlign: 'center'
},
navigationBarBlack: {
  height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor :'#262626',
  
  borderBottomLeftRadius :20,
  borderBottomRightRadius :20
},
navigationBarBlack1:{
  height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor :'#262626',
  
  
},
navigationBar: {
  // height: Platform.OS === 'android' ? 76 : 100,
  // marginTop: Platform.OS === 'ios' ? 0 : 24,
  // ...Platform.select({
  //   ios: { backgroundColor: '#f00', paddingTop: 24},
  //   android: { backgroundColor: '#00f'}
  //   }),
   height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor :'#262626',
},
navigationBarColor: {
  height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor :'#383838',
  borderBottomLeftRadius :20,
  borderBottomRightRadius :20
},
navigationBarColorBlack: {
  height: 60,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor :'black',
  borderBottomLeftRadius :20,
  borderBottomRightRadius :20
},
navigationBarLeftContainer: {
  // flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginLeft: 10, 
},
navigationBarLeftContainer1:{
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginLeft: 10

},
navigationBarColor1:{
  flexDirection: 'row',
  height: 60,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor :'#383838',
  borderBottomLeftRadius :20,
  borderBottomRightRadius :20
},
BasicDetailsheader:{
  
  //  marginTop:25,
 marginLeft: 30
   
  
},
navigationBarCenterContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
},
navigationBarRightContainer: {
  flex: 0.1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  // backgroundColor:"blue"
},
navigationBarRight2Container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  right:30,
  //  backgroundColor:"red"
},
navigationBarRightIcon: {
  height: 10,
  width: 10,
  resizeMode: 'contain',
  backgroundColor: 'white',
}
,
linearGradientMainView: {
  borderRadius: 25,
  height: 340,
  marginHorizontal: 15,
  width: '100%'
},
buttonTextMainView: {
  fontSize: 18,
  textAlign: 'center',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
},
cameraButtonContainer: {
  right: 40,
  position: 'absolute',
  width: 50,
  height: 55,
  marginTop: 6
},
cameraButtonSend: {
  width: 25,
  height: 25,
  resizeMode: 'strech'
}, cameraImageCroper: {
  width: 20,
  height: 20,
},
sendButtonContainer: {
  justifyContent: 'center',
  position: 'absolute',
  right: 15,
  width: 35,
  backgroundColor: '#fee3e3',
  height: 35,
  borderRadius: 35,
},
sendButtonSend: {
  width: 25,
  height: 25,
  justifyContent: 'center',
  alignItems: "center",
  alignSelf: 'center'
}, sendImageCroper: {
  width: 25,
  height: 25,
},
passwordButton: {
  borderRadius: 20,
  padding: 10,
},
passwordContainer: {
  flex: 1,
  backgroundColor: '#F5EEDC',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 12
},
passwordInputContainer: {
  backgroundColor: 'white',
  width: '100%',
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 4,
  borderColor: '#d7d7d7'
},

passwordInputField: {
  padding: 14,
  fontSize: 22,
  width: '90%'
},
pickercontainer: {
  flex: 1,
  paddingTop: 40,
  alignItems: "center"
},
textInput: {
  width: 350,
  height: 55,
  backgroundColor: 'white',
  //margin: 10,
  padding: 8,
  color: 'black',
  borderRadius: 5,
  borderColor: '#DFDDDD0D',
  borderWidth: 1,
  fontSize: 18,
  fontSize: 16,
  
 

},
 
textContainer: {

  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: '#F2F2F2',
  marginTop: 30

},
textBusinessContainer: {

  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F2F2F2',
  marginTop: 10

}
,
radio: {
  flexDirection: 'row',
},
radioImage: {
  height: 20,
  width: 20,
  marginHorizontal: 5,
},
radioButton: {
  flexDirection: 'row',
  alignItems: 'center',
},
leftNavigationContainer: {
  height: 60,
  position: 'absolute',
  left: 10,
  width: "20%",
  justifyContent: 'center',
},
containerForgotPasswordButton: {

  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
  marginHorizontal: 10,
  height: 60
},
textForgotPassword: {
  color: '#133072',
  fontSize: 16,
   
},
containeInquiryButton: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 60,
  height: 60,
  backgroundColor: 'yellow'
},
gradientInquiryButton: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginHorizontal: 0
},
buttonInquiryButton: {
  width: '100%',
  height: 65,
},
textInquiryButton: {
  color: 'white',
  fontSize: 16,
   
},
input: {
  left: 15,
  width: 220,
  marginTop: 10,
  height: 40,
  padding: 10,
},
container: {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
header: {
  fontSize: 24,
  color: '#fff',
  fontWeight: 'bold',
},
btn: {
  backgroundColor: '#01c853',
  paddingVertical: 10,
  paddingHorizontal: 50,
},
input: {
  marginTop: 10,
  height: 40,
  borderWidth: 1,
  padding: 10,
  borderColor: 'white',
  borderRadius: 10
},
submitButton: {
  backgroundColor: 'red',
  padding: 10,
  height: 50,
  borderRadius: 10,
  flex: 1,
  justifyContent: 'center',
  marginHorizontal: 16,
  alignItems: 'center',
},
submitButtonText: {
  color: 'white'
},
tinyLogo: {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'contain'
},
navBar: {
  height: 60,
  justifyContent: 'space-between',
  alignItems: 'center',
},
leftContainer: {
  height: 60,
  position: 'absolute',
  left: 10,
  width: "20%",
  justifyContent: 'center',

},
rightContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'white',
},

SquareShapeView: {
  width: 60,
  height: 60,
  backgroundColor: '#e30f50',
  borderRadius: 35
},
containerGradient: {
  flex: 1,
},
linearGradient: {
  flex: 1,
},
viewInsider: {
  backgroundColor: '#ffb0ba', paddingLeft: 0, paddingRight: 0, height: 60
},
screen: {
  justifyContent: 'center',
  alignItems: 'center',
  left: '42%',
  marginTop: '-7%'
},
rightIcon: {
  height: 45,
  width: 45,
  backgroundColor: 'yellow',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  borderRadius: 100,
  right: 10
},
roundButton1: {
  width: 45,
  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  borderRadius: 100,
  backgroundColor: 'orange',

},
containerSettingButton: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 64,
  backgroundColor: '#ecf0f1',
},
settingImageWrapper: {
  width: 30,
  height: 30,
  borderRadius: 20
},
settingButton: {
  width: 30,
  height: 30,
  padding: 5,
}, chatImageWrapper: {
  width: 30,
  height: 25,
  marginTop: 5

},
chatButton: {
  width: 45,
  height: 45,
  right: 15,
},
text: {
  fontSize: 40,
  color: 'white',
  lineHeight: 42
},
textInput: {
  width: 350,
  height: 50,
  backgroundColor: 'white',
  margin: 10,
  padding: 8,
  color: 'black',
  borderRadius: 25,
  borderColor : '#DFDDDD0D',
  borderWidth :1,
  fontSize: 18,
  fontSize: 16,
  paddingHorizontal: 20,
  justifyContent:"center",
  alignItems:"center"
},
textContainer: {
justifyContent: 'center',
  alignItems: 'center',
  marginTop :20
}  ,
});