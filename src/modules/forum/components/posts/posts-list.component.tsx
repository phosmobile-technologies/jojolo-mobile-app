import React from "react";
import { FlatList, RefreshControl, View, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

import { Post } from "../../../../generated/graphql";
import AppText from "../../../common/components/typography/text.component";
import PostComponent from "./post.component";

/**
 * Component showing a list of posts
 *
 * @param param0
 * @returns
 */
const PostsList = ({
  posts,
  refreshing = false,
  onRefresh = () => {},
}: {
  posts: Post[];
  refreshing?: boolean;
  onRefresh?: Function;
}) => {
  return !posts || !posts.length ? (
    <>
      <View style={Styles.container}>
        <AppText style={Styles.no__post}>No Posts Available</AppText>
      </View>
    </>
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostComponent post={item} />}
      keyExtractor={(item) => item.uuid}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
    />
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  no__post: {
    marginHorizontal: 50,
    marginVertical: 200,
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "800",
    color: COLORS.APP_GRAY_TEXT,
  },
});

export default PostsList;
