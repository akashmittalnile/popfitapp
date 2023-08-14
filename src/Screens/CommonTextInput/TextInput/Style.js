import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        inputView: {
            height: 50,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
            width: '100%',
            marginBottom: '5%',
            //fontSize:12
        },
        Selectedsignup: {

            marginTop: 10,
            borderRadius: 25,
            marginHorizontal: 20,
            flexDirection: 'row',
            height: 50,
            shadowColor: '#11032586',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: "#bbbaba",
            borderWidth: 1,
        },
        Selectedsignup2: {
            width: '80%',
            height: 40,
            borderWidth: 1,
            alignSelf: 'center', justifyContent: 'center',
            borderColor: "white", borderRadius: 8,
            backgroundColor: "white"
        },
        textstyles: {
            width: '96%',
            fontSize: 14,
            marginLeft: 1, color: "black",   justifyContent: 'center', alignItems: 'center' 
        },
        textstyles2: {
            width: '88%', justifyContent: 'center', alignItems: 'center' , color: "black",height:"100%"},
        signup_fieldview: {
            width: '100%',
            height: 40,
            borderWidth: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: '2%', borderColor: "white",
            borderRadius: 8, backgroundColor: "white"
            , maxHeight: '20%'
        }
    }
)

export default styles;