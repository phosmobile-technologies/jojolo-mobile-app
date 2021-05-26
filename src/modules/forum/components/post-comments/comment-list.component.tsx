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
}: {
  comments: PostComment[];
  openBottomsheet: Function;
  openCommentRepliesBottomSheet: Function;
}) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentComponent
          comment={item}
          openBottomsheet={openBottomsheet}
          openCommentRepliesBottomSheet={openCommentRepliesBottomSheet}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommentList;
