import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import {
  momentListMock,
  ratingsMock,
} from '~/components/modules/PDP/Reviews/Reviews.mock';
import { COLORS, RATINGS_DISPLAY, THEME } from '~/lib/constants';

import MomentList from './MomentList';

export default {
  component: MomentList,
  title: 'Global/Moment List',
};

interface Props {
  children: ReactNode;
  theme?: THEME;
}

function Container({ children, theme = THEME.DARK }: Props) {
  return (
    <Grid
      css={{
        backgroundColor:
          theme === THEME.DARK ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.WHITE,
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
  const theme = isDark ? THEME.DARK : THEME.LIGHT;
  const display = isCompact ? RATINGS_DISPLAY.COMPACT : RATINGS_DISPLAY.DEFAULT;

  return (
    <Container theme={theme}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList data={momentListMock} display={display} theme={theme} />
        {showRatingsList && (
          <RatingsList display={display} ratings={ratingsMock} theme={theme} />
        )}
      </GridItem>
    </Container>
  );
}

export function MomentListDark() {
  return (
    <Container>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList data={momentListMock} theme={THEME.DARK} />
      </GridItem>
    </Container>
  );
}

export function MomentListDarkCompact() {
  return (
    <Container>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <MomentList
          data={momentListMock}
          display={RATINGS_DISPLAY.COMPACT}
          theme={THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function MomentListLight() {
  return (
    <Container theme={THEME.LIGHT}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <MomentList data={momentListMock} theme={THEME.LIGHT} />
      </GridItem>
    </Container>
  );
}

export function MomentListLightCompact() {
  return (
    <Container theme={THEME.LIGHT}>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <MomentList
          data={momentListMock}
          display={RATINGS_DISPLAY.COMPACT}
          theme={THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}
