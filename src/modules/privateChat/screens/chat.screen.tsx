import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { COLORS } from "../../../constants";

import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import AppText from "../../common/components/typography/text.component";

const ChatScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { user }: { user: any } = route.params;

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
  const [messages, setMessages] = useState([] as any);

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

  // const renderActions = (props: Readonly<ActionsProps>) => {
  //   return (
  //     <View>
  //       <Actions
  //         {...props}
  //         options={{
  //           ["Send Image"]: () => {},
  //         }}
  //         icon={() => (
  //           <SvgIcon iconName={SVG_ICONS.SEND_CHAT} style={styles.send__icon} />
  //         )}
  //         onSend={(args: any) => console.log(args)}
  //       />
  //     </View>
  //   );
  // };

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
            paddingEnd: 25,
          },
          left: {
            backgroundColor: COLORS.APP_PRIMARY_COLOR_LIGHT,
            paddingEnd: 25,
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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      alwaysShowSend
      renderBubble={renderBubble}
      renderInputToolbar={renderInput}
      renderSend={renderSend}
      renderChatFooter={() => <View style={{ height: 30 }} />}
      renderAvatar={() => <></>}
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
    height: 70,
  },
});

export default ChatScreen;
