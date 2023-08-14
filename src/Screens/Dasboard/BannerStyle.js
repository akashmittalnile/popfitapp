import {StyleSheet,Dimensions} from 'react-native';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
     position: 'relative',
  
     alignItems:"center",
    
  },
  row: {
    width: 61,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  itemCon: {
    height: 160,
    marginHorizontal: 10,
    width: WIDTH *0.95,
    alignSelf: 'center',
    justifyContent:"center",
    backgroundColor: "white",
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor:  "red",
    marginVertical:10 
     
    
  },
  circle: {
    height: 9,
    width: 9,
    borderRadius: 9 / 2,
    backgroundColor: "red",
    marginRight: 10,
    alignSelf: 'center',
    justifyContent:"center",
  },
  dotsCon: {
    width: WIDTH -40,
    height: 9,
    position: 'relative',
    bottom: 6,
    left: 20,
    alignItems: 'center',  
  },
  dotsFlatList: {
    height: 9,
    width: 85,
    
  },
});