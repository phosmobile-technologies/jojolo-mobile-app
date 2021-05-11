import { isLoading } from "expo-font";
import React, { useState, useEffect, createContext, useContext } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";
import AppActivityIndicator from "../../common/components/activity-indicator.component";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppText from "../../common/components/typography/text.component";
import { getNewsFeed } from "../api/posts.api";
import Post from "../models/post.model";
import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS } from "../../common/constants";
import NAVIGATION_CONSTANTS from "../../../navigation/navigation-constants";
import { ForumNavigatorNavigationContext } from "../screens/forum.screen";

interface StateShape {
  isLoading: boolean;
  loadingError: boolean;
  posts: Post[];
}

/**
 * The forum news feed page
 *
 * @returns
 */
export const ForumNewsFeedPage = () => {
  const [state, setState] = useState<StateShape>({
    isLoading: true,
    loadingError: false,
    posts: [],
  });

  const navigation: any = useContext(ForumNavigatorNavigationContext);

  /**
   * Get the posts from the API
   */
  const fetchNewsFeed = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    try {
      const posts = await getNewsFeed();
      setState({
        ...state,
        posts,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        loadingError: true,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  if (state.isLoading) {
    return <AppActivityIndicator text={"Loading News Feed ..."} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PostsList posts={state.posts} />
      <View style={styles.touchableOpacityStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NAVIGATION_CONSTANTS.NEW_POST);
          }}
        >
          <SvgIcon iconName={SVG_ICONS.POST_ICON} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const HeightProportions = "85%";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    top: HeightProportions,
  },
});

export default ForumNewsFeedPage;
