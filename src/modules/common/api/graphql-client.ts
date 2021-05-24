import { GraphQLClient} from "graphql-request";
import {API_GRAPHQL_URL, API_KEY} from '@env'

/**
 * The GraphQL client used to make requests to our API
 */
export const AppGraphQLClient = new GraphQLClient(API_GRAPHQL_URL, {
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
});