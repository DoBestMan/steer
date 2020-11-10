import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { SiteCatalogSortListItem } from '~/data/models/SiteCatalogSortListItem';
import { SiteProductReviewsListingItem } from '~/data/models/SiteProductReviewsListingItem';
import { apiGetReviewListing } from '~/lib/api/review-listing';
import { removeTireFromQueryParam } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

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
  const { setGlobalToastMessage } = useGlobalToastContext();

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

    const res = await apiGetReviewListing({
      page: newPage.toString(),
      ...formattedParams,
    });

    if (res.isSuccess) {
      setCurrentPage(newPage);
      const formattedReviews = res.data.reviewsList;
      setDisplayedRatings([...displayedRatings, ...formattedReviews]);
      return;
    }
    setGlobalToastMessage(ui('error.generic'));
  };

  const handleSortClick = async (value: Record<string, string>) => {
    const res = await apiGetReviewListing({
      ...formattedParams,
      ...value,
    });

    if (res.isSuccess) {
      setDisplayedRatings(res.data.reviewsList);
      setSort(res.data.siteProductReviewsFilters.sortList);
      return;
    }
    setGlobalToastMessage(ui('error.generic'));
  };

  return {
    displayedRatings,
    handleSeeMoreClick,
    handleSortClick,
    sortList: sort,
  };
}

export default usePaginationAndSort;
