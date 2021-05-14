import React from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";

import { AuthContext } from "../../../../App";
import APP_CONSTANTS, {
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../constants";
import AppActivityIndicator from "../../common/components/activity-indicator.component";
import AppButton from "../../common/components/button.component";
import AppTextInput from "../../common/components/forms/text-input.component";
import Loader from "../../common/components/loader.component";
import AppTextLink from "../../common/components/typography/text-link.component";
import AppText from "../../common/components/typography/text.component";
import { UserRole } from "../../common/models/user.model";
import InPageTabs from "../../common/components/in-page-tabs.component";
import { SceneMap } from "react-native-tab-view";
import SignUpCareGiver from "../components/sign-up/sign-up-care-giver.component";
import SignUpHealthProfessional from "../components/sign-up/sign-up-health-professional.component";

interface HealthProfessionalSignUpInfo {
  full_name: string;
  email_address: string;
  phone_number: string;
  role: HealthProfessionalSignUpInfo;
  years_of_experience: number;
  password: string;
}

/**
 * The Sign Up page
 *
 * @param props
 * @returns
 */
const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const tabRoutes = [
    { key: "caregivers", title: "Caregivers" },
    { key: "healthprofessionals", title: "Health Professionals" },
  ];

  const sceneMap = {
    caregivers: SignUpCareGiver,
    healthprofessionals: SignUpHealthProfessional,
  };

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "caregivers":
        return <SignUpCareGiver navigation={navigation} />;
      case "healthprofessionals":
        return <SignUpHealthProfessional navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form__input__wrapper}>
        {/* <AppTextLink
          style={styles.header__text}
          onPress={() =>
            navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.SIGN_IN_SCREEN)
          }
        >
          Sign In
        </AppTextLink> */}
        <AppText style={styles.form__header__text}>Create an Account</AppText>
        <View style={{ flex: 1 }}>
          <InPageTabs tabRoutes={tabRoutes} sceneMap={renderScene} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },

  form__input__wrapper: {
    flex: 1,
    paddingHorizontal: 30,
  },

  header__text: {
    fontSize: 20,
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 40,
    color: COLORS.APP_ORANGE_TEXT,
  },

  form__header__text: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 40,
  },
});

export default SignUpScreen;
