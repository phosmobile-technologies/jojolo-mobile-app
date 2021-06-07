import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, FlatList, View, StyleSheet } from "react-native";
import { useToast } from "react-native-fast-toast";

import { COLORS } from "../../../constants";
import TagComponent from "../components/tag.component";
import { PostTag, useGetTagsQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import Loader from "../../common/components/loader.component";
import AppText from "../../common/components/typography/text.component";

/**
 * The user's forum tags page
 *
 * @returns
 */
export const TagsPage = () => {
  const toast = useToast();

  // Get the tags list from the API
  const { data, isLoading } = useGetTagsQuery(AppGraphQLClient, undefined, {
    onError: () => {
      toast?.show("Unable to load the tags list. Please retry", {
        type: "danger",
      });
    },
  });

  let tags = data?.GetTags ? (data.GetTags as PostTag[]) : ([] as PostTag[]);

  return (
    <ScrollView style={styles.container}>
      <Loader loading={isLoading} />
      <View>
        {tags.length === 0 && (
          <AppText style={styles.no__tags}>No Tags Available</AppText>
        )}
        {tags && tags.length > 0 && (
          <FlatList
            style={styles.feed}
            data={tags}
            renderItem={({ item }) => <TagComponent tag={item} />}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        )}
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
  no__tags: {
    marginHorizontal: 50,
    marginVertical: 200,
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "800",
    color: COLORS.APP_GRAY_TEXT,
  },
});
export default TagsPage;
