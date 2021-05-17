import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AppText from "../../../common/components/typography/text.component";
import { APP_STYLES } from "../../../common/styles";
import AppButton from "../../../common/components/button.component";
import { DROPDOWN_OPTIONS } from "../../../../constants";
import ControlledAppDropdownInput from "../../../common/components/forms/controlled-dropdown-input.component";
import AppCheckboxInput from "../../../common/components/forms/checkbox.component";
import AddChildAllergies from "./add-allergies.component";

const schema = yup.object().shape({
  birth_term: yup.string().required("Please provide your child's birth term"),
  blood_group: yup
    .string()
    .required("Please indicate your child's blood group"),
  genotype: yup.string().required("Please indicate your child's genotype"),
});

/**
 * Form used to get child medical history when adding a child on caregiver signup
 *
 * @returns
 */
const AddChildMedicalHistoryForm = ({
  saveChildMedicalInformation,
  setStepperPosition,
  childMedicalHistory,
}: {
  saveChildMedicalInformation: Function;
  setStepperPosition: Function;
  childMedicalHistory: {
    birth_term: string;
    blood_group: string;
    genotype: string;
    has_allergies: boolean;
    has_special_needs: boolean;
    has_medical_conditions: boolean;
    allergies: Array<string>;
  };
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [hasAllergies, setHasAllergies] = useState(
    childMedicalHistory.has_allergies
  );
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(
    childMedicalHistory.has_special_needs
  );
  const [hasMedicalConditions, setHasMedicalConditions] = useState(
    childMedicalHistory.has_medical_conditions
  );
  const [allergies, setAllergies] = useState(
    childMedicalHistory.allergies as Array<string>
  );

  // Called when an allergy is added to the child's list of allergies
  const addAllergy = (allergy: string) => {
    setAllergies([...allergies, allergy]);
  };

  // Called when an allergy is removed from the child's list of allergies
  const removeAllergy = (allergy: string) => {
    const updatedAllergiesList = allergies.filter((item) => item !== allergy);
    setAllergies(updatedAllergiesList);
  };

  /**
   * Save the child information into the state from the parent screen (containing all the steps in the stepper),
   * and move on to the next step in the stepper. This is only called if the child information form passes validation
   *
   * @param childInformation
   */
  const moveToNextStep = (medicalHistory: {
    birth_term: string;
    blood_group: string;
    genotype: string;
  }) => {
    saveChildMedicalInformation({
      ...medicalHistory,
      has_allergies: hasAllergies,
      has_special_needs: hasSpecialNeeds,
      has_medical_conditions: hasMedicalConditions,
      allergies,
    });
    setStepperPosition(2);
  };

  /**
   * Save the child medical history and go back to child information step
   *
   * @param childInformation
   */
  const goBackToChildInformation = () => {
    saveChildMedicalInformation({
      ...getValues(),
      has_allergies: hasAllergies,
      has_special_needs: hasSpecialNeeds,
      has_medical_conditions: hasMedicalConditions,
      allergies,
    });
    setStepperPosition(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form__wrapper}>
        <AppText style={styles.info__text}>
          Your child's medical history information
        </AppText>
        <View>
          <ControlledAppDropdownInput
            name={"birth_term"}
            label={"My Child Was Born?"}
            defaultValue={childMedicalHistory.birth_term}
            options={DROPDOWN_OPTIONS.CHILD_BIRTH_TERM}
            control={control}
            error={errors.birth_term}
          />

          <ControlledAppDropdownInput
            name={"blood_group"}
            label={"Blood Group"}
            defaultValue={childMedicalHistory.blood_group}
            options={DROPDOWN_OPTIONS.BLOOD_GROUP}
            control={control}
            error={errors.blood_group}
          />

          <ControlledAppDropdownInput
            name={"genotype"}
            label={"Genotype"}
            defaultValue={childMedicalHistory.genotype}
            options={DROPDOWN_OPTIONS.GENOTYPE}
            control={control}
            error={errors.genotype}
          />

          <AppText style={styles.background__health__text}>
            Background Health Conditions/Challenges
          </AppText>

          <AppCheckboxInput
            value={hasAllergies}
            setValue={setHasAllergies}
            label={"Allergies"}
          />

          <AppCheckboxInput
            value={hasSpecialNeeds}
            setValue={setHasSpecialNeeds}
            label={"Special Needs (i.e Mental or Physical Needs)"}
          />

          <AppCheckboxInput
            value={hasMedicalConditions}
            setValue={setHasMedicalConditions}
            label={"Medical Conditions (e.g Diabetes, Asthma e.t.c)"}
          />

          {hasAllergies && (
            <View style={styles.allergies__input__wrapper}>
              <AppText
                style={{ fontWeight: "700", fontSize: 16, marginBottom: 5 }}
              >
                Allergies
              </AppText>
              <AddChildAllergies
                allergies={allergies}
                addAllergy={addAllergy}
                removeAllergy={removeAllergy}
              />
            </View>
          )}
        </View>
      </View>

      <View style={APP_STYLES.screen__bottom__bar__button}>
        <AppButton
          style={styles.next__button}
          title="Next"
          onPress={handleSubmit(moveToNextStep)}
        />
        <AppButton
          style={APP_STYLES.app__light__button}
          textStyle={APP_STYLES.app__light__button__text}
          title="Back To Child Information"
          onPress={() => goBackToChildInformation()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    // justifyContent: "space-between",
  },

  info__text: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
  },

  form__wrapper: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 30,
  },

  background__health__text: {
    ...APP_STYLES.form__input__label,
    marginTop: 20,
  },

  next__button: {
    marginBottom: 20,
  },

  allergies__input__wrapper: {
    marginTop: 40,
  },
});

export default AddChildMedicalHistoryForm;
