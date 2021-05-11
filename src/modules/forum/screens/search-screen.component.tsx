import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";

const SearchScreen = () => {
  return (
    <View>
      <View>
        <TextInput placeholder={"search for post using keyword"} />
      </View>
      <View></View>
    </View>
  );
};

export default SearchScreen;
