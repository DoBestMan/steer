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
}: UseApiDataParams & {
  defaultData: T;
}): UseApiData<U> & {
  data: T & (U | undefined);
} {
  const {
    data,
    error,
    hasLocalData,
    isValidating,
    mutate,
    revalidate,
    setHasLocalData,
  } = useApiData<U>({
    endpoint,
    includeAuthorization,
    includeUserRegion,
    includeUserZip,
    options,
    params,
    query,
    revalidateEmitter,
  });

  return {
    data: { ...defaultData, ...data },
    error,
    hasLocalData,
    isValidating,
    mutate,
    revalidate,
    setHasLocalData,
  };
}
