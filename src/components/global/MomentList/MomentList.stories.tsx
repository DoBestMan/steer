import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import { mockTireRatings } from '~/components/modules/TireRatings/TireRatings.mocks';
import { COLORS } from '~/lib/constants';

import MomentList from './MomentList';

export default {
  component: MomentList,
  title: 'Global/Moment List',
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

export function MomentListWithKnobs() {
  return (
    <Container>
      <MomentList data={mockTireRatings.momentList} />
      {boolean('Show ratings list', false) ? (
        <RatingsList ratings={mockTireRatings.ratings} />
      ) : undefined}
    </Container>
  );
}
