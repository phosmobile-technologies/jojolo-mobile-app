import React, { useState, useEffect, createContext, useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FloatingAction } from "react-native-floating-action";
import { useToast } from "react-native-fast-toast";

import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useGetPostsFeedQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";

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

      <FloatingAction
        color={COLORS.APP_PRIMARY_COLOR}
        floatingIcon={<SvgIcon iconName={SVG_ICONS.POST_ICON} />}
        buttonSize={60}
        showBackground={false}
        onPressMain={() => {
          navigation.navigate(
            NAVIGATION_CONSTANTS.SCREENS.FORUM.CREATE_POST_SCREEN
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

export default ForumNewsFeedPage;
