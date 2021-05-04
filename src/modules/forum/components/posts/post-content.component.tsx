import React from "react";
import { View, StyleSheet } from "react-native";

import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/app-text.component";
import { COLORS } from "../../../common/constants";
import Post from "../../models/post.model";
import TagModel from "../../models/tag.model";

/**
 * Component used to display tags in a post
 *
 * @param param0
 * @returns
 */
const Tag = ({ tag, style }: { tag: TagModel; style?: object }) => {
  return (
    <View style={[tagStyles.container, style]}>
      <SvgIcon iconName={SVG_ICONS.TAG_ICON} />
      <AppText style={tagStyles.text}>{tag.text}</AppText>
    </View>
  );
};

/**
 * Component displaying the content in a post
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
  const postContent = isFullPage
    ? post.content
    : post.content.length > 200
    ? post.content.substring(0, 200 - 3) + " ..."
    : post.content;
  const titleStyle = isFullPage
    ? [styles.post__body__title, styles.post__body__title_large]
    : [styles.post__body__title];
  return (
    <View>
      <AppText style={titleStyle}>{post.title}</AppText>
      <AppText>{postContent}</AppText>
      <View style={styles.tags__wrapper}>
        {post.tags &&
          post.tags.map((tag, index) => (
            <Tag
              tag={tag}
              key={tag.uuid}
              style={index % 2 !== 0 ? {} : tagStyles.addMarginRight}
            />
          ))}
      </View>

      {/* Social interaction */}
      <View style={styles.social_icons_container}>
        <View style={styles.social_icon_group}>
          <SvgIcon iconName={SVG_ICONS.LIKE_ICON} color={COLORS.BLACK_ICON} />
          <AppText style={styles.social_icon_group__text}>{post.likes}</AppText>
        </View>

        <View style={styles.social_icon_group}>
          <SvgIcon
            iconName={SVG_ICONS.COMMENTS_ICON}
            color={COLORS.BLACK_ICON}
          />
          <AppText style={styles.social_icon_group__text}>
            {post.comments.length}
          </AppText>
        </View>

        <View style={styles.social_icon_group}>
          <SvgIcon iconName={SVG_ICONS.SHARE_ICON} color={COLORS.BLACK_ICON} />
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
    backgroundColor: COLORS.TAG_ORANGE,
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
