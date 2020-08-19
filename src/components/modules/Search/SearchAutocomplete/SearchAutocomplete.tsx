import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Loading from '~/components/global/Loading/Loading';
import { useModalContext } from '~/context/Modal.context';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { ARIA_LIVE, KEYCODES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { InputQuery } from '../Search';
import { useAutocompleteSelectedItem, useHeaderScroll } from '../Search.hooks';
import {
  SearchActionType,
  SearchInputEnum,
  SearchResult,
  SearchStateCopy,
  SearchStateEnum,
} from '../Search.types';
import SearchInput from '../SearchInput/SearchInput';
import SearchLabel from '../SearchLabel/SearchLabel';
import SearchResults from '../SearchResults/SearchResults';
import CloseSearchButton from './CloseSearchButton';
import styles from './SearchAutocomplete.styles';
import SearchError from './SearchError';
import SearchSecondaryActions from './SearchSecondaryActions';

export const AUTOCOMPLETE_CONSTANTS = {
  DEFAULT_SELECTED_ITEM_INDEX: [0, -1],
  DEFAULT_VALUE: '',
  SHOW_LOADING_TIMEOUT: 800,
  GRID_COLUMN_PROPS: {
    gridColumnS: '2/6',
    gridColumnM: '2/8',
    gridColumnL: '3/14',
    gridColumnXL: '3/14',
  },
};

export interface Props {
  activeInputType: SearchInputEnum;
  focusOnMount?: boolean;
  hasSearchResultsError: boolean;
  isLoadingResults?: boolean;
  noExactMatch?: boolean;
  onCancelSelection: () => void;
  onCloseSearchClick: () => void;
  onInputChange: (value: string) => void;
  onInputFocus: (inputType: SearchInputEnum) => void;
  onSetInputQuery: (inputType: SearchInputEnum, query: InputQuery) => void;
  onToggleRearTire: (isShowing: boolean) => void;
  onValueSelection: (value: SearchResult) => void;
  queryText: string;
  results: SiteSearchResultGroup[];
  searchState: string;
  secondaryQueryText: string;
}

function SearchAutocomplete({
  activeInputType,
  focusOnMount = false,
  hasSearchResultsError,
  isLoadingResults,
  noExactMatch,
  onCancelSelection,
  onCloseSearchClick,
  onInputChange,
  onInputFocus,
  onSetInputQuery,
  onToggleRearTire,
  onValueSelection,
  queryText,
  results = [],
  searchState,
  secondaryQueryText,
}: Props) {
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const [shouldShowLoading, setShouldShowLoading] = useState(false);
  const [isFrontTireComplete, setIsFrontTireComplete] = useState(false);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const primaryInput = useRef<HTMLInputElement>(null);
  const secondaryInput = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { headerRef, scrollRef } = useHeaderScroll();

  const {
    selectNextItemIndex,
    selectPrevItemIndex,
    selectedItemIndex,
    setSelectedItemIndex,
  } = useAutocompleteSelectedItem(results);
  const { openStaticModal } = useModalContext();

  const isInputEmpty = queryText.length < 1;
  const hasResults = results.length > 0;
  const hasNoMatchingResults =
    noExactMatch && !isInputEmpty && !isLoadingResults;
  const hasActiveSearchState = !!searchState;
  const isRearTireState = searchState === SearchStateEnum.REAR_TIRE;
  const isSearchInProgress = !!queryText || hasActiveSearchState;

  const focusOnInput = useCallback(() => {
    if (activeInputType === SearchInputEnum.PRIMARY && primaryInput.current) {
      primaryInput.current.focus();
    } else if (
      activeInputType === SearchInputEnum.SECONDARY &&
      secondaryInput.current
    ) {
      secondaryInput.current.focus();
    }
  }, [activeInputType]);

  useEffect(() => {
    if (focusOnMount) {
      focusOnInput();
    }
  }, [focusOnMount, focusOnInput]);

  useEffect(() => {
    setShouldShowListbox(
      hasResults && (!isInputEmpty || !!searchState) && !shouldShowLoading,
    );
  }, [hasResults, isInputEmpty, results, searchState, shouldShowLoading]);

  useEffect(() => {
    focusOnInput();
  }, [focusOnInput, searchState]);

  useEffect(() => {
    if (isFrontTireComplete) {
      secondaryInput?.current?.focus();
    }
  }, [isFrontTireComplete]);

  useEffect(() => {
    if (!loadingTimeout.current) {
      loadingTimeout.current = setTimeout(() => {
        setShouldShowLoading(true);
      }, AUTOCOMPLETE_CONSTANTS.SHOW_LOADING_TIMEOUT);
    }

    if (!isLoadingResults) {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
        loadingTimeout.current = null;
      }
      setShouldShowLoading(false);
    }
  }, [isLoadingResults]);

  const handleCancelSelection = () => {
    setSelectedItemIndex([0, -1]);
    focusOnInput();

    onCancelSelection();
  };

  const handleConfirmSelection = () => {
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const selectedItem =
      results[currentResultIndex].siteSearchResultList[currentResultItemIndex];
    onValueSelection(selectedItem);
    setSelectedItemIndex([0, -1]);

    const { action } = selectedItem;
    if (action.type === SearchActionType.LINK && listRef.current) {
      // This is gross, but we need to simulate a "click" on BaseLink so that
      // the proper transition occurs.
      const allSearchResults = listRef.current.querySelector('ul');
      const searchResultList = allSearchResults?.children[
        currentResultIndex
      ].querySelector('ul');
      const searchResultItem = searchResultList?.children[
        currentResultItemIndex
      ].querySelector('a');

      searchResultItem?.click();
    }
  };

  const handleValueSelection = useCallback(
    (searchResult: SearchResult) => {
      onValueSelection(searchResult);
      setSelectedItemIndex([0, -1]);

      const { action } = searchResult;
      if (action.type === SearchActionType.QUERY) {
        const isInitialRearTireState =
          !action.queryText &&
          !!action.additionalQueryText &&
          action.queryType === SearchStateEnum.REAR_TIRE;

        if (isInitialRearTireState) {
          setIsFrontTireComplete(true);
        } else {
          primaryInput?.current?.blur();
        }
      }
    },
    [onValueSelection, setSelectedItemIndex],
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;

    setSelectedItemIndex([0, -1]);
    onInputChange(targetValue);
  };

  const handleBackspace = () => {
    if (hasActiveSearchState && !queryText && !isRearTireState) {
      handleCancelSelection();
    }

    // If we've changed the front tire input we need to reset the rear tire query
    if (isFrontTireComplete && activeInputType === SearchInputEnum.PRIMARY) {
      setIsFrontTireComplete(false);
      onSetInputQuery(SearchInputEnum.SECONDARY, {
        queryText: '',
        queryType: SearchStateEnum.REAR_TIRE,
      });
    }
  };

  const handleRemoveSecondaryInput = () => {
    onToggleRearTire(false);
  };

  const handleAddRearTire = () => {
    onToggleRearTire(true);
  };

  const handleSetActiveModal = (modalId: string) => () => {
    openStaticModal(modalId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case KEYCODES.ARROW_DOWN:
        e.preventDefault();
        selectNextItemIndex();
        break;
      case KEYCODES.ARROW_UP:
        e.preventDefault();
        selectPrevItemIndex();
        break;
      case KEYCODES.ENTER:
        e.preventDefault();
        handleConfirmSelection();
        break;
      case KEYCODES.ESCAPE:
        handleCancelSelection();
        break;
      case KEYCODES.BACKSPACE:
        handleBackspace();
        break;
      default:
        break;
    }
  };

  const getSearchStateLabel = () => {
    if (searchState === SearchStateEnum.REAR_TIRE) {
      return ui('search.frontTire');
    }

    const searchStateCopy = SearchStateCopy[searchState];
    return searchStateCopy && `${SearchStateCopy[searchState]}:`;
  };

  const clearPrimaryInputComponent = (
    <div
      aria-label={ui('search.cancelButtonClear')}
      css={styles.clearSearchButton}
    >
      <Icon name={ICONS.CLEAR_INPUT} css={styles.clearSearch} />
    </div>
  );

  const clearSecondaryInputComponent = (
    <div css={styles.clearSecondaryInput}>{ui('search.removeRearTire')}</div>
  );

  return (
    <div>
      <div css={styles.header} ref={headerRef}>
        {isRearTireState && (
          <Grid css={styles.tireSizeHeader}>
            <GridItem css={styles.tireSizeHeaderCopy} gridColumnS={'start/end'}>
              {ui('search.searchByTireSize')}
            </GridItem>
            <CloseSearchButton
              isRearTireState={isRearTireState}
              onCloseSearchClick={onCloseSearchClick}
            />
          </Grid>
        )}
        <Grid
          css={[
            styles.autocompleteGrid,
            isRearTireState && styles.autocompleteGridRearTireState,
          ]}
        >
          <GridItem
            gridColumnL="2/3"
            gridColumnXL="2/3"
            css={[
              styles.searchIconGridItem,
              isRearTireState && styles.searchIconGridRearTire,
              activeInputType === SearchInputEnum.SECONDARY &&
                styles.searchIconSecondaryInput,
            ]}
          >
            <div css={styles.searchIconWrapper}>
              <Icon
                name={ICONS.MAIN_SEARCH}
                css={[
                  styles.searchIcon,
                  (!!queryText || searchState) && styles.searchIconActive,
                ]}
              />
            </div>
          </GridItem>
          <GridItem
            {...AUTOCOMPLETE_CONSTANTS.GRID_COLUMN_PROPS}
            css={[
              styles.autocompleteGridItem,
              isRearTireState && styles.autocompleteGridItemRearTireState,
            ]}
          >
            <SearchInput
              activeInputType={activeInputType}
              clearInputComponent={
                !isRearTireState && isSearchInProgress
                  ? clearPrimaryInputComponent
                  : undefined
              }
              label={<SearchLabel />}
              onChange={handleOnChange}
              onClearInputClick={handleCancelSelection}
              onFocus={onInputFocus}
              onKeyDown={handleKeyDown}
              ref={primaryInput}
              searchStateLabel={getSearchStateLabel()}
              type={SearchInputEnum.PRIMARY}
              value={queryText}
            />
          </GridItem>
          {isRearTireState && (
            <GridItem
              {...AUTOCOMPLETE_CONSTANTS.GRID_COLUMN_PROPS}
              css={[
                styles.autocompleteGridItem,
                isRearTireState && styles.autocompleteGridItemRearTireState,
              ]}
            >
              <SearchInput
                activeInputType={activeInputType}
                clearInputComponent={clearSecondaryInputComponent}
                isDisabled={!isFrontTireComplete}
                onChange={handleOnChange}
                onClearInputClick={handleRemoveSecondaryInput}
                onFocus={onInputFocus}
                onKeyDown={handleKeyDown}
                ref={secondaryInput}
                searchStateLabel={ui('search.rearTire')}
                type={SearchInputEnum.SECONDARY}
                value={secondaryQueryText}
              />
            </GridItem>
          )}
        </Grid>

        {!isRearTireState && (
          <CloseSearchButton
            isRearTireState={isRearTireState}
            onCloseSearchClick={onCloseSearchClick}
          />
        )}
      </div>

      <SearchSecondaryActions
        onAddRearTire={handleAddRearTire}
        onSetActiveModal={handleSetActiveModal}
        searchState={searchState}
      />

      <div
        role="region"
        aria-live={ARIA_LIVE.POLITE}
        css={[
          styles.searchResultsGrid,
          isRearTireState && styles.searchResultsGridRearTire,
        ]}
      >
        <span css={styles.scrollTrigger} ref={scrollRef} />

        {(hasNoMatchingResults || hasSearchResultsError) && (
          <SearchError hasSearchResultsError={hasSearchResultsError} />
        )}

        {shouldShowLoading && (
          <Grid>
            <GridItem {...AUTOCOMPLETE_CONSTANTS.GRID_COLUMN_PROPS}>
              <Loading
                customContainerStyles={styles.loading}
                theme={THEME.DARK}
              />
            </GridItem>
          </Grid>
        )}

        <div ref={listRef}>
          <SearchResults
            handleValueSelection={handleValueSelection}
            hasActiveSearchState={hasActiveSearchState}
            queryText={queryText}
            results={results}
            selectedItemIndex={selectedItemIndex}
            shouldShowListbox={shouldShowListbox}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchAutocomplete;
