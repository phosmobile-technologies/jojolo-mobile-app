import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import AppButton from "../../common/components/button.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppTextLink from "../../common/components/typography/text-link.component";
import AppText from "../../common/components/typography/text.component";
import UploadFile from "../../common/components/upload-file.component";

/**
 * Page For Adding A child After Sign Up
 */

const AddChild = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.header__title}>Add Child</AppText>
        <AppTextLink
          style={styles.header__text}
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_UP_SCREEN
            )
          }
        >
          Skip
        </AppTextLink>
      </View>
      <View style={styles.baby__icon}>
        <SvgIcon iconName={SVG_ICONS.BABY_ICON} />
      </View>
      <View style={styles.baby__text}>
        <AppText style={styles.baby__font}>
          Add your child so you can enjoy the benefits of tracking it’s growth
          and development.
        </AppText>
      </View>
      <View style={styles.bottomBar}>
        <AppButton
          title="Add Your Child"
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.CHILD_INFORMATION_PAGE
            )
          }
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
  header__text: {
    fontSize: 26,
    alignSelf: "flex-end",
    color: COLORS.APP_ORANGE_TEXT,
    top: -34,
    right: 10,
  },
  header__title: {
    fontSize: 26,
    alignSelf: "center",
  },
  baby__icon: {
    bottom: 30,
    left: 83,
  },
  baby__text: {
    width: 300,
    bottom: 60,
    left: 60,
  },
  baby__font: {
    fontSize: 16,
  },
  bottomBar: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
});

export default AddChild;
