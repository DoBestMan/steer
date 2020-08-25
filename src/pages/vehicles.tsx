import { GetStaticProps } from 'next';

import VehicleHubPage from '~/components/pages/VehicleHubPage/VehicleHubPage';
import { SiteVehicles } from '~/data/models/SiteVehicles';
import { backendGetSiteVehicles } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

interface VehiclesServerData {
  serverData: SiteVehicles;
}

function Vehicles(props: VehiclesServerData) {
  return (
    <VehicleHubPage
      topVehicles={props.serverData.topVehicles}
      popularMakes={props.serverData.popularMakes}
      allMakes={props.serverData.allMakes}
    />
  );
}

export const getStaticProps: GetStaticProps<VehiclesServerData> = async () => {
  backendBootstrap();

  const siteVehicles = await backendGetSiteVehicles();

  const props: VehiclesServerData = {
    serverData: {
      topVehicles: siteVehicles.topVehicles,
      popularMakes: siteVehicles.popularMakes,
      allMakes: siteVehicles.allMakes,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default Vehicles;
