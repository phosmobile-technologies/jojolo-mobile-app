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

/**
 * The Sign In page
 *
 * @param props
 * @returns
 */
const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const authContext: any = React.useContext(AuthContext);

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

  if (isAuthenticating) {
    <AppActivityIndicator text={"Signing In..."} />;
  }

  return (
    <View style={styles.container}>
      <Loader loading={isAuthenticating} />
      <View style={styles.form__input__wrapper}>
        <AppTextLink
          style={styles.header__text}
          onPress={() =>
            navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.SIGN_UP_SCREEN)
          }
        >
          Sign Up
        </AppTextLink>
        <AppText style={styles.form__header__text}>Log In</AppText>
        <AppTextInput
          label="Username"
          value={username}
          style={{ marginBottom: 10 }}
          onChangeText={setUsername}
        />
        <AppTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppText style={styles.forgot__password__text}>
          Forgot Password ?
        </AppText>
      </View>
      <View style={styles.bottomBar}>
        <AppButton
          title="Sign In"
          onPress={() => handleLogin({ username, password })}
        />
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
    // marginTop: 40,
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
