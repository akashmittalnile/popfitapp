import * as React from 'react';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import MyStack from './MyStack';
import MyTabBar from './MyTabBar';
import CardPayment from '../Screens/PaymentGateway/CardPayment';
 


const AppNavigation = (props) => {

  return (
    <NavigationContainer>
      <MyStack/>
       
    </NavigationContainer>
  );
}

//}
export default AppNavigation;
