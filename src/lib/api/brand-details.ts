import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';

import { fetchWithErrorHandling } from '../fetch';

export async function apiGetSiteBrandDetails(brandName: string) {
  const response = await fetchWithErrorHandling<SiteBrandDetails>({
    endpoint: '/brands',
    includeAuthorization: true,
    method: 'get',
    query: { brandName },
  });

  return response;
}
