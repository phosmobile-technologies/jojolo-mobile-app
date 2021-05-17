import React from "react";
import { View, StyleSheet } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AppText from "../../../common/components/typography/text.component";
import { APP_STYLES } from "../../../common/styles";
import ControlledAppTextInput from "../../../common/components/forms/controlled-text-input.component";
import ControlledAppDatePickerInput from "../../../common/components/forms/controlled-date-picker-input.component";
import AppButton from "../../../common/components/button.component";
import ControlledAppRadioButtonInput from "../../../common/components/forms/controlled-radio-button-input.component";

const schema = yup.object().shape({
  first_name: yup.string().required("Please provide your child's first name"),
  date_of_birth: yup
    .date()
    .required("Please provide your child's date of birth"),
  gender: yup.string().required("Please indicate your child's gender"),
});

/**
 * Form used to get child information when adding a child on caregiver signup
 *
 * @returns
 */
const AddChildInformationForm = ({
  saveChildInformation,
  setStepperPosition,
  childInformation,
}: {
  saveChildInformation: Function;
  setStepperPosition: Function;
  childInformation: {
    first_name: string;
    date_of_birth: Date | undefined;
    gender: string;
  };
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const genderOptions = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];

  /**
   * Save the child information into the state from the parent screen (containing all the steps in the stepper),
   * and move on to the next step in the stepper. This is only called if the child information form passes validation
   *
   * @param childInformation
   */
  const moveToNextStep = (childInformation: {
    first_name: string;
    date_of_birth: Date;
    gender: string;
  }) => {
    saveChildInformation(childInformation);
    setStepperPosition(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form__wrapper}>
        <AppText style={styles.info__text}>
          Adding your child is the first step in ensuring you’re aware of how
          your child is growing and developing.
        </AppText>
        <View>
          <ControlledAppTextInput
            name={"first_name"}
            label={"Child's first Name"}
            defaultValue={childInformation.first_name}
            control={control}
            error={errors.first_name}
          />

          <ControlledAppDatePickerInput
            name={"date_of_birth"}
            control={control}
            defaultValue={childInformation.date_of_birth}
            label={"Date Of Birth"}
            error={errors.date_of_birth}
          />

          <ControlledAppRadioButtonInput
            name={"gender"}
            label={"Gender"}
            defaultValue={childInformation.gender}
            options={genderOptions}
            control={control}
            error={errors.gender}
          />
        </View>
      </View>

      <View style={APP_STYLES.screen__bottom__bar__button}>
        <AppButton title="Next" onPress={handleSubmit(moveToNextStep)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: "space-between",
  },

  info__text: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 30,
  },

  form__wrapper: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default AddChildInformationForm;
