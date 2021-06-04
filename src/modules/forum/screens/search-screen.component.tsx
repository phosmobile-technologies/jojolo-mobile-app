import React, { useState, useCallback } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
} from "react-native-easy-content-loader";
import { useNavigation } from "@react-navigation/native";
import { debounce, throttle } from "lodash";

import ControlledAppTextInput from "../../common/components/forms/controlled-text-input.component";
import AppText from "../../common/components/typography/text.component";
import SvgIcon, { SVG_ICONS } from "../../common/components/svg-icon.component";
import { COLORS } from "../../../constants";
import AppHeaderGoBackButton from "../../common/components/header/app-header-go-back-button.component";
import AppHeaderTitle from "../../common/components/header/app-header-title.component";
import { useAuthenticatedUser } from "../../../providers/user-context";
import { useSearchPostsQuery } from "../../../generated/graphql";
import { AppGraphQLClient } from "../../common/api/graphql-client";
import PostsList from "../components/posts/posts-list.component";
import Loader from "../../common/components/loader.component";
import { useToast } from "react-native-fast-toast";

/**
 * @TODO clean this code up and add debouncing and loading icon
 * @returns
 */
const SearchScreen = () => {
  const navigation = useNavigation() as any;
  const { authenticatedUser } = useAuthenticatedUser();
  const toast = useToast();

  /**
   * Customize the navigation header components for the screen
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeaderGoBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => <AppHeaderTitle text={""} />,
      headerRight: () => <></>,
    });
  }, [navigation]);

  const [searchQuery, setSearchQuery] = useState("");
  // let posts = [];

  let { data: posts, isLoading } = useSearchPostsQuery(AppGraphQLClient, {
    input: { search_query: searchQuery },
  });

  // const debouncedSearch = useCallback(
  //   throttle((searchQueryObject) => console.log(searchQueryObject), 500),
  //   [] // will be created only once initially
  // );

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const searchPosts = (text: string) => {
    if (!text) {
      return;
    }

    setSearchQuery(text);

    const searchQueryObject = {
      searchQuery: text,
      user_id: authenticatedUser?.id,
    };
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.input}
        placeholder={"Search for posts using keywords"}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {isLoading && <FacebookLoader loading={isLoading} />}
      {!posts?.SearchPosts?.length && !isLoading ? (
        <View style={styles.content__wrapper}>
          <View>
            <SvgIcon style={styles.icon} iconName={SVG_ICONS.BIG_SEARCH_ICON} />
          </View>
          <View style={styles.noPost}>
            <AppText style={styles.text}>No Post</AppText>
          </View>

          <AppText style={styles.keyword}>
            Enter a keyword you’re trying to find and search for a post
          </AppText>
        </View>
      ) : (
        <></>
      )}
      {posts?.SearchPosts?.length > 0 && (
        <PostsList posts={posts?.SearchPosts} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  content__wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    lineHeight: 28,
  },
  input: {
    backgroundColor: COLORS.APP_GRAY_BACKGROUND,
    marginBottom: 20,
    height: 50,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  icon: {
    paddingTop: 20,
    top: 30,
  },
  noPost: {
    marginVertical: 20,
  },
  keyword: {
    marginHorizontal: 50,
    marginVertical: 5,
    textAlign: "center",
  },
});

export default SearchScreen;
