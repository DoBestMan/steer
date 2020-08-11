import { GetServerSideProps } from 'next';

import WriteAReviewPage, {
  WriteAReviewPageProps,
} from '~/components/pages/WriteAReviewPage/WriteAReviewPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';
import { validBrandQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const WriteAReview = WithErrorPageHandling(WriteAReviewPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  WriteAReviewPageProps
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = getStringifiedParams(context.query);

  validateOrRedirectToNotFound({
    param: brand,
    pattern: validBrandQuery,
    response: context.res,
  });

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
    data: { siteProductLine },
  } = siteProduct;

  return {
    props: {
      serverData: {
        tire: siteProductLine.name,
        brand: siteProductLine.brand.label,
      },
    },
  };
};

export default WriteAReview;
