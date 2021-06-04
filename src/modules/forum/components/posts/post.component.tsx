import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";

import {
  Post as PostModel,
  useGetUserPostsQuery,
  useGetUserSavedPostsQuery,
  useReportPostMutation,
  UserType,
  useSavePostMutation,
} from "../../../../generated/graphql";
import PostHeader from "./post-header.component";
import PostContent from "./post-content.component";
import { useAuthenticatedUser } from "../../../../providers/user-context";
import { AppGraphQLClient } from "../../../common/api/graphql-client";
import Loader from "../../../common/components/loader.component";
import AppModal from "../../../common/components/modal.component";
import { useQueryClient } from "react-query";
import { queryClient } from "../../../../providers/query-client.context";
import { NAVIGATION_CONSTANTS } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants";

const Post = ({
  post,
  isFullPage = false,
}: {
  post: PostModel;
  isFullPage?: boolean;
  allowNavigationToPostDetails?: boolean;
}) => {
  const toast: any = useToast();
  const { showActionSheetWithOptions } = useActionSheet();
  const [confirmReportPost, setConfirmReportPost] = useState(false);
  const queryClient = useQueryClient();
  const { authenticatedUser } = useAuthenticatedUser();
  const navigation: any = useNavigation();
  const containerStyle =
    post.user.user_type === UserType.HealthCareProfessional
      ? [styles.container, styles.borderedContainer]
      : [styles.container];

  // Mutation for saving posts
  const { mutate: savePost, isLoading } = useSavePostMutation(
    AppGraphQLClient,
    {
      onSuccess: (response) => {
        const { success, message } = response.SavePost;
        if (success) {
          toast.show(message, {
            type: "success",
          });
        } else {
          toast.show(message, {
            type: "error",
          });
        }
      },

      onError: (err) => {
        toast.show("Unable to save the post. Please try again.", {
          type: "error",
        });
      },
    }
  );

  // Mutation for reporting posts
  const { mutate: reportPost, isLoading: isReportingPost } =
    useReportPostMutation(AppGraphQLClient, {
      onSuccess: (response) => {
        const { success, message } = response.ReportPost;
        if (success) {
          toast.show(message, {
            type: "success",
          });

          // @TODO remove if not in use for automatic updates
          queryClient.invalidateQueries(
            useGetUserSavedPostsQuery.getKey({
              input: { user_id: authenticatedUser?.id },
            })
          );
        } else {
          toast.show(message, {
            type: "error",
          });
        }
      },

      onError: (error) => {
        toast.show("Unable to report the post. Please try again.", {
          type: "error",
        });
      },

      onSettled: () => {
        setConfirmReportPost(false);
      },
    });

  // Called after YES on the confirm modal for reporting posts is clicked
  const handleReportPost = () => {
    reportPost({
      input: { user_id: authenticatedUser?.id, post_id: post.id, reason: "" },
    });
  };

  /**
   * Open the action sheet for saving / editing / reporting posts
   */
  const handleOpenActionSheet = () => {
    const postIsOwnedByAuthenticatedUser =
      post.user.id === authenticatedUser?.id;
    const options = postIsOwnedByAuthenticatedUser
      ? ["Edit Post", "Save Post", "Cancel"]
      : ["Save Post", "Report Post", "Cancel"];
    const destructiveButtonIndex = postIsOwnedByAuthenticatedUser
      ? undefined
      : 1;
    const cancelButtonIndex = 2;

    const actionSheetMethods: { [key: string]: Function } = {
      ["Save Post"]: () => {
        savePost({
          input: { user_id: authenticatedUser?.id, post_id: post.id },
        });
      },

      ["Report Post"]: () => {
        setConfirmReportPost(true);
      },

      ["Edit Post"]: () => {
        navigation.navigate(
          NAVIGATION_CONSTANTS.SCREENS.FORUM.EDIT_POST_SCREEN,
          {
            post,
          }
        );
      },
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (typeof actionSheetMethods[options[buttonIndex]] === "function") {
          actionSheetMethods[options[buttonIndex]]();
        }
      }
    );
  };

  return (
    <View style={containerStyle}>
      <Loader loading={isLoading} />
      <AppModal
        visible={confirmReportPost}
        setVisibility={setConfirmReportPost}
        title={"Are you sure?"}
        message={"You are about to report a post, please confirm this action"}
        onPressConfirm={handleReportPost}
      ></AppModal>
      <PostHeader
        post={post}
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
  borderedContainer: {
    borderWidth: 1,
    borderColor: COLORS.APP_PRIMARY_COLOR,
  },
});

export default Post;
