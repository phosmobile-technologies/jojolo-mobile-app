import React from "react";
import { View, FlatList, Text } from "react-native";
import { PostComment } from "../../../../generated/graphql";

import CommentComponent from "./comment.component";

/**
 * Component that shows the list of comments in a post
 *
 * @param param0
 * @returns
 */
const CommentList = ({
  comments,
  openBottomsheet,
  openCommentRepliesBottomSheet,
  toggleEditCommentBottomSheet,
  toggleEditReplyBottomSheet,
}: {
  comments: PostComment[];
  openBottomsheet: Function;
  openCommentRepliesBottomSheet: Function;
  toggleEditCommentBottomSheet: Function;
  toggleEditReplyBottomSheet: Function;
}) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentComponent
          comment={item}
          openBottomsheet={openBottomsheet}
          openCommentRepliesBottomSheet={openCommentRepliesBottomSheet}
          toggleEditCommentBottomSheet={toggleEditCommentBottomSheet}
          toggleEditReplyBottomSheet={toggleEditReplyBottomSheet}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommentList;
