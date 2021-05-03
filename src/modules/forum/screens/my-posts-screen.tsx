import React from "react";
import { ScrollView } from "react-native";
import AppText from "../../common/components/typography/app-text.component";

/**
 * The user's posts page
 *
 * @returns
 */
export const MyPostsPage = () => {
  return (
    <ScrollView>
      <AppText>MY POSTS</AppText>
    </ScrollView>
  );
};

export default MyPostsPage;
