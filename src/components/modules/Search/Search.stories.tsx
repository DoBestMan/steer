import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';

import AdditionalInfoModal from './AdditionalInfoModal/AdditionalInfoModal';
import {
  TIRE_SEARCH_MODAL_DATA,
  VEHICLE_TRIM_MODAL_DATA,
} from './AdditionalInfoModal/AdditionalInfoModal.constants';
import Search from './Search';
import {
  noResultsWithSuggestions,
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
import { SearchStateEnum } from './Search.types';

export default {
  component: Search,
  title: 'Search/Search',
};

// Temporary helper function for mock data
function getCategoryResults(category: string) {
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
    setPastSearches([]);
  };
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
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
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
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
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
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
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={tireSizeResults}
    />
  );
}

export function SearchBy() {
  const [results, setResults] = useState(noSearchResults);
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = (category: string) => {
    const categoryResults = getCategoryResults(category);
    setResults(categoryResults);
  };

  return (
    <Search
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={results}
    />
  );
}

export function TireSizeModal() {
  const [isOpen, setIsOpen] = useState(true);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Button onClick={toggleModal}>Open modal</Button>
      <AdditionalInfoModal
        isCustomerServiceEnabled={boolean('Is Business Hours', true)}
        isOpen={isOpen}
        onClose={toggleModal}
        {...TIRE_SEARCH_MODAL_DATA}
      />
    </>
  );
}

export function VehicleTrimModal() {
  const [isOpen, setIsOpen] = useState(true);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Button onClick={toggleModal}>Open modal</Button>
      <AdditionalInfoModal
        isCustomerServiceEnabled={boolean('Is Business Hours', true)}
        isOpen={isOpen}
        onClose={toggleModal}
        {...VEHICLE_TRIM_MODAL_DATA}
      />
    </>
  );
}

export function NoResultsNoSuggestions() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={noSearchResults}
    />
  );
}

export function NoResultsWithSuggestions() {
  const handleCloseSearchClick = action('Close search');
  const handleClearSearchesClick = action('Clear searches');
  const handleSetSearchCategory = action('Set search category');

  return (
    <Search
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      onClearSearchesClick={handleClearSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSetSearchCategory={handleSetSearchCategory}
      pastSearches={[]}
      results={noResultsWithSuggestions}
    />
  );
}
