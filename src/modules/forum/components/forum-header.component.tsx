import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppHeaderText from "../../common/components/typography/header-text.component";
import { COLORS } from "../../../constants";

/**
 * The forum page header
 *
 * @returns
 */
export const ForumHeader = ({
  HandleNavigation,
  handleOpenActionSheet,
}: {
  HandleNavigation: any;
  handleOpenActionSheet: any;
}) => {
  return (
    <SafeAreaView style={styles.header}>
      <AppHeaderText>Forum</AppHeaderText>
      <View style={styles.header__icons}>
        <TouchableOpacity onPress={HandleNavigation}>
          <SvgIcon
            style={styles.header__icon}
            iconName={SVG_ICONS.SEARCH_ICON}
            color={COLORS.APP_BLACK_ICON}
          ></SvgIcon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleOpenActionSheet();
          }}
        >
          <SvgIcon
            style={styles.header__icon}
            iconName={SVG_ICONS.FUNNEL_ICON}
            color={COLORS.APP_BLACK_ICON}
          ></SvgIcon>
        </TouchableOpacity>

        <SvgIcon
          style={styles.header__icon}
          iconName={SVG_ICONS.NOTIFICATION_ICON}
          color={COLORS.APP_BLACK_ICON}
        ></SvgIcon>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  header__icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header__icon: {
    paddingHorizontal: 30,
  },
});

export default ForumHeader;
