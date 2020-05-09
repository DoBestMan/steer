import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import SearchButton from './SearchButton';

export default {
  component: SearchButton,
  title: 'SearchButton',
};

const options = {
  default: COLORS.GLOBAL.ORANGE,
  promotional: COLORS.GLOBAL.BLACK,
};

const handleButtonClick = action('button-click');

export function ButtonWithKnobs() {
  const backgroundColor = select('Background Color', options, options.default);

  return (
    <div css={{ backgroundColor }}>
      <SearchButton onClick={handleButtonClick} />
    </div>
  );
}
