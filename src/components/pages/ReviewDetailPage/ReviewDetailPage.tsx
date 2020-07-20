import { useRouter } from 'next/router';

import Meta from '~/components/global/Meta/Meta';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Reviews from '~/components/modules/ReviewDetail/Reviews/Reviews';
import ReviewsHeader from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToHeader } from './mappers/header';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToReviews } from './mappers/reviews';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ReviewDetailPage({ serverData }: ProductDetailData) {
  const router = useRouter();
  const { siteProductReviews, siteProduct } = serverData;

  const header = mapDataToHeader({ siteProduct, siteProductReviews, router });
  const siteReviews = mapDataToReviews({ siteProductReviews });
  const meta = mapDataToMeta({ siteProduct });

  const { listResultMetadata, reviews, sources, title } = siteReviews;
  const {
    brand,
    brandUrl,
    breadcrumbs,
    ratings,
    stats,
    ratingStars,
    tire,
  } = header;

  const writeReviewUrl = interpolateRoute(ROUTE_MAP[ROUTES.WRITE_REVIEW], {
    brand: router.query.brand,
    productLine: router.query.productLine,
  });

  const viewTireUrl = interpolateRoute(ROUTE_MAP[ROUTES.PRODUCT_DETAIL], {
    brand: router.query.brand,
    productLine: router.query.productLine,
  });

  return (
    <div css={navigationPaddingTop}>
      <Meta {...meta} />
      <ReviewsHeader
        brand={brand}
        brandUrl={brandUrl}
        breadcrumbs={breadcrumbs}
        ratings={ratings}
        stats={stats}
        ratingStars={ratingStars}
        tire={tire}
      />
      <Reviews
        reviews={reviews}
        sources={sources}
        title={title}
        listResultMetadata={listResultMetadata}
        viewTireUrl={viewTireUrl}
        writeReviewUrl={writeReviewUrl}
      />
    </div>
  );
}

export default ReviewDetailPage;
