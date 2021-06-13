import React, { useState } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useToast } from "react-native-fast-toast";
import { formatDistance } from "date-fns";

import { COLORS } from "../../../../constants";
import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/text.component";
import { PostComment, User, UserType } from "../../../../generated/graphql";
import { useAuthenticatedUser } from "../../../../providers/user-context";

/**
 * The header for a comment
 */

const CommentHeader = ({
  user,
  comment,
  toggleEditCommentBottomSheet,
}: {
  user: User;
  comment: PostComment;
  toggleEditCommentBottomSheet: Function;
}) => {
  const toast: any = useToast();
  const { showActionSheetWithOptions } = useActionSheet();
  const { authenticatedUser } = useAuthenticatedUser();

  const [action, setAction] = useState("");

  const handleOpenActionSheet = () => {
    const options =
      authenticatedUser?.id === comment.user.id
        ? ["Edit comment", "Cancel"]
        : ["Report Comment", "Cancel"];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log({
            authenticatedUser,
            comment,
          });
          // User can edit the comment because they created it
          if (authenticatedUser?.id === comment.user.id) {
            toggleEditCommentBottomSheet(comment);
          } else {
            toast.show("Comment Reported successfully", { type: "success" });

            /**
             * Function For Getting Comment Actions For Api
             */
            setAction(options[buttonIndex]);
            const Action = {
              user_id: user.id, // This will change when User Authentication has been carried out and user can be accessed Globally
              post_id: comment.id,
              action: action,
            };
            console.log(Action);
          }
        }
      }
    );
  };

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
              {formatDistance(new Date(comment.created_at), new Date())} ago
            </AppText>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handleOpenActionSheet}>
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

export default CommentHeader;
