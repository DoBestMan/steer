import { useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';

import { apiBootstrap } from '~/lib/api/bootstrap';
import { fetch } from '~/lib/fetch';
import { Emitter } from '~/lib/utils/Emitter';

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
  options?: ConfigInterface;
  params?: Record<string, string>;
  query?: Record<string, string>;
  revalidateEmitter?: Emitter<null>;
}

export function useApiData<T>({
  endpoint,
  includeAuthorization = false,
  includeUserRegion = false,
  includeUserZip = false,
  params = {},
  query = {},
  revalidateEmitter,
  options = {},
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
        query,
      });
    },
    options,
  );

  useEffect(() => {
    if (revalidateEmitter) {
      // If an event emitter is provided,
      // call `revalidate` to fetch new data on update
      revalidateEmitter.on(revalidate);

      return () => {
        revalidateEmitter.off(revalidate);
      };
    }

    return;
  }, [revalidateEmitter, revalidate]);

  return {
    data,
    error,
    isValidating,
    mutate,
    revalidate,
  };
}
