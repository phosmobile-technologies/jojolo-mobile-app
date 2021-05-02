import React from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NAVIGATION_CONSTANTS from "../../../navigation/navigation-constants";
import ForumNewsFeedPage from "./forum-news-feed.screen";
import { MyPostsPage } from "./my-posts-screen";
import { SavedPostsPage } from "./saved-posts.screen";
import { TagsPage } from "./tags.screen";
import ForumHeader from "../components/forum-header.component";
import { COLORS } from "../../common/constants";

const ForumPageTabNavigationStack = createMaterialTopTabNavigator();

/**
 * The Main Forum screen which shows all the various forum related tabs like (Feed, My Posts, Saved Posts and tags)
 *
 * @returns
 */
const ForumScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ForumHeader />
      <ForumPageTabNavigationStack.Navigator
        initialRouteName={NAVIGATION_CONSTANTS.FEED}
        tabBarOptions={tabBarOptions}
      >
        <ForumPageTabNavigationStack.Screen
          name={NAVIGATION_CONSTANTS.FEED}
          component={ForumNewsFeedPage}
        />
        <ForumPageTabNavigationStack.Screen
          name={NAVIGATION_CONSTANTS.MY_POSTS}
          component={MyPostsPage}
        />
        <ForumPageTabNavigationStack.Screen
          name={NAVIGATION_CONSTANTS.SAVED_POSTS}
          component={SavedPostsPage}
        />
        <ForumPageTabNavigationStack.Screen
          name={NAVIGATION_CONSTANTS.TAGS}
          component={TagsPage}
        />
      </ForumPageTabNavigationStack.Navigator>
    </View>
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
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 4,
    borderRadius: 10,
  },
  activeTintColor: COLORS.PRIMARY_COLOR,
  inactiveTintColor: COLORS.GRAY_TEXT_COLOR,
  pressColor: "transparent",
};

export default ForumScreen;
