import { useRouter } from 'next/router';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';

export interface VehicleCatalogData {
  serverData: {
    siteCatalogSummary: SiteCatalogSummary;
  };
}

function VehicleCatalogContainer({ serverData }: VehicleCatalogData) {
  const { query } = useRouter();
  const { make: _make, model: _model, year: _year, ...rest } = query;
  const queryParams: Record<string, string> = {};

  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[key] = value;
    }
  });

  const {
    data: { siteCatalogSummary },
    error,
  } = useApiDataWithDefault<VehicleCatalogData['serverData']>({
    defaultData: serverData,
    endpoint: '/summary-vehicle',
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  return <CatalogPageContainer siteCatalogSummary={siteCatalogSummary} />;
}

export default VehicleCatalogContainer;
