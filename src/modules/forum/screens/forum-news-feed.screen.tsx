import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useToast } from "react-native-fast-toast";
import { useQueryClient } from "react-query";

import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useGetPostsFeedQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import { queryClient } from "../../../providers/query-client.context";

/**
 * The forum news feed page
 *
 * @returns
 */
export const ForumNewsFeedPage = () => {
  const toast = useToast();
  const navigation: any = useContext(ForumNavigatorNavigationContext);
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  /**
   * query for getting post feed
   */
  const { data, error, isLoading, isError } =
    useGetPostsFeedQuery(AppGraphQLClient);

  /**
   * Reload the news feed when the user pulls down to refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    const queryKey = useGetPostsFeedQuery.getKey();
    queryClient.invalidateQueries(queryKey).finally(() => setRefreshing(false));
  };

  if (error) {
    toast?.show("An error occured while loading the posts feed");
  }

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <PostsList
        posts={data?.GetPostsFeed}
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

export default ForumNewsFeedPage;
