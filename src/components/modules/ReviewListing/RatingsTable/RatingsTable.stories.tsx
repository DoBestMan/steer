import { default as RatingsComponent } from './RatingsTable';
import { mockTireRatings } from './RatingsTable.mocks';

export default {
  component: RatingsComponent,
  title: 'SEO Landing/Review Listing/Ratings Table',
};

export function RatingsTable() {
  return <RatingsComponent reviews={mockTireRatings} />;
}
