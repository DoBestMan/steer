import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import MakePage, {
  MakePageProps,
} from '~/components/pages/VehiclePage/MakePage/MakePage';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendGetSiteVehicleMake } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { validTiresQuery } from '~/lib/utils/regex';
import { validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Make(props: MakePageProps) {
  return <MakePage makeData={props} />;
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  MakePageProps
>> = async (context) => {
  backendBootstrap();
  const { make } = context.query;
  const isRouteValid = validateRoute(make, validTiresQuery);

  if (!isRouteValid) {
    return { props: { errorStatusCode: 404 } };
  }
  const formattedMake = removeTireFromQueryParam(make);

  const serverData = await backendGetSiteVehicleMake(formattedMake);

  if (!serverData) {
    // Return 404?
    return {} as GetServerSidePropsResult<MakePageProps>;
  }
  return {
    props: {
      ...serverData,
    },
  };
};

export default WithErrorPageHandling(Make);
