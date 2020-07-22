import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import { COLORS, THEME } from '~/lib/constants';

import PDPActionBar from './ActionBar';

export default {
  component: PDPActionBar,
  title: 'PDP/Action Bar',
};

const tireSize = '215/55R16 89H';
const rearSize = '245/55R19 89H';
const startingPrice = '7999';
const tirePrice = '7999';
const rearPrice = '9999';

export function StickyBarWithKnobs() {
  const hasTireSize = boolean('Has tire size?', false);
  const hasRearSize = boolean('Has rear tire size?', false);

  const onClickFindYourSize = action('click-find-your-size');

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.ORANGE }}>
      <PDPActionBar
        rearSize={hasRearSize ? rearSize : undefined}
        rearPrice={hasRearSize ? rearPrice : undefined}
        roadHazard={null}
        startingPrice={startingPrice}
        theme={THEME.ORANGE}
        tireSize={hasTireSize ? tireSize : undefined}
        tirePrice={hasTireSize ? tirePrice : undefined}
        onClickFindYourSize={onClickFindYourSize}
      />
    </div>
  );
}
