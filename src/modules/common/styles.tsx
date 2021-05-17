import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

/**
 * Common styles used in mutiple places in the app
 */
export const APP_STYLES = StyleSheet.create({
  font__bold: { fontWeight: "bold" },
  base__container__styles: { backgroundColor: COLORS.WHITE, flex: 1 },
  base__header__styles: { backgroundColor: COLORS.WHITE, elevation: 0 },
  form__input__error__label: { color: COLORS.APP_ERROR_RED, fontSize: 12 },
  form__input__label: {
    marginBottom: 5,
    fontWeight: "700",
    fontSize: 14,
  },
  screen__bottom__bar__button: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  app__light__button: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
  },

  app__light__button__text: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontWeight: "700",
  },
});
