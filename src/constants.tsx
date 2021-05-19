import { BirthTerm, BloodGroup, Genotype } from "./generated/graphql";

export const APP_CONSTANTS = {
  MOCK_TIME_DELAY_IN_MILLISECONDS: 3000,
};

/**
 * The constants for navigation.
 *
 */
export const NAVIGATION_CONSTANTS = {
  SCREENS: {
    AUTH: {
      SIGN_IN_SCREEN: "Log In",
      SIGN_UP_SCREEN: "Sign In",
      UPLOAD_MEDICAL_LICENSE_SCREEN: "Upload Medical License Screen",
      UPLOAD_VALID_ID_CARD_SCREEN: "Upload Valid ID Card Screen",
      ADD_CHILD: "Add Child",
      CHILD_INFORMATION_PAGE: "Child Information Page",
      PAST_MEDICAL_HISTORY: "Past Medical History",
      SELECT_WHAT_TO_TRACK: "Select What To Track",

      ADD_CHILD_OR_SKIP_SCREEN: "Add Child or Skip",
      ADD_CHILD_SCREEN: "Add Child Screen",
    },

    FORUM: {
      CREATE_POST_SCREEN: "NEW POST",
      SEARCH_POSTS_SCREEN: "SEARCH_POSTS",
      FEED_SCREEN: "Feed",
      FORUM_SCREEN: "Forum",
      MY_POSTS_SCREEN: "My Posts",
      SAVED_POSTS_SCREEN: "Saved Posts",
      TAGS_SCREEN: "Tags",
      POST_DETAILS_SCREEN: "POST_DETAILS_SCREEN",
    },

    PRIVATE_CHAT: {
      GET_DOCTOR_FOR_CHAT_SCREEN: "Private Chat",
      DOCTOR_PROFILE_SCREEN: "Doctor Profile",
      CHAT_SCREEN: "Chat",
    },

    BOOKING: {
      BOOKING_SCREEN: "Booking",
    },

    TRACKER: {
      TRACKER_SCREEN: "Tracker",
    },

    ACCOUNT: {
      ACCOUNT_SCREEN: "Account",
    },
  },

  NAVIGATORS: {
    FORUM_NAVIGATOR: "Forum",
    PRIVATE_CHAT_NAVIGATOR: "Private Chat",
    MODULE_TABS_STACK: "MODULE_TABS_STACK",
  },
};

export const COLORS = {
  WHITE: "white",
  APP_GRAY_BACKGROUND: "#E8E8E8",
  APP_LIGHT_GRAY_BACKGROUND: "#f1eded",
  APP_WHITE_BACKGROUND: "#F8F8F8",
  APP_PRIMARY_COLOR: "#19A5B0",
  APP_PRIMARY_COLOR_LIGHT: "#DEF3F4",
  APP_ORANGE_TEXT: "#EA6F06",
  APP_TAG_ORANGE: "#F97B1C",
  APP_GRAY_TEXT: "#A0A4A8",
  APP_BLACK_TEXT: "#14142B",
  APP_BLACK_ICON: "#52575C",
  APP_PAGE_HEADER_BLACK_TEXT: "#25282B",
  APP_ERROR_RED: "#E5251D",
  APP_GREEN: "#2AC769",
  TRANSPARENT: "transparent",
  APP_LIGHT_GREEN: "#B2E9ED",
};

export const DOCTOR_TYPES = [
  "Dentist",
  "Dermatologist",
  "General Practitioner",
  "Lactationist",
  "Nutritionist",
  "Pediatrician",
  "Therapist",
];

export const TAGS = {
  General: 1,
  Breastfeeding: 2,
  Teething: 3,
  Feeding: 4,
  Stooling: 5,
  Illness: 6,
};

export const DROPDOWN_OPTIONS = {
  CHILD_BIRTH_TERM: [
    { label: "Pre-term (28 Weeks - 37 Weeks)", value: BirthTerm.PreTerm },
    { label: "Term (37 Weeks - 42 Weeks)", value: BirthTerm.Term },
    { label: "Post-Term ( > 42 Weeks)", value: BirthTerm.PostTerm },
    { label: "Not Sure", value: BirthTerm.NotSure },
  ],

  BLOOD_GROUP: [
    { label: "A", value: BloodGroup.A },
    { label: "B", value: BloodGroup.B },
    { label: "AB", value: BloodGroup.Ab },
    { label: "O", value: BloodGroup.O },
  ],

  GENOTYPE: [
    { label: "AA", value: Genotype.Aa },
    { label: "AS", value: Genotype.As },
    { label: "SS", value: Genotype.Ss },
    { label: "AC", value: Genotype.Ac },
  ],

  POST_TAGS: [
    { label: "General", value: TAGS.General },
    { label: "Breastfeeding", value: TAGS.Breastfeeding },
    { label: "Teething", value: TAGS.Teething },
    { label: "Feeding", value: TAGS.Feeding },
    { label: "Stooling", value: TAGS.Stooling },
    { label: "Illness", value: TAGS.Illness },
  ],
};
