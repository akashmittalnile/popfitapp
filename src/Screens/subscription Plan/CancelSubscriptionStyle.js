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
