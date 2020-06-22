import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { SearchDataParams } from '~/lib/api/search';

import AdditionalInfoModal from './AdditionalInfoModal/AdditionalInfoModal';
import {
  TIRE_SEARCH_MODAL_DATA,
  VEHICLE_TRIM_MODAL_DATA,
} from './AdditionalInfoModal/AdditionalInfoModal.constants';
import Search from './Search';
import {
  emptyResult,
  emptySiteSearchResultGroup,
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

const handleAddPastSearch = action('Add past search');
const handleCloseSearchClick = action('Close search');
const handleClearSearchResults = action('Clear search results');
const handleClearPastSearchesClick = action('Clear past searches');
const handleSearchQuery = action('Search for query');

export function SearchResultsInitialState() {
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={emptyResult}
    />
  );
}

export function PastSearchResults() {
  const [pastSearches, setPastSearches] = useState(pastSearchResults);

  const clearPastSearches = function () {
    setPastSearches(emptySiteSearchResultGroup);
  };

  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={clearPastSearches}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={pastSearches}
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsRegular() {
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={simpleSearchResults}
    />
  );
}

export function SearchResultsPartNumber() {
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={partNumberResults}
    />
  );
}

export function SearchResultsTireSize() {
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={tireSizeResults}
    />
  );
}

export function SearchBy() {
  const [results, setResults] = useState(noSearchResults);
  const searchQuery = ({ queryType }: SearchDataParams) => {
    const categoryResults = getCategoryResults(queryType);
    setResults(categoryResults);
  };

  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={searchQuery}
      pastSearches={emptySiteSearchResultGroup}
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
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={noSearchResults}
    />
  );
}

export function NoResultsWithSuggestions() {
  return (
    <Search
      addPastSearch={handleAddPastSearch}
      clearSearchResults={handleClearSearchResults}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
      deletePastSearches={handleClearPastSearchesClick}
      onCloseSearchClick={handleCloseSearchClick}
      onSearchQuery={handleSearchQuery}
      pastSearches={emptySiteSearchResultGroup}
      results={noResultsWithSuggestions}
    />
  );
}
