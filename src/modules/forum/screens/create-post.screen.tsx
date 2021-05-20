import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import AppText from "../../common/components/typography/text.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppButton from "../../common/components/button.component";
import { COLORS, DROPDOWN_OPTIONS } from "../../../constants";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import { APP_STYLES } from "../../common/styles";
import AppCheckboxInput from "../../common/components/forms/checkbox.component";
import { CreatePostInput } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import { useToast } from "react-native-fast-toast";
import Loader from "../../common/components/loader.component";
import ControlledMultilineAppTextInput from "../../common/components/forms/controlled-multi-line-input.component";
import { useNavigation } from "@react-navigation/native";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";

const schema = yup.object().shape({
  title: yup.string().required("Please provide valid content"),
  content: yup.string().required("Please provide a title"),
});

/**
 * Page used for creating a new post.
 *
 * @returns
 */

const CreatePostScreen = () => {
  const navigation = useNavigation() as any;
  const toast: any = useToast();

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={"New Post"} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let options = {
    includeBase64: true,
    mediaType: "photo",
  };

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

  const [postAnonymously, setPostAnonymously] = useState(false);
  const [images, setImages] = useState([] as Array<string>);

  /**
   * Callback called by the ImagePicker library when adding images to a new post
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
      setImages([...images, result.uri]);
    }
  };

  /**
   * Function for removing images added to a new post about to be created
   *
   * @param uri
   */
  const removeImage = (uri: string) => {
    setImages(images.filter((image) => uri !== image));
  };

  /**
   * Send new post data to the api
   *
   * @todo add hook to get authenticated user and all multi select tag
   * @param data
   */
  const onSubmit = (data: any) => {
    const post: CreatePostInput = {
      content: data.content,
      title: data.title,
      posted_anonymously: postAnonymously,
      images,
      tags: [data.tags],
      user_id: 1,
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form__input__wrapper}>
          <ControlledAppTextInput
            name={"title"}
            label={"Title Of Post"}
            defaultValue={""}
            control={control}
            error={errors.title}
          />
          <ControlledMultilineAppTextInput
            name={"content"}
            label={"Content Of Post"}
            defaultValue={""}
            control={control}
            error={errors.content}
          />
          <ControlledAppDropdownInput
            options={DROPDOWN_OPTIONS.POST_TAGS}
            control={control}
            defaultValue={""}
            name={"tags"}
            label={"Select Tag(s)"}
          />
          <View style={styles.add__image__and__post__anonymously__container}>
            <TouchableOpacity
              style={styles.add__image}
              onPress={handleChoosePhoto}
            >
              <SvgIcon iconName={SVG_ICONS.ADD_PHOTO_ICON} />
              <AppText style={styles.add__image__text}>Add Image</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.post__anonymously}>
              <AppCheckboxInput
                label={""}
                value={postAnonymously}
                setValue={setPostAnonymously}
                textStyle={{
                  color: COLORS.APP_BLACK_ICON,
                }}
              />
              <AppText style={{ fontSize: 18 }}>Post Anonymously?</AppText>
            </TouchableOpacity>
          </View>
        </View>
        {images && (
          <View style={styles.image__preview__container}>
            {images.map((imageUri) => (
              <>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.image__preview}
                />
                <TouchableWithoutFeedback onPress={() => removeImage(imageUri)}>
                  <SvgIcon
                    iconName={SVG_ICONS.BLACK_CANCEL_ICON}
                    style={styles.image__preview__cancel__icon}
                  />
                </TouchableWithoutFeedback>
              </>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={APP_STYLES.screen__bottom__bar__button}>
        <AppButton
          type="submit"
          title="Send Post"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  add__image: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  add__image__text: {
    fontSize: 18,
    marginLeft: 10,
  },

  form__input__wrapper: {
    padding: 20,
  },

  post__anonymously: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  image__preview__container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  image__preview: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },

  image__preview__cancel__icon: {
    left: -15,
  },

  add__image__and__post__anonymously__container: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

export default CreatePostScreen;
