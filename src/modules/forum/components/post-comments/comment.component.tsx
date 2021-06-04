import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../common/components/typography/text.component";
import CommentHeader from "./comment-header.component";
import ReplyComment from "./reply.component";
import { CommentReplies } from "./comment-replies.component";
import { COLORS } from "../../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PostComment } from "../../../../generated/graphql";

/**
 * Component used to display a single comment in a post
 * @param param0
 * @returns
 */
const postComment = ({
  comment,
  openBottomsheet,
  openCommentRepliesBottomSheet,
  toggleEditCommentBottomSheet,
  toggleEditReplyBottomSheet,
}: {
  comment: PostComment;
  openBottomsheet: Function;
  openCommentRepliesBottomSheet: Function;
  toggleEditCommentBottomSheet: Function;
  toggleEditReplyBottomSheet: Function;
}) => {
  const { user } = comment;
  return (
    <View style={styles.container}>
      <View style={styles.comment__container}>
        <CommentHeader
          user={user}
          comment={comment}
          toggleEditCommentBottomSheet={toggleEditCommentBottomSheet}
        />
        <AppText style={styles.comment}>{comment.content}</AppText>
        <View style={styles.share__and__like__container}>
          <TouchableOpacity
            onPress={() => openCommentRepliesBottomSheet(comment)}
          >
            <AppText style={styles.reply}>Reply</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <CommentReplies
          replies={comment.replies}
          openBottomsheet={openBottomsheet}
          toggleEditReplyBottomSheet={toggleEditReplyBottomSheet}
        />
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
    fontSize: 14,
    color: COLORS.APP_GRAY_TEXT,
  },
  comment__container: {
    marginBottom: 20,
  },
  share__and__like__container: {},
});

export default postComment;
