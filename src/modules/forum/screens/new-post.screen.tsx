import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  Modal,
} from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useController } from "react-hook-form";

import PostModel from "../models/post.model";
import Post from "../components/posts/post.component";
import AppText from "../../common/components/typography/text.component";
import { CommentFeed } from "../components/posts/post-comment.component";
import { COLORS } from "../../common/constants";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { Picker } from "@react-native-picker/picker";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import ControlledAppDropdownInput from "../../common/components/forms/controlled-dropdown-input.component";
import Loader from "../../common/components/loader.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppTextInput from "../../common/components/forms/text-input.component";
import AppButton from "../../common/components/button.component";

const schema = yup.object().shape({
  title: yup.string().required("Please provide valid content"),
  content: yup.string().required("Please provide a title"),
});

const CreatePostScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const post = data;
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
        <ControlledAppTextInput
          name={"select_tags"}
          label={"Select Tag(s)"}
          defaultValue={""}
          control={control}
          error={errors.phone_number}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 25,
            }}
          >
            <SvgIcon iconName={SVG_ICONS.ADD_PHOTO_ICON} />
            <AppText style={{ padding: 10, fontSize: 18 }}>Add Image</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <AppText style={{ fontSize: 18 }}>Post Anonymously?</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sendPost}>
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
    padding: 24,
  },
  title: {},
  picker: {
    paddingTop: 10,
    alignItems: "center",
  },
  titleInput: {
    width: 400,
    backgroundColor: "blue",
    borderRadius: 10,
    height: 60,
    marginTop: 10,
  },
  contentInput: {
    width: 400,
    borderRadius: 10,
    height: 60,
    marginTop: 10,
  },
  form__input__wrapper: {},
  bottomBar: {
    paddingVertical: 50,
  },
  sendPost: {
    top: 179,
  },
  sendPostText: {
    padding: 25,
    width: 400,
    backgroundColor: COLORS.PRIMARY_COLOR,
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 19,
  },
  content: {
    height: 120,
  },
  button: {
    padding: 30,
    left: 15,
    top: 6,
  },
  dropDown: {
    backgroundColor: COLORS.GRAY_BACKGROUND,
    paddingHorizontal: 20,
  },
});

export default CreatePostScreen;
