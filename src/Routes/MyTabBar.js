import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image, SafeAreaView, Platform } from 'react-native';
import Home from '../Screens/Dasboard/Home';
import BlogDetail from '../Screens/blog/BlogDetail';
import ShippingDetail from '../Screens/shipping/ShippingDetail';
import Blog from '../Screens/blog/Blog';
import ProductDetail from '../Screens/product Detail/ProductDetail';
import Training from '../Screens/training/Training';
import DumbleSet from '../Screens/dumble Set/DumbleSet';
import Category from '../Screens/category/Category';
import Shop from '../Screens/shop/Shop';
import FitnessEquipment from '../Screens/fitness Equipment/FitnessEquipment';
import OutdoorTrainning from '../Screens/training/OutdoorTrainning';
import TrainingDetail from '../Screens/training/TrainingDetail';
import Notifications from '../Screens/notification/Notifications';
import MyOrder from '../Screens/myorder/MyOrder';
import OrderDetail from '../Screens/myorder/OrderDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrainingPersonaDetail from '../Screens/training/TrainingPersonDetail';
import OutDoorCycleDetails from '../Screens/training/OutDoorCycleDetail';
import SubCategoryBlog from '../Screens/category/CategoryListBlog';
import MenTshirts from '../Screens/clothes Type/MensTshirts';
import TermsAndCondition from '../Screens/Terms Condition ,Privay  and About/TermsAndCondition';
import CancellationPolicy from '../Screens/Terms Condition ,Privay  and About/CancellationPolicy';
import AboutsUs from '../Screens/Terms Condition ,Privay  and About/AboutsUs';
import RefundPolicy from '../Screens/Terms Condition ,Privay  and About/RefundPolicy';
import EditMyProfile from '../Screens/Profile/EditMyProfile';
import MyProfile from '../Screens/Profile/MyProfile';

// import CardPayment from '../Screens/PaymentGateway/CardPayment';
import ClothesType from '../Screens/clothes Type/ClothesType';
import SubscriptionPlan from '../Screens/subscription Plan/SubscriptionPlan';
import ApplyCoupon from '../Screens/shipping/ApplyCoupon';
import Recipecategory from '../Screens/Recipe/Recipecategory';
import RecipeDetails from '../Screens/Recipe/RecipeDetails';
import CartAdded from '../Screens/cart/CartAddedPopUp';
import Recipesubcategory from '../Screens/Recipe/Recipesubcategory';
import Address from '../Screens/shipping/Address';
import PaymentScreen from '../Screens/PaymentGateway/PaymentScreen';
import Audiolist from '../Screens/training/Audiolist';
import Videolist from '../Screens/training/Videolist';
import ViewInvoice from '../Screens/myorder/Invoicedwn';
import ChangePassword from '../Screens/Profile/ChangePassword';
 import  '../../i18n';
