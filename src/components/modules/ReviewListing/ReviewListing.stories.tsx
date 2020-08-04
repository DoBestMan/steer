import { filterSort } from '~/components/modules/Catalog/Filters/Filters.mocks';
import Header from '~/components/modules/ReviewListing/Header/Header';
import RatingsTable from '~/components/modules/ReviewListing/RatingsTable/RatingsTable';

import { mockReviewListing } from './ReviewListing.mocks';

export default {
  component: RatingsTable,
  title: 'SEO Landing/Review Listing',
};

export function FullPage() {
  const {
    breadcrumbs,
    body,
    filters,
    title,
    ratings,
    listResultMetadata,
  } = mockReviewListing;

  return (
    <div>
      <Header
        breadcrumbs={breadcrumbs}
        body={body}
        title={title}
        filters={filters}
      />
      <RatingsTable
        reviews={ratings}
        listResultMetadata={listResultMetadata}
        sortList={filterSort}
      />
    </div>
  );
}
