import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import AppText from "./app-text.component";

/**
 * Custom header text component that adds the styling for page headers
 *
 * @param props
 * @returns
 */
const AppHeaderText = ({
  children,
  style = {},
}: {
  children: any;
  style?: object;
}) => {
  return <AppText style={[styles.text, style]}>{children}</AppText>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.PAGE_HEADER_BLACK,
  },
});

export default AppHeaderText;