import CancelSubscription from '../Screens/subscription Plan/CancelSubscription';
import Selector from '../translations/Selectlang';
import { useTranslation } from 'react-i18next';
import Exploreshop from '../Screens/shop/Exploreshop';
 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeBottomTab = props => {
  return (
    <Stack.Navigator
      // initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          showIcon: true,
          backgroundColor: '#262626',
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? 'red' : color }}>Updates</Text>
          ),
        },
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartAdded"
        component={CartAdded}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FitnessEquipment"
        component={FitnessEquipment}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DumbleSet"
        component={DumbleSet}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Exploreshop"
        component={Exploreshop}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="Recipecategory"
        component={Recipecategory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Recipesubcategory"
        component={Recipesubcategory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecipeDetails"
        component={RecipeDetails}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ApplyCoupon"
        component={ApplyCoupon}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShippingDetail"
        component={ShippingDetail}
      />
      {/* <Stack.Screen options={{ headerShown: false }} name="CardPayment" component={CardPayment} /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentScreen"
        component={PaymentScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="TrainingDetail"
        component={TrainingDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OutdoorTrainning"
        component={OutdoorTrainning}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Training"
        component={Training}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OutDoorCycleDetails"
        component={OutDoorCycleDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TrainingPersonaDetail"
        component={TrainingPersonaDetail}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MyOrder"
        component={MyOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetail"
        component={OrderDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="BlogDetail"
        component={BlogDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionPlan"
        component={SubscriptionPlan}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditMyProfile"
        component={EditMyProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="TermsAndCondition"
        component={TermsAndCondition}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CancellationPolicy"
        component={CancellationPolicy}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RefundPolicy"
        component={RefundPolicy}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AboutsUs"
        component={AboutsUs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClothesType"
        component={ClothesType}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MenTshirts"
        component={MenTshirts}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CancelSubscription"
        component={CancelSubscription}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="Selector"
        component={Selector}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="Category"
        component={Category}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubCategoryBlog"
        component={SubCategoryBlog}
      />

    </Stack.Navigator>
  );
};

const TrainingBottomTab = props => {
  return (
    <Stack.Navigator
    //initialRouteName='TrainingDetail'
    >

      <Stack.Screen
        options={{ headerShown: false }}
        name="TrainingDetail"
        component={TrainingDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OutdoorTrainning"
        component={OutdoorTrainning}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Training"
        component={Training}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OutDoorCycleDetails"
        component={OutDoorCycleDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TrainingPersonaDetail"
        component={TrainingPersonaDetail}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Audiolist"
        component={Audiolist}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Videolist"
        component={Videolist}
      />
      
    </Stack.Navigator>
  );
};
const ShopBottomTab = props => {
  return (
    <Stack.Navigator
    //initialRouteName='Shop'
    >

      <Stack.Screen
        options={{ headerShown: false }}
        name="Shop"
        component={Shop}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ApplyCoupon"
        component={ApplyCoupon}
      />
      {/* <Stack.Screen options={{ headerShown: false }} name="MyOrder" component={MyOrder} /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartAdded"
        component={CartAdded}
      />
      {/* <Stack.Screen options={{ headerShown: false }} name="OrderDetail" component={OrderDetail} /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShippingDetail"
        component={ShippingDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      {/* <Stack.Screen options={{ headerShown: false }} name="CardPayment" component={CardPayment} /> */}

    </Stack.Navigator>
  );
};
const BlogBottomTab = props => {
  return (
    <Stack.Navigator
    //initialRouteName='Blog'
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Blog"
        component={Blog}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BlogDetail"
        component={BlogDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Category"
        component={Category}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubCategoryBlog"
        component={SubCategoryBlog}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CartAdded"
        component={CartAdded}
      />
    </Stack.Navigator>
  );
};
export const Hidemytab = props => {
  return (
    <Stack.Navigator
      initialRouteName='MyTabBar'>
      <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
      <Stack.Screen options={{ headerShown: false }} name="MyTabBar" component={MyTabBar} />
    </Stack.Navigator>
  )
}
const MyTabBar = (props) => {
  const { t } = useTranslation();
   
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        flexGrow: 1,
      }}>
      <Tab.Navigator
        // initialRouteName='Home'
        screenOptions={{
          // tabBarInactiveTintColor: 'gray',
          // tabBarActiveTintColor: 'tomato',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            showIcon: true,
            height: 60,
            paddingTop: Platform.OS == "ios" ? 22 : "auto", ///only for ios app
            padding: 10,
            backgroundColor: '#262626',
            tabBarLabel: ({ focused, color, size }) => (
              <Text style={{ color: focused ? 'red' : color }}>Updates</Text>
            ),
          },
        }}>
        <Tab.Screen
          name="HomeBottomTab"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                {focused ? (
                  <Image
                    source={require('../Screens/assets/tab1.png')}
                    style={{
                      width: 22,
                      height: 20,
                      tintColor: '#ffcc00',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../Screens/assets/tab1.png')}
                    style={{
                      width: 22,
                      height: 20,
                      tintColor: 'white',
                    }}
                  />
                )}
                <Text
                  style={{

                    marginTop: 2,
                    // marginBottom: -4,
                    // marginLeft: -5,
                    fontSize: 12,
                    color: 'white',
                  }}>
                 {t('Home')}
                </Text>
              </View>
            ),
          }}
          component={HomeBottomTab}
        />

        <Tab.Screen
          name="TrainingBottomTab"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                {focused ? (
                  <Image
                    source={require('../Screens/assets/workout-icon.png')}
                    style={{
                      width: 30,
                      height: 22,
                      tintColor: '#ffcc00',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../Screens/assets/workout-icon.png')}
                    style={{
                      width: 30,
                      height: 22,
                      tintColor: 'white',
                    }}
                  />
                )}

                <Text
                  style={{
                    marginTop: 2,
                    // marginBottom: -4,
                    // marginLeft: -10,
                    fontSize: 12,
                    color: 'white',
                  }}>
                  {t('Training')}
                </Text>
              </View>
            ),
          }}
          component={TrainingBottomTab}
        />

        <Tab.Screen
          name="ShopBottomTab"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                {focused ? (
                  <Image
                    source={require('../Screens/assets/tab5.png')}
                    style={{
                      width: 23,
                      height: 20,
                      tintColor: '#ffcc00',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../Screens/assets/tab5.png')}
                    style={{
                      width: 23,
                      height: 20,
                      tintColor: 'white',
                    }}
                  />
                )}
                <Text
                  style={{
                    marginTop: 2,
                    // marginBottom: -4,
                    // marginLeft: -5,
                    fontSize: 12,
                    color: 'white',
                  }}>
                  {t('Shop')}
                </Text>
              </View>
            ),
          }}
          component={ShopBottomTab}
        />

        <Tab.Screen
          name="BlogBottomTab"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                {focused ? (
                  <Image
                    source={require('../Screens/assets/tab4.png')}
                    style={{
                      width: 22,
                      height: 20,
                      tintColor: '#ffcc00',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../Screens/assets/tab4.png')}
                    style={{
                      width: 22,
                      height: 20,
                      tintColor: 'white',
                    }}
                  />
                )}

                <Text
                  style={{
                    marginTop: 2,
                    // marginBottom: -4,
                    // marginLeft: -2,
                    fontSize: 12,
                    color: 'white',
                  }}>
                  {t('Blogs')}
                </Text>
              </View>
            ),
          }}
          component={BlogBottomTab}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyTabBar;
