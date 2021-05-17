import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { COLORS } from "../../../../constants";
import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppTextInput from "../../../common/components/forms/text-input.component";
import AppText from "../../../common/components/typography/text.component";

interface AppTextInputWithRightButtonProps {
  allergies: string[];
  addAllergy: Function;
  removeAllergy: Function;
}

/**
 * Component for adding child allergies during caregiver sign up
 *
 * @param param0
 * @returns
 */
const AddChildAllergies = ({
  allergies,
  addAllergy,
  removeAllergy,
}: AppTextInputWithRightButtonProps) => {
  const [value, setValue] = useState("");

  // called when the button inside the input is pressed
  const handleButtonPress = () => {
    if (!value || value.length <= 0) {
      return;
    }

    addAllergy(value);
    setValue("");
  };

  return (
    <View>
      <View style={styles.allergy__input__container}>
        <AppTextInput
          style={styles.text__input}
          value={value}
          onChangeText={(text: string) => setValue(text)}
          onSubmitEditing={(event: any) => setValue(event.nativeEvent.text)}
          placeholder="Type here and click on the add icon"
        />
        <TouchableWithoutFeedback onPress={handleButtonPress}>
          <View style={styles.icon__wrapper}>
            <SvgIcon iconName={SVG_ICONS.ROUND_ADD_BUTTON_ICON} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.allergies__list}>
        {allergies &&
          allergies.length > 0 &&
          allergies.map((allergy, index) => (
            <AllergyTag
              key={index}
              allergy={allergy}
              removeAllergy={removeAllergy}
            />
          ))}
      </View>
    </View>
  );
};

const AllergyTag = ({
  allergy,
  removeAllergy,
}: {
  allergy: string;
  removeAllergy: Function;
}) => {
  return (
    <View style={styles.allergy__tag}>
      <AppText style={styles.allergy__tag__text}>{allergy}</AppText>
      <TouchableWithoutFeedback onPress={() => removeAllergy(allergy)}>
        <View style={styles.allergy__close__area}>
          <AppText style={styles.allergy__close__text}>&times;</AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  allergy__input__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    height: 50,
    borderRadius: 10,
  },

  text__input: {
    borderWidth: 0,
    borderColor: COLORS.TRANSPARENT,
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 10,
  },

  icon__wrapper: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  allergies__list: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },

  allergy__tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.TRANSPARENT,
    backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
    paddingLeft: 10,
  },

  allergy__tag__text: {
    flexDirection: "row",
    marginRight: 20,
    color: COLORS.APP_PRIMARY_COLOR,
  },

  allergy__close__text: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontSize: 25,
  },

  allergy__close__area: {
    paddingRight: 10,
    justifyContent: "center",
  },
});

export default AddChildAllergies;
