import { useState } from 'react';

import { SiteProductReviewsListingItem } from '~/data/models/SiteProductReviewsListingItem';
import { apiGetReviewListing } from '~/lib/api/review-listing';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface ResponseProps {
  displayedRatings: SiteProductReviewsListingItem[];
  handleSeeMoreClick: () => void;
}

function usePagination(
  queryParams: {
    [name: string]: string | string[];
  },
  reviewsList: SiteProductReviewsListingItem[],
): ResponseProps {
  const [displayedRatings, setDisplayedRatings] = useState<
    SiteProductReviewsListingItem[]
  >(reviewsList);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSeeMoreClick = async () => {
    const newPage = currentPage + 1;

    const { brand, type, category } = queryParams;

    const moreReviews = await apiGetReviewListing({
      brand: (brand && removeTireFromQueryParam(brand)) || '',
      page: newPage.toString(),
      tireCategory: (category && removeTireFromQueryParam(category)) || '',
      tireType: (type && removeTireFromQueryParam(type)) || '',
    });

    setCurrentPage(newPage);
    const formattedReviews = moreReviews.reviewsList;
    setDisplayedRatings([...displayedRatings, ...formattedReviews]);
  };

  return {
    displayedRatings,
    handleSeeMoreClick,
  };
}

export default usePagination;
