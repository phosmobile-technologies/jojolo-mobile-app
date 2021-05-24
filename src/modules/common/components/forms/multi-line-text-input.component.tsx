import React from "react";
import { TextInput, StyleSheet, View, Keyboard } from "react-native";
import { COLORS } from "../../../../constants";
import { APP_STYLES } from "../../styles";
import AppText from "../typography/text.component";

/**
 * MultiLine Text Input used in the APP, and styled appropriately
 *
 * @param param0
 * @returns
 */
const MultiLineAppTextInput = ({
  label = "",
  style = {},
  error = {},
  ...otherProps
}) => {
  const errorObject: any = error;
  let errorMessage = errorObject.message ? errorObject.message : "";
  let hasError = errorMessage.length > 0;

  const textInputStyles = hasError
    ? [styles.textInput, style, styles.text_input__has__error]
    : [styles.textInput, style];

  return (
    <View style={styles.container}>
      {label.length > 0 && (
        <AppText style={APP_STYLES.form__input__label}>{label}</AppText>
      )}
      <TextInput
        style={textInputStyles}
        {...otherProps}
        multiline={true}
        numberOfLines={10}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
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
    // justifyContent: "flex-start",
  },

  error__label: {
    color: COLORS.APP_ERROR_RED,
    fontSize: 12,
  },

  textInput: {
    // height: 100,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    textAlignVertical: "top",
  },

  text_input__has__error: {
    borderColor: COLORS.APP_ERROR_RED,
  },
});

export default MultiLineAppTextInput;
