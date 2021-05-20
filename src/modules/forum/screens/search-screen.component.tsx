import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";

import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";

import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";

const SearchScreen = () => {
  const navigation = useNavigation() as any;

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={"Search Post"} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

  const [searchQuery, setSearchQuery] = useState("");

  const searchAction = (text: string) => {
    setSearchQuery(text);
    const searchQueryObject = {
      searchQuery: searchQuery,
      user_id: "User", //This will Change Once User Authentication Has Been Carried Out And User can be Accsessed globally
    };
    console.log(searchQueryObject);
  };

  return (
    <View style={styles.container}>
      <View>
        {/* @TODO Change this to use controlled input */}
        <Searchbar
          style={styles.input}
          placeholder={"search for a post using keyword"}
          onChangeText={(text) => searchAction(text)}
          value={searchQuery}
        />
      </View>
      <View>
        <SvgIcon style={styles.icon} iconName={SVG_ICONS.BIG_SEARCH_ICON} />
      </View>
      <View style={styles.noPost}>
        <AppText style={styles.text}>No Post</AppText>
      </View>
      <View style={styles.keyword}>
        <AppText>
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
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    marginVertical: 20,
    height: 50,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: MarginProportions,
    paddingTop: 20,
    top: 30,
  },
  noPost: {
    marginHorizontal: 159,
    marginVertical: 10,
  },
  keyword: {
    marginHorizontal: 50,
    marginVertical: 5,
    alignContent: "center",
  },
});

export default SearchScreen;
