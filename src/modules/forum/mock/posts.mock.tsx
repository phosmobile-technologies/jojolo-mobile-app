import Post from "../models/post.model";
import Comment from "../models/comment.model";
import * as faker from "faker";
import { User, UserRole } from "../../common/models/user.model";

/**
 * Get fake posts
 *
 * @param count
 * @returns
 */
export const getFakePosts = (count: number = 5): Post[] => {
  return Array(count)
    .fill(0)
    .map((index) => ({
      id: faker.datatype.number(1000000),
      uuid: faker.datatype.uuid(),
      title: faker.datatype.string(50),
      content: faker.datatype.string(500),
      tags: getFakeTags(faker.datatype.number(5)),
      likes: faker.datatype.number(1000),
      comments: [],
      created_by: getFakeUsers()[0],
    }));
};

/**
 * Get fake tags
 *
 * @param count
 * @returns
 */
export const getFakeTags = (count: number = 1) => {
  return Array(count)
    .fill(0)
    .map((index) => ({
      id: faker.datatype.number(1000000),
      uuid: faker.datatype.uuid(),
      text: faker.datatype.string(50),
      count: faker.datatype.number(10000),
    }));
};

/**
 * Get fake users
 *
 * @param count
 * @returns
 */
export const getFakeUsers = (count: number = 1): User[] => {
  return Array(count)
    .fill(0)
    .map((index) => ({
      id: faker.datatype.number(1000000),
      uuid: faker.datatype.uuid(),
      profile_image: faker.internet.url(),
      role: faker.random.arrayElement(Object.values(UserRole)) as UserRole,
      number_of_points: faker.datatype.number(1000000),
    }));
};

/**
 * Get fake comments for a post
 *
 * @param count
 * @returns
 */
export const getFakeComments = (count: number = 1): Comment[] => {
  return Array(count)
    .fill(0)
    .map((index) => ({
      id: faker.datatype.number(1000000),
      uuid: faker.datatype.uuid(),
      content: faker.datatype.string(500),
      likes: faker.datatype.number(1000),
    }));
};
