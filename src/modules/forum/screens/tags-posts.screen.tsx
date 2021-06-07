import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, Text, FlatList, View, StyleSheet } from "react-native";
import { Tag } from "react-native-btr";
import { useToast } from "react-native-fast-toast";
import toast from "react-native-fast-toast/lib/typescript/toast";
import { useQueryClient } from "react-query";

import {
  useGetPostsForTagQuery,
  useGetUserPostsQuery,
} from "../../../generated/graphql";
import { ForumNavigatorNavigationContext } from "../../../providers/forum-navigator.context";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import Loader from "../../common/components/loader.component";
import AppText from "../../common/components/typography/text.component";
import PostsList from "../components/posts/posts-list.component";

/**
 * Screen For Rendering Feed Of Posts for a particular tag
 *
 * @returns
 */
const TagsPostScreen = () => {
  const toast = useToast();
  const navigation = useNavigation() as any;
  const route = useRoute() as any;

  const { tag } = route.params;

  /**
   * Hook for customizing navigation header and title for screen.
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

  // Query to get the posts for the selected tag
  const { data, isError, isLoading, error, refetch } = useGetPostsForTagQuery(
    AppGraphQLClient,
    { input: { tag_id: tag.id } },
    {
      onError: () => {
        toast?.show("An error occured while loading the posts feed", {
          type: "danger",
        });
      },
    }
  );

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <PostsList
        posts={data?.GetPostsForTag}
        refreshing={isLoading}
        onRefresh={refetch}
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
