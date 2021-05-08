import React from "react";
import { View, FlatList, Text } from "react-native";

import Comment from "../../models/comment.model";
import CommentComponent from "./comment.component";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <CommentComponent comment={item} />}
      keyExtractor={(item) => item.uuid}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommentList;
