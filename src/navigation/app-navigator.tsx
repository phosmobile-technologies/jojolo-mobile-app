import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PrivateChatScreen from "../modules/privateChat/screens/get-doctors-for-chat.screen";
import SvgIcon, {
  SVG_ICONS,
} from "../modules/common/components/svg-icon.component";
import ForumNavigator from "./forum-navigator.screen";
import { COLORS, NAVIGATION_CONSTANTS } from "../constants";
import { PrivateChatNavigator } from "./private-chat-stack.navigator";

const AppTabNavigationStack = createBottomTabNavigator();

/**
 * The main tab navigation stack used for the app.
 *
 * @returns
 */
const AppNavigator = () => {
  return (
    <AppTabNavigationStack.Navigator
      initialRouteName={NAVIGATION_CONSTANTS.NAVIGATORS.FORUM_NAVIGATOR}
      screenOptions={screenOptions}
      tabBarOptions={{ ...tabBarOptions }}
    >
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.NAVIGATORS.FORUM_NAVIGATOR}
        component={ForumNavigator}
        options={{}}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.NAVIGATORS.PRIVATE_CHAT_NAVIGATOR}
        component={PrivateChatNavigator}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.BOOKING.BOOKING_SCREEN}
        component={PrivateChatScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.TRACKER.TRACKER_SCREEN}
        component={PrivateChatScreen}
      />
      <AppTabNavigationStack.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.ACCOUNT.ACCOUNT_SCREEN}
        component={PrivateChatScreen}
      />
    </AppTabNavigationStack.Navigator>
  );
};

// Options for styling the bottom tab navigation bar
const tabBarOptions = {
  activeTintColor: COLORS.APP_PRIMARY_COLOR,
  style: {
    color: COLORS.APP_GRAY_TEXT,
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
  keyboardHidesTabBar: true,
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
      iconColor = COLORS.APP_PRIMARY_COLOR;
    }

    switch (route.name) {
      case NAVIGATION_CONSTANTS.NAVIGATORS.FORUM_NAVIGATOR:
        icon = (
          <SvgIcon iconName={SVG_ICONS.FORUM_ICON} color={iconColor}></SvgIcon>
        );
        break;

      case NAVIGATION_CONSTANTS.NAVIGATORS.PRIVATE_CHAT_NAVIGATOR:
        icon = (
          <SvgIcon
            iconName={SVG_ICONS.PRIVATE_CHAT_ICON}
            color={iconColor}
          ></SvgIcon>
        );
        break;

      case NAVIGATION_CONSTANTS.SCREENS.BOOKING.BOOKING_SCREEN:
        icon = (
          <SvgIcon
            iconName={SVG_ICONS.BOOKING_ICON}
            color={iconColor}
          ></SvgIcon>
        );
        break;

      case NAVIGATION_CONSTANTS.SCREENS.TRACKER.TRACKER_SCREEN:
        icon = (
          <SvgIcon
            iconName={SVG_ICONS.TRACKER_ICON}
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
