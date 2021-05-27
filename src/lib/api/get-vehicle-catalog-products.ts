import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetVehicleCatalogProducts({
  make,
  model,
  trim,
  year,
}: {
  make: string;
  model: string;
  trim: string;
  year: string;
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: '/products-vehicle',
    includeAuthorization: true,
    query: { make, model, year, trim },
    method: 'get',
  });

  return response;
}
