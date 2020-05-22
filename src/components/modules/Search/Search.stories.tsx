import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import Search from './Search';
import { SearchStateEnum, SearchStateType } from './Search.constants';
import {
  noSearchResults,
  partNumberResults,
  pastSearchResults,
  searchByBrand,
  searchByMostPopular,
  searchByTireSize,
  searchByVehicle,
  simpleSearchResults,
  tireSizeResults,
} from './Search.mocks';

export default {
  component: Search,
  title: 'Search',
};

// Temporary helper function for mock data
function getCategoryResults(category: SearchStateType) {
  switch (category) {
    case SearchStateEnum.VEHICLE:
      return searchByVehicle;
    case SearchStateEnum.TIRE_SIZE:
      return searchByTireSize;
    case SearchStateEnum.BRAND:
      return searchByBrand;
    case SearchStateEnum.POPULAR:
      return searchByMostPopular;
    default:
      return noSearchResults;
  }
}

export function PastSearchResults() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);

  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = function () {
    // Temporariliy delay removing searches (until React Transition Group implemented)
    setTimeout(() => {
      setPastSearches([]);
    }, 200);
  };
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={pastSearches}
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsRegular() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsPartNumber() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={partNumberResults}
    />
  );
}

export function SearchResultsTireSize() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={tireSizeResults}
    />
  );
}

export function NoSearchResults() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={noSearchResults}
    />
  );
}

export function SearchBy() {
  const [results, setResults] = useState(noSearchResults);
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = (category: SearchStateType) => {
    const categoryResults = getCategoryResults(category);
    setResults(categoryResults);
  };

  return (
    <Search
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={results}
    />
  );
}
