import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import Search from './Search';
import {
  noSearchResults,
  partNumberResults,
  pastSearchResults,
  simpleSearchResults,
  tireSizeResults,
} from './Search.mocks';

export default {
  component: Search,
  title: 'Search',
};

export function PastSearchResults() {
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
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      pastSearches={[]}
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsPartNumber() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      pastSearches={[]}
      results={partNumberResults}
    />
  );
}

export function SearchResultsTireSize() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      pastSearches={[]}
      results={tireSizeResults}
    />
  );
}

export function NoSearchResults() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      pastSearches={[]}
      results={noSearchResults}
    />
  );
}
