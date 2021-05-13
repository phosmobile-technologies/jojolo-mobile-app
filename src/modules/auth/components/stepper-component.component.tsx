import React from "react";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  PastMedicalHistory,
  SelectWhatToTrack,
  ChildInformation,
} from "../components/Form.component";
import AppButton from "../../common/components/button.component";
import AppText from "../../common/components/typography/text.component";

function getSteps() {
  return ["PastMedicalHistory", "SelectWhatToTrack", "ChildInformation"];
}

const getStepContent = (step: number, formContent: any) => {
  switch (step) {
    case 0:
      return <PastMedicalHistory {...{ formContent }} />;
    case 1:
      return <SelectWhatToTrack {...{ formContent }} />;
    case 2:
      return <ChildInformation {...{ formContent }} />;
    default:
      return "Unknown step";
  }
};

export const FormStepper = () => {
  const { watch } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [compiledForm, setCompiledForm] = React.useState({});
  const steps = getSteps();
  const form = watch();

  const handleNext = () => {
    let canContinue: any = true;

    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, PastMedicalHistory: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, SelectWhatToTrack: form });
        canContinue = true;
        break;
      case 2:
        setCompiledForm({ ...compiledForm, ChildInformation: form });
        canContinue = handleSubmit({ ...compiledForm, three: form });
        break;
      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, two: form });
          break;
        case 2:
          setCompiledForm({ ...compiledForm, three: form });
          break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompiledForm({});
  };

  const handleSubmit = (form: any) => {
    console.log("submit", form);
  };

  return (
    <View>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <AppText>{label}</AppText>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <View>
        {activeStep === steps.length ? (
          <View>
            <>
              <AppText> Completed</AppText>
              <AppButton title="Next" onClick={handleReset} />
            </>
          </View>
        ) : (
          <View>
            {getStepContent(activeStep, compiledForm)}
            <View>
              <AppButton onPress={handleBack} />
              <AppButton
                title={activeStep === steps.length - 1 ? "Finish" : "Next"}
                onClick={handleNext}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
