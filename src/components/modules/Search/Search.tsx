import { RefObject, useCallback, useState } from 'react';

import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
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

interface InputQuery {
  queryText: string;
  queryType: string;
}

interface Props {
  addPastSearch: (
    item: SiteSearchResultTextItem | SiteSearchResultImageItem,
  ) => void;
  forwardedRef?: RefObject<HTMLDivElement>;
  isCustomerServiceEnabled: boolean;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  onSearchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  pastSearches: SiteSearchResultGroup;
  results: Results;
}

function Search({
  addPastSearch,
  forwardedRef,
  isCustomerServiceEnabled,
  onClearSearchesClick,
  onCloseSearchClick,
  onSearchQuery,
  pastSearches,
  results,
}: Props) {
  const [primaryQuery, setPrimaryQuery] = useState<InputQuery>({
    queryText: '',
    queryType: '',
  });
  const [secondaryQuery, setSecondaryQuery] = useState<InputQuery>({
    queryText: '',
    queryType: SearchStateEnum.REAR_TIRE,
  });

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

  const getCurrentInputQuery = () =>
    activeInputType === SearchInputEnum.PRIMARY ? primaryQuery : secondaryQuery;
  const setCurrentInputQuery = (query: {
    queryText?: string;
    queryType?: string;
  }) => {
    if (activeInputType === SearchInputEnum.PRIMARY) {
      setPrimaryQuery({ ...primaryQuery, ...query });
    } else if (activeInputType === SearchInputEnum.SECONDARY) {
      setSecondaryQuery({ ...secondaryQuery, ...query });
    }
  };

  const handleClearSearchesClick = () => {
    onClearSearchesClick();

    setTimeout(() => {
      scrollTo(0, TIME.MS400 / 1000);
    }, TIME.MS200);
  };

  const onInputChange = (input: string) => {
    setCurrentInputQuery({ queryText: input });

    const { queryType } = getCurrentInputQuery();
    delayedSearch({ queryText: input, queryType });
  };

  const onCancelSelection = () => {
    const { queryText } = getCurrentInputQuery();

    // Reset the search category when search cleared with no query.
    if (!queryText) {
      setSearchState('');
    }
  };

  const onToggleRearTire = (isShowing: boolean) => {
    if (isShowing) {
      setSearchState(SearchStateEnum.REAR_TIRE);

      // Switch from tireSize to frontTireSize when rear tire input is visible
      setPrimaryQuery({
        ...primaryQuery,
        queryType: SearchStateEnum.FRONT_TIRE,
      });

      onSearchQuery({
        queryText: primaryQuery.queryText,
        queryType: SearchStateEnum.FRONT_TIRE,
      });
    } else {
      setSearchState(SearchStateEnum.TIRE_SIZE);
      setActiveInputType(SearchInputEnum.PRIMARY);
      setPrimaryQuery({
        ...primaryQuery,
        queryType: SearchStateEnum.TIRE_SIZE,
      });
      setSecondaryQuery({ ...secondaryQuery, queryText: '' });

      onSearchQuery({
        queryText: primaryQuery.queryText,
        queryType: SearchStateEnum.TIRE_SIZE,
      });
    }
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    const { action } = searchResult;

    if (action.type === SearchActionType.QUERY) {
      const isInitialRearTireState =
        !action.queryText &&
        !!action.additionalQueryText &&
        action.queryType === SearchStateEnum.REAR_TIRE;
      const isCurrentRearTireSearch =
        action.queryType === SearchStateEnum.REAR_TIRE ||
        SearchStateEnum.REAR_TIRE_WIDTH;

      const { queryText } = getCurrentInputQuery();
      let additionalQueryText = isCurrentRearTireSearch ? queryText : '';

      if (isInitialRearTireState) {
        setPrimaryQuery({
          ...primaryQuery,
          queryText: action.additionalQueryText || '',
        });
        additionalQueryText = action.additionalQueryText || '';
      } else {
        setCurrentInputQuery({
          queryType: action.queryType,
          queryText: action.queryText,
        });
      }

      onSearchQuery({
        additionalQueryText,
        queryText: action.queryText,
        queryType: action.queryType,
      });
    } else if (action.type === SearchActionType.LINK) {
      addPastSearch(searchResult);
    }
  };

  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const { action } = searchResult;

    const category =
      action.type === SearchActionType.QUERY ? action.queryType : '';
    setSearchState(category);

    if (action.type === SearchActionType.QUERY) {
      onSearchQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });
    }
  };

  const handleSupportClick = () => {};

  const handleInputFocus = (inputType: SearchInputEnum) => {
    setActiveInputType(inputType);

    // Only make an additional search query in front/rear tire state
    if (
      searchState === SearchStateEnum.REAR_TIRE &&
      inputType !== activeInputType
    ) {
      const query =
        inputType === SearchInputEnum.PRIMARY
          ? {
              additionalQueryText: secondaryQuery.queryText,
              queryText: primaryQuery.queryText,
              queryType: primaryQuery.queryType,
            }
          : {
              additionalQueryText: primaryQuery.queryText,
              queryText: secondaryQuery.queryText,
              queryType: secondaryQuery.queryType,
            };

      onSearchQuery(query);
    }
  };

  const { queryText } = getCurrentInputQuery();
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
        queryText={primaryQuery.queryText}
        searchState={searchState}
        secondaryQueryText={secondaryQuery.queryText}
      />
      {shouldShowInitialSearch && (
        <InitialSearch
          onClearSearchesClick={handleClearSearchesClick}
          onPastSearchClick={handleValueSelection}
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
