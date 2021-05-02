import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * The Main Private Chat screen which shows all the various private chat related functionality
 *
 * @returns
 */
const PrivateChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WELCOME TO THE PRIVATE CHAT SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PrivateChatScreen;
