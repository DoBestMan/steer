import { useState } from 'react';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { mapDataToReviewsList } from '~/components/pages/ReviewDetailPage/mappers/reviewsList';
import { apiGetProductDetailReviews } from '~/lib/api/product-detail-reviews';

interface ResponseProps {
  displayedReviews: ReviewCardProps[];
  handleSeeMoreClick: () => void;
}

function usePagination(
  brand: string,
  productLine: string,
  siteProductReviews: ReviewCardProps[],
): ResponseProps {
  const [displayedReviews, setDisplayedReviews] = useState<ReviewCardProps[]>(
    siteProductReviews,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleSeeMoreClick = async () => {
    const newPage = currentPage + 1;

    const moreReviews = await apiGetProductDetailReviews({
      page: newPage.toString(),
      brand,
      productLine,
    });

    setCurrentPage(newPage);
    const formattedReviews = mapDataToReviewsList(moreReviews.reviewsList);
    setDisplayedReviews([...displayedReviews, ...formattedReviews]);
  };

  return {
    displayedReviews,
    handleSeeMoreClick,
  };
}

export default usePagination;
