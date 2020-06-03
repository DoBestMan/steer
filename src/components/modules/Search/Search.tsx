import { RefObject, useState } from 'react';

import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';

import InitialSearch from './InitialSearch';
import {
  SearchInputEnum,
  SearchResultListEnum,
  SearchState,
  SearchStateEnum,
  SearchStateType,
} from './Search.constants';
import styles from './Search.styles';
import SearchAutocomplete from './SearchAutocomplete';
import SearchSupport from './SearchSupport';

interface ResultMetadata {
  noExactMatches?: boolean;
}

export interface Results {
  resultMetadata: ResultMetadata;
  siteSearchGroupList: SearchGroup[];
}

export interface SearchGroup {
  label?: string;
  labelFragments?: Array<{ highlighted: boolean; value: string }>;
  siteSearchResultList: SearchResult[];
  type: SearchResultListEnum;
}

export interface SearchResult {
  additionalDisplayValue?: string;
  displayImage?: string;
  displayValue: string;
  type: string;
  value: string;
}

interface Props {
  forwardedRef?: RefObject<HTMLDivElement>;
  isCustomerServiceEnabled: boolean;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  onSetSearchCategory: (category: SearchStateType) => void;
  pastSearches: SearchResult[];
  results: Results;
}

function Search({
  isCustomerServiceEnabled,
  onClearSearchesClick,
  onCloseSearchClick,
  onSetSearchCategory,
  pastSearches,
  forwardedRef,
  results,
}: Props) {
  const [query, setQuery] = useState('');
  const [secondaryQuery, setSecondaryQuery] = useState('');
  const [searchState, setSearchState] = useState(SearchState.FREE_SEARCH);
  const [activeInputType, setActiveInputType] = useState(
    SearchInputEnum.PRIMARY,
  );

  const { resultMetadata, siteSearchGroupList } = results;
  const { noExactMatches } = resultMetadata;

  const handleClearSearchesClick = () => {
    onClearSearchesClick();

    setTimeout(() => {
      scrollTo(0, TIME.MS400 / 1000);
    }, TIME.MS200);
  };

  const onInputChange = (input: string) => {
    if (activeInputType === SearchInputEnum.PRIMARY) {
      setQuery(input);
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery(input);
    }
  };

  const onCancelSelection = () => {
    // Reset the search category when search cleared with no query.
    if (!query) {
      setSearchState(SearchState.FREE_SEARCH);
      onSetSearchCategory(SearchState.FREE_SEARCH);
    }
  };

  const onToggleRearTire = (isShowing: boolean) => {
    if (isShowing) {
      setSearchState(SearchStateEnum.REAR_TIRE);
    } else {
      setSearchState(SearchStateEnum.TIRE_SIZE);
      setActiveInputType(SearchInputEnum.PRIMARY);
      setSecondaryQuery('');
    }
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    if (activeInputType === SearchInputEnum.PRIMARY) {
      setQuery(searchResult.displayValue);
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery(searchResult.displayValue);
    }
  };

  // We need to set the search state internally for UI purposes, but also
  // externally in order to update the search results.
  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const category = SearchState[searchResult.value];
    setSearchState(category);
    onSetSearchCategory(category);
  };

  const handlePastSearchClick = () => {};
  const handleSupportClick = () => {};

  const handleInputFocus = (inputType: SearchInputEnum) => {
    setActiveInputType(inputType);
  };

  const isInputEmpty = query.length < 1;
  const hasResults = siteSearchGroupList.length > 0;
  const shouldShowSearchSupport =
    noExactMatches && !hasResults && !isInputEmpty;
  const shouldShowInitialSearch =
    (shouldShowSearchSupport || isInputEmpty) &&
    searchState === SearchState.FREE_SEARCH;

  return (
    <div css={styles.container} ref={forwardedRef}>
      <SearchAutocomplete
        activeInputType={activeInputType}
        focusOnMount
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        noExactMatches={noExactMatches}
        onCancelSelection={onCancelSelection}
        onInputChange={onInputChange}
        onCloseSearchClick={onCloseSearchClick}
        onInputFocus={handleInputFocus}
        onToggleRearTire={onToggleRearTire}
        onValueSelection={handleValueSelection}
        results={siteSearchGroupList}
        query={query}
        searchState={searchState}
        secondaryQuery={secondaryQuery}
      />
      {shouldShowInitialSearch && (
        <InitialSearch
          onClearSearchesClick={handleClearSearchesClick}
          onPastSearchClick={handlePastSearchClick}
          onSearchCategoryClick={handleSearchCategoryClick}
          pastSearches={pastSearches}
        />
      )}
      {shouldShowSearchSupport && (
        <SearchSupport onClick={handleSupportClick} />
      )}
    </div>
  );
}

export default Search;
