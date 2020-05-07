import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import SearchButton from './SearchButton';

export default {
  component: SearchButton,
  title: 'SearchButton',
};

const options = {
  default: null,
  promotional: 'promotional',
};

const handleButtonClick = action('button-click');

export function ButtonWithKnobs() {
  const theme = select('Themes', options, options.default);

  return <SearchButton onClick={handleButtonClick} theme={theme} />;
}
