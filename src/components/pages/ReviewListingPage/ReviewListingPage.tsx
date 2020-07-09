import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

export interface ReviewListingServerData {
  serverData: {
    tireReviews: SiteProductReviewsListing;
  };
}

function ReviewListingPage({ serverData }: ReviewListingServerData) {
  const {
    listResultMetadata,
    reviewsList,
    siteInfo,
    siteProductReviewsFilters,
  } = serverData.tireReviews;

  // TODO: Assemble review listing page
  // eslint-disable-next-line no-console
  console.log(
    listResultMetadata,
    reviewsList,
    siteInfo,
    siteProductReviewsFilters,
  );

  return <h1>Review Listing Page</h1>;
}
export default ReviewListingPage;
