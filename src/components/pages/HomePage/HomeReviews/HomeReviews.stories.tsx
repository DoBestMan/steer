import { number } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { COLORS } from '~/lib/constants';

import HomeReviews from './HomeReviews';
import { mockReviews } from './HomeReviews.mocks';

export default {
  component: HomeReviews,
  title: 'Homepage/Reviews',
};

const ratingOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

export function ReviewsWithKnobs() {
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <HomeReviews
        {...mockReviews}
        ratingStars={number('Rating', mockReviews.ratingStars, ratingOptions)}
      />
    </Grid>
  );
}
