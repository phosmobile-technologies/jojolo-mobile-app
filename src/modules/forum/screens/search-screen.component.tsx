import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";

import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS } from "../../common/constants";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"🔍 search for post using keyword"}
        />
      </View>
      <View>
        <SvgIcon style={styles.icon} iconName={SVG_ICONS.BIG_SEARCH_ICON} />
      </View>
      <View style={styles.noPost}>
        <AppText style={styles.text}>No Post</AppText>
      </View>
      <View style={styles.keyword}>
        <AppText style={styles.text2}>
          Enter a keyword you’re trying to find and search for a post
        </AppText>
      </View>
    </View>
  );
};

const HeightProportions = "100%";
const MarginProportions = "10%";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    height: HeightProportions,
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    lineHeight: 28,
  },
  input: {
    backgroundColor: COLORS.GRAY_BACKGROUND,
    width: 300,
    height: 50,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: MarginProportions,
  },
  icon: {
    marginHorizontal: MarginProportions,
    paddingTop: 20,
    top: 30,
  },
  noPost: {
    marginHorizontal: MarginProportions,
    paddingTop: 30,
    left: 130,
  },
  text2: {},
  keyword: {
    paddingTop: 10,
    paddingLeft: 43,
  },
});

export default SearchScreen;
