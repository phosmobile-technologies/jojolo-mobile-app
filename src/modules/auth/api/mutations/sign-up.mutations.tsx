import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";

import { APP_CONSTANTS } from "../../../../constants";
import { AUTH_API } from "../../../../api-constants";
import { SignUpCareGiverDto } from "../auth.dto";
import { AppGraphQLClient } from "../../../common/api/graphql-client";

export const useSignUpCareGiver = (input: SignUpCareGiverDto) => {
  return useMutation(
    [AUTH_API.MUTATIONS.SIGN_UP_CARE_GIVER, input],
    async () => {
      const {
        SignUpCareGiver: { data },
      } = await AppGraphQLClient.request(
        gql`
          mutation {
            posts {
              data {
                id
                title
              }
            }
          }
        `
      );
      return data;
    }
  );
};
