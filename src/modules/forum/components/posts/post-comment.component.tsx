import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Post, useGetPostCommentsQuery } from "../../../../generated/graphql";
import { AppGraphQLClient } from "../../../common/api/graphql-client";

import AppActivityIndicator from "../../../common/components/activity-indicator.component";
import { getComments } from "../../api/posts.api";
import Comment from "../../models/comment.model";
import CommentList from "../post-comments/comment-list.component";

interface stateShape {
  isLoading: boolean;
  loadingError: boolean;
  comments: Comment[];
}

/**
 * The post's comments component
 *
 * @returns
 */

export const PostComments = ({
  post,
  openBottomsheet,
  openCommentRepliesBottomSheet,
}: {
  post: Post;
  openBottomsheet: Function;
  openCommentRepliesBottomSheet: Function;
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
      />
    </SafeAreaView>
  );
};
