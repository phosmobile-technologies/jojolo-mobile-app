import React from "react";
import { View, FlatList, Text } from "react-native";

import Post from "../../models/post.model";
import PostComponent from "./post-details.component";

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
