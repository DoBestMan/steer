import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import Search from './Search';
import {
  noSearchResults,
  pastSearchResults,
  simpleSearchResults,
} from './Search.mocks';

export default {
  component: Search,
  title: 'Search',
};

export function DefaultSearch() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);

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
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsRegular() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);

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
      results={simpleSearchResults}
    />
  );
}

export function NoSearchResults() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);

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
      results={noSearchResults}
    />
  );
}
