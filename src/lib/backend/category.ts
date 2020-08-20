import { CategoryPageProps } from '~/components/pages/CategoryPage/CategoryPage';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { AsyncResponse } from '~/lib/fetch/index.types';

export async function backendGetCategoryTireData(
  category: string | string[],
): Promise<AsyncResponse<CategoryPageProps>> {
  return await fetchWithErrorHandling<CategoryPageProps>({
    endpoint: `/v1/site/categories/${category}`,
    includeAuthorization: true,
    method: 'get',
  });
}
