import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useToast } from "react-native-fast-toast";
import { View, ScrollView, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

import * as yup from "yup";
import AppButton from "../../common/components/button.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";
import { COLORS } from "../../common/constants";
import { yupResolver } from "@hookform/resolvers/yup";

const ChildInformationschema = yup.object().shape({
  full_name: yup.string().required("Please provide your full name"),
});

const PastMedicalHistoryschema = yup.object().shape({
  role: yup.string().required("Please select a valid role"),
  full_name: yup.string().required("Please provide your full name"),
});

export const ChildInformation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChildInformationschema),
  });

  return (
    <View style={styles.ChildInformationPagecontainer}>
      <View style={styles.ChildInformationPagetitle}>
        <AppText style={styles.ChildInformationPagetext}>
          Adding your child is the first step in ensuring you’re aware of how
          your child is growing and developing.
        </AppText>
      </View>
      <View style={styles.ChildInformationPageform__input__wrapper}>
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
    </View>
  );
};

export const PastMedicalHistory = () => {
  const [selectedRole, setSelectedRole] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const BirthOptions = [
    { label: "Pre-term (28 Weeks - 37 Weeks)", value: "PreTerm" },
    { label: "Term  (37 Weeks - 42 Weeks)", value: "PreTerm" },
    { label: "Post-term (42 Weeks>)", value: "" },
    { label: "Not Sure", value: "" },
  ];

  const BloodGroupOptions = [
    { label: "A", value: "" },
    { label: "B", value: "" },
    { label: "AB", value: "" },
    { label: "O", value: "" },
  ];

  const GenoTypeOptions = [
    { label: "AC", value: "" },
    { label: "SS", value: "" },
    { label: "AS", value: "" },
    { label: "AA", value: "" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PastMedicalHistoryschema),
  });

  return (
    <ScrollView style={styles.PastMedicalHistorycontainer}>
      <AppText style={styles.PastMedicalHistorytext}>
        Your Child's Medical History information
      </AppText>
      <View style={styles.PastMedicalHistoryform__input__wrapper}>
        <ControlledAppDropdownInput
          options={BirthOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"My Child Was Born?"}
        />
        <ControlledAppDropdownInput
          options={BloodGroupOptions}
          name={"role"}
          control={control}
          error={errors.role}
          defaultValue={""}
          label={"Blood Group"}
        />
        <ControlledAppDropdownInput
          options={GenoTypeOptions}
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
    </ScrollView>
  );
};

export const SelectWhatToTrack = () => {
  const [growthChecked, setGrowthChecked] = useState(false);
  const toggleGrowth = useCallback(
    () => setGrowthChecked(!growthChecked),
    [growthChecked, setGrowthChecked]
  );
  const toast: any = useToast();
  const [milestoneChecked, setMilestoneChecked] = useState(false);
  const toggleMilestone = useCallback(
    () => setMilestoneChecked(!milestoneChecked),
    [milestoneChecked, setMilestoneChecked]
  );

  return (
    <ScrollView style={styles.SelectWhatToTrackcontainer}>
      <View style={styles.SelectWhatToTracktextContainer}>
        <AppText style={styles.SelectWhatToTracktext}>
          Select What You Would Like To Track
        </AppText>
      </View>
      <View>
        <CheckBox
          title="My Child Milestones"
          checked={milestoneChecked}
          onPress={toggleMilestone}
        />
      </View>
      <View>
        <CheckBox
          title="My Child's Growth"
          checked={growthChecked}
          onPress={toggleGrowth}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ChildInformationPagecontainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.WHITE,
  },
  ChildInformationPageform__input__wrapper: {
    padding: 20,
    top: -350,
  },
  ChildInformationPagebottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  ChildInformationPagetitle: {},
  ChildInformationPagetext: {
    fontSize: 16,
    width: 327,
    left: 24,
    top: 23,
  },
  ChildInformationPagebutton: {
    marginTop: 10,
  },
  PastMedicalHistorycontainer: {
    flex: 1,
    top: 23,
    backgroundColor: COLORS.WHITE,
  },
  PastMedicalHistoryform__input__wrapper: {
    padding: 20,
  },
  PastMedicalHistorybottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  PastMedicalHistorybutton: {
    marginTop: 10,
  },
  PastMedicalHistorytext: {
    fontSize: 16,
    width: 327,
    left: 20,
    top: 10,
  },
  SelectWhatToTrackcontainer: {
    flex: 1,
    padding: 23,
    backgroundColor: COLORS.WHITE,
  },
  SelectWhatToTrackform__input__wrapper: {
    padding: 30,
  },
  SelectWhatToTrackbottomBar: {
    paddingVertical: 70,
  },
  SelectWhatToTracktext: {
    fontSize: 16,
    width: 327,
    left: 24,
  },
  SelectWhatToTracktextContainer: {
    padding: 30,
    marginBottom: 20,
  },
});
