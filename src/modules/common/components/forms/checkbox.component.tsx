import React from "react";
import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { COLORS } from "../../../../constants";

/**
 * Checkbox input styled appropriately
 *
 * @param param0
 * @returns
 */
const AppCheckboxInput = ({
  value,
  setValue,
  label,
  textStyle = {},
  ...otherProps
}: {
  value: boolean;
  setValue: Function;
  label: string;
  textStyle?: object;
}) => {
  return (
    <View>
      <BouncyCheckbox
        style={{ marginTop: 16 }}
        isChecked={value}
        text={label}
        disableBuiltInState
        onPress={() => setValue(!value)}
        fillColor={COLORS.APP_TAG_ORANGE}
        textStyle={[
          {
            textDecorationLine: "none",
          },
          textStyle,
        ]}
        {...otherProps}
      />
    </View>
  );
};

export default AppCheckboxInput;
