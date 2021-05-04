import React from "react";
import { View, Image, StyleSheet } from "react-native";

import PostModel from "../models/post.model";
import Post from "../components/posts/post.component";

const PostScreen = ({ route }: { route: any }) => {
  const { post }: { post: PostModel } = route.params;
  console.log(post);
  return (
    <View style={styles.container}>
      <Post post={post} isFullPage={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default PostScreen;
