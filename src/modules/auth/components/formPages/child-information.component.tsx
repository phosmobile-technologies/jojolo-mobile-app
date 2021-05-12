import React from "react";
import * as yup from "yup";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Platform, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ControlledAppDropdownInput from "../../../common/components/forms/controlled-dropdown-input.component";
import ControlledAppTextInput from "../../../common/components/forms/controlled-text-input.component";
import AppText from "../../../common/components/typography/text.component";
import { CheckBox } from "react-native-elements";
import { HealthProfessionalRole } from "../../../common/models/user.model";
import AppButton from "../../../common/components/button.component";
import APP_CONSTANTS, {
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../../constants";

const schema = yup.object().shape({
  full_name: yup.string().required("Please provide your full name"),
});

const ChildInformationPage = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AppText style={styles.text}>
          Adding your child is the first step in ensuring you’re aware of how
          your child is growing and developing.
        </AppText>
      </View>
      <View style={styles.form__input__wrapper}>
        <ControlledAppTextInput
          name={"full_name"}
          label={"Child's first Name"}
          defaultValue={""}
          control={control}
          error={errors.full_name}
        />
        <ControlledAppTextInput
          name={"email_address"}
          label={"Email Address"}
          defaultValue={""}
          control={control}
          error={errors.email_address}
        />
      </View>
      <View style={styles.bottomBar}>
        <AppButton
          title="Next"
          onPress={() => {
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.PAST_MEDICAL_HISTORY
            );
          }}
        />
        <AppButton title="Back to Child Information" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
  form__input__wrapper: {
    padding: 20,
  },
  bottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {},
  text: {
    fontSize: 16,
    width: 327,
    left: 24,
    top: 23,
  },
  button: {
    marginTop: 10,
  },
});

export default ChildInformationPage;
