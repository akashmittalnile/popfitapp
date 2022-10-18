import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, Alert, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Pages } from 'react-native-pages';
import { Divider } from 'react-native-elements';
import { API } from '../../Routes/Urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Headers from '../../Routes/Headers';
import Share from 'react-native-share';



var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const TrainingPersonaDetail = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fitnessdata, setFitnessData] = useState("");
    const [isMale, setIsMale] = useState("");
    // const [data, setdata] = useState(false);
    const [Date, setDate] = useState("");
    const [Month, setMonth] = useState("");
    const [Year, setYear] = useState("");
    const [weightkg, setWeightkg] = useState('');
    const [Weightinkg, setWeightinkg] = useState("");
    const [Weightinlb, setWeightinlb] = useState("");
    const [selectheight, setselectheight] = useState('');
    const [Height, setHeight] = useState("");
    const [heightinch, setHeightInch] = useState("");
    const [heightfeet, setHeightfeet] = useState("");
    const [isCurrentlevel, setCurrentLevel] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [onsubmiterrormsg, steOnsubmiterrormsg] = useState(false);

    const gotoSubscriptionPlan = () => {
        props.navigation.navigate("SubscriptionPlan")
    }

    useEffect(() => {
        SetTrainingPlan();
    }, []);

    const Usertrndata = (fitnessdata) => {
        {
            fitnessdata?.height_param == "cm" ?
                (
                    setHeight(fitnessdata?.height))
                : fitnessdata?.height_param == "in" ?
                    (setHeightfeet(fitnessdata?.height?.slice(0, 1)),
                        setHeightInch(fitnessdata?.height?.slice(3, 4))) : null
        }
        {
            fitnessdata?.weight_param == "kg" ?
                (setWeightinkg(fitnessdata?.weight))
                :
                fitnessdata?.weight_param == "lb" ?
                    (setWeightinlb(fitnessdata?.weight)) : null
        }

        setIsMale(fitnessdata?.gender),
            setCurrentLevel(fitnessdata?.fit_level),
            setValue(fitnessdata?.fit_goal),
            setYear(fitnessdata?.dob.slice(0, 4)),
            setMonth(fitnessdata?.dob.slice(5, 7)),
            setDate(fitnessdata?.dob.slice(8, 10)),
            // setWeight(fitnessdata?.weight),
            setWeightkg(fitnessdata?.weight_param),
            setselectheight(fitnessdata?.height_param)
        // setdata(true);

    }

    const SetTrainingPlan = async () => {
        let Usertoken1 = await AsyncStorage.getItem("authToken");
        const data = {
            gender: isMale,
            fit_goal: value,
            fit_level: isCurrentlevel,
            dob: Year + "/" + Month + "/" + Date,
            weight: weightkg == "kg" ? Weightinkg : Weightinlb,
            weight_param: weightkg,
            height_param: selectheight,
            height: selectheight == "cm" ? Height : heightfeet + "FT" + heightinch + "IN"

        }
        setIsLoading(true);
        console.log("karan_basicdetails...", data);
        try {
            const response = await axios.post(`${API.SET_TRAINING}`, data, { headers: { "Authorization": ` ${Usertoken1}` } });
            // console.log("Response_SetTrainingPlan::::", response.data.data);

            // console.log("SetTrainingPlan_data!!!>>>", response.data.message);
            if (response.data.status == 1) {
                setIsLoading(false);
                props.navigation.navigate("TrainingDetail")
                // alert("Training update sucessfully")

            } else if (response.data.status == 0) {
                setFitnessData(response.data.data);
                Usertrndata(response.data.data);
                // alert("Training set allready");
                setIsLoading(false);
            }

        }
        catch (error) {
            // console.log("SUBSCRIPTION_error:", error.response.data.message);
            Alert.alert("Something went wrong !", error.response.data.message);
            setIsLoading(false);
        }

    };

    const MycustomonShare = async () => {
        const shareOptions = {
            title: 'App link',
            icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
            // type: 'data:image/png;base64,<imageInBase64>',
            message: "'Please install this app and stay safe",
            url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        }
        try {
            const shareResponse = await Share.open(shareOptions);
            // console.log('====================================');
            console.log(JSON.stringify(shareResponse));
            // console.log('====================================');
        }
        catch (error) {
            console.log('ERROR=>', error);
        }
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            width: WIDTH,
            height: HEIGHT, flexGrow: 1, backgroundColor: 'white',
        }} >
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

            {!isLoading ?
                (< View style={{ paddingBottom: 80 }} >
                    <Divider color='#393939' width={1.2} />
                    <ScrollView>
                        <View style={{ backgroundColor: '#262626', height: 180, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, width: "100%" }}>

                            <Pages indicatorColor='#ffcc00' >
                                <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                                    <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image source={require('../assets/trainningLogo.png')}
                                            style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                        <View style={{ height: 30, marginTop: 30, }}>
                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { }}>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 50 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Save Detail</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { MycustomonShare() }}>

                                                <View style={{ marginLeft: 10, borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 25 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#ffcc00', }}>Invite Friends</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, height: 130, flexDirection: 'row', marginHorizontal: 20, borderRadius: 20 }}>
                                    <View style={{ flex: 1 / 1.5, justifyContent: 'center', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image source={require('../assets/trainningLogo.png')}
                                            style={{ alignSelf: 'center', width: '100%', height: '100%', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "white", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                        <View style={{ height: 30, marginTop: 30, }}>
                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black', }}>Set Up Your Training Workout</Text>
                                        </View>

                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { gotoSubscriptionPlan() }}>
                                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', width: 140, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 9, color: '#ffcc00', }}>View Subscription Plan</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>

                            </Pages>
                        </View>

                        {/* Please Enter Your Basic Details */}
                        <View style={{ paddingBottom: 30, width: "99.9%", flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={{ marginTop: 30, marginLeft: 20, textAlign: 'left', fontSize: 14, color: '#000', fontWeight: "bold" }}>Please Enter Your Basic Details</Text>

                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Select Gender</Text>

                            <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 40, marginTop: 20, justifyContent: "flex-start", alignItems: "center" }}>

                                <TouchableOpacity onPress={() => {

                                    setIsMale("Male")
                                }}>
                                    <View style={{ borderWidth: 1, borderColor: isMale == 'Male' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 90, height: 40, flex: 1, backgroundColor: 'white', borderRadius: 35, alignItems: 'center', }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: isMale == 'Male' ? '#ffcc00' : '#bbbaba', }}>Male</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {

                                    setIsMale('Female')
                                }}>
                                    <View style={{ marginLeft: 10, borderWidth: 1, borderColor: isMale == 'Female' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: isMale == 'Female' ? '#ffcc00' : '#bbbaba', }}>Female</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {
                                isMale == "" && onsubmiterrormsg ?
                                    <View style={{ justifyContent: "center", alignItems: "flex-start", marginTop: 15, paddingLeft: 30, }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#FF0D10',

                                        }}>Please, select gender *</Text>
                                    </View>
                                    : <></>
                            }
                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Fitness Goal</Text>

                            {/* <View style={{ height: 40, marginHorizontal: 20, marginTop: 20, borderColor: '#bbbaba', borderWidth: 1, borderRadius: 35, flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                                <MenuField
                                    visible={visible}
                                    placeHolder={GoalName}
                                    data={GoalnameList}
                                    title={"Goal Name"}
                                    showMenu={() => showMenu()}
                                    hideMenu={() => hideMenu()}
                                    selectAction={(brand_name, id) => {
                                        hideMenu();

                                        GoalTypeAction(brand_name, id);
                                    }}
                                />
                            </View> */}
                            <View style={{ height: 50, marginHorizontal: 10, marginVertical: 20, width: WIDTH * 0.9 }}>
                                <DropDownPicker
                                    items={[
                                        { label: 'Get out of comfort zone', value: 'Weight_Gain' },
                                        { label: 'Lifting Weight', value: 'Lifting Weight' },
                                        { label: 'Physical Strength', value: 'Physical Strength' },
                                        { label: 'Pull-Up', value: 'Pull-Up' },
                                        { label: 'Improve our immune system', value: 'Improve our immune system' }

                                    ]}
                                    listParentContainerStyle={{
                                        justifyContent: "center",
                                        alignItems: "center", paddingLeft: 25
                                    }}
                                    listParentLabelStyle={{
                                        fontWeight: "600", fontSize: 16
                                    }}

                                    backgroundColor='white'
                                    // loading={loading}
                                    placeholder={value == "" ? "Goal Name" : value}
                                    containerStyle={{ height: 70 }}
                                    dropDownDirection="BOTTOM"
                                    // defaultValue={changeCountry}
                                    itemStyle={{ justifyContent: 'flex-start', }}
                                    textStyle={{
                                        fontSize: 14
                                    }}
                                    listMode="MODAL"
                                    open={open}
                                    setOpen={setOpen}
                                    value={value}
                                    setValue={setValue}
                                    scrollViewProps={{
                                        decelerationRate: "medium", ScrollView: "#ffcc00"
                                    }}
                                    onChangeText={(item) => setValue(item)}
                                    defaultValue={null}
                                    dropDownContainerStyle={{
                                        // backgroundColor:"red",
                                        borderColor: '#8F93A0',
                                        color: '#8F93A0',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 16,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        shadowColor: '#000000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3
                                        },
                                        shadowRadius: 5,
                                        shadowOpacity: 1.0,
                                        elevation: 5,
                                        zIndex: 999,

                                    }}
                                    style={{
                                        borderColor: 'white', backgroundColor: 'white', borderRadius: 25, shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        elevation: 2,
                                        alignItems: "center"
                                        , justifyContent: "center", zIndex: 3, paddingLeft: 20
                                    }}
                                />

                            </View>
                            {
                                value == "" && onsubmiterrormsg ?
                                    <View style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 30, }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#FF0D10',

                                        }}>Please, select fitness goal *</Text>
                                    </View>
                                    : <></>
                            }
                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Current Fitness Level</Text>

                            <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 40, marginTop: 20, justifyContent: "flex-start", alignItems: "center" }}>

                                <TouchableOpacity onPress={() => {

                                    setCurrentLevel('Beginners')
                                }}>
                                    <View style={{ borderWidth: 1, borderColor: isCurrentlevel == 'Beginners' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35, alignItems: 'center', }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: isCurrentlevel == 'Beginners' ? '#ffcc00' : '#bbbaba', }}>Beginners</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {

                                    setCurrentLevel('Average')
                                }}>
                                    <View style={{ marginLeft: 10, borderWidth: 1, borderColor: isCurrentlevel != 'Average' ? '#bbbaba' : '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: isCurrentlevel != 'Average' ? '#bbbaba' : '#ffcc00', }}>Average</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {

                                    setCurrentLevel('Advance')
                                }}>
                                    <View style={{ marginLeft: 10, borderWidth: 1, borderColor: isCurrentlevel != 'Advance' ? '#bbbaba' : '#ffcc00', justifyContent: 'center', width: 90, flex: 1, backgroundColor: 'white', borderRadius: 35 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: isCurrentlevel != 'Advance' ? '#bbbaba' : '#ffcc00', }}>Advance</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            {
                                isCurrentlevel == "" && onsubmiterrormsg ?
                                    <View style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 30, marginTop: 15 }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#FF0D10',

                                        }}>Please , select surrent fitness level *</Text>
                                    </View>
                                    : <></>
                            }
                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Date of Birth</Text>

                            <View style={{ marginHorizontal: 20, flexDirection: 'row', height: 40, marginTop: 20, justifyContent: 'flex-start', alignItems: "center", width: "100%", flex: 1 }}>

                                <View style={{ borderWidth: 1, borderColor: '#bbbaba', justifyContent: 'center', width: 70, backgroundColor: 'white', borderRadius: 35, alignItems: 'center' }}>
                                    <TextInput
                                        style={{ textAlign: 'center', fontSize: 15, color: 'black', justifyContent: 'center', alignItems: 'center' }}
                                        keyboardType={'number-pad'}
                                        maxLength={4}
                                        placeholderTextColor="#bbbaba"
                                        placeholder="Year"
                                        onChangeText={(Year) => setYear(Year)}
                                        value={Year}
                                    />
                                </View>

                                <View style={{ marginLeft: 10, borderWidth: 1, borderColor: '#bbbaba', justifyContent: 'center', width: 70, backgroundColor: 'white', borderRadius: 35 }}>
                                    <TextInput
                                        style={{ textAlign: 'center', fontSize: 15, color: 'black', justifyContent: 'center', alignItems: 'center', }}
                                        onChangeText={(Month) => {
                                            // if (Month > 12) {
                                            //     Alert.alert('', 'Please enter valid month!')
                                            //     return
                                            // }
                                            setMonth(Month)
                                        }}
                                        value={Month}

                                        placeholder="Month"
                                        placeholderTextColor="#bbbaba"
                                        keyboardType={'number-pad'}
                                        maxLength={2}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, borderWidth: 1, borderColor: '#bbbaba', justifyContent: 'center', width: 70, borderRadius: 35 }}>
                                    <TextInput
                                        style={{ textAlign: 'center', fontSize: 15, color: 'black', justifyContent: 'center', alignItems: 'center' }}
                                        onChangeText={(Date) => {
                                            if (Date > 31) {
                                                Alert.alert('', 'Please enter valid date !')
                                                return
                                            }
                                            setDate(Date)
                                        }}
                                        value={Date}
                                        placeholder="Date"
                                        placeholderTextColor="#bbbaba"
                                        keyboardType={'number-pad'}
                                        maxLength={2}
                                    />
                                </View>

                            </View>

                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Weight</Text>

                            <View style={{ width: "80%", flexDirection: 'row', height: 40, marginTop: 20, marginLeft: 20, justifyContent: "space-between", }}>
                                {
                                    weightkg === "kg" ?
                                        (<View style={{ borderWidth: 1, borderColor: '#bbbaba', height: 40, borderRadius: 35, flexDirection: 'row', alignItems: "center", width: 90 }}>

                                            <TextInput
                                                style={{
                                                    fontSize: 15,
                                                    color: 'black',
                                                    marginLeft: 10,
                                                    height: 40,
                                                    width: 65,
                                                }}
                                                placeholder="Kg"
                                                placeholderTextColor="#bbbaba"
                                                keyboardType={'number-pad'}
                                                onChangeText={(text) => setWeightinkg(text)}
                                                value={Weightinkg}
                                                maxLength={3}
                                            >

                                            </TextInput>
                                        </View>)
                                        :
                                        (<View style={{ borderWidth: 1, borderColor: '#bbbaba', height: 40, borderRadius: 35, flexDirection: 'row', alignItems: "center", width: 90 }}>

                                            <TextInput
                                                style={{ fontSize: 15, color: 'black', marginLeft: 10, height: 40, width: 65, }} 
                                                placeholder="Lb"
                                                placeholderTextColor="#bbbaba"
                                                keyboardType={'number-pad'}
                                                onChangeText={(text) => setWeightinlb(text)}
                                                value={Weightinlb}
                                                maxLength={3}
                                            >

                                            </TextInput>


                                            {/* <Text style={{ borderWidth: 0.3, marginLeft: 10, opacity: 0.2 }}></Text>

                                    <View style={{ justifyContent: 'center', marginTop: 23, marginLeft: 10, alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, color: '#bbbaba', height: 40, }}>Kg</Text>
                                    </View> */}
                                        </View>)
                                }


                                <View style={{ marginHorizontal: 1, flexDirection: 'row', height: 40, justifyContent: "flex-end", alignItems: "flex-end" }}>

                                    <TouchableOpacity onPress={() => {

                                        setWeightkg("kg")
                                    }}>
                                        <View style={{ borderWidth: 1, borderColor: weightkg == 'kg' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 50, height: 40, flex: 1, backgroundColor: 'white', borderRadius: 15, alignItems: 'center', }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: weightkg == 'kg' ? '#ffcc00' : '#bbbaba', }}>KG</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {

                                        setWeightkg('lb')
                                    }}>
                                        <View style={{ marginLeft: 10, borderWidth: 1, borderColor: weightkg == 'lb' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 50, flex: 1, backgroundColor: 'white', borderRadius: 15 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: weightkg == 'lb' ? '#ffcc00' : '#bbbaba', }}>LB</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={{ marginTop: 20, marginLeft: 20, textAlign: 'left', fontSize: 12, color: '#000', }}>Heights</Text>

                            <View style={{ width: "80%", flexDirection: 'row', height: 40, marginTop: 20, marginLeft: 20, justifyContent: "space-between", }}>

                                {
                                    selectheight === "cm" ?
                                        (<View style={{ borderWidth: 1, borderColor: '#bbbaba', height: 40, borderRadius: 35, flexDirection: 'row', alignItems: "center", width: 90 }}>
                                            <TextInput
                                                style={{ fontSize: 15, color: 'black', marginLeft: 10, height: 40, width: 110 }} placeholder="170 CM"
                                                maxLength={3}
                                                placeholderTextColor="#bbbaba"
                                                keyboardType={'number-pad'}
                                                onChangeText={(text) => setHeight(text)}
                                                value={Height}
                                            >

                                            </TextInput>

                                        </View>)
                                        :
                                        (<View style={{ width: "60%", flexDirection: 'row', height: 40, justifyContent: "space-between", }}>
                                            <View style={{ borderWidth: 1, borderColor: '#bbbaba', height: 40, borderRadius: 35, flexDirection: 'row', alignItems: "center", width: 90 }}>
                                                <TextInput
                                                    style={{ fontSize: 15, color: 'black', marginLeft: 10, height: 40, width: 110 }} placeholder="5 FT"
                                                    placeholderTextColor="#bbbaba"
                                                    keyboardType={'number-pad'}
                                                    maxLength={1}
                                                    onChangeText={(values) => setHeightfeet(values)}
                                                    value={heightfeet}
                                                >

                                                </TextInput>

                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: '#bbbaba', height: 40, borderRadius: 35, flexDirection: 'row', alignItems: "center", width: 90 }}>
                                                <TextInput
                                                    style={{ fontSize: 15, color: 'black', marginLeft: 10, height: 40, width: 110 }} placeholder="5 IN"
                                                    placeholderTextColor="#bbbaba"
                                                    keyboardType={'number-pad'}
                                                    maxLength={2}
                                                    onChangeText={(values) => setHeightInch(values)}
                                                    value={heightinch}
                                                >

                                                </TextInput>


                                            </View>
                                        </View>)
                                }

                                <View style={{ marginHorizontal: 1, flexDirection: 'row', height: 40, justifyContent: "flex-end", alignItems: "flex-end", }}>

                                    <TouchableOpacity onPress={() => {

                                        setselectheight("cm")
                                    }}>
                                        <View style={{ borderWidth: 1, borderColor: selectheight == 'cm' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 50, height: 40, flex: 1, backgroundColor: 'white', borderRadius: 15, alignItems: 'center', }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: selectheight == 'cm' ? '#ffcc00' : '#bbbaba', }}>CM</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {

                                        setselectheight('in')
                                    }}>
                                        <View style={{ marginLeft: 10, borderWidth: 1, borderColor: selectheight == 'in' ? '#ffcc00' : '#bbbaba', justifyContent: 'center', width: 50, flex: 1, backgroundColor: 'white', borderRadius: 15 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 9, color: selectheight == 'in' ? '#ffcc00' : '#bbbaba', }}>IN</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', height: 34, justifyContent: 'center', width: "100%", alignItems: "center", flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    SetTrainingPlan(),
                                        steOnsubmiterrormsg(true);
                                }}>
                                <View style={{ borderWidth: 1, borderColor: '#ffcc00', justifyContent: 'center', alignItems: "center", width: 110, height: 34, flex: 1, backgroundColor: '#ffcc00', borderRadius: 35 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 12, color: 'white', }}>Save Detail</Text>
                                </View>
                            </TouchableOpacity>
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
export default TrainingPersonaDetail;
