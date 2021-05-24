import React from "react";
import { View, FlatList } from "react-native";

import { PostCommentReply } from "../../../../generated/graphql";
import ReplyComponent from "./reply.component";

/**
 * Component for displaying the list of replies under a post's comments
 *
 * @param param0
 * @returns
 */
const CommentReplyList = ({
  replies,
  openBottomsheet,
}: {
  replies: PostCommentReply[];
  openBottomsheet: any;
}) => {
  return (
    <FlatList
      data={replies}
      renderItem={({ item }) => (
        <ReplyComponent reply={item} openBottomsheet={openBottomsheet} />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommentReplyList;