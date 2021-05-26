import React from "react";
import { FlatList, RefreshControl } from "react-native";

import { Post } from "../../../../generated/graphql";
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
  return (
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

export default PostsList;
