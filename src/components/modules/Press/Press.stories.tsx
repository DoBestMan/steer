import { text } from '@storybook/addon-knobs';

import Press from './Press';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS } from '~/lib/constants';

export default {
  component: Press,
  title: 'Press',
};

export function PressWithKnobs() {
  const reviews = [
    {
      imageUrl: text(
        'Image URL',
        'https://via.placeholder.com/100x35.png?text=Inc.',
      ),
      name: text('Press Name', 'Inc. Magazine'),
      quote: text('Quote', 'Fastest-growing'),
    },
    {
      imageUrl: 'https://via.placeholder.com/160x60.png?text=Forbes',
      name: 'Forbes',
      quote: 'Innovative',
    },
    {
      imageUrl: 'https://via.placeholder.com/120x44.png',
      name: 'Tire Business',
      quote: 'A new way',
    },
  ];

  return (
    <Grid as="section" css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <GridItem gridColumnM="5/8" gridColumnL="8/13">
        <Press reviews={reviews} />
      </GridItem>
    </Grid>
  );
}
