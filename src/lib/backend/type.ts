import { TypePageProps } from '~/components/pages/SEOPage/TypePage/TypePage';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { AsyncResponse } from '~/lib/fetch/index.types';

export async function backendGetTypeTireData(
  Type: string | string[],
): Promise<AsyncResponse<TypePageProps>> {
  return await fetchWithErrorHandling<TypePageProps>({
    endpoint: `/v1/site/types/${Type}`,
    includeAuthorization: true,
    method: 'get',
  });
}
