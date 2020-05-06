import { useApiData, UseApiData, UseApiDataParams } from './useApiData';

export function useApiDataWithDefault<T, U = T>({
  defaultData,
  endpoint,
  includeUserRegion = false,
  params = {},
}: UseApiDataParams & {
  defaultData: T;
}): UseApiData<U> & {
  data: T & (U | undefined);
} {
  const { data, error, isValidating, mutate, revalidate } = useApiData<U>({
    endpoint,
    includeUserRegion,
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
