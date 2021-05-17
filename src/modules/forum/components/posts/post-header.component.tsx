import React from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../../constants";

import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/text.component";
import { User } from "../../../common/models/user.model";

/**
 * The header for a post
 *
 * @param param0
 * @returns
 */
const PostHeader = ({
  user,
  handleOpenPostActionSheet,
  isFullPage = false,
}: {
  user: User;
  handleOpenPostActionSheet: Function;
  isFullPage?: boolean;
}) => {
  const fullNameStyle = isFullPage
    ? [styles.user__details__username__Large]
    : [styles.user__details__username];
  const userNameAndUserBadgeStyle = isFullPage
    ? [styles.user__details__username__and_badge_large]
    : [styles.user__details__username__and_badge];
  return (
    <View style={styles.header}>
      <View style={styles.header__avatar_and_details}>
        <Image
          source={{ uri: user.profile_image }}
          style={styles.header__avatar}
        />
        <View>
          <View style={userNameAndUserBadgeStyle}>
            <AppText style={fullNameStyle}>{`${user.full_name}`}</AppText>
            <SvgIcon iconName={SVG_ICONS.GOLD_BADGE_ICON} />
          </View>
          <View style={styles.user__details__info}>
            <AppText style={styles.user__details__info__user_role}>
              {`Mother`}
            </AppText>
            <View style={styles.user__details__info__user_rating}>
              <SvgIcon iconName={SVG_ICONS.GOLD_STAR_ICON} />
              <AppText style={styles.user__details__info__user_rating_number}>
                {`5.0`}
              </AppText>
            </View>
            <AppText style={styles.user__details__info__last_seen}>
              5 hrs ago
            </AppText>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => handleOpenPostActionSheet()}>
        <View style={styles.actions__icon}>
          <SvgIcon iconName={SVG_ICONS.THREE_DOTS_ICON} />
        </View>
      </TouchableWithoutFeedback>
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

export default PostHeader;
