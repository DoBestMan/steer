import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetVehicleSummary({
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
    endpoint: '/summary-vehicle',
    includeAuthorization: true,
    query: { make, model, year, trim },
    method: 'get',
  });

  return response;
}
