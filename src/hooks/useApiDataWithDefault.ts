import { useApiData, UseApiData, UseApiDataParams } from './useApiData';

export function useApiDataWithDefault<T, U = T>({
  defaultData,
  endpoint,
  includeAuthorization = false,
  includeUserRegion = false,
  includeUserZip = false,
  revalidateEmitter,
  params = {},
  query = {},
  options = {},
  siteSession,
}: UseApiDataParams & {
  defaultData: T;
}): UseApiData<U> & {
  data: T & (U | undefined);
} {
  const { data, error, isValidating, mutate, revalidate } = useApiData<U>({
    endpoint,
    includeAuthorization,
    includeUserRegion,
    includeUserZip,
    options,
    params,
    query,
    revalidateEmitter,
    siteSession,
  });

  return {
    data: { ...defaultData, ...data },
    error,
    isValidating,
    mutate,
    revalidate,
  };
}
