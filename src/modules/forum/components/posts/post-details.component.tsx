import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";

import PostModel from "../../models/post.model";
import PostHeader from "./post-header.component";
import PostContent from "./post-content.component";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { NAVIGATION_CONSTANTS } from "../../../../constants";
import { ForumNavigatorNavigationContext } from "../../../../providers/forum-navigator.context";

const Post = ({
  post,
  isFullPage = false,
  allowNavigationToPostDetails = true,
}: {
  post: PostModel;
  isFullPage?: boolean;
  allowNavigationToPostDetails?: boolean;
}) => {
  const { user } = post;
  const toast: any = useToast();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation: any = useContext(ForumNavigatorNavigationContext);

  const [action, setAction] = useState("");
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
          /**
           * Function For Getting Post Actions For Api
           */
          setAction(options[buttonIndex]);
          const Action = {
            user_id: post.user.id, // This will change when User Authemtication as been carried out and user can be accessed Globally
            post_id: post.id,
            action: action,
          };
          console.log(Action);
        }

        if (buttonIndex === 1) {
          // Report Post
          toast.show("Post has been reported", {
            type: "danger",
          });
          setAction(options[buttonIndex]);

          /**
           * Function For Getting Post Actions For Api
           */
          const Action = {
            user_id: post.user.id, // This will change when User Authemtication as been carried out and user can be accessed Globally
            post_id: post.id,
            action: action,
          };
          console.log(Action);
        }
      }
    );
  };

  /**
   * Function for navigating to a particular post
   * @param post
   */
  const goToPostPage = (post: PostModel) => {
    if (!allowNavigationToPostDetails) {
      return;
    }
    navigation.navigate(
      NAVIGATION_CONSTANTS.SCREENS.FORUM.POST_DETAILS_SCREEN,
      {
        post,
      }
    );
  };

  return (
    <View style={styles.container}>
      <PostHeader
        user={user}
        handleOpenPostActionSheet={handleOpenActionSheet}
        isFullPage={isFullPage}
      />
      <PostContent post={post} isFullPage={isFullPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
});

export default Post;
