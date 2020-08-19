import { NextRouter } from 'next/router';

import {
  FilterGroup,
  FilterGroupItem,
  FilterItem,
} from '~/components/modules/ReviewListing/Filters/Filters.types';
import { ReviewListingHeaderProps } from '~/components/modules/ReviewListing/Header/Header';
import { SiteProductReviewsListingFilters } from '~/data/models/SiteProductReviewsListingFilters';
import { SiteProductReviewsListingInfo } from '~/data/models/SiteProductReviewsListingInfo';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';

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
          ({ count, description, flair, isSelected, link, title }) => {
            if (isSelected) {
              activeFilters[filterItem.id] = title;
            }

            return {
              count,
              description,
              flair,
              isSelected,
              link,
              title,
            };
          },
        );

        return {
          title: filterGroup.header?.title,
          items,
        };
      },
    );

    return {
      label: filterItem.header.title,
      id: filterItem.id,
      filterGroups,
      isActive: !!activeFilters[filterItem.id],
    };
  });

  const breadcrumbLabels: Record<string, string> = {};

  Object.keys(activeFilters).forEach((key) => {
    // Need to remove tire from active filter to build [type] and [category] for breadcrumb labels
    // This util is slightly different from removeTireFromQueryParam in lib/utils/strings
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
    body: description,
    title,
    filters,
  };
}
