import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppActivityIndicator from "../../../common/components/app-activity-indicator.component";

import SvgIcon, {
  SVG_ICONS,
} from "../../../common/components/svg-icon.component";
import AppText from "../../../common/components/typography/app-text.component";
import { COLORS } from "../../../common/constants";
import { getComments } from "../../api/posts.api";
import Comment from "../../models/comment.model";
import CommentList from "./comment-list.component";

interface stateShape {
  isLoading: boolean;
  loadingError: boolean;
  comments: Comment[];
}

/**
 * The comments page
 *
 * @returns
 */

export const CommentFeed = () => {
  const [state, setState] = useState<stateShape>({
    isLoading: true,
    loadingError: false,
    comments: [],
  });

  /**
   * Get The Comments from the Api
   */
  const fetchComments = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    try {
      const comments = await getComments();
      setState({
        ...state,
        comments,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        loadingError: true,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (state.isLoading) {
    return <AppActivityIndicator text={"loading comments.."} />;
  }
  return (
    <SafeAreaView>
      <CommentList comments={state.comments} />
    </SafeAreaView>
  );
};
