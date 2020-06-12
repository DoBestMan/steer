import { boolean } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { COLORS } from '~/lib/constants';

import TechnicalSpecs from './TechnicalSpecs';
import { sizesList, specList } from './TechnicalSpecs.mock';

export default {
  component: TechnicalSpecs,
  title: 'PDP/Technical Specs',
};

export function TechnicalSpecsCarousel() {
  const isCustomerServiceEnabled = boolean('Is Business Hours', true);
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <TechnicalSpecs
        specs={specList}
        sizes={sizesList}
        isCustomerServiceEnabled={isCustomerServiceEnabled}
      />
    </Grid>
  );
}
