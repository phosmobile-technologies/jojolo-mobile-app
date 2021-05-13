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
import { FormStepper } from "../stepper-component.component";
import Wizard from "../wizard-component";
import {
  PastMedicalHistory,
  SelectWhatToTrack,
  ChildInformation,
} from "../Form.component";

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

  const methods = useForm({ mode: "onBlur" });
  const { watch } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);

  return (
    <View style={styles.container}>
      <Wizard>
        <Wizard.Step>
          <ChildInformation />
        </Wizard.Step>
        <Wizard.Step>
          <PastMedicalHistory />
        </Wizard.Step>
        <Wizard.Step>
          <SelectWhatToTrack />
        </Wizard.Step>
      </Wizard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10,
  },
});

export default ChildInformationPage;
