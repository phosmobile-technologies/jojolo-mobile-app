import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-fast-toast";
import { useQueryClient } from "react-query";

import PostComponent from "../components/posts/post.component";
import AppText from "../../common/components/typography/text.component";
import { PostComments } from "../components/posts/post-comment.component";
import { COLORS } from "../../../constants";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import {
  Post,
  PostComment,
  PostCommentReply,
  useCreatePostCommentMutation,
  useCreatePostCommentReplyMutation,
  useEditPostCommentMutation,
  useGetPostCommentsQuery,
} from "../../../generated/graphql";
import AppTextLink from "../../common/components/typography/text-link.component";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";

/**
 * Screen that shows the full details for a post including comments and replies
 *
 * @param param0
 * @returns
 */
const PostDetailsScreen = ({ route }: { route: any }) => {
  const { post }: { post: Post } = route.params;
  const navigation = useNavigation() as any;
  const toast: any = useToast();
  const { authenticatedUser } = useAuthenticatedUser();
  const queryClient = useQueryClient();

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={""} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

  const [visible, setVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [editCommentVisible, setEditCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [activeComment, setActiveComment] = useState({} as PostComment);
  const [activeReply, setActiveReply] = useState({} as PostCommentReply);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [editReplyVisible, setEditReplyVisible] = useState(false);

  const toggleReplyBottomSheet = () => {
    setReply("");
    setReplyVisible((replyVisible) => !replyVisible);
  };

  const toggleBottomSheet = () => {
    setComment("");
    setVisible((visible) => !visible);
  };

  /**
   * Function For Toggling editing comment BottomSheet
   */
  const toggleEditCommentBottomSheet = () => {
    setEditCommentVisible((editCommentVisible) => !editCommentVisible);
  };

  /**
   * Function For Toggling editing reply BottomSheet
   */
  const toggleEditReplyBottomSheet = () => {
    setEditReplyVisible((setEditReplyVisible) => !setEditReplyVisible);
  };

  // GraphQL mutation for saving a comment
  const { mutate: saveComment, isLoading: isSavingComment } =
    useCreatePostCommentMutation(AppGraphQLClient, {
      onSuccess: (response) => {
        toast.show("Comment added successfully", {
          type: "success",
        });

        const queryKey = useGetPostCommentsQuery.getKey({
          input: { post_id: post.id },
        });
        queryClient.invalidateQueries(queryKey);

        post.comments.push(response?.CreatePostComment as PostComment);
        setVisible(false);
      },

      onError: (error) => {
        toast.show("Failed to add your comment. Please try again", {
          type: "danger",
        });
      },
    });

  // GraphQL mutation for saving a comment reply
  const { mutate: saveCommentReply, isLoading: isSavingCommentReply } =
    useCreatePostCommentReplyMutation(AppGraphQLClient, {
      onSuccess: (response) => {
        toast.show("Comment reply added successfully", {
          type: "success",
        });

        const queryKey = useGetPostCommentsQuery.getKey({
          input: { post_id: post.id },
        });
        queryClient.invalidateQueries(queryKey);

        setReplyVisible(false);
      },

      onError: (error) => {
        toast.show("Failed to add your comment reply. Please try again", {
          type: "error",
        });
      },
    });

  // GraphQL mutation for editing a comment
  const { mutate: editPostComment, isLoading: isEditingComment } =
    useEditPostCommentMutation(AppGraphQLClient, {
      onSuccess: (response) => {
        toast.show("Comment added successfully", {
          type: "success",
        });

        const queryKey = useGetPostCommentsQuery.getKey({
          input: { post_id: post.id },
        });
        queryClient.invalidateQueries(queryKey);

        post.comments.push(response?.EditPostComment as PostComment);
        setVisible(false);
      },

      onError: (error: any) => {
        const errorMessage = error?.response?.errors[0]?.message
          ? error?.response?.errors[0]?.message
          : "Unable to edit this comment. Try again";
        toast.show(`${errorMessage}`, {
          type: "danger",
        });
      },
    });

  /**
   * Send new comment data to the api
   *
   */
  const onCommentSubmit = () => {
    saveComment({
      input: {
        post_id: post.id,
        user_id: authenticatedUser?.id,
        content: comment,
      },
    });
  };

  /**
   * Send new comment reply to the API
   */
  const onReplySubmit = () => {
    saveCommentReply({
      input: {
        content: reply,
        comment_id: activeComment?.id,
        user_id: authenticatedUser?.id,
      },
    });
  };

  /**
   * Send new comment reply to the API
   */
  const onEditCommentSubmit = () => {
    setEditCommentVisible(false);
    editPostComment({
      content: editedCommentContent,
      comment_id: activeComment?.id,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Loader loading={isSavingComment} />
        <ScrollView>
          <View style={styles.container}>
            <PostComponent
              post={post}
              isFullPage={true}
              allowNavigationToPostDetails={false}
            />
            <View>
              <AppText style={styles.text}>
                Comments ({post.comments.length})
              </AppText>
            </View>
            <View>
              <PostComments
                post={post}
                openBottomsheet={() => {
                  setVisible(!visible);
                }}
                openCommentRepliesBottomSheet={(comment: PostComment) => {
                  setActiveComment(comment);
                  setReplyVisible(!replyVisible);
                }}
                toggleEditCommentBottomSheet={(comment: PostComment) => {
                  setActiveComment(comment);
                  setEditCommentVisible(!editCommentVisible);
                }}
                toggleEditReplyBottomSheet={(reply: PostCommentReply) => {
                  setActiveReply(reply);
                  setEditReplyVisible(!editReplyVisible);
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            marginHorizontal: -10,
            height: 70,
            top: 11,
          }}
        >
          <TouchableWithoutFeedback onPress={toggleBottomSheet}>
            <View style={styles.textInput}>
              <AppText style={{ color: COLORS.APP_GRAY_TEXT }}>
                Add a comment
              </AppText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* Bottom sheet for adding a comment to a post */}
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomSheet}
        onBackdropPress={toggleBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.commenting__title}>
              Commenting On:{" "}
              <Text style={{ color: COLORS.APP_PRIMARY_COLOR }}>
                {post.title}
              </Text>
            </AppText>
            <TouchableWithoutFeedback onPress={toggleBottomSheet}>
              <SvgIcon iconName={SVG_ICONS.CLOSE_ICON} />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TextInput
              style={styles.textBox}
              placeholder="Add a comment"
              placeholderTextColor={COLORS.APP_GRAY_TEXT}
              onChangeText={(text) => setComment(text)}
              defaultValue={""}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.reply}>
            <AppTextLink style={styles.reply__text} onPress={onCommentSubmit}>
              REPLY
            </AppTextLink>
          </View>
        </View>
      </BottomSheet>

      {/* Bottom sheet for replying to a comment */}
      <BottomSheet
        visible={replyVisible}
        onBackButtonPress={toggleReplyBottomSheet}
        onBackdropPress={toggleReplyBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.commenting__title}>
              Replying To:{" "}
              <Text
                style={{
                  color: COLORS.APP_PRIMARY_COLOR,
                  textTransform: "capitalize",
                }}
              >
                {activeComment?.user?.full_name}
              </Text>
            </AppText>
            <TouchableWithoutFeedback onPress={toggleReplyBottomSheet}>
              <SvgIcon iconName={SVG_ICONS.CLOSE_ICON} />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TextInput
              style={styles.textBox}
              placeholder="Add a Reply"
              placeholderTextColor={COLORS.APP_GRAY_TEXT}
              onChangeText={(text) => setReply(text)}
              defaultValue={""}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.reply}>
            <AppTextLink style={styles.reply__text} onPress={onReplySubmit}>
              REPLY
            </AppTextLink>
          </View>
        </View>
      </BottomSheet>

      {/* Bottom sheet for Editing a comment to a post */}
      <BottomSheet
        visible={editCommentVisible}
        onBackButtonPress={toggleEditCommentBottomSheet}
        onBackdropPress={toggleEditCommentBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.commenting__title}>
              Editing Comment On:{" "}
              <Text style={{ color: COLORS.APP_PRIMARY_COLOR }}>
                {post.title}
              </Text>
            </AppText>
            <TouchableWithoutFeedback onPress={toggleEditCommentBottomSheet}>
              <SvgIcon iconName={SVG_ICONS.CLOSE_ICON} />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TextInput
              style={styles.textBox}
              placeholder="Edit your comment"
              placeholderTextColor={COLORS.APP_GRAY_TEXT}
              defaultValue={activeComment.content}
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => setEditedCommentContent(text)}
            />
          </View>
          <View style={styles.reply}>
            <AppTextLink
              style={styles.reply__text}
              onPress={onEditCommentSubmit}
            >
              REPLY
            </AppTextLink>
          </View>
        </View>
      </BottomSheet>

      {/* Bottom sheet for Editing a reply to a post */}
      <BottomSheet
        visible={editReplyVisible}
        onBackButtonPress={toggleEditReplyBottomSheet}
        onBackdropPress={toggleEditReplyBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.commenting__title}>
              Editing reply On:{" "}
              <Text style={{ color: COLORS.APP_PRIMARY_COLOR }}>
                {activeComment?.user?.full_name}
              </Text>
            </AppText>
            <TouchableWithoutFeedback onPress={toggleEditReplyBottomSheet}>
              <SvgIcon iconName={SVG_ICONS.CLOSE_ICON} />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TextInput
              style={styles.textBox}
              placeholder="Add a comment"
              placeholderTextColor={COLORS.APP_GRAY_TEXT}
              defaultValue={activeReply.content}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <View style={styles.reply}>
            <AppTextLink
              style={styles.reply__text}
              onPress={toggleEditReplyBottomSheet}
            >
              REPLY
            </AppTextLink>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    flex: 1,
    flexDirection: "column",
  },
  bottomSheetContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    height: 48,
    margin: 12,
    borderRadius: 10,
    marginBottom: -1,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    justifyContent: "center",
    paddingLeft: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 20,
  },
  textBox: {
    marginVertical: 0,
    paddingVertical: 10,
    fontSize: 15,
  },
  reply: {
    borderTopWidth: 1,
    marginTop: 50,
    alignItems: "flex-end",
    borderTopColor: COLORS.APP_LIGHT_GRAY_BACKGROUND,
    marginHorizontal: -10,
    paddingHorizontal: 30,
  },
  reply__text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  commenting__title: {
    textAlign: "center",
    marginTop: 10,
  },
  reply__container: {
    padding: 10,
  },
});

export default PostDetailsScreen;
