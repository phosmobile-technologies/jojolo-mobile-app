import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

import AppText from "../typography/text.component";
import { COLORS } from "../../../../constants";
import { APP_STYLES } from "../../styles";

export interface AppPickerItem {
  label: string;
  value: any;
}

interface AppPickerProps {
  selectedValue: any;
  updateSelectedValue: Function;
  options: AppPickerItem[];
  label?: string;
  error?: object;
}

/**
 * A customized picker (dropdown) component
 */
const AppDropdown = (props: AppPickerProps) => {
  const {
    selectedValue,
    updateSelectedValue,
    options,
    label = "",
    error = {},
  } = props;

  const errorObject: any = error;
  let errorMessage = errorObject.message ? errorObject.message : "";
  let hasError = errorMessage.length > 0;

  const pickerWrapperStyles = hasError
    ? [styles.picker__wrapper, styles.picker__wrapper__with__error]
    : [styles.picker__wrapper];

  let PickerComponent = <></>;

  if (Platform.OS === "ios") {
    // @TODO Replace this with a proper IOS picker that works
    <Picker
      style={styles.picker}
      itemStyle={{ height: 70 }}
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        if (!itemValue) {
          return;
        }
        updateSelectedValue(itemValue);
      }}
    >
      <Picker.Item label="Select one..." value="" />
      {options.map((option, index) => {
        return (
          <Picker.Item label={option.label} value={option.value} key={index} />
        );
      })}
    </Picker>;
  }

  if (Platform.OS === "android") {
    PickerComponent = (
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          if (!itemValue) {
            return;
          }
          updateSelectedValue(itemValue);
        }}
      >
        <Picker.Item label="Select one..." value="" />
        {options.map((option, index) => {
          return (
            <Picker.Item
              label={option.label}
              value={option.value}
              key={index}
            />
          );
        })}
      </Picker>
    );
  }

  return (
    <View style={styles.container}>
      {label.length > 0 && (
        <AppText style={APP_STYLES.form__input__label}>{label}</AppText>
      )}
      <View style={pickerWrapperStyles}>{PickerComponent}</View>
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

  picker__wrapper: {
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    borderRadius: 10,
    paddingLeft: 10,
  },

  picker__wrapper__with__error: {
    borderColor: COLORS.APP_ERROR_RED,
  },

  picker: {
    height: 50,
  },

  error__label: {
    color: COLORS.APP_ERROR_RED,
    fontSize: 12,
  },
});

export default AppDropdown;
