import React, { useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useToast } from "react-native-fast-toast";

import APP_CONSTANTS, {
  COLORS,
  NAVIGATION_CONSTANTS,
} from "../../../../constants";
import AppButton from "../../../common/components/button.component";
import AppText from "../../../common/components/typography/text.component";
import UploadFile from "../../../common/components/upload-file.component";
import Loader from "../../../common/components/loader.component";

/**
 * Page for uploading a health professional's valid ID card during sign up
 */
const UploadValidIdCard = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast: any = useToast();

  // Handle the form submit after validation
  const onSubmit = (data: any) => {
    const userInfo = data;

    setIsLoading(true);

    // @TODO Replace this with an actual API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(NAVIGATION_CONSTANTS.SCREENS.AUTH.SIGN_IN_SCREEN);
      toast.show("Your account has been successfully created", {
        type: "success",
      });
    }, APP_CONSTANTS.MOCK_TIME_DELAY_IN_MILLISECONDS);
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <UploadFile uploadAreaText={"Upload a Valid ID Card"} />
      <View style={styles.bottomBar}>
        <AppButton title="Save" onPress={() => onSubmit()} />

        <AppButton
          style={styles.back__to__upload_medical__license__button}
          textStyle={styles.back__to__upload_medical__license__text}
          title="Back To Upload Medical License"
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANTS.SCREENS.AUTH.UPLOAD_MEDICAL_LICENSE_SCREEN
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

  back__to__upload_medical__license__button: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
    marginTop: 20,
  },

  back__to__upload_medical__license__text: {
    color: COLORS.APP_PRIMARY_COLOR,
  },
});

export default UploadValidIdCard;
