import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * Custom wrapper for the text component which adds the font we use for the app
 * @param props
 * @returns
 */
const AppText = ({
  children,
  style = {},
}: {
  children: any;
  style?: object;
}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito_600SemiBold",
  },
});

export default AppText;
