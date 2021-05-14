import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { COLORS, NAVIGATION_CONSTANTS } from "../../../../constants";
import AppButton from "../../../common/components/button.component";

import AppText from "../../../common/components/typography/text.component";
import UploadFile from "../../../common/components/upload-file.component";

/**
 * Page for uploading a health professional's medical license during sign up
 */
const UploadMedicalLicense = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <UploadFile />
      <View style={styles.bottomBar}>
        <AppButton
          title="Next"
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.UPLOAD_VALID_ID_CARD_SCREEN
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.APP_WHITE_BACKGROUND,
    paddingTop: 30,
  },
  form__input__wrapper: {},
  bottomBar: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default UploadMedicalLicense;
