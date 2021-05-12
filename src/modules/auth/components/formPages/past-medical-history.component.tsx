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
  role: yup.string().required("Please select a valid role"),
  full_name: yup.string().required("Please provide your full name"),
});

const PastMedicalHistory = ({ navigation }: { navigation: any }) => {
  const [selectedRole, setSelectedRole] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const roleOptions = [
    { label: "Pedeatrician", value: HealthProfessionalRole.PEDEATRICIAN },
    {
      label: "General Practitioner",
      value: HealthProfessionalRole.GENERAL_PRACTITIONER,
    },
    { label: "Dentist", value: HealthProfessionalRole.DENTIST },
    { label: "Dermatologist", value: HealthProfessionalRole.DERMATOLOGIST },
    { label: "Lactationist", value: HealthProfessionalRole.LACTATIONIST },
    { label: "Therapist", value: HealthProfessionalRole.THERAPIST },
    { label: "Therapist", value: HealthProfessionalRole.NUTRITIONIST },
  ];

  const BirthOptions = {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.text}>
        Your Child's Medical History information
      </AppText>
      <View style={styles.form__input__wrapper}>
        <ControlledAppDropdownInput
          options={roleOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"My Child Was Born?"}
        />
        <ControlledAppDropdownInput
          options={roleOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"Blood Group"}
        />
        <ControlledAppDropdownInput
          options={roleOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"Genotype"}
        />
        <AppText>Background Health Conditions/Challenges</AppText>
        <CheckBox
          title="Allergies"
          checked={false}
          style={{ borderColor: "#FFFFFF" }}
        />
        <CheckBox
          title="Special Needs (i.e Mental or Physical Needs)"
          checked={true}
        />
      </View>
      <View style={styles.bottomBar}>
        <AppButton
          title="Next"
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.SELECT_WHAT_TO_TRACK
            )
          }
        />
        <AppButton
          title="Back to Child Information"
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.CHILD_INFORMATION_PAGE
            )
          }
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
  form__input__wrapper: {
    padding: 20,
  },
  bottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    width: 327,
    left: 20,
    top: 10,
  },
});

export default PastMedicalHistory;
