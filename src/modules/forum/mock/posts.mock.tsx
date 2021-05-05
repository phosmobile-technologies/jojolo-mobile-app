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
      title: faker.random.words(10),
      content: faker.random.words(100),
      tags: getFakeTags(2),
      likes: faker.datatype.number(1000),
      comments: [],
      user: getFakeUsers()[0],
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
      text: faker.random.words(1),
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
      full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      profile_image: "https://i.pravatar.cc/200",
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
      user: getFakeUsers()[0],
      id: faker.datatype.number(1000000),
      uuid: faker.datatype.uuid(),
      content: faker.random.words(45),
      likes: faker.datatype.number(1000),
    }));
};
