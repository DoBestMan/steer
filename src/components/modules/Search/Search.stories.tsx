import { action } from '@storybook/addon-actions';

import Search from './Search';

export default {
  component: Search,
  title: 'Search',
};

export function DefaultSearch() {
  const handleCloseSearchClick = action('Close search');
  return <Search onCloseSearchClick={handleCloseSearchClick} />;
}
