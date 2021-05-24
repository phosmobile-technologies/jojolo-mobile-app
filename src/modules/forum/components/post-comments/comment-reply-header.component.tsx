import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useToast } from "react-native-fast-toast";
import { formatDistance } from "date-fns";

import { COLORS } from "../../../../constants";
import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/text.component";
import {
  PostCommentReply,
  User,
  UserType,
} from "../../../../generated/graphql";

/**
 * The header for a comment reply
 */

const CommentReplyHeader = ({
  user,
  reply,
}: {
  user: User;
  reply: PostCommentReply;
}) => {
  const toast: any = useToast();

  return (
    <View style={styles.header}>
      <View style={styles.header__avatar_and_details}>
        <Image
          source={{ uri: user.profile_image }}
          style={styles.header__avatar}
        />
        <View>
          <View style={styles.user__details__username__and_badge}>
            <AppText
              style={styles.user__details__username}
            >{`${user.full_name}`}</AppText>
            <SvgIcon iconName={SVG_ICONS.GOLD_BADGE_ICON} />
          </View>
          <View style={styles.user__details__info}>
            <AppText style={styles.user__details__info__user_role}>
              {user.user_type === UserType.CareGiver
                ? user.care_giver_profile?.role
                : user.health_care_professional_profile?.role}
            </AppText>
            <View style={styles.user__details__info__user_rating}>
              <SvgIcon iconName={SVG_ICONS.GOLD_STAR_ICON} />
              <AppText style={styles.user__details__info__user_rating_number}>
                {`5.0`}
              </AppText>
            </View>
            <AppText style={styles.user__details__info__last_seen}>
              {formatDistance(new Date(reply.created_at), new Date())} ago
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomColor: COLORS.APP_GRAY_BACKGROUND,
    borderBottomWidth: 1,
    paddingTop: 9,
  },
  user__details__username__Large: {
    fontSize: 20,
    fontWeight: "700",
    paddingRight: 10,
  },

  user__details__username__and_badge_large: {
    flexDirection: "row",
  },

  header__avatar_and_details: {
    flexDirection: "row",
  },

  header__avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },

  user__details__username: {
    marginRight: 10,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  user__details__username__and_badge: {
    flexDirection: "row",
  },

  user__details__info: {
    flexDirection: "row",
    alignItems: "center",
  },

  user__details__info__user_role: {
    marginRight: 15,
    fontSize: 12,
    textTransform: "capitalize",
  },

  user__details__info__user_rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  user__details__info__user_rating_number: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 12,
  },

  user__details__info__last_seen: {
    fontSize: 12,
  },

  actions__icon: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 50,
  },
});

export default CommentReplyHeader;