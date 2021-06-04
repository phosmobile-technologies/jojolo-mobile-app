import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../../constants";

import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/text.component";
import PostModel from "../../models/post.model";
import {
  Post,
  PostTag,
  useLikePostMutation,
} from "../../../../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import { AppGraphQLClient } from "../../../common/api/graphql-client";
import { useAuthenticatedUser } from "../../../../providers/user-context";

/**
 * Component used to display tags in a post
 *
 * @param param0
 * @returns
 */
const Tag = ({ tag, style }: { tag: PostTag; style?: object }) => {
  return (
    <View style={[tagStyles.container, style]}>
      <SvgIcon iconName={SVG_ICONS.TAG_ICON} />
      <AppText style={tagStyles.text}>{tag.name}</AppText>
    </View>
  );
};

/**
 * Component displaying the content in a post
 *
 * @param param0
 * @returns
 */
const PostContent = ({
  post,
  isFullPage = false,
}: {
  post: Post;
  isFullPage?: boolean;
}) => {
  const navigation: any = useNavigation();
  const [liked, setLiked] = useState(false);
  const { authenticatedUser } = useAuthenticatedUser();
  const postContent = isFullPage
    ? post.content
    : post.content.length > 200
    ? post.content.substring(0, 200 - 3) + " ..."
    : post.content;
  const titleStyle = isFullPage
    ? [styles.post__body__title, styles.post__body__title_large]
    : [styles.post__body__title];

  /**
   * Function for navigating to a particular post
   * @param post
   */
  const goToPostDetailsPage = (post: PostModel) => {
    navigation.navigate(
      NAVIGATION_CONSTANTS.SCREENS.FORUM.POST_DETAILS_SCREEN,
      {
        post,
      }
    );
  };

  const { mutate: toggleLikePost, isLoading: isTogglingLikePost } =
    useLikePostMutation(AppGraphQLClient, {
      onSuccess: (response) => {
        // @TODO Remove this hack and implement it properly using optimistic updates
        if (
          response.LikePost.message === "The post has been liked successfully"
        ) {
          post.likes += 1;
        } else {
          if (post.likes > 0) {
            post.likes -= 1;
          }
        }
      },

      onError: (error) => {},
    });

  const onLiked = () => {
    setLiked(!liked);

    toggleLikePost({
      input: { user_id: authenticatedUser?.id, post_id: post.id },
    });
  };

  return (
    <View>
      {isFullPage ? (
        <>
          <AppText style={titleStyle}>{post.title}</AppText>
          <AppText>{postContent}</AppText>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => goToPostDetailsPage(post)}>
            <AppText style={titleStyle}>{post.title}</AppText>
            <AppText>{postContent}</AppText>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.tags__wrapper}>
        {post.tags &&
          post.tags.map((tag, index) => (
            <Tag tag={tag} key={tag.id} style={tagStyles.addMarginRight} />
          ))}
      </View>

      {/* Social interaction */}
      <View style={styles.social_icons_container}>
        <View style={styles.social_icon_group}>
          <TouchableOpacity onPress={() => onLiked()}>
            <SvgIcon
              iconName={SVG_ICONS.LIKE_ICON}
              color={liked ? COLORS.APP_PRIMARY_COLOR : COLORS.APP_BLACK_ICON}
            />
          </TouchableOpacity>
          <AppText style={styles.social_icon_group__text}>{post.likes}</AppText>
        </View>
        {isFullPage ? (
          <>
            <View style={styles.social_icon_group}>
              <SvgIcon
                iconName={SVG_ICONS.COMMENTS_ICON}
                color={COLORS.APP_BLACK_ICON}
              />
              <AppText style={styles.social_icon_group__text}>
                {post.comments.length}
              </AppText>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => goToPostDetailsPage(post)}>
            <View style={styles.social_icon_group}>
              <SvgIcon
                iconName={SVG_ICONS.COMMENTS_ICON}
                color={COLORS.APP_BLACK_ICON}
              />
              <AppText style={styles.social_icon_group__text}>
                {post.comments.length}
              </AppText>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.social_icon_group}>
          <SvgIcon
            iconName={SVG_ICONS.SHARE_ICON}
            color={COLORS.APP_BLACK_ICON}
          />
          <AppText style={styles.social_icon_group__text}>Share</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post__body__title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 15,
    textTransform: "capitalize",
  },

  post__body__title_large: {
    fontSize: 20,
  },

  post__body__text: {
    fontSize: 14,
    marginBottom: 20,
  },

  tags__wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },

  social_icons_container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  social_icon_group: {
    flexDirection: "row",
  },

  social_icon_group__text: {
    marginLeft: 5,
    fontSize: 12,
  },
});

const tagStyles = StyleSheet.create({
  container: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.APP_TAG_ORANGE,
    flexDirection: "row",
    borderRadius: 10,
  },

  text: {
    fontSize: 10,
    color: "white",
    marginLeft: 10,
    textTransform: "capitalize",
  },

  addMarginRight: {
    marginRight: 10,
  },
});

export default PostContent;
