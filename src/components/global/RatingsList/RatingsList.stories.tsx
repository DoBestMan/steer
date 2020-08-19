import { boolean, select } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import MomentList from '~/components/global/MomentList/MomentList';
import {
  momentListMock,
  ratingsMock,
} from '~/components/modules/PDP/Reviews/Reviews.mock';
import { COLORS, RATINGS_DISPLAY, THEME } from '~/lib/constants';

import RatingsList from './RatingsList';

export default {
  component: RatingsList,
  title: 'Global/Ratings List',
};

interface Props {
  children: ReactNode;
  theme?: THEME;
}

function Container({ children, theme = THEME.DARK }: Props) {
  const themeMap = {
    [THEME.DARK]: COLORS.GLOBAL.BLACK,
    [THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [THEME.ORANGE]: COLORS.GLOBAL.WHITE,
  };
  const backgroundColor = themeMap[theme];

  return (
    <Grid
      css={{
        backgroundColor,
      }}
    >
      {children}
    </Grid>
  );
}
export function RatingsListWithKnobs() {
  const theme = select(
    'Theme',
    [THEME.DARK, THEME.LIGHT, THEME.ORANGE],
    THEME.DARK,
  );
  const isCompact = boolean('Compact Mode', false);
  const showMomentList = boolean('Show moment list', false);
  const display = isCompact ? RATINGS_DISPLAY.COMPACT : RATINGS_DISPLAY.DEFAULT;

  return (
    <Container theme={theme}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        {showMomentList && (
          <MomentList
            display={display}
            data={momentListMock}
            theme={theme === THEME.ORANGE ? THEME.LIGHT : theme}
          />
        )}
        <RatingsList display={display} ratings={ratingsMock} theme={theme} />
      </GridItem>
    </Container>
  );
}

export function RatingsListDark() {
  return (
    <Container>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <RatingsList ratings={ratingsMock} theme={THEME.DARK} />
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
          ratings={ratingsMock}
          theme={THEME.DARK}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListLight() {
  return (
    <Container theme={THEME.LIGHT}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <RatingsList ratings={ratingsMock} theme={THEME.LIGHT} />
      </GridItem>
    </Container>
  );
}

export function RatingsListLightCompact() {
  return (
    <Container theme={THEME.LIGHT}>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <RatingsList
          display={RATINGS_DISPLAY.COMPACT}
          ratings={ratingsMock}
          theme={THEME.LIGHT}
        />
      </GridItem>
    </Container>
  );
}

export function RatingsListOrange() {
  return (
    <Container theme={THEME.ORANGE}>
      <GridItem gridColumnM="2/5" gridColumnL="2/6">
        <RatingsList ratings={ratingsMock} theme={THEME.ORANGE} />
      </GridItem>
    </Container>
  );
}

export function RatingsListOrangeCompact() {
  return (
    <Container theme={THEME.ORANGE}>
      <GridItem gridColumn="2/5" gridColumnL="2/6" gridColumnXL="2/5">
        <RatingsList
          display={RATINGS_DISPLAY.COMPACT}
          ratings={ratingsMock}
          theme={THEME.ORANGE}
        />
      </GridItem>
    </Container>
  );
}
