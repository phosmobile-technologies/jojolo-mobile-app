import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../common/components/typography/text.component";
import Comment from "../../models/comment.model";
import CommentHeader from "./comment-header.component";
import ReplyComment from "./reply.component";
import { ReplyFeed } from "./comment-reply.component";
import { COLORS } from "../../../../constants";

const postComment = ({
  comment,
  openBottomsheet,
}: {
  comment: Comment;
  openBottomsheet: any;
}) => {
  const { user } = comment;
  return (
    <View style={styles.container}>
      <View style={styles.comment__container}>
        <CommentHeader user={user} />
        <AppText style={styles.comment}>{comment.content}</AppText>
        <View style={styles.share__and__like__container}>
          <AppText style={styles.reply}>Reply</AppText>
        </View>
      </View>
      <View>
        <ReplyFeed openBottomsheet={openBottomsheet} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    left: 1,
  },
  comment: {
    fontWeight: "200",
  },
  reply: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 19,
    color: COLORS.APP_GRAY_TEXT,
  },
  comment__container: {
    marginBottom: 20,
  },
  share__and__like__container: {},
});

export default postComment;
