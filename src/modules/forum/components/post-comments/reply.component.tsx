import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/text.component";
import { COLORS } from "../../../../constants";
import { PostCommentReply } from "../../../../generated/graphql";
import CommentReplyHeader from "./comment-reply-header.component";

/**
 * Component for displaying a single reply for a post comment
 *
 * @param param0
 * @returns
 */
const CommentReply = ({
  reply,
  openBottomsheet,
  toggleEditReplyBottomSheet,
}: {
  reply: PostCommentReply;
  openBottomsheet: Function;
  toggleEditReplyBottomSheet: Function;
}) => {
  const { user } = reply;

  const [liked, setLiked] = useState(false);
  const onLiked = () => {
    setLiked(!liked);
    const LikedCommentReply = {
      post_id: reply.id,
      liked: liked,
    };
    console.log(LikedCommentReply);
  };

  return (
    <View style={styles.container}>
      <CommentReplyHeader
        user={user}
        reply={reply}
        toggleEditReplyBottomSheet={toggleEditReplyBottomSheet}
      />
      <AppText style={styles.comment}>{reply.content}</AppText>
      <View style={styles.share__and__like__container}>
        {/* <TouchableOpacity
          onPress={openBottomsheet as any}
          style={styles.reply__wrapper}
        >
          <AppText style={styles.reply}>Reply</AppText>
        </TouchableOpacity> */}
        {/* <View style={styles.social__item}>
          <SvgIcon
            iconName={SVG_ICONS.COMMENTS_ICON}
            color={COLORS.APP_BLACK_ICON}
          />
          <AppText>50</AppText>
        </View> */}
        <View style={styles.social_icon_group}>
          <TouchableOpacity onPress={() => onLiked()}>
            {liked ? (
              <>
                <SvgIcon
                  iconName={SVG_ICONS.LIKE_ICON}
                  color={COLORS.APP_BLACK_ICON}
                />
              </>
            ) : (
              <>
                <SvgIcon
                  iconName={SVG_ICONS.LIKE_ICON}
                  color={COLORS.APP_PRIMARY_COLOR}
                />
              </>
            )}
          </TouchableOpacity>
          <AppText style={styles.social_icon_group__text}>{0}</AppText>
        </View>
        <View style={styles.social__item}>
          <SvgIcon
            iconName={SVG_ICONS.SHARE_ICON}
            color={COLORS.APP_BLACK_ICON}
          />
          <AppText>Share</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    borderColor: COLORS.APP_GRAY_TEXT,
    borderLeftWidth: 1,
    borderStyle: "dashed",
  },
  comment: {
    fontWeight: "200",
  },
  reply: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.APP_GRAY_TEXT,
  },
  share__and__like__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  social__item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  social_icon_group: {
    flexDirection: "row",
  },

  social_icon_group__text: {
    marginLeft: 5,
    fontSize: 12,
  },
  reply__wrapper: {},
});

export default CommentReply;
