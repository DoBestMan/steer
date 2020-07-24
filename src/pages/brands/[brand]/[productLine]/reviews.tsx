import { GetServerSideProps } from 'next';

import ReviewDetailPage, {
  ProductDetailReviewsData,
} from '~/components/pages/ReviewDetailPage/ReviewDetailPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';
import { validBrandQuery } from '~/lib/utils/regex';
import { validateOrRedirectToNotFound } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Reviews(props: ProductDetailReviewsData) {
  return <ReviewDetailPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ProductDetailReviewsData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = context.query;

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

  const props: ProductDetailReviewsData = {
    serverData: { siteProduct, siteProductReviews },
  };

  return {
    props,
  };
};

export default Reviews;
