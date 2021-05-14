import React, { useState } from "react";
import { View } from "react-native";
import StepIndicator from "react-native-step-indicator";

import AppText from "../../common/components/typography/text.component";
import { ChildInformation } from "../components/Form.component";

/**
 * Page for adding child information during registration of a care giver
 */
const AddChildScreen = () => {
  const [stepperPosition, setStepperPosition] = useState(0);
  const labels = [
    "Child Information",
    "Past Medical History",
    "Select What To Track",
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  const renderStepIndicator = (position: number, stepStatus: string) => {
    if (position === 0) {
      return <ChildInformation />;
    }
  };

  return (
    <View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={stepperPosition}
        labels={labels}
        stepCount={3}
        onPress={(position) => setStepperPosition(position)}
      />
    </View>
  );
};

export default AddChildScreen;
