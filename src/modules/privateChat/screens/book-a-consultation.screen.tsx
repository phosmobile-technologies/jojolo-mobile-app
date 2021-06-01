import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Image, StyleSheet, Platform, ScrollView } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useToast } from "react-native-fast-toast";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { COLORS } from "../../../constants";

import { User } from "../../../generated/graphql";
import AppButton from "../../common/components/button.component";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import AppText from "../../common/components/typography/text.component";
import { APP_STYLES } from "../../common/styles";

/**
 * Function Handling the Display of the Consultation Screen with Medical Personnel
 *
 *
 *
 *
 * @todo: Add ability to Blur Unavailable Dates
 * @returns
 *
 */
const BookAConsultationScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { doctor }: { doctor: User } = route.params;
  const toast: any = useToast();

  const [selectedDate, setSelectedDate] = useState({
    Date: null,
  });
  const [activeTime, setActiveTime] = useState("");

  /**
   * Function for handling Date on Change and Adding date to state
   * @param date
   */
  const onDateChange = (date: any) => {
    setSelectedDate({
      Date: date,
    });
  };

  /**
   *
   * Hook for customizing navigation header and title for Consultation sreen.
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={"Book A Consultation"} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

  /**
   * function for setting time when the user clicks on one of the available time options
   * @param time
   */
  const handleSelectTime = (time: string) => {
    setActiveTime(time as string);
  };

  /**
   * @Todo this will turn eventually to a graphQL generated Options
   */
  const TIME = [
    "12:00 pm - 12:30 pm",
    "1:00 pm - 1:30 pm",
    "2:00 pm - 2:30 pm ",
    "3:00 pm - 3:30 pm",
    "4:00 pm - 4:30 pm",
    "5:00 pm - 5:30 pm",
  ];

  /**
   * @Todo the unavailable array would be gottem from The graphQl Api
   */
  const UNAVAILBLE_DATES_ARRAY = [
    new Date("2021/05/31"),
    new Date("2021/05/24"),
    new Date("2021/05/23"),
  ];
  const UnavailableDates = UNAVAILBLE_DATES_ARRAY.map((date) => date);

  /**
   * Function For Handling getting the data for Consultaion Time
   *
   */
  const sendConsultationTime = () => {
    const obj = {
      selectedDate: selectedDate.Date,
      selectedTime: activeTime,
    };

    console.log(obj);
  };

  return (
    <ScrollView>
      <View style={Styles.container}>
        <View style={Styles.available__date}>
          <AppText>Available Dates</AppText>
        </View>
        <View style={Styles.calendar__container}>
          <CalendarPicker
            onDateChange={onDateChange}
            width={350}
            selectedDayStyle={{ backgroundColor: COLORS.APP_PRIMARY_COLOR }}
            disabledDates={UnavailableDates}
          />
        </View>
        <AppText style={Styles.available__date}>Available Time Slots</AppText>
        <View style={Styles.time__container}>
          {TIME.map((time) => {
            return (
              <TouchableWithoutFeedback
                style={[
                  Styles.time,
                  time === activeTime ? Styles.activeTime : {},
                ]}
                onPress={() => handleSelectTime(time as string)}
              >
                <AppText
                  style={[
                    Styles.text,
                    time === activeTime ? Styles.activeTimeText : {},
                  ]}
                >
                  {time}
                </AppText>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
      <View style={APP_STYLES.screen__bottom__bar__button}>
        <AppButton
          type="submit"
          title="Book Consultation"
          onPress={() => {
            selectedDate.Date !== null && activeTime.length
              ? toast.show(
                  "Virtual consultation has been booked successfully",
                  {
                    type: "success",
                  }
                )
              : toast.show(
                  "You can’t book this consultation because you haven't chosen a date or time.",
                  {
                    type: "error",
                  }
                );

            sendConsultationTime();
          }}
        />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  calendar__container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  time__container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  time: {
    padding: 5,
    marginVertical: 7,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    alignContent: "center",
  },
  activeTime: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    color: COLORS.WHITE,
  },
  activeTimeText: {
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.APP_BLACK_TEXT,
  },
  available__date: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default BookAConsultationScreen;
