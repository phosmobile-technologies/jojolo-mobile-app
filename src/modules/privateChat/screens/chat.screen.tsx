import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Actions,
  ActionsProps,
  Bubble,
  GiftedChat,
  InputToolbar,
  MessageImage,
  Send,
} from "react-native-gifted-chat";
import { COLORS } from "../../../constants";
import * as ImagePicker from "expo-image-picker";

import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppText from "../../common/components/typography/text.component";

/**
 * Function Handling the Display of the chatscreen with Medical Personnel
 *
 *
 *
 *
 * @todo: Fix ability to send messages without text feature.
 * @returns
 *
 */
const ChatScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { user }: { user: any } = route.params;

  const [images, setImages] = useState("");
  const [messages, setMessages] = useState([] as any);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Yo",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: user.profile_image,
        },
      },
    ]);
  }, []);

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
   * Callback called by the ImagePicker library when sending images as messages
   */
  const handleChoosePhoto = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 4],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImages(result.uri);
    }

    if (!messages) {
      setMessages("Image Upload");
    }
  };

  /**
   *
   * Hook for customizing navigation header and title for chat sreen.
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <>
          <View style={styles.header}>
            <Image
              source={{ uri: user.profile_image }}
              style={styles.header__avatar}
            />
            <AppText style={styles.header__title}>{user.full_name}</AppText>
          </View>
        </>
      ),
      headerRight: () => <></>,
    });
  }, [navigation]);

  /**
   * Function To customize Text Input for message composer that will then be passed down to gifted child props
   * @param props
   * @returns
   */

  const renderInput = (props: any) => {
    return (
      <>
        <InputToolbar {...props} containerStyle={styles.text__input} />
      </>
    );
  };

  /**
   * Function to render send button for the input container of the chat screen
   * @param props
   * @returns
   */
  const renderSend = (props: any) => {
    return (
      <>
        <Send {...props}>
          <TouchableOpacity>
            <SvgIcon iconName={SVG_ICONS.SEND_CHAT} style={styles.send__icon} />
          </TouchableOpacity>
        </Send>
      </>
    );
  };

  /**
   * Function For Rendering Image Icon And Calling the Image Picker Function
   * @param props
   * @returns
   */
  function renderActions(props: Readonly<ActionsProps>) {
    return (
      <Actions
        {...props}
        options={{
          ["Open Gallery"]: handleChoosePhoto,
          ["Open Camera"]: () => {
            console.log("no camera yet");
          },
        }}
        icon={() => (
          <TouchableOpacity>
            <SvgIcon
              iconName={SVG_ICONS.SEND_IMAGE_IN_CHAT}
              style={styles.send__icon}
            />
          </TouchableOpacity>
        )}
        onSend={() => console.log(images)}
      />
    );
  }

  /**
   * Function For Rendering image container
   * @param props
   * @returns
   */
  const renderMessageImage = (props: any) => {
    return (
      <MessageImage
        {...props}
        imageStyle={{
          width: 250,
          height: 200,
          borderRadius: 13,
          margin: 3,
          resizeMode: "cover",
        }}
      />
    );
  };

  /**
   * Function to render Message container for the chat page
   * @param props
   * @returns
   */
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.APP_PRIMARY_COLOR,
          },
          left: {
            backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.WHITE,
            fontSize: 16,
          },
          left: {
            color: COLORS.APP_BLACK_TEXT,
            fontSize: 16,
          },
        }}
      />
    );
  };

  /**
   *
   */
  const onSend = useCallback((messages = [], image?) => {
    !messages[0].text && setMessages((messages[0].text = "Images"));
    const msg = {
      ...messages[0],
      image,
    };
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, msg)
    );
    setImages("");
    console.log(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages, images)}
      user={{
        _id: 1,
      }}
      alwaysShowSend
      renderBubble={renderBubble}
      renderInputToolbar={renderInput}
      renderSend={renderSend}
      renderChatFooter={() => <View style={{ height: 10 }} />}
      renderAvatar={() => <></>}
      renderActions={renderActions}
      renderMessageImage={renderMessageImage}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  header__avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  text__input: {
    borderRadius: 10,

    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
  },
  header__title: {
    fontSize: 19,
    alignItems: "center",
    alignContent: "center",
  },
  send__icon: {
    marginBottom: 7,
  },
});

export default ChatScreen;
