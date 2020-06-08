import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import MomentList from '~/components/global/MomentList/MomentList';
import { mockTireRatings } from '~/components/modules/TireRatings/TireRatings.mocks';
import { COLORS, RATINGS_DISPLAY, RATINGS_THEME } from '~/lib/constants';

import RatingsList from './RatingsList';

export default {
  component: RatingsList,
  title: 'Global/Ratings List',
};

interface Props {
  children: ReactNode;
  theme?: RATINGS_THEME;
}

function Container({ children, theme = RATINGS_THEME.DARK }: Props) {
  return (
    <Grid
      css={{
        backgroundColor:
          theme === RATINGS_THEME.DARK
            ? COLORS.GLOBAL.BLACK
            : COLORS.GLOBAL.WHITE,
      }}
    >
      {children}
    </Grid>
  );
}
export function RatingsListWithKnobs() {
  const isDark = boolean('Dark Mode', true);
  const isCompact = boolean('Compact Mode', false);
  const showMomentList = boolean('Show moment list', false);
  const theme = isDark ? RATINGS_THEME.DARK : RATINGS_THEME.LIGHT;
  const display = isCompact ? RATINGS_DISPLAY.COMPACT : RATINGS_DISPLAY.DEFAULT;

  return (
    <Container theme={theme}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        {showMomentList && (
          <MomentList
            display={display}
            data={mockTireRatings.momentList}
            theme={theme}
          />
        )}
        <RatingsList
          display={display}
          ratings={mockTireRatings.ratings}
          theme={theme}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListDark() {
  return (
    <Container>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <RatingsList
          ratings={mockTireRatings.ratings}
          theme={RATINGS_THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListDarkCompact() {
  return (
    <Container>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <RatingsList
          display={RATINGS_DISPLAY.COMPACT}
          ratings={mockTireRatings.ratings}
          theme={RATINGS_THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListLight() {
  return (
    <Container theme={RATINGS_THEME.LIGHT}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <RatingsList
          ratings={mockTireRatings.ratings}
          theme={RATINGS_THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListLightCompact() {
  return (
    <Container theme={RATINGS_THEME.LIGHT}>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <RatingsList
          display={RATINGS_DISPLAY.COMPACT}
          ratings={mockTireRatings.ratings}
          theme={RATINGS_THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}
