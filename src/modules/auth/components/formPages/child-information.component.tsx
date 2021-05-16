import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm, useController, FormProvider } from "react-hook-form";
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
import Wizard from "../wizard-component";
import {
  PastMedicalHistory,
  SelectWhatToTrack,
  ChildInformation,
} from "../Form.component";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { useToast } from "react-native-fast-toast";

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

  const toast: any = useToast();

  const methods = useForm({ mode: "onBlur" });
  const { watch } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);

  return (
    <View style={styles.container}>
      <ProgressSteps
        progressBarColor="#FFD3B6"
        completedLabelColor="#2AC769"
        activeLabelColor="#EA6F06"
        activeStepIconBorderColor="#EA6F06"
      >
        <ProgressStep
          label="Child Information"
          nextBtnText="Past Medical History"
          nextBtnStyle={styles.ChildInformationPagebutton}
          nextBtnTextStyle={styles.textWhiteColor}
        >
          <ChildInformation navigation={navigation} />
        </ProgressStep>
        <ProgressStep
          label="Past Medical History"
          nextBtnText="Select What To Track"
          previousBtnText="Back To Child Information"
          previousBtnTextStyle={styles.textGreenColor}
          nextBtnTextStyle={styles.textWhiteColor}
          previousBtnStyle={styles.PastMedicalHistoryPrev}
          nextBtnStyle={styles.PastMedicalHistoryNext}
        >
          <PastMedicalHistory navigation={navigation} />
        </ProgressStep>
        <ProgressStep
          label="Select What To Track"
          finishBtnText="Complete Child Registration"
          previousBtnText="Back To Select What To Track"
          previousBtnTextStyle={styles.textGreenColor}
          nextBtnTextStyle={styles.textWhiteColor}
          previousBtnStyle={styles.PastMedicalHistoryPrev}
          nextBtnStyle={styles.PastMedicalHistoryNext}
          onSubmit={() => {
            toast.show("Your Baby has been successfully Registered", {
              type: "success",
            });
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN
            );
          }}
        >
          <SelectWhatToTrack navigation={navigation} />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  ChildInformationPagecontainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
  ChildInformationPageform__input__wrapper: {
    padding: 20,
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
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 362,
    left: 40,
  },
  PastMedicalHistoryPrev: {
    backgroundColor: COLORS.LIGHT_GREEN,
    right: 40,
    top: -65,
    paddingVertical: 20,
    borderRadius: 10,
    width: 362,
    justifyContent: "center",
    alignItems: "center",
  },
  PastMedicalHistoryNext: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderRadius: 10,
    width: 362,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    left: 40,
  },
  textWhiteColor: {
    color: COLORS.WHITE,
  },
  textGreenColor: {
    color: COLORS.APP_PRIMARY_COLOR,
  },
});

export default ChildInformationPage;
