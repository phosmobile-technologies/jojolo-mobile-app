import React from "react";
import { Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

/**
 * Custom wrapper for a text component that has an onPress function as well
 *
 * @param props
 * @returns
 */
const AppTextLink = ({
  children,
  style = {},
  onPress = () => {},
}: {
  children: any;
  style?: object;
  onPress?: Function;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito_600SemiBold",
  },
});

export default AppTextLink;
