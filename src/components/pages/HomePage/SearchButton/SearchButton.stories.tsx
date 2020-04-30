import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { Home as HomeType } from '~/lib/constants/home.types';

import SearchButton from './SearchButton';

export default {
  component: SearchButton,
  title: 'SearchButton',
};

const options: HomeType[] = Object.keys(HomeType).map(
  (key: string) => HomeType[key as keyof typeof HomeType],
);

const handleButtonClick = action('button-click');

export function ButtonWithKnobs() {
  const type = select('Types', options, options[0]);

  return <SearchButton onClick={handleButtonClick} type={type} />;
}
