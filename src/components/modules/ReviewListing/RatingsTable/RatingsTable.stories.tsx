import { filterSortMock } from '~/components/modules/Catalog/Filters/Filters.mock';

import { default as RatingsComponent } from './RatingsTable';
import { listResultMetadataMock, tireRatingsMock } from './RatingsTable.mock';

export default {
  component: RatingsComponent,
  title: 'SEO Landing/Review Listing/Ratings Table',
};

export function RatingsTable() {
  return (
    <RatingsComponent
      reviews={tireRatingsMock}
      listResultMetadata={listResultMetadataMock}
      sortList={filterSortMock}
    />
  );
}
