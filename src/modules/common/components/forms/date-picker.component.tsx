import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppText from "../typography/text.component";
import { COLORS } from "../../../../constants";
import { APP_STYLES } from "../../styles";

/**
 * Date picker input used in the app, and styled appropriately
 *
 * @param param0
 * @returns
 */
const AppDatePickerInput = ({
  date,
  setDate,
  mode = "date",
  label = "",
  style = {},
  error = {},
  ...otherProps
}: {
  date: Date | undefined;
  setDate: Function;
  mode?: "date" | "time";
  label?: string;
  style?: object;
  error?: object;
}) => {
  const [show, setShow] = useState(false);

  // Handle changing the date value
  const onChange = (event, selectedDate: any) => {
    const currentDate = selectedDate || date;
    toggleShow();
    setDate(currentDate);
  };

  // Toggle showing the datepicker component
  const toggleShow = () => {
    setShow(!show);
  };

  const errorObject: any = error;
  let errorMessage = errorObject.message ? errorObject.message : "";
  let hasError = errorMessage.length > 0;

  const datePickerFormInputStyles = hasError
    ? [
        styles.date__picker__form__input,
        style,
        styles.date__picker__form__input__has__error,
      ]
    : [styles.date__picker__form__input, style];

  return (
    <View style={styles.container}>
      {label.length > 0 && (
        <AppText style={APP_STYLES.form__input__label}>{label}</AppText>
      )}
      <TouchableWithoutFeedback onPress={toggleShow}>
        <View style={datePickerFormInputStyles}>
          <AppText>{date && date.toDateString()}</AppText>
        </View>
        {hasError && errorMessage.length > 0 && (
          <AppText style={APP_STYLES.form__input__error__label}>
            {errorMessage}
          </AppText>
        )}
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  date__picker__form__input: {
    height: 50,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },

  date__picker__form__input__has__error: {
    borderColor: COLORS.APP_ERROR_RED,
  },
});

export default AppDatePickerInput;
