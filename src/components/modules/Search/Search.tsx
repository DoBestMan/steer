import { RefObject, useState } from 'react';

import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';

import InitialSearch from './InitialSearch';
import styles from './Search.styles';
import {
  Results,
  SearchActionType,
  SearchInputEnum,
  SearchResult,
  SearchResultEnum,
  SearchStateEnum,
} from './Search.types';
import SearchAutocomplete from './SearchAutocomplete';
import SearchSupport from './SearchSupport';

interface Props {
  forwardedRef?: RefObject<HTMLDivElement>;
  isCustomerServiceEnabled: boolean;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  onSetSearchCategory: (category: string) => void;
  pastSearches: SiteSearchResultTextItem[];
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
  const [searchState, setSearchState] = useState('');
  const [activeInputType, setActiveInputType] = useState(
    SearchInputEnum.PRIMARY,
  );

  const { resultMetadata, siteSearchGroupList } = results;
  const { noExactMatch } = resultMetadata;

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
      setSearchState('');
      onSetSearchCategory('');
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
    let queryText = '';

    if (searchResult.type === SearchResultEnum.TEXT) {
      queryText = searchResult.label;
    } else if (searchResult.type === SearchResultEnum.IMAGE) {
      queryText = searchResult.image.altText;
    }

    if (activeInputType === SearchInputEnum.PRIMARY) {
      setQuery(queryText);
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery(queryText);
    }
  };

  // We need to set the search state internally for UI purposes, but also
  // externally in order to update the search results.
  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const category =
      searchResult.action.type === SearchActionType.QUERY
        ? searchResult.action.queryType
        : '';
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
  const shouldShowSearchSupport = noExactMatch && !hasResults && !isInputEmpty;
  const shouldShowInitialSearch =
    (shouldShowSearchSupport || isInputEmpty) && !searchState;

  return (
    <div css={styles.container} ref={forwardedRef}>
      <SearchAutocomplete
        activeInputType={activeInputType}
        focusOnMount
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        noExactMatch={noExactMatch}
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
