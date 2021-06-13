import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import { Post, useGetPostCommentsQuery } from "../../../../generated/graphql";
import { AppGraphQLClient } from "../../../common/api/graphql-client";
import AppActivityIndicator from "../../../common/components/activity-indicator.component";
import CommentList from "../post-comments/comment-list.component";

/**
 * The post's comments component
 *
 * @returns
 */

export const PostComments = ({
  post,
  openBottomsheet,
  openCommentRepliesBottomSheet,
  toggleEditCommentBottomSheet,
  toggleEditReplyBottomSheet,
}: {
  post: Post;
  openBottomsheet: Function;
  openCommentRepliesBottomSheet: Function;
  toggleEditCommentBottomSheet: any;
  toggleEditReplyBottomSheet: any;
}) => {
  const { data, error, isLoading, isError } = useGetPostCommentsQuery(
    AppGraphQLClient,
    {
      input: { post_id: post.id },
    }
  );

  if (isLoading) {
    return <AppActivityIndicator text={"loading comments.."} />;
  }
  return (
    <SafeAreaView>
      <CommentList
        comments={data?.GetPostComments}
        openBottomsheet={openBottomsheet}
        openCommentRepliesBottomSheet={openCommentRepliesBottomSheet}
        toggleEditCommentBottomSheet={toggleEditCommentBottomSheet}
        toggleEditReplyBottomSheet={toggleEditReplyBottomSheet}
      />
    </SafeAreaView>
  );
};
