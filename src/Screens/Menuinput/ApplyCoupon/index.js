// import React from 'react';
// import { ScrollView, TouchableOpacity, Text, Image, View, } from 'react-native';
// import styles from '../../Menuinput/State/style';
// import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


// const MenuFieldCoupon = ({ visible, placeHolder, showMenu, hideMenu, selectAction, data, title, style, }) => {
//     // console.log("datamenu:::", data)
//     // console.log("dataitem:::", data.length)

//     return (
//         <TouchableOpacity style={[styles.signup_fieldview, style]} onPress={showMenu}>
//             <Text style={{color:"#8F93A0",fontSize: 18,marginLeft:20 }}>State</Text>
//             <Menu
//                 style={{ width: "85%", marginTop: "10%", height: '35%', justifyContent: 'center', alignItems: "center",  color: 'black',}}
//                 visible={visible}
//                 onRequestClose={hideMenu}
//                 anchor={
//                     placeHolder != '' ?
//                         <Text style={{
                             
//                             marginLeft: "10%", fontSize: 16, marginBottom: 5, color: 'black',
//                         }}>{placeHolder}</Text>
//                         :
//                         <Text style={{
                             
//                             marginLeft: "15%", fontSize: 14, marginBottom: 5, color: 'black',
//                         }}>{title}</Text>

//                 }><ScrollView>

//                     {title == "Apply Coupon" ?
//                         data.length > 0 ?
//                             data.map((item, index) =>

//                                 <MenuItem

//                                     key={index.toString()}
//                                     onPress={() => {
//                                         hideMenu();
//                                         selectAction(item.state_name, item.id);
//                                     }}>
//                                     <Text style={{   marginLeft: "8%", fontSize: 17, color: 'black' }}>{item.state_name}</Text>
//                                 </MenuItem>
//                             ) :
//                             null
//                         :
//                             null
//                     }
//                 </ScrollView>
//             </Menu>
             
//             <Image source={require("../../assets/down-arrow.png")}
//                 style={{ marginRight: 20, alignSelf: "center" }} />
//         </TouchableOpacity>
//     )
// }

// export default MenuFieldCoupon;

