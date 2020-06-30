import { GetServerSideProps } from 'next';

import VehicleCatalogContainer, {
  VehicleCatalogData,
} from '~/components/pages/VehicleCatalogPage/VehicleCatalog.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetVehicleProducts,
  backendGetVehicleSummary,
} from '~/lib/backend/catalog/vehicle';

function VehicleCatalog({ serverData }: VehicleCatalogData) {
  return <VehicleCatalogContainer serverData={serverData} />;
}

export const getServerSideProps: GetServerSideProps<VehicleCatalogData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { make, model, year, ...vehicleParams } = context.query;
  const queryParams: Record<string, string> = {};

  Object.entries(vehicleParams).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[key] = value;
    }
  });
  const { siteCatalogSummary } = await backendGetVehicleSummary({
    make,
    model,
    year,
    query: queryParams,
  });
  const { siteCatalogProducts } = await backendGetVehicleProducts({
    make,
    model,
    year,
    query: queryParams,
  });

  return {
    props: { serverData: { siteCatalogSummary, siteCatalogProducts } },
  };
};

export default VehicleCatalog;
