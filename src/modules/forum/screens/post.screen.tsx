import * as React from "react";
import { View, Image, StyleSheet, TextInput, Text } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import useAnimatedGestureHandler from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import PostModel from "../models/post.model";
import Post from "../components/posts/post.component";
import AppText from "../../common/components/typography/app-text.component";
import { CommentFeed } from "../components/posts/post-comment.component";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { createRef } from "react";

const PostScreen = ({ route }: { route: any }) => {
  const { post }: { post: PostModel } = route.params;

  const bs = createRef();
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const renderCommentBox = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          height: 100,
        }}
      >
        <AppText>
          Commenting On{"  "}
          <Text style={{ color: "green" }}>My Baby is Struggling</Text>
        </AppText>
        <View>
          <TextInput
            style={styles.textBox}
            placeholder="Add a comment"
            placeholderTextColor="#A0A4A8;"
          />
        </View>

        <View style={styles.reply}>
          <TouchableWithoutFeedback
            onPress={() => {
              sheetRef.current.snapTo(1);
            }}
          >
            <AppText>Reply</AppText>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  return (
    <>
      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 4.0)),
          flex: 1,
        }}
      >
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
                <CommentFeed />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: 500,
              height: 70,
              top: 20,
              marginLeft: -20,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => sheetRef.current.snapTo(0)}
            >
              <View style={styles.textInput} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Animated.View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 0, 0]}
        initialSnap={0}
        borderRadius={10}
        callbackNode={fall}
        renderContent={renderCommentBox}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    height: 48,
    margin: 12,
    borderRadius: 10,
    width: 327,
    marginBottom: -12,
    backgroundColor: "#EDEDED",
    left: 10,
  },
  text: {
    fontSize: 19,
    fontWeight: "600",
    padding: 10,
  },
  textBox: {
    paddingVertical: 2,
    fontSize: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    height: 48,
  },
  reply: {
    bottom: -10,
    left: 300,
  },
});

export default PostScreen;
