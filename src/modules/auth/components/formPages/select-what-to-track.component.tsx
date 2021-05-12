import React, { useState, useCallback } from "react";
import { useForm, useController } from "react-hook-form";
import { View, ScrollView, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { boolean } from "yup/lib/locale";
import AppButton from "../../../common/components/button.component";
import { useToast } from "react-native-fast-toast";

import AppText from "../../../common/components/typography/text.component";
import APP_CONSTANTS, {
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../../constants";

const SelectWhatToTrack = ({ navigation }: { navigation: any }) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>
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
      <View style={styles.bottomBar}>
        <AppButton
          title="Next"
          onPress={() => {
            toast.show("Your Baby has been successfully Registered", {
              type: "success",
            });
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    backgroundColor: COLORS.WHITE,
  },
  form__input__wrapper: {
    padding: 30,
  },
  bottomBar: {
    paddingVertical: 70,
  },
  text: {
    fontSize: 16,
    width: 327,
    left: 24,
  },
  textContainer: {
    padding: 30,
    marginBottom: 20,
  },
});

export default SelectWhatToTrack;
