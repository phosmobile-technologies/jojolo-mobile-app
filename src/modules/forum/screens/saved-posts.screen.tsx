import React from "react";
import { ScrollView } from "react-native";
import AppText from "../../common/components/typography/app-text.component";

/**
 * The user's saved posts page
 *
 * @returns
 */
export const SavedPostsPage = () => {
  return (
    <ScrollView>
      <AppText>SAVED POSTS</AppText>
    </ScrollView>
  );
};

export default SavedPostsPage;
