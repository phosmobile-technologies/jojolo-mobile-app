import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import AppText from "../../common/components/typography/text.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppButton from "../../common/components/button.component";
import { COLORS, DROPDOWN_OPTIONS } from "../../../constants";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import { APP_STYLES } from "../../common/styles";
import AppCheckboxInput from "../../common/components/forms/checkbox.component";
import { CreatePostInput } from "../../../generated/graphql";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [postAnonymously, setPostAnonymously] = useState(false);

  const onSubmit = (data: any) => {
    const post: CreatePostInput = {
      ...data,
      posted_anonymously: postAnonymously,
    };
    console.log(post);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form__input__wrapper}>
        <ControlledAppTextInput
          name={"title"}
          label={"Title Of Post"}
          defaultValue={""}
          control={control}
          error={errors.title}
        />
        <ControlledAppTextInput
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
          name={"select_tags"}
          label={"Select Tag(s)"}
        />
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.add__image}>
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
  bottomActions: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  bottomBar: {
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

export default CreatePostScreen;
