import { useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';

import { SiteSession } from '~/data/models/SiteSession';
import { useQueryParams } from '~/hooks/useQueryParams';
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
  siteSession?: SiteSession;
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
  siteSession,
}: UseApiDataParams): UseApiData<T> {
  const { canFetch = true } = useQueryParams();
  const url = canFetch ? [endpoint, JSON.stringify(query)] : null;

  const { data, error, isValidating, mutate, revalidate } = useSWR<T>(
    url,
    async () => {
      await apiBootstrap();

      return fetch<T>({
        endpoint,
        includeAuthorization,
        includeUserRegion,
        includeUserZip,
        method: 'get',
        params,
        query: { ...query }, // Clones the object to prevent mutation issues,
        siteSession,
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
