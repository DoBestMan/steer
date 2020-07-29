import { useRouter } from 'next/router';

import DataStructure from '~/components/global/DataStructure/DataStructure';
import Meta from '~/components/global/Meta/Meta';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Reviews from '~/components/modules/ReviewDetail/Reviews/Reviews';
import ReviewsHeader from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToHeader } from './mappers/header';
import { mapDataToLinkingData } from './mappers/linkingData';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToReviews } from './mappers/reviews';
import usePagination from './ReviewDetailPage.hooks';

export interface ProductDetailReviewsData {
  serverData: ProductDetailResponse;
}

function ReviewDetailPage({ serverData }: ProductDetailReviewsData) {
  const router = useRouter();
  const { siteProductReviews, siteProduct } = serverData;

  const header = mapDataToHeader({ siteProduct, siteProductReviews, router });
  const siteReviews = mapDataToReviews({ siteProductReviews });
  const ratingsDataStructure = mapDataToLinkingData({
    siteProductReviews,
    siteProduct,
  });
  const meta = mapDataToMeta({ siteProduct });

  const { total, reviews, sources, title } = siteReviews;
  const {
    brand: brandObj,
    brandUrl,
    breadcrumbs,
    ratings,
    stats,
    ratingStars,
    tire,
  } = header;

  const { brand, productLine } = router.query;
  const brandName = brand && removeTireFromQueryParam(brand);

  const writeReviewUrl = interpolateRoute(ROUTE_MAP[ROUTES.WRITE_REVIEW], {
    brand,
    productLine,
  });

  const viewTireUrl = interpolateRoute(ROUTE_MAP[ROUTES.PRODUCT_DETAIL], {
    brand,
    productLine,
  });

  const { displayedReviews, handleSeeMoreClick } = usePagination(
    brandName,
    productLine && productLine.toString(),
    reviews,
  );

  return (
    <div css={navigationPaddingTop}>
      <DataStructure jsonLD={ratingsDataStructure} />
      <Meta {...meta} />
      <ReviewsHeader
        brand={brandObj}
        brandUrl={brandUrl}
        breadcrumbs={breadcrumbs}
        ratings={ratings}
        stats={stats}
        ratingStars={ratingStars}
        tire={tire}
      />
      <Reviews
        reviews={displayedReviews}
        total={total}
        sources={sources}
        title={title}
        viewTireUrl={viewTireUrl}
        writeReviewUrl={writeReviewUrl}
        onSeeMoreClick={handleSeeMoreClick}
      />
    </div>
  );
}

export default ReviewDetailPage;
