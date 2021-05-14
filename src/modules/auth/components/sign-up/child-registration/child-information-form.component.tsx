import React from "react";
import { View } from "react-native";

import AppText from "../../../../common/components/typography/text.component";

/**
 * Form used to get child information when adding a child on caregiver signup
 * @returns
 */
const ChildInformationForm = () => {
  return (
    <View>
      <AppText>
        Adding your child is the first step in ensuring you’re aware of how your
        child is growing and developing.
      </AppText>
    </View>
  );
};

export default ChildInformationForm;
