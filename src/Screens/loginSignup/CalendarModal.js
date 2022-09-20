import {Image, Modal, StyleSheet, View} from 'react-native';
import React, { Component } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
 

const CalendarModal = ({visibleModal,onClose}) => {
  
  // STYLING SUNDAYS AS RED
  const customDayHeaderStylesCallback = (DayOfWeekName) => {
    switch (DayOfWeekName.dayOfWeek) {
      case 7:
        return {
          textStyle: styles.weekEnd,
        };
      default:
        return {};
    }
  };
  // on date change
  const onDateChange = (selectedDate) => {
    
    onClose(selectedDate);

  };
  const customDatesStylesCallback = (date) => {
    // only weekend styling
    if (date.isoWeekday() === 7) {
      return {
        textStyle: styles.onlyWeekEnd,
      };
    }
    return {};
  };
  return (
    <View>
    
      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => {
          onClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewCalendar}>
            <CalendarPicker
            
              customDayHeaderStyles={customDayHeaderStylesCallback}
              customDatesStyles={customDatesStylesCallback}
              dayLabelsWrapper={styles.days}
              monthTitleStyle={styles.month}
              nextComponent={
                <View style={styles.nextBtn}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={styles.nextImg}
                      source={require('../assets/rightarrow1.png')}
                    />
                  </View>
                </View>
              }
              onDateChange={onDateChange}
              previousComponent={
                <View style={styles.previousBtn}>
                  <Image
                    resizeMode="contain"
                    style={styles.previousImg}
                    source={require('../assets/leftarrow.png')}
                  />
                </View>
              }
              selectedDayStyle={styles.selectedDate}
              selectedDayTextColor={"white"}
              showDayStragglers={true}
              startFromMonday={true}
              textStyle={styles.allTexts}
              todayBackgroundColor={"white"}
              todayTextStyle={styles.today}
              yearTitleStyle={styles.year}
              onMonthChange={data => {
                console.log('Changes', data);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CalendarModal;
const styles = StyleSheet.create({
  allTexts: {
    fontWeight: '600',
  },
  days: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  month: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffcc00",
  },
  nextBtn: {marginRight: 25, marginTop: 10},
  nextImg: {width: 20, height: 20},
  onlyWeekEnd: {
    color: "red",
  },
  previousBtn: {marginLeft: 25, marginTop: 10},
  previousImg: {width: 20, height: 20},
  selectedDate: {
    backgroundColor: "gray",
  },
  today: {
    fontSize: 21,
 
  },
  weekEnd: {
    color: "red",
  },
  year: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffcc00",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
  },
  modalViewCalendar: {
    backgroundColor:"white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
});

