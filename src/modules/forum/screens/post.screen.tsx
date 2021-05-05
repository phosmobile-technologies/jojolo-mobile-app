import React from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";

import PostModel from "../models/post.model";
import Post from "../components/posts/post.component";
import AppText from "../../common/components/typography/app-text.component";
import { CommentFeed } from "../components/posts/post-comment.component";
import { ScrollView } from "react-native-gesture-handler";

const PostScreen = ({ route }: { route: any }) => {
  const { post }: { post: PostModel } = route.params;
  console.log(post);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Post
            post={post}
            isFullPage={true}
            allowNavigationToPostDetails={false}
          />
          <View>
            <AppText style={styles.text}>Comments(4)</AppText>
          </View>
          <View>
            <CommentFeed />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#ffffff",
          width: 500,
          height: 70,
          top: 20,
          marginLeft: -20,
        }}
      >
        <TextInput style={styles.textInput} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    height: 48,
    margin: 12,
    borderRadius: 10,
    width: 327,
    marginBottom: -12,
    backgroundColor: "#EDEDED",
    left: 10,
  },
  text: {
    fontSize: 19,
    fontWeight: "600",
    padding: 10,
  },
});

export default PostScreen;
