import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { COLORS, NAVIGATION_CONSTANTS } from "../constants";
import SignInScreen from "../modules/auth/screens/sign-in.screen";
import SignUpScreen from "../modules/auth/screens/sign-up.screen";
import UploadMedicalLicense from "../modules/auth/components/sign-up/upload-medical-license.component";
import UploadValidIdCard from "../modules/auth/components/sign-up/upload-valid-id-card.component";
import AddChild from "../modules/auth/components/add-child.component";
import ChildInformationPage from "../modules/auth/components/formPages/child-information.component";
import PastMedicalHistory from "../modules/auth/components/formPages/past-medical-history.component";
import SelectWhatToTrack from "../modules/auth/components/formPages/select-what-to-track.component";
import AddChildOrSkip from "../modules/auth/screens/add-child-or-skip.screen";
import AddChildOrSkipScreen from "../modules/auth/screens/add-child-or-skip.screen";
import AppTextLink from "../modules/common/components/typography/text-link.component";
import AddChildScreen from "../modules/auth/screens/add-child.screen";

const AuthenticationStackNav = createStackNavigator();

/**
 * The Navigation Stack for authentication pages
 *
 * @returns
 */
export const AuthenticationStack = () => {
  return (
    <AuthenticationStackNav.Navigator
      screenOptions={AuthenticationStackNavOptions}
    >
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={SignInScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={SignUpScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.UPLOAD_MEDICAL_LICENSE_SCREEN}
        component={UploadMedicalLicense}
        options={UploadMedicalLicenseScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.UPLOAD_VALID_ID_CARD_SCREEN}
        component={UploadValidIdCard}
        options={UploadValidIdCardScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_OR_SKIP_SCREEN}
        component={AddChildOrSkipScreen}
        options={AddChildOrSkipScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_SCREEN}
        component={AddChildScreen}
        options={AddChildScreenOptions}
      ></AuthenticationStackNav.Screen>
      {/* <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD}
        component={AddChild}
        options={AddChildOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.CHILD_INFORMATION_PAGE}
        component={ChildInformationPage}
        options={AddChildOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.PAST_MEDICAL_HISTORY}
        component={PastMedicalHistory}
        options={AddChildOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.AUTH.SELECT_WHAT_TO_TRACK}
        component={SelectWhatToTrack}
        options={AddChildOptions}
      ></AuthenticationStackNav.Screen> */}
    </AuthenticationStackNav.Navigator>
  );
};

// Options for the AuthenticationStackNav
const AuthenticationStackNavOptions = {
  headerStyle: {
    elevation: 0,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
};

// Options for the sign in screen
const SignInScreenOptions = {
  title: "",
};

// Options for the sign up screen
const SignUpScreenOptions = {
  title: "",
};

// Options for uploading medical license
const UploadMedicalLicenseScreenOptions = {
  title: "Upload Medical License",
};

// Options for uploading valid ID card
const UploadValidIdCardScreenOptions = {
  title: "Upload Valid ID Card",
};

// Options for the add child or skip screen
const AddChildOrSkipScreenOptions = {
  title: "",
  headerTintColor: COLORS.APP_PRIMARY_COLOR,
};

// Options for the add child screen
const AddChildScreenOptions = {
  title: "",
  headerTintColor: COLORS.APP_PRIMARY_COLOR,
};
