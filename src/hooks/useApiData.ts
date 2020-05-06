import useSWR from 'swr';

import { apiBootstrap } from '~/lib/api/bootstrap';
import { fetch } from '~/lib/fetch';

export interface UseApiData<T> {
  data: T | undefined;
  error?: Error;
  isValidating: boolean;
  mutate: (
    data?: T | Promise<T> | ((currentValue: T) => T),
    shouldRevalidate?: boolean,
  ) => Promise<T | undefined>;
  revalidate: () => Promise<boolean>;
}

export interface UseApiDataParams {
  endpoint: string;
  includeAuthorization?: boolean;
  includeUserRegion?: boolean;
  includeUserZip?: boolean;
  params?: Record<string, string>;
}

export function useApiData<T>({
  endpoint,
  includeAuthorization = false,
  includeUserRegion = false,
  includeUserZip = false,
  params = {},
}: UseApiDataParams): UseApiData<T> {
  const { data, error, isValidating, mutate, revalidate } = useSWR<T>(
    [endpoint, JSON.stringify(params)],
    async () => {
      await apiBootstrap();

      return fetch<T>({
        endpoint,
        includeAuthorization,
        includeUserRegion,
        includeUserZip,
        method: 'get',
        params,
      });
    },
    {},
  );

  return {
    data,
    error,
    isValidating,
    mutate,
    revalidate,
  };
}
