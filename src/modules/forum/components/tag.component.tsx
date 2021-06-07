import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { COLORS, NAVIGATION_CONSTANTS } from "../../../constants";
import Loader from "../../common/components/loader.component";
import AppText from "../../common/components/typography/text.component";

/**
 * Compoment For Rendering Each Tag
 *
 * @param param0
 * @returns
 */
const TagComponent = ({ tag }: { tag: any }) => {
  const navigation = useNavigation() as any;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(
            NAVIGATION_CONSTANTS.SCREENS.FORUM.TAGS_POST_SCREEN,
            { tag }
          );
        }}
      >
        <View style={styles.tag}>
          <AppText style={styles.tag__text}>{tag.name}</AppText>
          <AppText style={styles.tag__text}>{tag.number_of_posts}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginHorizontal: 35,
    marginTop: 10,
  },
  tag: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    padding: 25,
    width: 300,
    margin: 0,
    borderRadius: 7,
    paddingVertical: 30,
  },
  tag__text: {
    color: COLORS.WHITE,
  },
});

export default TagComponent;
