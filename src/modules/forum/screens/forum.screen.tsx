import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { useState, createContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import NAVIGATION_CONSTANTS from "../../../navigation/navigation-constants";
import ForumNewsFeedPage from "./forum-news-feed.screen";
import { MyPostsPage } from "./my-posts-screen";
import { SavedPostsPage } from "./saved-posts.screen";
import { TagsPage } from "./tags.screen";
import ForumHeader from "../components/forum-header.component";
import { COLORS } from "../../common/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../../common/components/typography/text.component";

const ForumPageTabNavigationStack = createMaterialTopTabNavigator();

// React context used to provide the navigation function to all children of the forum page
export const ForumNavigatorNavigationContext = createContext([]);

const navigation: any = useContext(ForumNavigatorNavigationContext);

const RenderFilter = () => {
  return (
    <View style={styles.renderFilter}>
      <TouchableOpacity style={styles.latest}>
        <AppText style={styles.text}>Latest</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.popular}>
        <AppText style={styles.text}>Popular</AppText>
      </TouchableOpacity>
    </View>
  );
};

/**
 * The Main Forum screen which shows all the various forum related tabs like (Feed, My Posts, Saved Posts and tags)
 *
 * @returns
 */
const ForumScreen = ({ navigation }: { navigation: any }) => {
  //@TODO Replace Feed with actual my posts on all tabs
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handleSearchPage = () => {
    navigation.navigate(NAVIGATION_CONSTANTS.NEW_POST);
  };

  // variables
  const snapPoints = React.useMemo(() => ["5%", "16%"], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <ForumNavigatorNavigationContext.Provider value={navigation}>
        <View style={styles.container}>
          <ForumHeader HandlePresentModalPress={handlePresentModalPress} />
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <RenderFilter />
          </BottomSheetModal>
        </View>
      </ForumNavigatorNavigationContext.Provider>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderFilter: {
    padding: 30,
  },
  latest: {
    padding: 10,
    top: -20,
  },
  popular: {
    padding: 10,
  },
  text: {
    fontSize: 25,
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
