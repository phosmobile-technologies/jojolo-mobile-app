import React from "react";
import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";
import AppText from "./text.component";

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
    fontFamily: "Nunito_700Bold",
    fontSize: 30,
    color: COLORS.APP_PAGE_HEADER_BLACK_TEXT,
  },
});

export default AppHeaderText;
