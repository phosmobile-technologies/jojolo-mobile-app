import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, Text, FlatList, View, StyleSheet } from "react-native";
import { Tag } from "react-native-btr";
import { useToast } from "react-native-fast-toast";
import toast from "react-native-fast-toast/lib/typescript/toast";
import { useQueryClient } from "react-query";

import { useGetUserPostsQuery } from "../../../generated/graphql";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import Loader from "../../common/components/loader.component";
import AppText from "../../common/components/typography/text.component";
import PostsList from "../components/posts/posts-list.component";

/**
 * Screen For Rendering Feed Of Posts By Tag
 *
 * @returns
 */
const TagsPostScreen = () => {
  const toast = useToast();
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { tag } = route.params;
  const { authenticatedUser } = useAuthenticatedUser();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  /**
   * For Now I lifted The Query For Displaying
   * User's Post Until the Query for Getting Tags post is ready
   *
   */

  /**
   *
   * Hook for customizing navigation header and title for chat sreen.
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <>
          <View style={styles.header}>
            <AppText style={styles.header__title}>{tag.name}</AppText>
          </View>
        </>
      ),
      headerRight: () => <></>,
    });
  }, [navigation]);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  header__title: {
    fontSize: 19,
    alignItems: "center",
    alignContent: "center",
  },
});

export default TagsPostScreen;
