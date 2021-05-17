import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";
import { APP_STYLES } from "../../styles";
import AppText from "../typography/text.component";

/**
 * Radio button styled appropriately
 *
 * @param param0
 * @returns
 */
const AppRadioButtonInput = ({
  options,
  value,
  setValue,
  label = "",
  containerStyle = {},
  error = {},
}: {
  options: Array<{ label: string; value: string }>;
  value: string;
  setValue: Function;
  label?: string;
  containerStyle?: object;
  error?: object;
}) => {
  const errorObject: any = error;
  let errorMessage = errorObject.message ? errorObject.message : "";
  let hasError = errorMessage.length > 0;

  const radioButtonWrapperStyle = hasError
    ? [styles.options__wrapper, styles.radio__button__has__error]
    : [styles.options__wrapper];

  return (
    <View style={[styles.radio__buttons__container, containerStyle]}>
      {label.length > 0 && (
        <AppText style={APP_STYLES.form__input__label}>{label}</AppText>
      )}
      <View style={radioButtonWrapperStyle}>
        {options.map((option) => {
          return (
            <View key={option.value} style={styles.radio__button__container}>
              <TouchableOpacity
                style={styles.radio__circle}
                onPress={() => {
                  setValue(option.value);
                }}
              >
                {value === option.value && (
                  <View style={styles.selected__radio} />
                )}
              </TouchableOpacity>
              <Text style={styles.radio__text}>{option.label}</Text>
            </View>
          );
        })}
      </View>
      {hasError && errorMessage.length > 0 && (
        <AppText style={APP_STYLES.form__input__error__label}>
          {errorMessage}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  radio__buttons__container: {
    marginVertical: 25,
  },

  radio__button__container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  radio__text: {
    marginRight: 35,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.APP_BLACK_TEXT,
    fontWeight: "700",
  },

  radio__circle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },

  selected__radio: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
  },

  options__wrapper: {
    flexDirection: "row",
  },

  radio__button__has__error: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.APP_ERROR_RED,
    padding: 10,
  },
});

export default AppRadioButtonInput;
