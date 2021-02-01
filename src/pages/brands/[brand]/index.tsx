import { GetStaticProps } from 'next';

import BrandTirePage from '~/components/pages/BrandTirePage/BrandTirePage';
import { SiteBrandDetails } from '~/data/models/SiteBrandDetails';
import WithFallbackPageHandling from '~/hocs/WithFallbackPageHandling';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteBrandDetails } from '~/lib/backend/brand-details';
import { REVALIDATE } from '~/lib/constants';
import { getStringifiedParams } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const BrandTire = WithFallbackPageHandling(
  WithErrorPageHandling(BrandTirePage),
);

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<PageResponse<
  SiteBrandDetails
>> = async ({ params }) => {
  backendBootstrap();

  const { brand } = getStringifiedParams(params);

  if (!brand) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  const brandName = removeTireFromQueryParam(brand);
  const res = await backendGetSiteBrandDetails(brandName);

  if (!res.isSuccess) {
    return {
      props: { errorStatusCode: res.error.statusCode },
      revalidate: REVALIDATE.EVERY_HOUR,
    };
  }

  return {
    props: {
      ...res.data,
      brandName,
    },
    revalidate: REVALIDATE.EVERY_HOUR,
  };
};

export default BrandTire;
