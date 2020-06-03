import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import MomentList from '~/components/global/MomentList/MomentList';
import { mockTireRatings } from '~/components/modules/TireRatings/TireRatings.mocks';
import { COLORS } from '~/lib/constants';

import RatingsList from './RatingsList';

export default {
  component: RatingsList,
  title: 'Global/Ratings List',
};

function Container({ children }: { children: ReactNode }) {
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        {children}
      </GridItem>
    </Grid>
  );
}

export function RatingsListWithKnobs() {
  return (
    <Container>
      {boolean('Show moment list', false) ? (
        <MomentList data={mockTireRatings.momentList} />
      ) : undefined}
      <RatingsList ratings={mockTireRatings.ratings} />
    </Container>
  );
}
