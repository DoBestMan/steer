import { useRouter } from 'next/router';
import React from 'react';

import Button from '~/components/global/Button/Button';
import DataStructure from '~/components/global/DataStructure/DataStructure';
import Meta from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Reviews from '~/components/modules/ReviewDetail/Reviews/Reviews';
import ReviewsHeader from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { primaryColumnStyles } from '~/components/modules/StickyBar/StickyBar.styles';
import { ROUTE_MAP, ROUTES, THEME } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductDetailData } from '../ProductDetail/ProductDetail.types';
import { mapDataToHeader } from './mappers/header';
import { mapDataToLinkingData } from './mappers/linkingData';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToReviews } from './mappers/reviews';
import usePagination from './ReviewDetailPage.hooks';
import styles from './ReviewDetailPage.styles';

function ReviewDetailPage({ serverData }: ProductDetailData) {
  const router = useRouter();
  const { siteProductReviews, siteProduct } = serverData;

  const header = mapDataToHeader({ siteProduct, siteProductReviews, router });
  const siteReviews = mapDataToReviews({ siteProductReviews });
  const ratingsDataStructure = mapDataToLinkingData({
    siteProductReviews,
    siteProduct,
  });

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

  const meta = mapDataToMeta({ siteProduct });
  const metadata = {
    ...meta,
    shareImage: brandObj?.image || undefined,
  };

  return (
    <div css={navigationBreadcrumbPaddingTop}>
      <Meta {...metadata} />
      <DataStructure jsonLD={ratingsDataStructure} />
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
        onSeeMoreClick={handleSeeMoreClick}
      />
      <div css={styles.stickyBar}>
        <StickyBar
          theme={THEME.ORANGE}
          customPrimaryColStyles={primaryColumnStyles.rightAlign}
        >
          <>
            <Button
              css={primaryColumnStyles.secondaryButton}
              as="a"
              href={writeReviewUrl}
            >
              {ui('reviews.writeReview')}
            </Button>
            <Button
              css={primaryColumnStyles.primaryButton}
              as="a"
              href={viewTireUrl}
              theme={THEME.ORANGE}
            >
              {ui('reviews.viewTire')}
            </Button>
          </>
        </StickyBar>
      </div>
    </div>
  );
}

export default ReviewDetailPage;
