import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import { mockTireRatings } from '~/components/modules/TireRatings/TireRatings.mocks';
import { COLORS, RATINGS_DISPLAY, RATINGS_THEME } from '~/lib/constants';

import MomentList from './MomentList';

export default {
  component: MomentList,
  title: 'Global/Moment List',
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

export function MomentListWithKnobs() {
  const isDark = boolean('Dark Mode', true);
  const isCompact = boolean('Compact Mode', false);
  const showRatingsList = boolean('Show ratings list', false);
  const theme = isDark ? RATINGS_THEME.DARK : RATINGS_THEME.LIGHT;
  const display = isCompact ? RATINGS_DISPLAY.COMPACT : RATINGS_DISPLAY.DEFAULT;

  return (
    <Container theme={theme}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList
          data={mockTireRatings.momentList}
          display={display}
          theme={theme}
        />
        {showRatingsList && (
          <RatingsList
            display={display}
            ratings={mockTireRatings.ratings}
            theme={theme}
          />
        )}
      </GridItem>
    </Container>
  );
}

export function MomentListDark() {
  return (
    <Container>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList
          data={mockTireRatings.momentList}
          theme={RATINGS_THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function MomentListDarkCompact() {
  return (
    <Container>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <MomentList
          data={mockTireRatings.momentList}
          display={RATINGS_DISPLAY.COMPACT}
          theme={RATINGS_THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function MomentListLight() {
  return (
    <Container theme={RATINGS_THEME.LIGHT}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList
          data={mockTireRatings.momentList}
          theme={RATINGS_THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}

export function MomentListLightCompact() {
  return (
    <Container theme={RATINGS_THEME.LIGHT}>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <MomentList
          data={mockTireRatings.momentList}
          display={RATINGS_DISPLAY.COMPACT}
          theme={RATINGS_THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}
