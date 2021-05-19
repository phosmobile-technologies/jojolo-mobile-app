import { GraphQLClient} from "graphql-request";
import {API_GRAPHQL_URL} from '@env'

/**
 * The GraphQL client used to make requests to our API
 */
export const AppGraphQLClient = new GraphQLClient(API_GRAPHQL_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
});