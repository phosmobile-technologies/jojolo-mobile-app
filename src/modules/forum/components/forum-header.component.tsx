import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useIsFetching } from "react-query";

import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppHeaderText from "../../common/components/typography/header-text.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import AppText from "../../common/components/typography/text.component";

/**
 * The forum page header
 *
 * @returns
 */
export const ForumHeader = ({
  handleOpenActionSheet,
}: {
  handleOpenActionSheet: any;
}) => {
  const navigation = useNavigation();
  const isFetching = useIsFetching();

  return (
    <SafeAreaView style={styles.header}>
      <AppHeaderText>Forum</AppHeaderText>
      <ActivityIndicator
        animating={isFetching ? true : false}
        color={COLORS.APP_PRIMARY_COLOR}
      />

      <View style={styles.header__icons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.FORUM.SEARCH_POSTS_SCREEN
            )
          }
        >
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
