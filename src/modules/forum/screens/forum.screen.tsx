import React from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { useState, createContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ForumNewsFeedPage from "./forum-news-feed.screen";
import { TagsPage } from "./tags.screen";
import ForumHeader from "../components/forum-header.component";
import { COLORS } from "../../common/constants";
import { NAVIGATION_CONSTANTS } from "../../../constants";

const ForumPageTabNavigationStack = createMaterialTopTabNavigator();

// React context used to provide the navigation function to all children of the forum page
export const ForumNavigatorNavigationContext = createContext([]);

/**
 * The Main Forum screen which shows all the various forum related tabs like (Feed, My Posts, Saved Posts and tags)
 *
 * @returns
 */
const ForumScreen = ({ navigation }: { navigation: any }) => {
  //@TODO Replace Feed with actual my posts on all tabs
  const HandleNavigation = () => {
    navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.FORUM.SEARCH_POSTS_SCREEN);
  };
  return (
    <ForumNavigatorNavigationContext.Provider value={navigation}>
      <View style={styles.container}>
        <ForumHeader HandleNavigation={HandleNavigation} />
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
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 4,
    borderRadius: 10,
  },
  activeTintColor: COLORS.PRIMARY_COLOR,
  inactiveTintColor: COLORS.GRAY_TEXT_COLOR,
  pressColor: "transparent",
};

export default ForumScreen;
