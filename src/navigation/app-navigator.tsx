import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ForumScreen from "../modules/forum/screens/forum.screen";
import PrivateChatScreen from "../modules/privateChat/screens/index";
import NAVIGATION_CONSTANTS from "../navigation/navigation-constants";
import { COLORS } from "../modules/common/constants";
import SvgIcon, {
  SVG_ICONS,
} from "../modules/common/components/svg-icon.component";

const AppTabNavigationStack = createBottomTabNavigator();

/**
 * The main tab navigation stack used for the app.
 *
 * @returns
 */
const AppNavigator = () => {
  return (
    <AppTabNavigationStack.Navigator
      initialRouteName={NAVIGATION_CONSTANTS.FORUM}
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
    >
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.FORUM}
        component={ForumScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.PRIVATE_CHAT}
        component={PrivateChatScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.BOOKING}
        component={PrivateChatScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.TRACKER}
        component={PrivateChatScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.ACCOUNT}
        component={PrivateChatScreen}
      />
    </AppTabNavigationStack.Navigator>
  );
};

// Options for styling the bottom tab navigation bar
const tabBarOptions = {
  activeTintColor: COLORS.PRIMARY_COLOR,
  style: {
    color: COLORS.GRAY_TEXT_COLOR,
    height: 85,
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  labelStyle: {
    fontSize: 12,
  },
  iconStyle: {
    marginTop: 10,
  },
};

/**
 * Screen options for the bottom navigation tab bar.
 *
 * @param param0
 * @returns
 */
const screenOptions = ({ route }: { route: object }) => ({
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    let icon, iconColor;

    if (focused) {
      iconColor = COLORS.PRIMARY_COLOR;
    }

    switch (route.name) {
      case NAVIGATION_CONSTANTS.FORUM:
        icon = (
          <SvgIcon iconName={SVG_ICONS.FORUM_ICON} color={iconColor}></SvgIcon>
        );
        break;

      case NAVIGATION_CONSTANTS.PRIVATE_CHAT:
        icon = (
          <SvgIcon
            iconName={SVG_ICONS.PRIVATE_CHAT_ICON}
            color={iconColor}
          ></SvgIcon>
        );
        break;

      default:
        icon = (
          <SvgIcon
            iconName={SVG_ICONS.ACCOUNT_ICON}
            color={iconColor}
          ></SvgIcon>
        );
        break;
    }

    // You can return any component that you like here!
    return icon;
  },
});

export default AppNavigator;
