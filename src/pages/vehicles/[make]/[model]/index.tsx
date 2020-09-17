import { GetServerSideProps } from 'next';

import VehicleMakeModelList from '~/components/pages/SEOPage/VehicleMakeModelListPage/VehicleMakeModelListPage';
import { SiteVehicleMakeModelList } from '~/data/models/SiteVehicleMakeModelList';
import { SiteVehicleMakeModelProps } from '~/data/models/SiteVehicleMakeModelResponse';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteVehicleMakeModelList } from '~/lib/backend/vehicles/make/model';
import { AsyncResponse } from '~/lib/fetch/index.types';
import { validTiresQuery } from '~/lib/utils/regex';
import { getStringifiedParams, validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function VehicleMakeModel(props: SiteVehicleMakeModelProps) {
  return <VehicleMakeModelList pageData={props} />;
}
export const getServerSideProps: GetServerSideProps<PageResponse<
  SiteVehicleMakeModelList
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { make, model } = getStringifiedParams(context.query);
  const formattedMake = removeTireFromQueryParam(make);

  const isRouteValid = validateRoute(make, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const serverData: AsyncResponse<SiteVehicleMakeModelList> = await backendGetSiteVehicleMakeModelList(
    formattedMake,
    model,
  );
  if (!serverData.isSuccess) {
    const errorStatusCode = !serverData.isSuccess
      ? serverData.error.statusCode
      : 500;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }
  return {
    props: {
      ...serverData.data,
    },
  };
};

export default WithErrorPageHandling(VehicleMakeModel);
