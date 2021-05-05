import Post from "../models/post.model";
import { getFakeComments, getFakePosts, getFakeTags } from "../mock/posts.mock";
import { MOCK_TIME_DELAY_IN_MILLISECONDS } from "../../common/constants";
import Tag from "../models/tag.model";
import Comment from "../models/comment.model";

/**
 * Get the news feed.
 *
 * @returns
 */
export const getNewsFeed = async (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(getFakePosts(10)),
      MOCK_TIME_DELAY_IN_MILLISECONDS
    );
  });
};

/**
 * Get the user's posts.
 *
 * @returns
 */
export const getMyPosts = async (userUuid: string): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(getFakePosts(10)),
      MOCK_TIME_DELAY_IN_MILLISECONDS
    );
  });
};

/**
 * Get the user's saved posts.
 *
 * @returns
 */
export const getSavedPosts = async (userUuid: string): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(getFakePosts(10)),
      MOCK_TIME_DELAY_IN_MILLISECONDS
    );
  });
};

/**
 * Get the tags.
 *
 * @returns
 */
export const getTags = async (): Promise<Tag[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getFakeTags(10)), MOCK_TIME_DELAY_IN_MILLISECONDS);
  });
};

/**
 * Get The Post Comments.
 *
 * @returns
 */
export const getComments = async (): Promise<Comment[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getFakeComments(4)), 1000);
  });
};
