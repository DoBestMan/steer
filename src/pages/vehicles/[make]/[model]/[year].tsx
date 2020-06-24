import { GetServerSideProps } from 'next';

import VehicleCatalogContainer, {
  VehicleCatalogData,
} from '~/components/pages/VehicleCatalogPage/VehicleCatalog.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetVehicleSummary } from '~/lib/backend/summary-vehicle';

function VehicleCatalog({ serverData }: VehicleCatalogData) {
  return <VehicleCatalogContainer serverData={serverData} />;
}

export const getServerSideProps: GetServerSideProps<VehicleCatalogData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { make, model, year } = context.query;
  const { siteCatalogSummary } = await backendGetVehicleSummary({
    make,
    model,
    year,
  });

  return {
    props: { serverData: { siteCatalogSummary } },
  };
};

export default VehicleCatalog;
