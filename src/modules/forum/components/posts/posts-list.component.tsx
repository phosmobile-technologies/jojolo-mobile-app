import React from "react";
import { FlatList } from "react-native";

import { Post } from "../../../../generated/graphql";
import PostComponent from "./post.component";

const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostComponent post={item} />}
      keyExtractor={(item) => item.uuid}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default PostsList;
