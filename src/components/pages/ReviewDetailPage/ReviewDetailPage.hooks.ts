import { useState } from 'react';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { mapDataToReviewsList } from '~/components/pages/ReviewDetailPage/mappers/reviewsList';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { apiGetProductDetailReviews } from '~/lib/api/product-detail-reviews';
import { ui } from '~/lib/utils/ui-dictionary';

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
  const { setGlobalToastMessage } = useGlobalToastContext();

  const handleSeeMoreClick = async () => {
    const newPage = currentPage + 1;

    const res = await apiGetProductDetailReviews({
      page: newPage.toString(),
      brand,
      productLine,
    });

    if (res.isSuccess) {
      setCurrentPage(newPage);
      const formattedReviews = mapDataToReviewsList(res.data.reviewsList);
      setDisplayedReviews([...displayedReviews, ...formattedReviews]);
      return;
    }

    setGlobalToastMessage(ui('error.generic'));
  };

  return {
    displayedReviews,
    handleSeeMoreClick,
  };
}

export default usePagination;
