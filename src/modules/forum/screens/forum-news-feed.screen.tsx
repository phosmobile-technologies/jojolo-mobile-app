import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useToast } from "react-native-fast-toast";

import PostsList from "../components/posts/posts-list.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import {
  PostsSortType,
  useGetPostsFeedQuery,
  Post,
} from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";

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

  const [posts, setPosts] = useState<Post[]>([]);
  const [lastCursor, setLastCursor] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  /**
   * Get feed of forum posts from the api
   */
  const {
    isLoading,
    isFetching,
    refetch: refetchPostFeed,
  } = useGetPostsFeedQuery(
    AppGraphQLClient,
    {
      input: { sortType },
      paginationArgs: { first: 10, after: lastCursor },
    },
    {
      onError: () => {
        toast?.show("An error occured while loading the posts feed", {
          type: "danger",
        });
      },

      onSuccess: (data) => {
        const {
          GetPostsFeed: {
            page: {
              edges,
              pageInfo: { endCursor, hasNextPage },
            },
          },
        } = data;

        const loadedPosts = edges?.map((edge) => edge.node) as Post[];

        setPosts((posts) => [...posts, ...loadedPosts]);
        setLastCursor(endCursor);
        setHasNextPage(hasNextPage);
      },
    }
  );

  /**
   * Fetch more posts from the api (used for infinite scrolling)
   */
  const fetchMorePosts = () => {
    if (hasNextPage) {
      refetchPostFeed();
    } else {
      toast?.show("There are no more posts to load", {
        type: "normal",
      });
    }
  };

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <PostsList
        posts={posts}
        refreshing={isLoading}
        isFetching={isFetching}
        onRefresh={refetchPostFeed}
        onFetchMorePosts={fetchMorePosts}
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
