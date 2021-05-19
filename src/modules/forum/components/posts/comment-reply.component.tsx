import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import AppActivityIndicator from "../../../common/components/activity-indicator.component";
import { getComments } from "../../api/posts.api";
import Comment from "../../models/comment.model";
import ReplyList from "./reply-list.component";

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

export const ReplyFeed = (openBottomsheet: any) => {
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

  return (
    <SafeAreaView>
      <ReplyList comments={state.comments} openBottomsheet={openBottomsheet} />
    </SafeAreaView>
  );
};