import React from "react";
import { View } from "react-native";

import AppText from "../../common/components/typography/app-text.component";
import Post from "../models/post.model";

/**
 * Page for a singular post
 * @returns
 */
const PostScreen = ({ route }: { route: any }) => {
  const { post }: { post: Post } = route.params;
  return (
    <View>
      <AppText>THE SINGLE POST PAGE</AppText>
      <AppText>{post.content}</AppText>
    </View>
  );
};

export default PostScreen;
