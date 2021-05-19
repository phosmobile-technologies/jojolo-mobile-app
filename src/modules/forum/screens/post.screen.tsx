import * as React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { BottomSheet } from "react-native-btr";

import PostModel from "../models/post.model";
import Post from "../components/posts/post-details.component";
import AppText from "../../common/components/typography/text.component";
import { CommentFeed } from "../components/posts/post-comment.component";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useState } from "react";
import { COLORS } from "../../../constants";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";

const PostDetailsScreen = ({ route }: { route: any }) => {
  const { post }: { post: PostModel } = route.params;

  const [visible, setVisible] = useState(false);

  const toggleBottomSheet = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Post
              post={post}
              isFullPage={true}
              allowNavigationToPostDetails={false}
            />
            <View>
              <AppText style={styles.text}>Comments(4)</AppText>
            </View>
            <View>
              <CommentFeed openBottomsheet={toggleBottomSheet} />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            marginHorizontal: -10,
            height: 70,
            top: 11,
          }}
        >
          <TouchableWithoutFeedback onPress={toggleBottomSheet}>
            <View style={styles.textInput} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomSheet}
        onBackdropPress={toggleBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.commenting__title}>
              Commenting On{"  "}
              <Text style={{ color: COLORS.APP_PRIMARY_COLOR }}>
                My Baby is Struggling
              </Text>
            </AppText>
            <TouchableWithoutFeedback onPress={toggleBottomSheet}>
              <SvgIcon
                iconName={SVG_ICONS.CLOSE_ICON}
                style={{ paddingLeft: 50, top: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TextInput
              style={styles.textBox}
              placeholder="Add a comment"
              placeholderTextColor={COLORS.APP_GRAY_TEXT}
            />
          </View>

          <View style={styles.reply}>
            <TouchableWithoutFeedback onPress={toggleBottomSheet}>
              <AppText style={styles.reply__text}>Reply</AppText>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    flex: 1,
    flexDirection: "column",
  },
  bottomSheetContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    height: 48,
    margin: 12,
    borderRadius: 10,

    marginBottom: -1,
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
  },
  text: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 10,
  },
  textBox: {
    marginVertical: 0,
    paddingVertical: 10,
    fontSize: 15,
  },
  reply: {
    borderTopWidth: 1,
    marginVertical: 50,
    alignItems: "flex-end",
    borderTopColor: COLORS.APP_LIGHT_GRAY_BACKGROUND,
    marginHorizontal: -10,
    paddingHorizontal: 30,
  },
  reply__text: {
    fontSize: 20,
    paddingTop: 10,
    color: COLORS.APP_PRIMARY_COLOR,
  },
  commenting__title: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default PostDetailsScreen;
