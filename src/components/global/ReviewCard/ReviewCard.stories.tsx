import { boolean, select } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS, THEME } from '~/lib/constants';

import ReviewCard from './ReviewCard';
import { reviewCardMock } from './ReviewCard.mock';

export default {
  component: ReviewCard,
  title: 'global/ReviewCard',
};

function Container({
  children,
  theme = THEME.DARK,
}: {
  children: ReactNode;
  theme: THEME.DARK | THEME.LIGHT;
}) {
  const themeMap = {
    [THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [THEME.DARK]: COLORS.GLOBAL.BLACK,
  };
  const backgroundColor = themeMap[theme];

  return <Grid css={{ backgroundColor }}>{children}</Grid>;
}

export function ReviewWithKnobs() {
  const {
    car,
    location,
    isVerified,
    momentList,
    ratings,
    ...rest
  } = reviewCardMock[0];
  const theme = select('Theme', [THEME.LIGHT, THEME.DARK], THEME.DARK);
  const hasCar = boolean('Has car', true);
  const hasLocation = boolean('Has location', true);
  const hasVerification = boolean('Is verified', true);
  const hasMomentList = boolean('Has moment list', true);
  const hasRatingsList = boolean('Has ratings list', true);

  return (
    <Container theme={theme}>
      <GridItem gridColumnL="2/7">
        <ReviewCard
          car={(hasCar && car) || undefined}
          location={(hasLocation && location) || undefined}
          isVerified={(hasVerification && isVerified) || false}
          momentList={(hasMomentList && momentList) || []}
          ratings={(hasRatingsList && ratings) || []}
          theme={theme}
          {...rest}
        />
      </GridItem>
    </Container>
  );
}

export function MultipleReviews() {
  const theme = select('Theme', [THEME.LIGHT, THEME.DARK], THEME.DARK);

  return (
    <Container theme={theme}>
      <GridItem gridColumnL="2/7">
        {reviewCardMock.map((review) => {
          return <ReviewCard key={review.id} theme={theme} {...review} />;
        })}
      </GridItem>
    </Container>
  );
}

export function MultipleReviewsWide() {
  const theme = select('Theme', [THEME.LIGHT, THEME.DARK], THEME.LIGHT);

  return (
    <Container theme={theme}>
      <GridItem gridColumnL="3/13" gridColumnXL="4/12">
        {reviewCardMock.map((review) => {
          return <ReviewCard key={review.id} {...review} theme={theme} />;
        })}
      </GridItem>
    </Container>
  );
}
