import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useToast } from "react-native-fast-toast";
import { View, ScrollView, StyleSheet } from "react-native";
// import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import SwitchSelector from "react-native-switch-selector";
import CheckBox from "react-native-check-box";

import * as yup from "yup";
import AppButton from "../../common/components/button.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";
import { COLORS } from "../../common/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { NAVIGATION_CONSTANTS } from "../../../constants";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";

const ChildInformationschema = yup.object().shape({
  full_name: yup.string().required("Please provide your full name"),
});

const PastMedicalHistoryschema = yup.object().shape({
  role: yup.string().required("Please select a valid role"),
  full_name: yup.string().required("Please provide your full name"),
});

export const ChildInformation = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChildInformationschema),
  });

  const [gender, setGender] = useState("");

  return (
    <View style={styles.ChildInformationPagecontainer}>
      <View>
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
      <View style={{ marginTop: 19 }}>
        <AppText>Gender</AppText>
        <SwitchSelector
          initial={0}
          onPress={(value) => setGender(value)}
          hasPadding
          options={[
            { label: "Female", value: "f", activeColor: COLORS.PRIMARY_COLOR },
            { label: "Male", value: "m", activeColor: COLORS.PRIMARY_COLOR },
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
          height={60}
          borderRadius={10}
        />
      </View>
    </View>
  );
};

export const PastMedicalHistory = ({ navigation }: { navigation: any }) => {
  const [selectedRole, setSelectedRole] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [checked, setChecked] = useState(false);
  const [needsChecked, setNeedsChecked] = useState(false);
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
        <View>
          <CheckBox
            style={{ flex: 1, padding: 10, marginTop: 20 }}
            onClick={() => {
              setChecked(!checked);
            }}
            isChecked={checked}
            rightText={"Allergies"}
            checkedImage={<SvgIcon iconName={SVG_ICONS.ACTIVE} />}
            unCheckedImage={<SvgIcon iconName={SVG_ICONS.INACTIVE} />}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, marginTop: 10 }}
            onClick={() => {
              setNeedsChecked(!needsChecked);
            }}
            isChecked={!needsChecked}
            rightText={"Special Needs (i.e Mental or Physical Needs)"}
            checkedImage={<SvgIcon iconName={SVG_ICONS.ACTIVE} />}
            unCheckedImage={<SvgIcon iconName={SVG_ICONS.INACTIVE} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export const SelectWhatToTrack = ({ navigation }: { navigation: any }) => {
  const [growthChecked, setGrowthChecked] = useState(false);
  const toast: any = useToast();
  const [milestoneChecked, setMilestoneChecked] = useState(true);
  const [immunizationChecked, setImmunizationChecked] = useState(false);

  return (
    <ScrollView style={styles.SelectWhatToTrackcontainer}>
      <View style={styles.SelectWhatToTracktextContainer}>
        <AppText style={styles.SelectWhatToTracktext}>
          Select What You Would Like To Track
        </AppText>
      </View>
      <View style={styles.CheckBox}>
        <CheckBox
          style={{ flex: 1, padding: 10 }}
          onClick={() => {
            setMilestoneChecked(!milestoneChecked);
          }}
          isChecked={milestoneChecked}
          rightText={"My Child's Milestone"}
          checkedImage={<SvgIcon iconName={SVG_ICONS.ACTIVE} />}
          unCheckedImage={<SvgIcon iconName={SVG_ICONS.INACTIVE} />}
        />
      </View>
      <View style={styles.CheckBox}>
        <CheckBox
          style={{ flex: 1, padding: 10 }}
          onClick={() => {
            setGrowthChecked(!growthChecked);
          }}
          isChecked={growthChecked}
          rightText={"My Child's Growth"}
          checkedImage={<SvgIcon iconName={SVG_ICONS.ACTIVE} />}
          unCheckedImage={<SvgIcon iconName={SVG_ICONS.INACTIVE} />}
        />
      </View>
      <View style={styles.CheckBox}>
        <CheckBox
          style={{ flex: 1, padding: 10 }}
          onClick={() => {
            setImmunizationChecked(!immunizationChecked);
          }}
          isChecked={immunizationChecked}
          rightText={"My Child's Growth"}
          checkedImage={<SvgIcon iconName={SVG_ICONS.ACTIVE} />}
          unCheckedImage={<SvgIcon iconName={SVG_ICONS.INACTIVE} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ChildInformationPagecontainer: {},
  ChildInformationPageform__input__wrapper: {},
  ChildInformationPagebottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  CheckBox: {
    width: 362,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 9,
    right: 2,
    marginTop: 10,
  },
  ChildInformationPagetext: {
    height: 84,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25,
  },
  ChildInformationPagebutton: {
    paddingHorizontal: 10,
  },
  PastMedicalHistorycontainer: {
    top: 23,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
    flex: 1,
  },
  PastMedicalHistoryform__input__wrapper: {
    padding: 20,
  },
  SelectWhatToTrackSignInbutton: {
    top: 450,
    width: 410,
    left: -20,
  },
  SelectWhatToTrackBackbutton: {
    top: 439,
    width: 410,
    left: -20,
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
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
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
    left: 25,
  },
  SelectWhatToTracktextContainer: {
    padding: 30,
    marginBottom: 20,
  },
});
