import { GetServerSideProps } from 'next';

import BrandTirePage from '~/components/pages/BrandTirePage/BrandTirePage';
import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteBrandDetails } from '~/lib/backend/brand-details';
import { validTiresQuery } from '~/lib/utils/regex';
import { getStringifiedParams, validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const BrandTire = WithErrorPageHandling(BrandTirePage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  SiteBrandDetails
>> = async (context) => {
  backendBootstrap({ request: context.req });

  const { brand } = getStringifiedParams(context.query);

  const isRouteValid = validateRoute(brand, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const brandName = removeTireFromQueryParam(brand);
  const brandDetails = await backendGetSiteBrandDetails(brandName);

  if (!brandDetails.isSuccess) {
    const errorStatusCode = brandDetails.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      ...brandDetails.data,
      brandName,
    },
  };
};

export default BrandTire;
