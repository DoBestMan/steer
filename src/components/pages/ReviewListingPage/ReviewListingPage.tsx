import { useRouter } from 'next/router';

import Meta from '~/components/global/Meta/Meta';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Header from '~/components/modules/ReviewListing/Header/Header';
import RatingsTable from '~/components/modules/ReviewListing/RatingsTable/RatingsTable';
import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

import { mapDataToHeader } from './mappers/header';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToRatingsTable } from './mappers/ratingsTable';
import styles from './ReviewListingPage.styles';

export interface ReviewListingServerData {
  brand?: string;
  category?: string;
  serverData: {
    tireReviews: SiteProductReviewsListing;
  };
  type?: string;
}

function ReviewListingPage({
  serverData,
  brand,
  category,
  type,
}: ReviewListingServerData) {
  const router = useRouter();
  const {
    listResultMetadata,
    siteInfo,
    siteProductReviewsFilters,
    reviewsList,
  } = serverData.tireReviews;

  const ratingsTable = mapDataToRatingsTable({
    reviewsList,
    listResultMetadata,
  });

  const header = mapDataToHeader({
    siteInfo,
    siteProductReviewsFilters,
    router,
  });

  const meta = mapDataToMeta({
    brandOrCategoryOrType: brand || category || type,
  });

  return (
    <div css={[navigationPaddingTop, styles.root]}>
      <Meta {...meta} />
      <Header
        breadcrumbs={header.breadcrumbs}
        header={header.header}
        description={header.description}
        filters={header.filters}
      />
      <RatingsTable
        reviews={ratingsTable.reviews}
        listResultMetadata={ratingsTable.listResultMetadata}
      />
    </div>
  );
}
export default ReviewListingPage;
