import { GetServerSideProps } from 'next';

import WriteAReviewPage, {
  WriteAReviewPageProps,
} from '~/components/pages/WriteAReviewPage/WriteAReviewPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';
import { validTiresQuery } from '~/lib/utils/regex';
import { getStringifiedParams, validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const WriteAReview = WithErrorPageHandling(WriteAReviewPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  WriteAReviewPageProps
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = getStringifiedParams(context.query);
  const isRouteValid = validateRoute(brand, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const brandName = removeTireFromQueryParam(brand);

  const siteProduct = await backendGetProductDetail({
    brand: brandName,
    productLine,
  });

  if (!siteProduct.isSuccess) {
    const errorStatusCode = siteProduct.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  const {
    data: { siteProductLine, siteProductSpecs },
  } = siteProduct;

  return {
    props: {
      serverData: {
        tire: siteProductLine.name,
        brand: siteProductLine.brand.label,
        specs: siteProductSpecs,
      },
    },
  };
};

export default WriteAReview;
