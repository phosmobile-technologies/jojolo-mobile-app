import React from "react";
import { View, FlatList, Text } from "react-native";

import Comment from "../../models/comment.model";
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
}: {
  comments: Comment[];
  openBottomsheet: any;
}) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentComponent comment={item} openBottomsheet={openBottomsheet} />
      )}
      keyExtractor={(item) => item.uuid}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommentList;
