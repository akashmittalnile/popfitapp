import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Pressable, Modal, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import styles from '../../Routes/style'
import Headers from '../../Routes/Headers';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const DumbleSet = (props) => {
  const [FilterPopup, setFilterPopUp] = useState(false);
  const [CartAddedPopUp, setCartAddedPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const DATA = ['first row', 'second row', 'third row', 'first row', 'second row', 'third row'];
  const gotoNotification = () => {
    props.navigation.navigate("Notifications")
  }
  const gotoshippingdetails = () => {
    props.navigation.navigate('ShippingDetail');
  };
  const buttonClickedHandler = () => {
    props.navigation.goBack()
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      width: WIDTH,
      height: HEIGHT, flexGrow: 1
    }} >
      {!isLoading ?
        (<View>
          <Headers
            Backicon={{
              visible: true,
            }}
            BackicononClick={() => { props.navigation.goBack() }}

            CartIcon={{
              visible: true,
            }}
            CartIconononClick={() => { props.navigation.navigate("CartAdded") }}

            Bellicon={{
              visible: true,

            }}
            BelliconononClick={() => { props.navigation.navigate("Notifications") }}
          />
          <ScrollView>
            <View style={{ paddingBottom: 2 }}>
              <View style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 0.8 }}>
                  <Text style={{ marginLeft: 25, marginTop: 20, textAlign: 'left', fontSize: 14, color: 'black', }}>Dumbell Set</Text>
                </View>
                <View style={{ marginLeft: -20, flex: 0.8 / 3, flexDirection: 'row' }}>
                  <View style={{ marginRight: 10 }}>

                    <View style={{ justifyContent: 'center', marginRight: 10, marginTop: 10 }}>
                      <TouchableOpacity onPress={() => {
                        setCartAddedPopUp(!CartAddedPopUp);
                      }}>
                        <View style={{ marginLeft: 10, backgroundColor: '#ffcc00', width: 30, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 30 / 2 }}>
                          <Image source={require('../assets/bag1.png')}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#ec1f1f', width: 10, height: 10, borderRadius: 10 / 2, marginLeft: 30, marginTop: -30 }}>
                        <Text style={{ textAlign: 'center', fontSize: 7, color: 'white', }}>1</Text>
                      </View>
                    </View>

                  </View>
                  <View style={{ marginTop: -10, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                    <TouchableOpacity onPress={() => {
                      setFilterPopUp(!FilterPopup);
                    }}>
                      <View style={{ backgroundColor: '#ffcc00', width: 30, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 30 / 2 }}>
                        <Image source={require('../assets/filter.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>



                </View>
              </View>

              <FlatList
                vertical
                data={DATA}
                numColumns={2}                  // set number of columns 
                columnWrapperStyle={{
                  // flex: 1,
                  justifyContent: "space-around"
                }}
                renderItem={({ item }) => <View style={{
                  backgroundColor: '#f7f7f7',
                  height: HEIGHT * 0.25,
                  width: WIDTH * 0.45,
                  marginTop: 10,
                  borderRadius: 25,
                  alignItems: 'center',
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0,
                  elevation: 5,
                  zIndex: 999,
                  labelStyle: {
                    color: "#fff",
                    lineHeight: 0
                  },
                }}>
                  <View style={{
                    marginTop: 20, width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: 'fceeb5'
                  }}>
                    <Image
                      resizeMode='contain'
                      style={{
                        width: 110, marginTop: 20,
                        height: 90, alignSelf: 'center'
                      }}
                      source={require('../assets/dumble.png')} />

                  </View>
                  <View style={{
                    marginTop: 10, width: '100%', borderBottomRightRadius: 25, borderBottomLeftRadius: 25, height: 70
                  }}>
                    <Text style={{ marginTop: 25, marginLeft: 10, fontSize: 12, color: 'black', }}>The Flexibell</Text>
                    <View style={{ height: 50, flexDirection: 'row', borderBottomRightRadius: 25, borderBottomLeftRadius: 25, }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 12, color: 'black', }}>$ 498.00</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }}>

                        <View style={{
                          alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 8, width: 30, height: 30, borderRadius: 20 / 2, backgroundColor: '#ffcc00'
                        }}>
                          <Image
                            resizeMode='contain'
                            style={{
                              width: 13,
                              height: 15, alignSelf: 'center'
                            }}
                            source={require('../assets/bag1.png')} />
                        </View>

                      </View>
                    </View>
                  </View>

                </View>
                }
              />

              {FilterPopup ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={FilterPopup}
                  onRequestClose={() => {
                    setFilterPopUp(!FilterPopup);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'rgba(140, 141, 142, 0.7)',
                    }}>
                    <View
                      style={{
                        margin: 5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        paddingTop: 40,

                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 480,


                          marginHorizontal: 30,
                          borderRadius: 10,

                          alignItems: 'center',
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{
                            marginHorizontal: 20,
                            height: 25,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              width: 25,
                              height: 25,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 40 / 2,
                            }}>
                            <Image
                              source={require('../assets/filterBlack.png')}
                              style={{
                                width: 20,
                                height: 15,
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              marginLeft: 10,
                              textAlign: 'center',
                              fontSize: 16,
                              color: 'black',

                              marginTop: 2,
                            }}>
                            Filter
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            height: 60,
                            flexDirection: 'row',
                            marginTop: 30,
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              flexDirection: 'row',
                              height: 40,
                            }}>
                            <TouchableOpacity>
                              <View
                                style={{
                                  width: 160,
                                  flex: 1,
                                  borderRadius: 35,
                                  borderColor: '#ffcc00',
                                  borderWidth: 1,
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={require('../assets/updownYellow.png')}
                                    style={{
                                      width: 15,
                                      height: 15,
                                      alignSelf: 'center',
                                      marginRight: 10,
                                    }}
                                  />

                                  <Text
                                    style={{
                                      textAlign: 'left',
                                      fontSize: 9,
                                      color: '#ffcc00',

                                    }}>
                                    Higher to Lower Price
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              marginLeft: 10,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              height: 40,
                            }}>
                            <TouchableOpacity>
                              <View
                                style={{
                                  width: 160,
                                  flex: 1,
                                  borderRadius: 35,
                                  borderColor: '#bbbaba',
                                  borderWidth: 1,
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={require('../assets/updownGrey.png')}
                                    style={{
                                      width: 15,
                                      height: 15,
                                      alignSelf: 'center',
                                      marginRight: 10,
                                    }}
                                  />

                                  <Text
                                    style={{
                                      textAlign: 'left',
                                      fontSize: 9,
                                      color: '#bbbaba',

                                    }}>
                                    Lower to Higher Price
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <Text
                          style={{
                            marginTop: 20,
                            marginHorizontal: 20,
                            textAlign: 'left',
                            fontSize: 14,
                            color: 'black',

                          }}>
                          Select From Category & Sub-Category
                        </Text>

                        <View
                          style={{
                            width: '90%',
                            marginTop: 20,
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity>
                            <View
                              style={{
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 120,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Fitness Dumble
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View
                              style={{
                                marginLeft: 10,
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 120,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Workout Equipment
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity>
                            <View
                              style={{
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 100,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Clothes
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View
                              style={{
                                marginLeft: 10,
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 100,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Barbel Set
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View
                              style={{
                                marginLeft: 10,
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 100,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Training Bench
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            marginTop: 10,
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity>
                            <View
                              style={{
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 120,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Pull-Up Frame & Bar
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View
                              style={{
                                marginLeft: 10,
                                borderColor: '#8F93A0',
                                borderWidth: 1,
                                borderRadius: 25,
                                width: 120,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 9,
                                  color: '#bbbaba',

                                }}>
                                Kettlebell Set
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            height: 200,
                            marginTop: 20,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setFilterPopUp(!FilterPopup);
                              }}>
                              <View
                                style={{
                                  marginTop: 30,
                                  borderRadius: 25,
                                  width: 200,
                                  height: 50,
                                  backgroundColor: '#ffcc00',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'white',

                                  }}>
                                  Apply
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}

              {CartAddedPopUp ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={CartAddedPopUp}
                  onRequestClose={() => {
                    setCartAddedPopUp(!CartAddedPopUp);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'rgba(140, 141, 142, 0.7)',
                    }}>
                    <View
                      style={{
                        margin: 10,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        //paddingTop: 40,

                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 390,
                          marginHorizontal: 10,

                          borderRadius: 10,
                          marginBottom: 20,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 50,
                            marginHorizontal: 10,
                            marginTop: 10,
                            width: '40%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image source={require('../assets/bag2.png')} />
                          </View>

                          <View style={{ flex: 0.5 }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontSize: 15,
                                color: '#000000',

                              }}>
                              Cart
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: -15,
                              borderRadius: 25,
                              backgroundColor: '#ffcc00',
                              width: 25,
                              height: 25,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 14,
                                color: 'white',

                              }}>
                              1
                            </Text>
                          </View>
                        </View>

                        <FlatList
                          horizontal
                          data={DATA}
                          renderItem={({ item }) => (
                            <View
                              style={{
                                backgroundColor: 'white',
                                height: 200,
                                width: 160,
                                marginTop: 10,
                                marginLeft: 20,
                                borderRadius: 25,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                elevation: 2,
                              }}>
                              <View
                                style={{
                                  marginTop: 20,
                                  width: 80,
                                  height: 80,
                                  borderRadius: 80 / 2,
                                  backgroundColor: '#fceeb5',
                                }}>
                                <Image
                                  style={{
                                    width: 110,
                                    marginTop: 20,
                                    height: 90,
                                    alignSelf: 'center',
                                  }}
                                  source={require('../assets/dumble.png')}
                                />
                              </View>
                              <View
                                style={{
                                  marginTop: 10,
                                  width: '100%',
                                  borderBottomRightRadius: 25,
                                  borderBottomLeftRadius: 25,
                                  height: 70,
                                }}>
                                <Text
                                  style={{
                                    marginTop: 25,
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: 'black',

                                    fontWeight: '500',
                                  }}>
                                  The Flexibell
                                </Text>
                                <View
                                  style={{
                                    height: 50,
                                    flexDirection: 'row',
                                    borderBottomRightRadius: 25,
                                    borderBottomLeftRadius: 25,
                                  }}>
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      style={{
                                        marginTop: 15,
                                        marginLeft: 10,
                                        fontSize: 12,
                                        color: 'black',

                                        fontWeight: '500',
                                      }}>
                                      $ 498.00
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'flex-end',
                                      marginRight: 10,
                                    }}>
                                    <TouchableOpacity>
                                      <View
                                        style={{
                                          backgroundColor: '#ffcc00',
                                          width: 25,
                                          height: 25,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderRadius: 20 / 2,
                                        }}>
                                        <Image
                                          source={require('../assets/delete.png')}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </View>
                          )}
                        />
                        <View
                          style={{
                            marginBottom: 20,
                            flexDirection: 'row',
                            height: 50,
                            marginHorizontal: 20,
                            marginTop: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setCartAddedPopUp(!CartAddedPopUp);
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                width: 200,
                                flex: 1,
                                backgroundColor: '#ffcc00',
                                borderRadius: 35,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 15,
                                  color: 'white',

                                  fontWeight: '700',
                                }}>
                                Continue Shopping
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              gotoshippingdetails();
                              setCartAddedPopUp(!CartAddedPopUp);
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                width: 120,
                                flex: 1,
                                backgroundColor: '#ffcc00',
                                borderRadius: 35,
                                marginLeft: 10,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 15,
                                  color: 'white',

                                  fontWeight: '700',
                                }}>
                                Buy Now
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}
            </View>
          </ScrollView>
        </View>)
        :
        (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>)}
    </SafeAreaView>
  );
}
export default DumbleSet;
