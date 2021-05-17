import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import AppText from "../../common/components/typography/text.component";

const TagComponent = ({ tag }: { tag: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.tag}>
          <AppText style={styles.tag__text}>{tag.item.name}</AppText>
          <AppText style={styles.tag__text}>{tag.item.number}</AppText>
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