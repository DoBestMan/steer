import { filterSort } from '~/components/modules/Catalog/Filters/Filters.mocks';

import { default as RatingsComponent } from './RatingsTable';
import { mockListResultMetadata, mockTireRatings } from './RatingsTable.mocks';

export default {
  component: RatingsComponent,
  title: 'SEO Landing/Review Listing/Ratings Table',
};

export function RatingsTable() {
  return (
    <RatingsComponent
      reviews={mockTireRatings}
      listResultMetadata={mockListResultMetadata}
      sortList={filterSort}
    />
  );
}
