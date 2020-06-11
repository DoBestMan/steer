import { RefObject, useCallback, useState } from 'react';

import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { SearchDataParams } from '~/lib/api/search';
import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';
import debounce from '~/lib/utils/debounce';

import InitialSearch from './InitialSearch';
import styles from './Search.styles';
import {
  Results,
  SearchActionType,
  SearchInputEnum,
  SearchResult,
  SearchStateEnum,
} from './Search.types';
import SearchAutocomplete from './SearchAutocomplete';
import SearchSupport from './SearchSupport';

interface Props {
  forwardedRef?: RefObject<HTMLDivElement>;
  isCustomerServiceEnabled: boolean;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  onSearchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  pastSearches: SiteSearchResultTextItem[];
  results: Results;
}

function Search({
  onSearchQuery,
  isCustomerServiceEnabled,
  onClearSearchesClick,
  onCloseSearchClick,
  pastSearches,
  forwardedRef,
  results,
}: Props) {
  const [queryText, setQueryText] = useState('');
  const [secondaryQueryText, setSecondaryQueryText] = useState('');
  const [queryType, setQueryType] = useState('');
  const [searchState, setSearchState] = useState('');
  const [activeInputType, setActiveInputType] = useState(
    SearchInputEnum.PRIMARY,
  );
  const delayedSearch = useCallback(
    debounce(({ queryText, queryType }) => {
      onSearchQuery({ queryText, queryType });
    }, 200),
    [],
  );

  const { resultMetadata, siteSearchResultGroupList } = results;
  const { noExactMatch } = resultMetadata;

  const handleClearSearchesClick = () => {
    onClearSearchesClick();

    setTimeout(() => {
      scrollTo(0, TIME.MS400 / 1000);
    }, TIME.MS200);
  };

  const onInputChange = (input: string) => {
    if (activeInputType === SearchInputEnum.PRIMARY) {
      setQueryText(input);
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQueryText(input);
    }

    delayedSearch({ queryText: input, queryType });
  };

  const onCancelSelection = () => {
    // Reset the search category when search cleared with no query.
    if (!queryText) {
      setSearchState('');
    }
  };

  const onToggleRearTire = (isShowing: boolean) => {
    if (isShowing) {
      setSearchState(SearchStateEnum.REAR_TIRE);
    } else {
      setSearchState(SearchStateEnum.TIRE_SIZE);
      setActiveInputType(SearchInputEnum.PRIMARY);
      setSecondaryQueryText('');
    }
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    const { action } = searchResult;

    if (action.type === SearchActionType.QUERY) {
      if (activeInputType === SearchInputEnum.PRIMARY) {
        setQueryText(action.queryText);
      } else if (activeInputType === SearchInputEnum.SECONDARY) {
        setSecondaryQueryText(action.queryText);
      }

      handleSearchQuery(searchResult);
    }
  };

  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const category =
      searchResult.action.type === SearchActionType.QUERY
        ? searchResult.action.queryType
        : '';
    setSearchState(category);

    handleSearchQuery(searchResult);
  };

  const handleSearchQuery = (searchResult: SearchResult) => {
    const { action } = searchResult;

    if (action.type === SearchActionType.QUERY) {
      setQueryType(action.queryType);
      onSearchQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });
    }
  };

  const handlePastSearchClick = () => {};
  const handleSupportClick = () => {};

  const handleInputFocus = (inputType: SearchInputEnum) => {
    setActiveInputType(inputType);
  };

  const isInputEmpty = queryText.length < 1;
  const hasResults = siteSearchResultGroupList.length > 0;
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
        results={siteSearchResultGroupList}
        queryText={queryText}
        searchState={searchState}
        secondaryQueryText={secondaryQueryText}
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
