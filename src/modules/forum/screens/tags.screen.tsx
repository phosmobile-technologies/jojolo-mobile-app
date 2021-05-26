import React from "react";
import { ScrollView, Text, FlatList, View, StyleSheet } from "react-native";
import TagComponent from "../components/tag.component";

/**
 * The user's forum tags page
 *
 * @returns
 */

const tags = [
  {
    id: "1",
    name: "Test Tag 1",
    number: "3",
  },
  {
    id: "2",
    name: "Test Tag 2",
    number: "4",
  },
  {
    id: "3",
    name: "Test Tag 3",
    number: "3",
  },
  // {
  //   id: "4",
  //   name: "Feeding",
  //   number: "15",
  // },
  // {
  //   id: "5",
  //   name: "Stooling",
  //   number: "3",
  // },
  // {
  //   id: "6",
  //   name: "Illness",
  //   number: "5",
  // },
];

export const TagsPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          style={styles.feed}
          data={tags}
          renderItem={(item: any) => <TagComponent tag={item} />}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  feed: {
    marginHorizontal: 16,
  },
});
export default TagsPage;
