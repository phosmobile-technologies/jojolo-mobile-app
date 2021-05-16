import React from "react";
import { View, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  APP_CONSTANTS,
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../constants";
import AppActivityIndicator from "../../common/components/activity-indicator.component";
import AppButton from "../../common/components/button.component";
import AppTextInput from "../../common/components/forms/text-input.component";
import Loader from "../../common/components/loader.component";
import AppTextLink from "../../common/components/typography/text-link.component";
import AppText from "../../common/components/typography/text.component";
import { useToast } from "react-native-fast-toast";
import { useForm } from "react-hook-form";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import { AuthenticationContext } from "../../../contexts/authentication.context";

const schema = yup.object().shape({
  username: yup.string().required("Please provide your username"),
  password: yup.string().required("Your password is required"),
});

/**
 * The Sign In page
 *
 * @param props
 * @returns
 */
const SignInScreen = ({ navigation }: { navigation: any }) => {
  const authContext: any = React.useContext(AuthenticationContext);
  const toast: any = useToast();
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Login a user
   *
   * @param param0
   */
  const handleLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsAuthenticating(true);

    // @TODO Replace this with an actual API call
    setTimeout(() => {
      authContext.signIn({ username, password });
    }, APP_CONSTANTS.MOCK_TIME_DELAY_IN_MILLISECONDS);
  };

  // if (isAuthenticating) {
  //   <AppActivityIndicator text={"Signing In..."} />;
  // }

  return (
    <View style={styles.container}>
      <Loader loading={isAuthenticating} />
      <View style={styles.form__input__wrapper}>
        <AppTextLink
          style={styles.header__text}
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_UP_SCREEN
            )
          }
        >
          Sign Up
        </AppTextLink>
        <AppText style={styles.form__header__text}>Log In</AppText>

        <ControlledAppTextInput
          name={"username"}
          label={"Username"}
          defaultValue={""}
          control={control}
          error={errors.username}
        />

        <ControlledAppTextInput
          name={"password"}
          label={"Password"}
          defaultValue={""}
          control={control}
          error={errors.password}
          type={"password"}
          secureTextEntry={true}
        />
        <AppText style={styles.forgot__password__text}>
          Forgot Password ?
        </AppText>
      </View>
      <View style={styles.bottomBar}>
        <AppButton title="Sign In" onPress={handleSubmit(handleLogin)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },

  form__input__wrapper: {
    paddingHorizontal: 30,
  },

  header__text: {
    fontSize: 20,
    alignSelf: "flex-end",
    marginBottom: 40,
    color: COLORS.APP_ORANGE_TEXT,
  },

  form__header__text: {
    fontSize: 30,
    marginBottom: 40,
  },

  forgot__password__text: {
    color: COLORS.APP_PRIMARY_COLOR,
    marginTop: 30,
  },

  bottomBar: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
});

export default SignInScreen;
