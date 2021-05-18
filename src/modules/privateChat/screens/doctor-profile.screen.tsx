import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppText from "../../common/components/typography/text.component";
import { User } from "../../../generated/graphql";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS } from "../../../constants";

/**
 * Screen To Display Doctor Profile Information.
 * @returns
 */
const DoctorProfileInPrivateChat = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { user }: { user: any } = route.params;
  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.expertise__Container}>
        <View>
          <AppText style={styles.expertise__Container__number}>354</AppText>
          <AppText style={styles.expertise__Container__text}>
            Consultations
          </AppText>
        </View>
        <View>
          <AppText style={styles.expertise__Container__number}>5 Yrs</AppText>
          <AppText style={styles.expertise__Container__text}>
            Experience
          </AppText>
        </View>
        <View>
          <AppText style={styles.expertise__Container__number}>5.0</AppText>
          <AppText style={styles.expertise__Container__text}>Rating</AppText>
        </View>
      </View>
      <View style={styles.get__in__touch__container}>
        <View style={styles.get__in__touch__Virtual}>
          <SvgIcon
            style={styles.get__in__touch__video__call}
            iconName={SVG_ICONS.VIDEO_CALL_ICON}
          ></SvgIcon>
          <AppText style={styles.get__in__touch__text}>
            Book a Virtual Consultation
          </AppText>
        </View>
        <View style={styles.get__in__touch__Chat}>
          <SvgIcon
            style={styles.get__in__touch__chat}
            iconName={SVG_ICONS.PRIVATE_CHAT_MESSAGE_DOCTOR_ICON_OVAL}
          ></SvgIcon>
          <AppText style={styles.get__in__touch__chat__text}>
            Chat With Doctor
          </AppText>
        </View>
      </View>
      <View style={styles.bio__container}>
        <View>
          <AppText style={styles.bio__title}>Doctor's Bio</AppText>
        </View>
        <View>
          <AppText style={styles.bio__text}>
            Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
            dui. Vivamus suscipit tortor eget felis porttitor volutpat.
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header__avatar_and_details: {
    flexDirection: "row",
    top: 34,
  },
  user__details__username: {
    marginRight: 10,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 33,
  },

  user__details__username__and_badge: {
    flexDirection: "row",
  },

  user__details__info: {
    flexDirection: "row",
    alignItems: "center",
  },

  header__avatar: {
    width: 72,
    height: 72,
    borderRadius: 40,
    marginRight: 16,
  },
  user__details__info__user_rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 29,
  },

  user__details__info__user_rating_number: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 17,
  },
  user__details__info__user_role: {
    marginRight: 15,
    fontSize: 17,
  },
  user__details__info__last_seen: {
    fontSize: 17,
  },
  expertise__Container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 70,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderRadius: 10,
  },
  expertise__Container__number: {
    fontSize: 24,
    color: COLORS.WHITE,
    padding: 5,
  },
  expertise__Container__text: {
    alignItems: "center",
    fontSize: 14,
    padding: 2,
    color: COLORS.APP_LIGHT_GREEN,
  },
  get__in__touch__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: -50,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: 360,
  },
  get__in__touch__Virtual: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginHorizontal: 10,
    width: 160,
    borderRadius: 10,
    left: -15,
  },
  get__in__touch__Chat: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginHorizontal: 10,
    width: 160,
    borderRadius: 10,
  },
  get__in__touch__text: {
    margin: 2,
    fontSize: 17,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  get__in__touch__chat: {
    bottom: 10,
  },
  get__in__touch__video__call: {
    bottom: 10,
  },
  get__in__touch__chat__text: {
    margin: 2,
    top: -20,
    fontSize: 17,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  bio__container: {
    paddingHorizontal: 5,
    paddingVertical: 80,
  },
  bio__title: {
    fontSize: 27,
    paddingBottom: 23,
  },
  bio__text: {
    fontSize: 17,
    fontWeight: "100",
  },
});
export default DoctorProfileInPrivateChat;
