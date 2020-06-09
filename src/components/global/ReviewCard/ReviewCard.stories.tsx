import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS } from '~/lib/constants';

import ReviewCard from './ReviewCard';
import { mockReviews } from './ReviewCard.mocks';

export default {
  component: ReviewCard,
  title: 'global/ReviewCard',
};

function Container({ children }: { children: ReactNode }) {
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <GridItem gridColumnL="2/7">{children}</GridItem>
    </Grid>
  );
}

export function ReviewWithKnobs() {
  const {
    car,
    location,
    isVerified,
    momentList,
    ratings,
    ...rest
  } = mockReviews[0];
  const hasCar = boolean('Has car', true);
  const hasLocation = boolean('Has location', true);
  const hasVerification = boolean('Is verified', true);
  const hasMomentList = boolean('Has moment list', true);
  const hasRatingsList = boolean('Has ratings list', true);

  return (
    <Container>
      <ReviewCard
        car={(hasCar && car) || undefined}
        location={(hasLocation && location) || undefined}
        isVerified={(hasVerification && isVerified) || false}
        momentList={(hasMomentList && momentList) || []}
        ratings={(hasRatingsList && ratings) || []}
        {...rest}
      />
    </Container>
  );
}

export function MultipleReviews() {
  return (
    <Container>
      {mockReviews.map((review) => {
        return <ReviewCard key={review.id} {...review} />;
      })}
    </Container>
  );
}
