import { boolean, number, select } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { default as StarsComponent } from './Stars';
import { default as StarsWithRatingComponent } from './StarsWithRating';

export default {
  component: StarsComponent,
  title: 'Global/Stars',
};

const starOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

const colorOptions = {
  Orange: COLORS.GLOBAL.ORANGE,
  Black: COLORS.GLOBAL.BLACK,
};

export function Stars() {
  const color = select('Color', colorOptions, COLORS.GLOBAL.ORANGE);
  return (
    <Grid
      css={{
        backgroundColor:
          color === COLORS.GLOBAL.ORANGE ? COLORS.GLOBAL.BLACK : 'transparent',
      }}
    >
      <StarsComponent
        color={color}
        bgColor={
          color === COLORS.GLOBAL.ORANGE
            ? COLORS.DARK.GRAY_40
            : COLORS.LIGHT.GRAY_20
        }
        isSmall={boolean('Small', false)}
        number={number('Number', 3.2, starOptions)}
      />
    </Grid>
  );
}

export function StarsWithRating() {
  const color = select('Color', colorOptions, COLORS.GLOBAL.ORANGE);
  return (
    <Grid
      css={{
        backgroundColor:
          color === COLORS.GLOBAL.ORANGE ? COLORS.GLOBAL.BLACK : 'transparent',
      }}
    >
      <StarsWithRatingComponent
        color={color}
        isSmall={boolean('Small', false)}
        number={number('Number', 4.8, starOptions)}
        typographyStyle={typography.labelHeadlineLarge}
      />
    </Grid>
  );
}
