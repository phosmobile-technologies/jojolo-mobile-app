import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { COLORS, NAVIGATION_CONSTANTS } from "../constants";
import GetDoctorForChatScreen from "../modules/privateChat/screens/get-doctors-for-chat.screen";
import DoctorProfileInPrivateChat from "../modules/privateChat/screens/doctor-profile.screen";
import ChatScreen from "../modules/privateChat/screens/chat.screen";
import BookAConsultationScreen from "../modules/privateChat/screens/book-a-consultation.screen";
import { createContext } from "react";

const PrivateChatStackNav = createStackNavigator();

/**
 * The Navigation Stack for private chat pages
 *
 * @returns
 */
export const PrivateChatNavigator = () => {
  return (
    <PrivateChatStackNav.Navigator screenOptions={PrivateChatStackNavOptions}>
      <PrivateChatStackNav.Screen
        name={
          NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.GET_DOCTOR_FOR_CHAT_SCREEN
        }
        component={GetDoctorForChatScreen}
      ></PrivateChatStackNav.Screen>
      <PrivateChatStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.DOCTOR_PROFILE_SCREEN}
        component={DoctorProfileInPrivateChat}
      ></PrivateChatStackNav.Screen>
      <PrivateChatStackNav.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.CHAT_SCREEN}
        component={ChatScreen}
      ></PrivateChatStackNav.Screen>
      <PrivateChatStackNav.Screen
        name={
          NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.BOOK_A_CONSULTAION_SCREEN
        }
        component={BookAConsultationScreen}
      ></PrivateChatStackNav.Screen>
    </PrivateChatStackNav.Navigator>
  );
};

// Options for the PrivateChatStackNav
const PrivateChatStackNavOptions = {
  headerStyle: {
    elevation: 0,
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
  },
};
