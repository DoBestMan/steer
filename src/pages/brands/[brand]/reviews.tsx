import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { validTiresQuery } from '~/lib/utils/regex';
import { validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const Reviews = WithErrorPageHandling(ReviewListingPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  ReviewListingServerData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand = '' } = context.query;
  const isRouteValid = validateRoute(brand, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const brandName = removeTireFromQueryParam(brand);
  const tireReviewsRes = await backendGetReviewListing({
    query: { brand: brandName },
  });

  if (!tireReviewsRes.isSuccess) {
    context.res.statusCode = tireReviewsRes.error.statusCode;
    return { props: { errorStatusCode: tireReviewsRes.error.statusCode } };
  }

  if (!tireReviewsRes.data.reviewsList.length) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const props: ReviewListingServerData = {
    brand: brandName,
    serverData: {
      tireReviews: tireReviewsRes.data,
    },
  };

  return {
    props,
  };
};

export default Reviews;
