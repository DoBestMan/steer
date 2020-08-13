import { NextRouter } from 'next/router';

import { ReviewsHeaderProps } from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { transformSrcLogoToBlack } from '~/lib/utils/cloudinary/cloudinary';
import { interpolateRoute } from '~/lib/utils/routes';

export function mapDataToHeader({
  siteProduct: { siteProductLine },
  siteProductReviews: { dataMomentList, performanceRating },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}): ReviewsHeaderProps {
  const { query, asPath, pathname } = router;
  const tire = siteProductLine.name;
  const brand = siteProductLine.brand;

  const brandUrl = interpolateRoute(ROUTE_MAP[ROUTES.BRAND_DETAIL], {
    brand: query.brand,
  });

  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brand: brand.label,
      productLine: tire,
    },
    pathname,
    query,
  });

  return {
    brand: {
      image:
        (brand.image && {
          ...brand.image,
          src: transformSrcLogoToBlack(brand.image.src),
        }) ||
        null,
      label: brand.label,
    },
    brandUrl,
    breadcrumbs,
    ratings: performanceRating.ratingList,
    ratingStars: performanceRating.overall,
    stats: dataMomentList,
    tire,
  };
}
