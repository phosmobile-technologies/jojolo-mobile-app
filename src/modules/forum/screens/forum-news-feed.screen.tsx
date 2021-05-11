import React, { useState, useEffect, createContext, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppActivityIndicator from "../../common/components/activity-indicator.component";
import { getNewsFeed } from "../api/posts.api";
import Post from "../models/post.model";
import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { ForumNavigatorNavigationContext } from "../screens/forum.screen";
import { NAVIGATION_CONSTANTS } from "../../../constants";

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
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.CREATE_POST_SCREEN
            );
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
