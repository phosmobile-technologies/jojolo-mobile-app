import React, { useState, createContext } from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";

import ForumNewsFeedPage from "./forum-news-feed.screen";
import { TagsPage } from "./tags.screen";
import ForumHeader from "../components/forum-header.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";

const ForumPageTabNavigationStack = createMaterialTopTabNavigator();

/**
 * The Main Forum screen which shows all the various forum related tabs like (Feed, My Posts, Saved Posts and tags)
 *
 * @returns
 */
const ForumScreen = ({ navigation }: { navigation: any }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  //@TODO Replace Feed with actual my posts on all tabs
  const toast: any = useToast();
  const [action, setAction] = useState("");
  const handleOpenActionSheet = () => {
    const options = ["Latest", "Popular", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          //Filter The Post By The Latest
          toast.show("Latest Posts", { type: "success" });

          setAction(options[buttonIndex]);

          /**
           * Function For Getting Filter Options For Api
           */
          const Action = {
            user_id: "user.id", // This will change when User Authemtication as been carried out and user can be accessed Globally

            action: action,
          };
          console.log(Action);
        }

        if (buttonIndex === 1) {
          // FIlter The Post By the Most Popular
          toast.show("Top Posts", {
            type: "success",
          });

          setAction(options[buttonIndex]);

          /**
           * Function For Getting Filter Options For Api
           */
          const Action = {
            user_id: "user.id", // This will change when User Authemtication as been carried out and user can be accessed Globally

            action: action,
          };
          console.log(Action);
        }
      }
    );
  };

  const HandleNavigation = () => {
    navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.FORUM.SEARCH_POSTS_SCREEN);
  };
  return (
    <ForumNavigatorNavigationContext.Provider value={navigation}>
      <View style={styles.container}>
        <ForumHeader
          HandleNavigation={HandleNavigation}
          handleOpenActionSheet={handleOpenActionSheet}
        />
        <ForumPageTabNavigationStack.Navigator
          initialRouteName={NAVIGATION_CONSTANTS.SCREENS.FORUM.FEED_SCREEN}
          tabBarOptions={tabBarOptions}
        >
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.FEED_SCREEN}
            component={ForumNewsFeedPage}
          />
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.MY_POSTS_SCREEN}
            component={ForumNewsFeedPage}
          />
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.SAVED_POSTS_SCREEN}
            component={ForumNewsFeedPage}
          />
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.TAGS_SCREEN}
            component={TagsPage}
          />
        </ForumPageTabNavigationStack.Navigator>
      </View>
    </ForumNavigatorNavigationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const tabBarOptions = {
  style: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  labelStyle: {
    fontSize: 11,
  },
  indicatorStyle: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    height: 4,
    borderRadius: 10,
  },
  activeTintColor: COLORS.APP_PRIMARY_COLOR,
  inactiveTintColor: COLORS.APP_GRAY_TEXT,
  pressColor: "transparent",
};

export default ForumScreen;
