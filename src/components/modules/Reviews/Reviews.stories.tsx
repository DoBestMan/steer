import Reviews from './Reviews';
import { mockReviews } from './Reviews.mocks';

import { COLORS } from '~/lib/constants';
import Grid from '~/components/global/Grid/Grid';

export default {
  component: Reviews,
  title: 'Reviews',
};

export function ReviewsWithKnobs() {
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <Reviews {...mockReviews} />
    </Grid>
  );
}
