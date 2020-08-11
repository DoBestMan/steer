import { GetServerSideProps } from 'next';

import { ProductDetailData } from '~/components/pages/ProductDetail/ProductDetail.types';
import ReviewDetailPage from '~/components/pages/ReviewDetailPage/ReviewDetailPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';
import { validBrandQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const Reviews = WithErrorPageHandling(ReviewDetailPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  ProductDetailData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = getStringifiedParams(context.query);

  validateOrRedirectToNotFound({
    param: brand,
    pattern: validBrandQuery,
    response: context.res,
  });

  const brandName = removeTireFromQueryParam(brand);

  const [siteProduct, siteProductReviews] = await Promise.all([
    backendGetProductDetail({
      brand: brandName,
      productLine,
    }),
    backendGetProductReviews({
      brand: brandName,
      productLine,
    }),
  ]);

  if (
    siteProductReviews.isSuccess &&
    !siteProductReviews.data.reviewsList.length
  ) {
    return { props: { errorStatusCode: 404 } };
  }

  if (!siteProduct.isSuccess) {
    const errorStatusCode = siteProduct.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  if (!siteProductReviews.isSuccess) {
    const errorStatusCode = siteProductReviews.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      serverData: {
        siteProduct: siteProduct.data,
        siteProductReviews: siteProductReviews.data,
      },
    },
  };
};

export default Reviews;
