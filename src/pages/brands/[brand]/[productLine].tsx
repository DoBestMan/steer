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
  backendGetSiteProductLineFaqs,
} from '~/lib/backend/product-detail';
import { RESULTS_PER_PAGE_PDP } from '~/lib/constants';
import { validTiresQuery } from '~/lib/utils/regex';
import { getStringifiedParams, validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const ProductLine = WithErrorPageHandling(ProductDetailContainer);

export const getServerSideProps: GetServerSideProps<PageResponse<
  ProductDetailData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine, userZip } = getStringifiedParams(context.query);
  const isRouteValid = validateRoute(brand, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const brandName = removeTireFromQueryParam(brand);

  const [siteProduct, siteProductReviews, siteFaqs] = await Promise.all([
    backendGetProductDetail({
      brand: brandName,
      productLine,
      query: {
        userZip,
      },
    }),
    backendGetProductReviews({
      brand: brandName,
      productLine,
      query: {
        resultsPerPage: RESULTS_PER_PAGE_PDP.toString(),
      },
    }),
    backendGetSiteProductLineFaqs({
      productLine,
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
  if (!siteFaqs.isSuccess) {
    const errorStatusCode = siteFaqs.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      serverData: {
        siteProduct: siteProduct.data,
        siteProductReviews: siteProductReviews.data,
        siteFaqs: siteFaqs.data,
      },
    },
  };
};

export default ProductLine;
