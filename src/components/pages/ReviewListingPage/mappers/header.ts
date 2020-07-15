import { NextRouter } from 'next/router';

import {
  FilterGroup,
  FilterGroupItem,
  FilterItem,
} from '~/components/modules/ReviewListing/Filters/Filters.types';
import { ReviewListingHeaderProps } from '~/components/modules/ReviewListing/Header/Header';
import { SiteProductLineReviewsListingFilterType } from '~/data/models/SiteProductReviewsListingFilter';
import { SiteProductReviewsListingFilters } from '~/data/models/SiteProductReviewsListingFilters';
import { SiteProductReviewsListingInfo } from '~/data/models/SiteProductReviewsListingInfo';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { interpolateRoute } from '~/lib/utils/routes';

export function mapDataToHeader({
  siteInfo: { title, description },
  siteProductReviewsFilters: { filtersList },
  router,
}: {
  router: NextRouter;
  siteInfo: SiteProductReviewsListingInfo;
  siteProductReviewsFilters: SiteProductReviewsListingFilters;
}): ReviewListingHeaderProps {
  const { query, asPath, pathname } = router;

  const activeFilters: Record<string, string> = {};

  const filters: FilterItem[] = filtersList.map((filterItem) => {
    const filterGroups: FilterGroup[] = filterItem.filterGroups.map(
      (filterGroup) => {
        const items: FilterGroupItem[] = filterGroup.items.map(
          (filterGroupItem) => {
            if (filterGroupItem.isSelected) {
              activeFilters[filterItem.id] = filterGroupItem.title;
            }

            let href = '/';
            switch (filterItem.id) {
              case SiteProductLineReviewsListingFilterType.Brand:
                href = interpolateRoute(ROUTE_MAP[ROUTES.BRAND_REVIEWS], {
                  brand: filterGroupItem.value,
                });
                break;
              case SiteProductLineReviewsListingFilterType.TireType:
                href = interpolateRoute(ROUTE_MAP[ROUTES.TYPE_REVIEWS], {
                  type: filterGroupItem.value,
                });
                break;
              case SiteProductLineReviewsListingFilterType.TireCategory:
                href = interpolateRoute(ROUTE_MAP[ROUTES.CATEGORY_REVIEWS], {
                  category: filterGroupItem.value,
                });
                break;
              default:
                break;
            }

            return {
              count: filterGroupItem.count,
              description: filterGroupItem.description,
              flair: filterGroupItem.flair,
              isSelected: filterGroupItem.isSelected,
              link: {
                href,
                isExternal: false,
              },
              title: filterGroupItem.title,
            };
          },
        );
        // FilterGroups
        return {
          title: filterGroup.header?.title,
          items,
        };
      },
    );
    // Filters
    return {
      label: filterItem.header.title,
      id: filterItem.id,
      filterGroups,
      isActive: !!activeFilters[filterItem.id],
    };
  });

  const breadcrumbLabels: Record<string, string> = {};

  // Need to remove tire from active filter to build [type] and [category] for breadcrumb labels
  Object.keys(activeFilters).forEach((key) => {
    const param = key.replace(/tire/g, '').toLowerCase();
    breadcrumbLabels[param] = activeFilters[key];
  });

  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    pathname,
    labels: breadcrumbLabels,
    query,
  });

  return {
    breadcrumbs,
    header: title,
    description,
    filters,
  };
}
