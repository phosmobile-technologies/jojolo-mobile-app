import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import AppButton from "../../common/components/button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppTextLink from "../../common/components/typography/text-link.component";
import AppText from "../../common/components/typography/text.component";
import UploadFile from "../../common/components/upload-file.component";
import AppHeaderRightText from "../../common/components/header/app-header-right-text.component";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";

/**
 * Page For choosing whether to add a child or skip during caregiver sign up
 */

const AddChildOrSkipScreen = ({ navigation }: { navigation: any }) => {
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
        <AppHeaderRightText
          text={"Skip"}
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_SCREEN
            )
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.ADD_CHILD_SCREEN
            )
          }
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
