import React from "react";
import { View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

import { COLORS } from "../../../../constants";

/**
 * Component for the go back button on screens
 *
 * @param param0
 * @returns
 */
const AppHeaderGoBackButton = ({
  onPress = () => {},
}: {
  onPress: Function;
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
        height: 40,
        width: 40,
        borderRadius: 1000,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
      }}
    >
      <HeaderBackButton onPress={() => onPress()}></HeaderBackButton>
    </View>
  );
};

export default AppHeaderGoBackButton;
