import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-fast-toast";
import { useQueryClient } from "react-query";
import * as ImagePicker from "expo-image-picker";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ReactNativeFile } from "apollo-upload-client";
import { nanoid } from "nanoid/non-secure";

import AppText from "../../common/components/typography/text.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppButton from "../../common/components/button.component";
import { COLORS, DROPDOWN_OPTIONS } from "../../../constants";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import { APP_STYLES } from "../../common/styles";
import AppCheckboxInput from "../../common/components/forms/checkbox.component";
import {
  CreatePostInput,
  useCreatePostMutation,
  useGetPostsFeedQuery,
} from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import ControlledMultilineAppTextInput from "../../common/components/forms/controlled-multi-line-input.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import { useAuthenticatedUser } from "../../../providers/user-context";

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
  const route: any = useRoute();
  const queryClient = useQueryClient();

  const [postAnonymously, setPostAnonymously] = useState(false);
  const [images, setImages] = useState([] as Array<object>);
  const { authenticatedUser } = useAuthenticatedUser();

  // Form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  /**
   * Mutation for creating a new post
   */
  const { mutate: createPost, isLoading } = useCreatePostMutation(
    AppGraphQLClient,
    {
      onSuccess: async (response) => {
        const { id } = response.CreatePost;

        toast.show("Post created successfully", {
          type: "success",
        });

        // const queryKey = useGetPostsFeedQuery.getKey();
        // queryClient.invalidateQueries(queryKey);

        navigation.goBack({
          refresh: true,
        });
      },

      onError: (err) => {
        toast.show("Failed to create your post. Please try again", {
          type: "error",
        });
      },

      onMutate: () => {},
    }
  );

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
      let uri = result.uri.toString();
      let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);

      const file = new ReactNativeFile({
        uri: result.uri,
        type: `${result.type}/${fileExtension}`,
        name: `${nanoid()}.${fileExtension}`,
      });

      console.log(file);

      setImages([...images, file]);
    }
  };

  /**
   * Function for removing images added to a new post about to be created
   *
   * @param uri
   */
  const removeImage = (index: number) => {
    setImages(images.filter((image, imageIndex) => imageIndex !== index));
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
      images, //@TODO add this back when the issue with uploading images is resolved
      tags: [data.tags],
      user_id: authenticatedUser?.id,
    };

    createPost({ input: post });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loader loading={isLoading} />
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
              <SvgIcon
                iconName={SVG_ICONS.ADD_PHOTO_ICON}
                style={{ fontSize: 14 }}
                height={20}
              />
              <AppText style={styles.add__image__text}>Add Image</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.post__anonymously}>
              <AppCheckboxInput
                label={""}
                value={postAnonymously}
                setValue={setPostAnonymously}
                textStyle={{ color: COLORS.APP_BLACK_TEXT, fontSize: 14 }}
                size={20}
                fillColor={COLORS.APP_PRIMARY_COLOR}
                iconStyle={{ borderColor: COLORS.APP_PRIMARY_COLOR }}
              />
              <AppText style={{ fontSize: 14, marginLeft: -10 }}>
                Post Anonymously?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        {images && (
          <View style={styles.image__preview__container}>
            {images.map((image, index) => (
              <View key={index.toString()} style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image__preview}
                />
                <TouchableWithoutFeedback onPress={() => removeImage(index)}>
                  <SvgIcon
                    iconName={SVG_ICONS.BLACK_CANCEL_ICON}
                    style={styles.image__preview__cancel__icon}
                  />
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        )}
        <View style={APP_STYLES.screen__bottom__bar__button}>
          <AppButton
            type="submit"
            title="Send Post"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
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
    alignItems: "flex-end",
    flexDirection: "row",
  },

  add__image__text: {
    fontSize: 14,
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
    marginLeft: 5,
    marginVertical: 5,
    borderRadius: 10,
  },

  image__preview__cancel__icon: {
    left: -3,
    zIndex: 1000,
    elevation: 1000,
  },

  add__image__and__post__anonymously__container: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  bottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

export default CreatePostScreen;
