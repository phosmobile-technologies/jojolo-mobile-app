import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../common/components/typography/app-text.component";
import Comment from "../../models/comment.model";
import CommentHeader from "./comment-header.component";

const postComment = ({ comment }: { comment: Comment }) => {
  const { user } = comment;
  return (
    <View style={styles.container}>
      <CommentHeader user={user} />
      <AppText style={styles.comment}>{comment.content}</AppText>
      <AppText style={styles.reply}>Reply</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    left: 7,
  },
  comment: {
    fontWeight: "200",
  },
  reply: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default postComment;
