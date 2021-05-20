import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";

import AppText from "../../../common/components/typography/text.component";
import { COLORS } from "../../../../constants";

import Comment from "../../models/comment.model";
import CommentHeader from "./comment-header.component";

const ReplyComment = ({
  comment,
  openBottomsheet,
}: {
  comment: Comment;
  openBottomsheet: any;
}) => {
  const { user } = comment;
  return (
    <View style={styles.container}>
      <CommentHeader user={user} comment={comment} />
      <AppText style={styles.comment}>{comment.content}</AppText>
      <View style={styles.share__and__like__container}>
        <TouchableOpacity
          onPress={openBottomsheet as any}
          style={styles.reply__wrapper}
        >
          <AppText style={styles.reply}>Reply</AppText>
        </TouchableOpacity>
        <View style={styles.social__item}>
          <SvgIcon
            iconName={SVG_ICONS.COMMENTS_ICON}
            color={COLORS.APP_BLACK_ICON}
          />
          <AppText>50</AppText>
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
    marginBottom: 20,
    left: 1,
    borderLeftWidth: 1,
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
  reply__wrapper: {},
});

export default ReplyComment;
