import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";

import PostModel from "../../models/post.model";
import PostHeader from "./post-header.component";
import PostContent from "./post-content.component";
import { ForumNavigatorNavigationContext } from "../../screens/forum.screen";
import NAVIGATION_CONSTANTS from "../../../../navigation/navigation-constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Post = ({ post }: { post: PostModel }) => {
  const { user } = post;
  const toast = useToast();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation: any = useContext(ForumNavigatorNavigationContext);

  /**
   * Open the action sheet for saving / reporting posts
   */
  const handleOpenActionSheet = () => {
    const options = ["Save Post", "Report Post", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Save the post
          toast.show("Post saved successfully", { type: "success" });
        }

        if (buttonIndex === 1) {
          // Report Post
          toast.show("Post has been reported", {
            type: "danger",
          });
        }
      }
    );
  };

  /**
   * Function for navigating to a particular post
   * @param post
   */
  const goToPostPage = (post: PostModel) => {
    navigation.navigate(NAVIGATION_CONSTANTS.POST, {
      post,
    });
  };

  return (
    <View style={styles.container}>
      <PostHeader
        user={user}
        handleOpenPostActionSheet={handleOpenActionSheet}
      />
      <TouchableWithoutFeedback onPress={() => goToPostPage(post)}>
        <PostContent post={post} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
});

export default Post;
