import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetSiteBrandDetails(brandName: string) {
  const response = await fetchWithErrorHandling<SiteBrandDetails>({
    endpoint: `/v1/site/brands/${brandName}`,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
