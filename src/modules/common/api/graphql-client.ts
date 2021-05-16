import { GraphQLClient} from "graphql-request";
import { APP_CONSTANTS } from '../../../constants';

/**
 * The GraphQL client used to make requests to our API
 */
export const AppGraphQLClient = new GraphQLClient(APP_CONSTANTS.GRAPHQL_API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
});