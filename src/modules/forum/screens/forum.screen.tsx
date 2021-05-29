import React, { useState, createContext } from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";

import ForumNewsFeedPage from "./forum-news-feed.screen";
import { TagsPage } from "./tags.screen";
import ForumHeader from "../components/forum-header.component";
import {
  COLORS,
  FORUM_POSTS_SORT_OPTIONS,
  NAVIGATION_CONSTANTS,
} from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import MyPostsPage from "./my-posts-screen";
import SavedPostsPage from "./saved-posts.screen";
import { useNavigation } from "@react-navigation/native";
import { PostsSortType } from "../../../generated/graphql";

const ForumPageTabNavigationStack = createMaterialTopTabNavigator();

/**
 * The Main Forum screen which shows all the various forum related tabs like (Feed, My Posts, Saved Posts and tags)
 *
 * @returns
 */
const ForumScreen = () => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const toast: any = useToast();
  const [sortType, setSortType] = useState<PostsSortType>(PostsSortType.Latest);

  // Handle opening of action sheet for sorting posts
  const handleOpenActionSheet = () => {
    const options = ["Latest", "Popular", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        //Filter The Post By The Latest
        if (buttonIndex === 0) {
          setSortType(PostsSortType.Latest);
        }

        // Filter The Post By the Most Popular
        if (buttonIndex === 1) {
          setSortType(PostsSortType.MostPopular);
        }
      }
    );
  };

  return (
    <ForumNavigatorNavigationContext.Provider value={navigation}>
      <View style={styles.container}>
        <ForumHeader handleOpenActionSheet={handleOpenActionSheet} />
        <ForumPageTabNavigationStack.Navigator
          initialRouteName={NAVIGATION_CONSTANTS.SCREENS.FORUM.FEED_SCREEN}
          tabBarOptions={tabBarOptions}
        >
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.FEED_SCREEN}
            children={() => <ForumNewsFeedPage sortType={sortType} />}
          />
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.MY_POSTS_SCREEN}
            component={MyPostsPage}
          />
          <ForumPageTabNavigationStack.Screen
            name={NAVIGATION_CONSTANTS.SCREENS.FORUM.SAVED_POSTS_SCREEN}
            component={SavedPostsPage}
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
