import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useToast } from "react-native-fast-toast";

import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useGetUserPostsQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { useQueryClient } from "react-query";

/**
 * The user's posts
 *
 * @returns
 */
export const MyPostsPage = () => {
  const toast = useToast();
  const navigation: any = useContext(ForumNavigatorNavigationContext);
  const { authenticatedUser } = useAuthenticatedUser();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  /**
   * Reload the news feed when the user pulls down to refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    const queryKey = useGetUserPostsQuery.getKey({
      input: { user_id: authenticatedUser?.id },
    });
    queryClient.invalidateQueries(queryKey).finally(() => setRefreshing(false));
  };

  /**
   * query for getting post feed
   */
  const { data, error, isLoading, isError } = useGetUserPostsQuery(
    AppGraphQLClient,
    { input: { user_id: authenticatedUser?.id } }
  );

  if (error) {
    toast?.show("An error occured while loading the posts feed");
  }

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <PostsList
        posts={data?.GetUserPosts}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

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

export default MyPostsPage;
