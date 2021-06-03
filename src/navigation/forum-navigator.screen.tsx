import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ForumScreen from "../modules/forum/screens/forum.screen";
import PostScreen from "../modules/forum/screens/post-details.screen";
import NewPostScreen from "../modules/forum/screens/create-post.screen";
import SearchPostsScreen from "../modules/forum/screens/search-screen.component";
import EditPostScreen from "../modules/forum/screens/edit-post.screen";
import { NAVIGATION_CONSTANTS } from "../constants";

const ForumStackNavigator = createStackNavigator();

/**
 * Navigator for the entire forum module, seperating the tabs (feeds, my posts e.t.c) from other
 * none tab based pages in the forum module (i.e post screen)
 * @returns
 */
const ForumNavigator = () => {
  return (
    <ForumStackNavigator.Navigator
      screenOptions={forumStackNavigatorScreenOptions}
    >
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.NAVIGATORS.FORUM_NAVIGATOR}
        component={ForumScreen}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.FORUM.POST_DETAILS_SCREEN}
        component={PostScreen}
        options={{ ...showHeaderOption }}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.FORUM.CREATE_POST_SCREEN}
        component={NewPostScreen}
        options={{ ...showHeaderOption }}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.FORUM.EDIT_POST_SCREEN}
        component={EditPostScreen}
        options={{ ...showHeaderOption }}
      />
      <ForumStackNavigator.Screen
        name={NAVIGATION_CONSTANTS.SCREENS.FORUM.SEARCH_POSTS_SCREEN}
        component={SearchPostsScreen}
        options={{ ...showHeaderOption }}
      />
    </ForumStackNavigator.Navigator>
  );
};

const showHeaderOption = {
  headerShown: true,
};

const forumStackNavigatorScreenOptions = {
  headerShown: false,
};

export default ForumNavigator;
