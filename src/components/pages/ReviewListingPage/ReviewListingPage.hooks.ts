import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { SiteCatalogSortListItem } from '~/data/models/SiteCatalogSortListItem';
import { SiteProductReviewsListingItem } from '~/data/models/SiteProductReviewsListingItem';
import { apiGetReviewListing } from '~/lib/api/review-listing';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface ResponseProps {
  displayedRatings: SiteProductReviewsListingItem[];
  handleSeeMoreClick: () => void;
  handleSortClick: (value: Record<string, string>) => void;
  sortList: SiteCatalogSortListItem[];
}

function usePaginationAndSort(
  queryParams: {
    [name: string]: string | string[];
  },
  reviewsList: SiteProductReviewsListingItem[],
  sortList: SiteCatalogSortListItem[],
): ResponseProps {
  const [displayedRatings, setDisplayedRatings] = useState<
    SiteProductReviewsListingItem[]
  >(reviewsList);
  const [sort, setSort] = useState<SiteCatalogSortListItem[]>(sortList);
  const [currentPage, setCurrentPage] = useState(1);
  const { brand, type, category } = queryParams;

  const formattedParams = {
    brand: (brand && removeTireFromQueryParam(brand)) || '',
    tireCategory: (category && removeTireFromQueryParam(category)) || '',
    tireType: (type && removeTireFromQueryParam(type)) || '',
  };

  const router = useRouter();

  const updateRatingsAndSort = useCallback(() => {
    setDisplayedRatings(reviewsList);
    setSort(sortList);
  }, [reviewsList, sortList]);

  useEffect(() => {
    router.events?.on('routeChangeComplete', updateRatingsAndSort);
    return () => {
      router.events?.off('routeChangeComplete', updateRatingsAndSort);
    };
  }, [router.events, updateRatingsAndSort]);

  const handleSeeMoreClick = async () => {
    const newPage = currentPage + 1;

    const moreReviews = await apiGetReviewListing({
      page: newPage.toString(),
      ...formattedParams,
    });

    setCurrentPage(newPage);
    const formattedReviews = moreReviews.reviewsList;
    setDisplayedRatings([...displayedRatings, ...formattedReviews]);
  };

  const handleSortClick = async (value: Record<string, string>) => {
    const moreReviews = await apiGetReviewListing({
      ...formattedParams,
      ...value,
    });

    setDisplayedRatings(moreReviews.reviewsList);
    setSort(moreReviews.siteProductReviewsFilters.sortList);
  };

  return {
    displayedRatings,
    handleSeeMoreClick,
    handleSortClick,
    sortList: sort,
  };
}

export default usePaginationAndSort;
