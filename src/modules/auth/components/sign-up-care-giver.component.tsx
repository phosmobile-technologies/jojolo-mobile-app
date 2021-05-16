import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "react-native-fast-toast";
import { ScrollView } from "react-native-gesture-handler";

import { UserRole } from "../../common/models/user.model";
import AppButton from "../../common/components/button.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import Loader from "../../common/components/loader.component";

const schema = yup.object().shape({
  role: yup.string().required("Please select a valid role"),
  full_name: yup.string().required("Please provide your full name"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Your email address is required"),
  phone_number: yup.string().required("Please provide your phone number"),
  address: yup.string().required("Please provide your address"),
  city: yup.string().required("Please provide your city"),
  state: yup.string().required("Please provide your state"),
  password: yup.string().required("Your password is required"),
});

/**
 * The caregiver signup form
 *
 * @returns
 */
const SignUpCareGiver = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast: any = useToast();
  const roleOptions = [
    { label: "Mother", value: UserRole.MOTHER },
    { label: "Father", value: UserRole.FATHER },
    { label: "Guardian", value: UserRole.GUARDIAN },
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
    navigation.navigate(
      NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_OR_SKIP_SCREEN,
      {
        careGiverInfo: data,
      }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Loader loading={isLoading} />
      <View style={styles.form__input__wrapper}>
        <ControlledAppDropdownInput
          options={roleOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"Which Of These Roles Best Describes You?"}
        />
        <ControlledAppTextInput
          name={"full_name"}
          label={"Full Name"}
          defaultValue={""}
          control={control}
          error={errors.full_name}
        />
        <ControlledAppTextInput
          name={"email"}
          label={"Email Address"}
          defaultValue={""}
          control={control}
          error={errors.email}
        />
        <ControlledAppTextInput
          name={"phone_number"}
          label={"Phone Number"}
          defaultValue={""}
          control={control}
          error={errors.phone_number}
        />
        <ControlledAppTextInput
          name={"state"}
          label={"State"}
          defaultValue={""}
          control={control}
          error={errors.state}
        />
        <ControlledAppTextInput
          name={"city"}
          label={"City"}
          defaultValue={""}
          control={control}
          error={errors.city}
        />
        <ControlledAppTextInput
          name={"address"}
          label={"Address"}
          defaultValue={""}
          control={control}
          error={errors.address}
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
      {/* @TODO Remove this */}
      <View style={styles.bottomBar}>
        <AppButton
          title="Next Page"
          onPress={() => {
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_OR_SKIP_SCREEN
            );
          }}
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
    paddingVertical: 50,
  },
});

export default SignUpCareGiver;
