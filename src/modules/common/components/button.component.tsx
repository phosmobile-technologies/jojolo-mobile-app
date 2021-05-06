import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import AppText from "./typography/text.component";

/**
 * The common button used in the app
 *
 * @param param0
 * @returns
 */
const AppButton = ({ title = "", onPress = () => {}, ...otherProps }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.container}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});

export default AppButton;
