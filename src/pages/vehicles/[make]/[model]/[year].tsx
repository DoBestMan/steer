import { GetServerSideProps } from 'next';

import Meta from '~/components/global/Meta/Meta';
import VehicleCatalogContainer, {
  VehicleCatalogData,
} from '~/components/pages/VehicleCatalogPage/VehicleCatalog.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetVehicleProducts,
  backendGetVehicleSummary,
} from '~/lib/backend/catalog/vehicle';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

interface Props extends VehicleCatalogData {
  make: string;
  model: string;
  year: string;
}

function VehicleCatalog({ serverData, make, model, year }: Props) {
  // meta
  make = capitalize(make.replace('-tires', ''));
  model = capitalize(model);
  year = capitalize(year);

  const title = ui('meta.vehicles.make.model.year.title', {
    make,
    model,
    year,
  });
  const description = ui('meta.vehicles.make.model.year.description', {
    make,
    model,
    year,
  });

  return (
    <>
      <Meta title={title} description={description} />
      <VehicleCatalogContainer serverData={serverData} />
    </>
  );
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
    props: {
      make,
      model,
      serverData: { siteCatalogSummary, siteCatalogProducts },
      year,
    },
  };
};

export default VehicleCatalog;
