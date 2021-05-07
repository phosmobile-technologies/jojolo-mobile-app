import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "react-native-fast-toast";
import { ScrollView } from "react-native-gesture-handler";

import { HealthProfessionalRole } from "../../common/models/user.model";
import AppButton from "../../common/components/button.component";
import APP_CONSTANTS, {
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../constants";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import Loader from "../../common/components/loader.component";
import ControlledAppNumericInput from "../../common/components/forms/controlled-numeric-input.component";

const schema = yup.object().shape({
  role: yup.string().required("Please select a valid role"),
  full_name: yup.string().required("Please provide your full name"),
  email_address: yup
    .string()
    .email("Please provide a valid email address")
    .required("Your email address is required"),
  phone_number: yup.string().required("Please provide your phone number"),
  years_of_experience: yup
    .number()
    .min(1, "You must have at least 1 year of experience")
    .required("Please provide your years of experience"),
  password: yup.string().required("Your password is required"),
});

/**
 * The health professional signup form
 *
 * @returns
 */
const SignUpHealthProfessional = ({ navigation }: { navigation: any }) => {
  const [selectedRole, setSelectedRole] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const toast: any = useToast();
  const roleOptions = [
    { label: "Dentist", value: HealthProfessionalRole.DENTIST },
    { label: "Dermatologist", value: HealthProfessionalRole.DERMATOLOGIST },
    {
      label: "General Practitioner",
      value: HealthProfessionalRole.GENERAL_PRACTITIONER,
    },
    { label: "Lactationist", value: HealthProfessionalRole.LACTATIONIST },
    { label: "Nutritionist", value: HealthProfessionalRole.NUTRITIONIST },
    { label: "Pedeatrician", value: HealthProfessionalRole.PEDEATRICIAN },
    { label: "Therapist", value: HealthProfessionalRole.THERAPIST },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle the form submit after validation
  const onSubmit = (data: any) => {
    const userInfo = data;

    setIsLoading(true);

    // @TODO Replace this with an actual API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.SIGN_IN_SCREEN);
      toast.show("Your account has been successfully created", {
        type: "success",
      });
    }, APP_CONSTANTS.MOCK_TIME_DELAY_IN_MILLISECONDS);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Loader loading={isLoading} />
      <View style={styles.form__input__wrapper}>
        <ControlledAppTextInput
          name={"full_name"}
          label={"Full Name"}
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
        <ControlledAppTextInput
          name={"phone_number"}
          label={"Phone Number"}
          defaultValue={""}
          control={control}
          error={errors.phone_number}
        />

        <ControlledAppNumericInput
          name={"years_of_experience"}
          control={control}
          error={errors.years_of_experience}
          defaultValue={""}
          label={"Years Of Experience"}
          minValue={0}
        />

        <ControlledAppDropdownInput
          options={roleOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"Role"}
        />
        <ControlledAppTextInput
          name={"password"}
          label={"Password"}
          defaultValue={""}
          type={"password"}
          secureTextEntry={true}
          control={control}
          error={errors.password}
        />
      </View>
      <View style={styles.bottomBar}>
        <AppButton title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
  form__input__wrapper: {},
  bottomBar: {
    paddingVertical: 70,
  },
});

export default SignUpHealthProfessional;
