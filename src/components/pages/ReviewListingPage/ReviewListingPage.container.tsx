import { useRouter } from 'next/router';

import DataStructure from '~/components/global/DataStructure/DataStructure';
import Meta from '~/components/global/Meta/Meta';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import Header from '~/components/modules/ReviewListing/Header/Header';
import RatingsTable from '~/components/modules/ReviewListing/RatingsTable/RatingsTable';
import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';

import { mapDataToHeader } from './mappers/header';
import { mapDataToLinkingData } from './mappers/linkingData';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToRatingsTable } from './mappers/ratingsTable';
import usePaginationAndSort from './ReviewListingPage.hooks';
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

  const {
    displayedRatings,
    handleSeeMoreClick,
    handleSortClick,
    sortList,
  } = usePaginationAndSort(
    router.query,
    reviewsList,
    siteProductReviewsFilters.sortList,
  );

  const ratingsTable = mapDataToRatingsTable({
    reviewsList: displayedRatings,
    listResultMetadata,
  });

  const ratingsDataStructure = mapDataToLinkingData({
    reviewsList,
  });

  const header = mapDataToHeader({
    siteInfo,
    siteProductReviewsFilters,
    router,
  });

  const meta = mapDataToMeta({
    brandOrCategoryOrType: brand || category || type,
  });

  const handleSortResults = (value: Record<string, string>) => () => {
    handleSortClick(value);
  };

  return (
    <div css={[navigationPaddingTop, styles.root]}>
      {ratingsDataStructure.products.map((product, i) => (
        <DataStructure key={i} jsonLD={product} />
      ))}
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
        onSeeMoreClick={handleSeeMoreClick}
        sortList={sortList}
        onSortResults={handleSortResults}
      />
    </div>
  );
}
export default ReviewListingPage;
