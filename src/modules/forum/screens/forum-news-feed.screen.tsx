import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useToast } from "react-native-fast-toast";
import { useQueryClient } from "react-query";

import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import {
  PostsSortType,
  useGetPostsFeedQuery,
  useGetUserSavedPostsQuery,
  Post,
  GetPostsFeedInput,
} from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import { queryClient } from "../../../providers/query-client.context";
import { useAuthenticatedUser } from "../../../providers/user-context";

interface ForumNewsFeedScreenProps {
  sortType: PostsSortType;
}

/**
 * The page for the post's feed in the forum
 *
 * @returns
 */
export const ForumNewsFeedPage = ({ sortType }: ForumNewsFeedScreenProps) => {
  const toast = useToast();
  const navigation: any = useContext(ForumNavigatorNavigationContext);
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Query for getting post's feed
   */
  const { data, error, isLoading, isError } = useGetPostsFeedQuery(
    AppGraphQLClient,
    {
      input: { sortType },
    }
  );

  /**
   * Function for reloading the news feed when the user pulls down to refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    const queryKey = useGetPostsFeedQuery.getKey({
      input: { sortType },
    });
    queryClient.invalidateQueries(queryKey).finally(() => setRefreshing(false));
  };

  if (error) {
    toast?.show("An error occured while loading the posts feed", {
      type: "danger",
    });
  }

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  let posts = data?.GetPostsFeed
    ? (data.GetPostsFeed as Post[])
    : ([] as Post[]);

  return (
    <View style={styles.container}>
      <PostsList posts={posts} refreshing={refreshing} onRefresh={onRefresh} />

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
