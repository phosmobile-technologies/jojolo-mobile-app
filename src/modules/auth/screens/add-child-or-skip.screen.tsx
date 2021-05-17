import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import AppButton from "../../common/components/button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppText from "../../common/components/typography/text.component";
import AppHeaderRightText from "../../common/components/header/app-header-right-text.component";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import { APP_STYLES } from "../../common/styles";
import { useToast } from "react-native-fast-toast";
import Loader from "../../common/components/loader.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CreateCareGiverInput,
  useSignUpCareGiverMutation,
} from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";

/**
 * Page For choosing whether to add a child or skip during caregiver sign up
 */

const AddChildOrSkipScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const toast: any = useToast();

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={"Add Child"} />,
      headerRight: () => (
        <AppHeaderRightText text={"Skip"} onPress={skipChildRegistration} />
      ),
      headerStyle: { ...APP_STYLES.base__header__styles },
    });
  }, [navigation]);

  const { mutate, isLoading } = useSignUpCareGiverMutation(AppGraphQLClient, {
    onSuccess: () => {
      toast.show("Your account has been successfully created", {
        type: "success",
      });
      navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN);
    },

    onError: () => {
      toast.show(
        "An error occured while creating your account. Please try again later",
        {
          type: "error",
        }
      );
    },

    onMutate: () => {},
  });

  /**
   * Skip child registration and signup the caregiver
   */
  const skipChildRegistration = () => {
    const careGiverInfo: CreateCareGiverInput = route.params.careGiverInfo;
    mutate({
      input: {
        ...careGiverInfo,
        country: "Nigeria", // @TODO Remove this when the country dropdown is added
      },
    });
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      {/* Icon and Text paragraph */}
      <View style={styles.baby__icon__and__text_wrapper}>
        <SvgIcon iconName={SVG_ICONS.BABY_ICON} />
        <AppText style={styles.baby__text}>
          Add your child so you can enjoy the benefits of tracking it’s growth
          and development.
        </AppText>
      </View>

      <View style={styles.bottomBar}>
        <AppButton
          title="Add Your Child"
          onPress={() => {
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_SCREEN,
              {
                careGiverInfo: route.params.careGiverInfo,
              }
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    justifyContent: "space-between",
  },

  baby__icon__and__text_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  baby__text: {
    fontSize: 16,
    lineHeight: 25,
    marginTop: 50,
    textAlign: "center",
  },

  bottomBar: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
});

export default AddChildOrSkipScreen;
