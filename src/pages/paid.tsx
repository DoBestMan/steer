import { GetServerSideProps } from 'next';

import ProductDetailContainer, {
  ProductDetailData,
} from '~/components/pages/ProductDetail/ProductDetail.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';
import { redirectToNotFound } from '~/lib/utils/routes';

function ProductLine(props: ProductDetailData) {
  return <ProductDetailContainer {...props} />;
}

export const getServerSideProps: GetServerSideProps<ProductDetailData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine, tireSize } = context.query;

  if (!brand || !productLine || !tireSize) {
    redirectToNotFound(context.res);
  }

  const [siteProduct, siteProductReviews] = await Promise.all([
    backendGetProductDetail({
      brand,
      productLine,
    }),
    backendGetProductReviews({
      brand,
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

export default ProductLine;
