import React from "react";
import { View, FlatList, Text } from "react-native";

import Comment from "../../models/comment.model";
import ReplyComponent from "./reply.component";

const ReplyList = ({
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
        <ReplyComponent comment={item} openBottomsheet={openBottomsheet} />
      )}
      keyExtractor={(item) => item.uuid}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ReplyList;
