import { GetServerSideProps } from 'next';

import ProductDetailContainer from '~/components/pages/ProductDetail/ProductDetail.container';
import { ProductDetailData } from '~/components/pages/ProductDetail/ProductDetail.types';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';
import { RESULTS_PER_PAGE_PDP } from '~/lib/constants';
import { getStringifiedParams } from '~/lib/utils/routes';

const ProductLine = WithErrorPageHandling(ProductDetailContainer);

export const getServerSideProps: GetServerSideProps<PageResponse<
  ProductDetailData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const queryParams = getStringifiedParams(context.query);
  const { brand, productLine, tireSize } = queryParams;

  if (!brand || !productLine || !tireSize) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const [siteProduct, siteProductReviews] = await Promise.all([
    backendGetProductDetail({
      brand,
      productLine,
      query: queryParams,
    }),
    backendGetProductReviews({
      brand,
      productLine,
      query: {
        resultsPerPage: RESULTS_PER_PAGE_PDP.toString(),
      },
    }),
  ]);

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

export default ProductLine;
