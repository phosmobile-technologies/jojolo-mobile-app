import { isLoading } from "expo-font";
import React, { useState, useEffect, createContext } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import AppActivityIndicator from "../../common/components/activity-indicator.component";

import AppText from "../../common/components/typography/text.component";
import { getNewsFeed } from "../api/posts.api";
import Post from "../models/post.model";
import PostsList from "../components/posts/posts-list.component";

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

export default ForumNewsFeedPage;
