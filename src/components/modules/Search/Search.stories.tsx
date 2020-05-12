import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import Search from './Search';

const PAST_SEARCHES = [
  {
    id: 'test-1',
    text: 'Mini Cooper 2018 Hardtop',
  },
  {
    id: 'test-2',
    text: 'Honda Civic 2016 EX-L',
  },
  {
    id: 'test-3',
    text: '215/50R16',
  },
  {
    id: 'test-4',
    text: 'Toyota Sienna 2018 LE',
  },
  {
    id: 'test-5',
    text: 'Hankook Kinergy PT',
  },
];

export default {
  component: Search,
  title: 'Search',
};

export function DefaultSearch() {
  const [pastSearches, setPastSearches] = useState(PAST_SEARCHES);

  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = function () {
    // Temporariliy delay removing searches (until React Transition Group implemented)
    setTimeout(() => {
      setPastSearches([]);
    }, 200);
  };

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      pastSearches={pastSearches}
    />
  );
}
