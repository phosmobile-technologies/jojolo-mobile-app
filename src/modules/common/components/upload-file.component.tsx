import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { COLORS } from "../../../constants";
import SvgIcon, { SVG_ICONS } from "./svg-icon.component";

import AppText from "./typography/text.component";

/**
 * Upload a file
 */
const UploadFile = ({ uploadAreaText = "Upload your file" }) => {
  const [file, setFile] = React.useState(null);

  /**
   * Get camera permissions
   */
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const createFormData = (photo: any, body = {} as any) => {
    const data = new FormData();

    data.append("photo", {
      type: photo.type,
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  /**
   * Called when the user clicks on the upload image component
   */
  const handleChoosePhoto = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setFile(result);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleChoosePhoto()}>
        <View style={styles.upload_area__wrapper}>
          <SvgIcon
            iconName={SVG_ICONS.UPLOAD_ICON}
            color={COLORS.APP_PRIMARY_COLOR}
          />
          <AppText style={styles.upload_area__text}>{uploadAreaText}</AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  upload_area__wrapper: {
    height: 150,
    padding: 50,
    borderWidth: 2,
    borderColor: COLORS.APP_PRIMARY_COLOR,
    borderStyle: "dashed",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },

  upload_area__text: {
    color: COLORS.APP_PRIMARY_COLOR,
    fontSize: 14,
    marginTop: 5,
  },
});

export default UploadFile;
