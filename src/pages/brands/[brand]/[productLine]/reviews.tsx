import { GetServerSideProps } from 'next';

import { ProductDetailData } from '~/components/pages/ProductDetail/ProductDetail.container';
import ReviewDetailPage from '~/components/pages/ReviewDetailPage/ReviewDetailPage';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Reviews(props: ProductDetailData) {
  return <ReviewDetailPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ProductDetailData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = context.query;
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

  const props: ProductDetailData = {
    serverData: { siteProduct, siteProductReviews },
  };

  return {
    props,
  };
};

export default Reviews;
