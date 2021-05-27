import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import { User } from "../../../generated/graphql";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppText from "../../common/components/typography/text.component";

interface DoctorsListCardProps {
  user: User;
}

/**
 * Small card used to display a doctor's details in private chat module
 * @param param0
 * @returns
 */
const DoctorsListCardItem = (doctor: any) => {
  const navigation = useNavigation() as any;
  // let user = {
  //   profile_image: "https://i.pravatar.cc/200",
  //   full_name: "Doctor Raji Mike",
  //   role: "Pediatrician",
  //   rating: 4,
  //   points: 5,
  // };

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(
            NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.DOCTOR_PROFILE_SCREEN,
            { doctor }
          );
        }}
      >
        <View style={styles.header__avatar_and_details}>
          <Image
            source={{ uri: doctor.doctor.profile_image }}
            style={styles.header__avatar}
          />
          <View>
            <View style={styles.user__details__username__and_badge}>
              <AppText
                style={styles.user__details__username}
              >{`${doctor.doctor.full_name}`}</AppText>
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
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(
            NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.CHAT_SCREEN,
            { doctor }
          );
        }}
      >
        <View>
          <SvgIcon iconName={SVG_ICONS.PRIVATE_CHAT_MESSAGE_DOCTOR_ICON} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.APP_GRAY_BACKGROUND,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
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

export default DoctorsListCardItem;
