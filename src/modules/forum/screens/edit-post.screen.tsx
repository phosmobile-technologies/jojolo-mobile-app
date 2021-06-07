import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid/non-secure";
import { ReactNativeFile } from "apollo-upload-client";
import { QueryCache } from "react-query";

import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import { ScrollView } from "react-native-gesture-handler";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import ControlledMultilineAppTextInput from "../../common/components/forms/controlled-multi-line-input.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppText from "../../common/components/typography/text.component";
import AppCheckboxInput from "../../common/components/forms/checkbox.component";
import { COLORS, DROPDOWN_OPTIONS } from "../../../constants";
import AppButton from "../../common/components/button.component";
import { APP_STYLES } from "../../common/styles";
import {
  CreatePostInput,
  fetcher,
  GetPostsFeedDocument,
  GetPostsFeedQuery,
  GetPostsFeedQueryVariables,
  Post,
  PostsSortType,
  useGetPostsFeedQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import { useToast } from "react-native-fast-toast";
import { queryClient } from "../../../providers/query-client.context";
import Loader from "../../common/components/loader.component";

const schema = yup.object().shape({
  title: yup.string().required("Please provide valid content"),
  content: yup.string().required("Please provide a title"),
});

interface EditPostScreenProps {
  sortType: PostsSortType;
}

/**
 * Page used for editing a post
 *
 * @param param0
 * @returns
 */
const EditPostScreen = ({ sortType }: EditPostScreenProps) => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const toast: any = useToast();

  const { post } = route.params;
  const [postAnonymously, setPostAnonymously] = useState(
    post.posted_anonymously ? post.posted_anonymously : false
  );
  const [images, setImages] = useState([] as Array<object>);
  const { authenticatedUser } = useAuthenticatedUser();
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
      headerTitle: () => <AppHeaderTitle text={"Edit Post"} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

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
   * Callback called by the ImagePicker library when adding images to a post
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
   * Function for removing images added to a post
   *
   * @param uri
   */
  const removeImage = (index: number) => {
    setImages(images.filter((image, imageIndex) => imageIndex !== index));
  };

  const refreshFeed = () => {
    useGetPostsFeedQuery(AppGraphQLClient);
  };

  /**
   * Mutation for editing a post
   */
  const { mutate: editPost, isLoading } = useUpdatePostMutation(
    AppGraphQLClient,
    {
      onSuccess: async (response) => {
        const { id, ...updatedPostData } = response.UpdatePost;
        const queryKey = useGetPostsFeedQuery.getKey({
          input: { sortType: sortType },
        });
        // queryClient.invalidateQueries(queryKey);
        const feedData = queryClient.getQueryData(queryKey);

        console.log(queryKey);
        console.log(feedData);

        toast.show("Post updated successfully", {
          type: "success",
        });

        navigation.goBack();
      },

      onError: (err) => {
        toast.show("Failed to edit your post. Please try again", {
          type: "error",
        });
      },

      onMutate: async (editedPost) => {
        console.log(editedPost);
      },
    }
  );

  /**
   * Send edited post data to the api
   *
   * @todo add multi select tag
   * @param data
   */
  const onSubmit = (data: any) => {
    const editedPost: CreatePostInput = {
      content: data.content,
      title: data.title,
      posted_anonymously: postAnonymously,
      images, //@TODO add this back when the issue with uploading images is resolved
      tags: [data.tags],
      user_id: authenticatedUser?.id,
    };

    editPost({ id: post.id, input: editedPost });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Loader loading={isLoading} />
        <View style={styles.form__input__wrapper}>
          <ControlledAppTextInput
            name={"title"}
            label={"Title Of Post"}
            defaultValue={post.title}
            control={control}
            error={errors.title}
          />
          <ControlledMultilineAppTextInput
            name={"content"}
            label={"Content Of Post"}
            defaultValue={post.content}
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
            title="Edit Post"
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

export default EditPostScreen;
