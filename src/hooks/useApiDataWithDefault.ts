import { useApiData, UseApiData, UseApiDataParams } from './useApiData';

export function useApiDataWithDefault<T, U = T>({
  defaultData,
  endpoint,
  includeAuthorization = false,
  includeUserRegion = false,
  includeUserZip = false,
  params = {},
  options = {},
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
  });

  return {
    data: { ...defaultData, ...data },
    error,
    isValidating,
    mutate,
    revalidate,
  };
}
