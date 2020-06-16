import { boolean, number } from '@storybook/addon-knobs';

import Casino from '~/components/global/Casino/Casino';
import { StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export default {
  component: Casino,
  title: 'Global/Casino',
};

const styles: StylesMap = {
  container: {
    color: 'red',
  },
};

export function CasinoWithKnobs() {
  const numberDisplayed = number('Casino number', 132.56);
  const animate = boolean('Start animation', false);

  return (
    <div css={[styles.container, typography.bodyCopy]}>
      We found <Casino numberDisplayed={numberDisplayed} animate={animate} />{' '}
      tires that fit your Civic 2016
    </div>
  );
}
