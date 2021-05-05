import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../common/components/typography/app-text.component";
import Comment from "../../models/comment.model";
import CommentHeader from "./comment-header.component";

const postComment = ({ comment }: { comment: Comment }) => {
  const { user } = comment;
  return (
    <View>
      <CommentHeader user={user} />
      <AppText style={styles.comment}>{comment.content}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    width: 300,
    paddingLeft: 45,
  },
});

export default postComment;
