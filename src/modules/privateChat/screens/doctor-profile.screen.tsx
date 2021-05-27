import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppText from "../../common/components/typography/text.component";
import { User } from "../../../generated/graphql";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";

/**
 * Screen To Display Doctor Profile Information.
 * @returns
 */
const DoctorProfileInPrivateChat = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { doctor }: { doctor: any } = route.params;

  /**
   *
   * Hook for customizing navigation header and title for chat sreen.
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <></>,
      headerRight: () => <></>,
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.expertise__container}>
        <View>
          <AppText style={styles.expertise__container__number}>354</AppText>
          <AppText style={styles.expertise__container__text}>
            Consultations
          </AppText>
        </View>
        <View>
          <AppText style={styles.expertise__container__number}>5 Yrs</AppText>
          <AppText style={styles.expertise__container__text}>
            Experience
          </AppText>
        </View>
        <View>
          <AppText style={styles.expertise__container__number}>5.0</AppText>
          <AppText style={styles.expertise__container__text}>Rating</AppText>
        </View>
      </View>
      <View style={styles.actions__container}>
        <View
          style={[styles.action__link__card, styles.first__action__link_card]}
        >
          <TouchableWithoutFeedback>
            <SvgIcon
              style={styles.action__link__card__Icon}
              iconName={SVG_ICONS.VIDEO_CALL_ICON}
            ></SvgIcon>
            <AppText style={styles.action__link__card__text}>
              Book a Virtual Consultation
            </AppText>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.action__link__card}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(
                NAVIGATION_CONSTANTS.SCREENS.PRIVATE_CHAT.CHAT_SCREEN,
                { doctor }
              )
            }
          >
            <SvgIcon
              style={styles.action__link__card__Icon}
              iconName={SVG_ICONS.PRIVATE_CHAT_MESSAGE_DOCTOR_ICON_OVAL}
            ></SvgIcon>
            <AppText style={styles.action__link__card__text}>
              Chat With Doctor
            </AppText>
          </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
  },
  header__avatar_and_details: {
    flexDirection: "row",
    marginTop: 34,
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
  expertise__container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 70,
    marginBottom: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    borderRadius: 10,
  },
  expertise__container__number: {
    fontSize: 24,
    color: COLORS.WHITE,
    padding: 5,
  },
  expertise__container__text: {
    alignItems: "center",
    fontSize: 14,
    padding: 2,
    color: COLORS.APP_LIGHT_GREEN,
  },
  actions__container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  first__action__link_card: {
    marginRight: 10,
  },
  action__link__card: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
  },
  action__link__card__text: {
    margin: 2,
    fontSize: 17,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  action__link__card__Icon: {
    marginBottom: 15,
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
