import { filterSortMock } from '~/components/modules/Catalog/Filters/Filters.mock';
import Header from '~/components/modules/ReviewListing/Header/Header';
import RatingsTable from '~/components/modules/ReviewListing/RatingsTable/RatingsTable';

import { reviewListingMock } from './ReviewListing.mock';

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
  } = reviewListingMock;

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
        sortList={filterSortMock}
      />
    </div>
  );
}
