import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult, UseQueryOptions } from "react-query";
import gqlRequest from "graphql-request";

interface UseQueryFn<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
> {
  (variables: TVariables, options?: UseQueryOptions<TData>): unknown
  document: string
  getKey: (variables: TVariables) => unknown[]
}

export function useInfiniteGraphQLQuery<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
>(
  useQuery: UseQueryFn<TData, TVariables>,
  getVariables: ({ pageParam }: { pageParam?: number }) => TVariables,
  options?: UseInfiniteQueryOptions<TData, Error>,
): UseInfiniteQueryResult<TData, Error> {
  return useInfiniteQuery<TData, Error>(
    useQuery.getKey(getVariables({})),
    ({ pageParam }) => gqlRequest(useQuery.document, getVariables({ pageParam })),
    options,
  )
}