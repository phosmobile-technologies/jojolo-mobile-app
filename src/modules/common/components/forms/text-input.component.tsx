import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { COLORS } from "../../../../constants";
import AppText from "../typography/text.component";

/**
 * Text Input used in the APP, and styled appropriately
 *
 * @param param0
 * @returns
 */
const AppTextInput = ({ label = "", style = {}, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {label.length > 0 && <AppText style={styles.label}>{label}</AppText>}
      <TextInput style={[styles.textInput, style]} {...otherProps} />
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
  textInput: {
    height: 60,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    borderRadius: 10,
    paddingLeft: 30,
  },
});

export default AppTextInput;
