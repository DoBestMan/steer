import { css } from '@emotion/core';
import { number } from '@storybook/addon-knobs';

import Casino from '~/components/global/Casino/Casino';
import { typography } from '~/styles/typography.styles';

export default {
  component: Casino,
  title: 'Casino',
};

const styles = {
  container: css({
    color: 'red',
  }),
};

export function CasinoWithKnobs() {
  const numberDisplayed = number('Casino number', 132);

  return (
    <div css={[styles.container, typography.bodyCopy]}>
      We found <Casino numberDisplayed={numberDisplayed} /> tires that fit your
      Civic 2016
    </div>
  );
}
