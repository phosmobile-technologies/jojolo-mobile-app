import React from "react";
import { View, Image, StyleSheet } from "react-native";

import PostModel from "../models/post.model";
import Post from "../components/posts/post.component";
import AppText from "../../common/components/typography/app-text.component";

const PostScreen = ({ route }: { route: any }) => {
  const { post }: { post: PostModel } = route.params;
  return (
    <View style={styles.container}>
      <Post
        post={post}
        isFullPage={true}
        allowNavigationToPostDetails={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});

export default PostScreen;
