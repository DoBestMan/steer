import { useRouter } from 'next/router';

import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Reviews from '~/components/modules/ReviewDetail/Reviews/Reviews';
import ReviewsHeader from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToHeader } from './mappers/header';
import { mapDataToReviews } from './mappers/reviews';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ReviewDetailPage({ serverData }: ProductDetailData) {
  const router = useRouter();
  const { siteProductReviews, siteProduct } = serverData;

  const header = mapDataToHeader({ siteProduct, siteProductReviews, router });
  const siteReviews = mapDataToReviews({ siteProductReviews });

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

  return (
    <div css={navigationPaddingTop}>
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
      />
    </div>
  );
}

export default ReviewDetailPage;
