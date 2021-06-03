import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { PostCommentReply } from "../../../../generated/graphql";

import AppActivityIndicator from "../../../common/components/activity-indicator.component";
import { getComments } from "../../api/posts.api";
import Comment from "../../models/comment.model";
import ReplyList from "./reply-list.component";

interface stateShape {
  isLoading: boolean;
  loadingError: boolean;
  comments: Comment[];
}

/**
 * Component for listing the replies to a post comment
 *
 * @returns
 */

export const CommentReplies = ({
  replies,
  openBottomsheet,
  toggleEditReplyBottomSheet,
}: {
  replies: PostCommentReply[];
  openBottomsheet: Function;
  toggleEditReplyBottomSheet: Function;
}) => {
  return (
    <SafeAreaView>
      <ReplyList
        replies={replies}
        openBottomsheet={openBottomsheet as any}
        toggleEditReplyBottomSheet={toggleEditReplyBottomSheet}
      />
    </SafeAreaView>
  );
};
