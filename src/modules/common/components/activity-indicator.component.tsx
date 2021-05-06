import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import AppText from "./typography/text.component";

/**
 * Custom activity indicator used to show a spinning loading indicator and some loading text (if necessary)
 *
 * @param param0
 * @returns
 */
const AppActivityIndicator = ({
  text = "",
  ...otherProps
}: {
  text?: string;
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        {...otherProps}
        color={COLORS.PRIMARY_COLOR}
        size={"large"}
      ></ActivityIndicator>
      <AppText style={styles.loadingText}>{text}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 25,
    marginTop: 5,
  },
});

export default AppActivityIndicator;
