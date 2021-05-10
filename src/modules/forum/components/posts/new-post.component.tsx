import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../common/components/typography/text.component";
import Post from "../../models/post.model";
import CommentHeader from "./comment-header.component";

const newPost = ({ post }: { post: Post }) => {
  const { user } = post;
  return <View></View>;
};
