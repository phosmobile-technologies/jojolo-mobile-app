import React from "react";
import { StyleSheet, View } from "react-native";
import NumericInput from "react-native-numeric-input";

import { COLORS } from "../../../../constants";
import AppText from "../typography/text.component";

/**
 * Numeric Input used in the APP, and styled appropriately
 *
 * @param param0
 * @returns
 */
const AppNumericInput = ({
  value,
  onChangeValue,
  label = "",
  style = {},
  error = {},
  otherProps = {},
}) => {
  const errorObject: any = error;
  let errorMessage = errorObject.message ? errorObject.message : "";
  let hasError = errorMessage.length > 0;

  const textInputStyles = hasError
    ? [styles.textInput, style, styles.text_input__has__error]
    : [styles.textInput, style];

  return (
    <View style={styles.container}>
      {label.length > 0 && <AppText style={styles.label}>{label}</AppText>}
      <NumericInput
        value={value}
        onChange={(value) => onChangeValue(value)}
        totalWidth={200}
        totalHeight={40}
        iconSize={25}
        step={1}
        valueType="integer"
        rounded
        textColor={COLORS.APP_BLACK_TEXT}
        iconStyle={{ color: "white" }}
        rightButtonBackgroundColor={COLORS.APP_PRIMARY_COLOR}
        leftButtonBackgroundColor={COLORS.APP_PRIMARY_COLOR}
        {...otherProps}
      />
      {hasError && errorMessage.length > 0 && (
        <AppText style={styles.error__label}>{errorMessage}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  label: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 14,
  },

  error__label: {
    color: COLORS.APP_ERROR_RED,
    fontSize: 12,
  },

  textInput: {
    height: 50,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    borderRadius: 10,
    paddingLeft: 20,
  },

  text_input__has__error: {
    borderColor: COLORS.APP_ERROR_RED,
  },
});

export default AppNumericInput;
