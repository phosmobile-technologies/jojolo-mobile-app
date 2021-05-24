import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as yup from "yup";

import { APP_STYLES } from "../../../common/styles";
import AppButton from "../../../common/components/button.component";
import { COLORS } from "../../../../constants";
import AppCheckboxInput from "../../../common/components/forms/checkbox.component";

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
const AddChildDataToTrackForm = ({
  childDataToTrack,
  saveChildDataToTrack,
  setStepperPosition,
  completeChildRegistration,
}: {
  saveChildDataToTrack: Function;
  setStepperPosition: Function;
  completeChildRegistration: Function;
  childDataToTrack: {
    milestones: boolean;
    growth: boolean;
    immunizations: boolean;
  };
}) => {
  const [trackMilestones, setTrackMilestones] = useState(
    childDataToTrack.immunizations
  );
  const [trackGrowth, setTrackGrowth] = useState(childDataToTrack.growth);
  const [trackImmunizations, setTrackImmunizations] = useState(
    childDataToTrack.immunizations
  );

  /**
   * Save the child data to track and go back to child medical history
   *
   * @param childInformation
   */
  const goBackToChildMedicalHistory = () => {
    saveChildDataToTrack({
      milestones: trackMilestones,
      growth: trackGrowth,
      immunizations: trackImmunizations,
    });
    setStepperPosition(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form__wrapper}>
        <View>
          <View style={styles.checkbox__container}>
            <AppCheckboxInput
              value={trackMilestones}
              setValue={setTrackMilestones}
              label={"My Child's Milestones"}
              textStyle={styles.checkbox__text}
            />
          </View>

          <View style={styles.checkbox__container}>
            <AppCheckboxInput
              value={trackGrowth}
              setValue={setTrackGrowth}
              label={"My Child's Growth"}
              textStyle={styles.checkbox__text}
            />
          </View>

          <View style={styles.checkbox__container}>
            <AppCheckboxInput
              value={trackImmunizations}
              setValue={setTrackImmunizations}
              label={"My Child's Immunizations"}
              textStyle={styles.checkbox__text}
            />
          </View>
        </View>
      </View>

      <View style={[APP_STYLES.screen__bottom__bar__button]}>
        <AppButton
          style={styles.next__button}
          title="Complete Child Registration"
          onPress={() => completeChildRegistration()}
        />
        <AppButton
          style={APP_STYLES.app__light__button}
          textStyle={APP_STYLES.app__light__button__text}
          title="Back To Past Medical History"
          onPress={() => goBackToChildMedicalHistory()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "space-between",
  },

  form__wrapper: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 30,
  },

  next__button: {
    marginBottom: 20,
  },

  checkbox__container: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.TRANSPARENT,
    backgroundColor: COLORS.APP_LIGHT_GRAY_BACKGROUND,
  },

  checkbox__text: {
    fontWeight: "700",
    color: COLORS.APP_BLACK_TEXT,
  },
});

export default AddChildDataToTrackForm;
