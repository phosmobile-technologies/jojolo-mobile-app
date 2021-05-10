import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NAVIGATION_CONSTANTS from "./navigation-constants";
import ForumScreen from "../modules/forum/screens/forum.screen";
import PostScreen from "../modules/forum/screens/post.screen";
import NewPostScreen from "../modules/forum/screens/new-post.screen";

const ForumStackNavigator = createStackNavigator();

/**
 * Navigator for the entire forum module, seperating the tabs (feeds, my posts e.t.c) from other
 * none tab based pages in the forum module (i.e post screen)
 * @returns
 */
const ForumNavigator = () => {
  return (
    <ForumStackNavigator.Navigator screenOptions={screenOptions}>
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.FORUM_NAVIGATOR}
        component={ForumScreen}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.POST}
        component={PostScreen}
        options={postScreenOptions}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.NEW_POST}
        component={NewPostScreen}
        options={postScreenOptions}
      />
    </ForumStackNavigator.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
};

const postScreenOptions = {
  headerShown: true,
};

export default ForumNavigator;
