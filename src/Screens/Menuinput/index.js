import React from 'react';
import { ScrollView, TouchableOpacity, Text, Image, View, } from 'react-native';
import styles from '../Menuinput/style';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const MenuField = ({ visible, placeHolder, showMenu, hideMenu, selectAction, data, title, style, }) => {
    // console.log("datamenu:::", data)
    // console.log("dataitem:::", data.length)

    return (
        <TouchableOpacity style={[styles.signup_fieldview, style]} onPress={showMenu}>
            <Menu
                style={{ width: "90%", marginTop: "7%", height: '35%', }}
                visible={visible}
                onRequestClose={hideMenu}
                anchor={
                    placeHolder != '' ?
                        <Text style={{
                            marginLeft: "10%", fontSize: 16, marginBottom: 5, color: 'black',
                        }}>{placeHolder}</Text>
                        :
                        <Text style={{
                            marginLeft: "15%", fontSize: 14, marginBottom: 5, color: 'black',
                        }}>{title}</Text>

                }><ScrollView>

                    {title == "Goal Name" ?
                        data.length > 0 ?
                            data.map((item, index) =>

                                <MenuItem

                                    key={index.toString()}
                                    onPress={() => {
                                        hideMenu();
                                        selectAction(item.brand_name, item.id);
                                    }}>
                                    <Text style={{  marginLeft: "8%", fontSize: 17, color: 'black' }}>{item.brand_name}</Text>
                                </MenuItem>
                            ) :
                            null
                            :
                        title == "State" ?
                            data.length > 0 ?
                                data.map((item, index1) =>
                                    <View key={index1}>
                                        
                                        <MenuItem

                                            onPress={() => {
                                                hideMenu();
                                                selectAction(item.state_name, item.id);
                                            }}>
                                            <Text style={{ marginLeft: "8%", fontSize: 17, color: Colors.black }}>{item.state_name}</Text>
                                        </MenuItem>
                                    </View>

                                ) :
                                null
                                
                             

                        :
                        null
                    }
                </ScrollView>
            </Menu>
            <Image source={require("../assets/down-arrow.png")}
                    style={{ marginRight:20}} />
        </TouchableOpacity>
    )
}

export default MenuField;

