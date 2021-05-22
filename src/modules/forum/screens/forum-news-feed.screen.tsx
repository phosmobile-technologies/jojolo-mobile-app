import React, { useState, useEffect, createContext, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppActivityIndicator from "../../common/components/activity-indicator.component";
import { getNewsFeed } from "../api/posts.api";
import Post from "../models/post.model";
import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useGetPostsFeedQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import { useToast } from "react-native-fast-toast";

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
  const toast = useToast();
  const navigation: any = useContext(ForumNavigatorNavigationContext);

  /**
   * query for getting post feed
   */
  const { data, error, isLoading, isError } =
    useGetPostsFeedQuery(AppGraphQLClient);

  if (error) {
    toast?.show("An error occured while loading the posts feed");
  }

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <PostsList posts={data?.GetPostsFeed} />
      <View style={styles.touchableOpacityStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.FORUM.CREATE_POST_SCREEN
            );
          }}
        >
          <SvgIcon iconName={SVG_ICONS.POST_ICON} />
        </TouchableOpacity>
      </View>
    </View>
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
