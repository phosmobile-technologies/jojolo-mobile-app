import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { COLORS, NAVIGATION_CONSTANTS } from "../constants";
import SignInScreen from "../modules/auth/screens/sign-in.screen";
import SignUpScreen from "../modules/auth/screens/sign-up.screen";

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
        name={NAVIGATION_CONSTANTS.SCREENS.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={SignInScreenOptions}
      ></AuthenticationStackNav.Screen>
      <AuthenticationStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={SignUpScreenOptions}
      ></AuthenticationStackNav.Screen>
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
