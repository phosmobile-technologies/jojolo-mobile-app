import { gql } from "graphql-request";

import { PostsSortType } from "../../../generated/graphql";
import { AppGraphQLClient } from '../../common/api/graphql-client';

const fetchForumPostFeedQuery = gql`query GetPostsFeed($input: GetPostsFeedInput) {
  GetPostsFeed(input: $input) {
    id
    uuid
    title
    likes
    content
    comments {
      id
    }
    tags {
      id
      name
    }
    user {
      id
      full_name
      phone_number
      email
      user_type
      profile_image
      care_giver_profile {
        id
        role
      }
      health_care_professional_profile {
        id
        role
        years_of_experience
      }
    }
    created_at
  }
}
`;



/**
 * Get the paginated list of posts in the forum
 */
export const fetchForumPostFeed = async (cursor: number = 0, sortType: PostsSortType = PostsSortType.Latest) => {
  const variables = {
    input: {
      cursor,
      sortType
    }
  }

  const posts = await AppGraphQLClient.request(fetchForumPostFeedQuery, variables)
  return posts
}