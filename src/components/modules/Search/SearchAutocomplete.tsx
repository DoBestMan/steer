import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ARIA_LIVE, KEYCODES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import AdditionalInfoModals from './AdditionalInfoModals';
import CloseSearchButton from './CloseSearchButton';
import { useAutocompleteSelectedItem } from './Search.hooks';
import {
  SearchGroup,
  SearchInputEnum,
  SearchModalEnum,
  SearchResult,
  SearchState,
  SearchStateCopy,
  SearchStateEnum,
  SearchStateType,
} from './Search.types';
import { getSearchResultComponent } from './Search.utils';
import styles from './SearchAutocomplete.styles';
import SearchInput from './SearchInput';
import SearchLabel from './SearchLabel/SearchLabel';
import SearchSecondaryActions from './SearchSecondaryActions';

const CONSTANTS = {
  DEFAULT_SELECTED_ITEM_INDEX: [0, -1],
  DEFAULT_VALUE: '',
};

export interface Props {
  activeInputType: SearchInputEnum;
  focusOnMount?: boolean;
  inputValue?: string;
  isCustomerServiceEnabled: boolean;
  isLoadingResults?: boolean;
  noExactMatches?: boolean;
  onCancelSelection: () => void;
  onCloseSearchClick: () => void;
  onInputChange: (value: string) => void;
  onInputFocus: (inputType: SearchInputEnum) => void;
  onToggleRearTire: (isShowing: boolean) => void;
  onValueSelection: (value: SearchResult) => void;
  query: string;
  results: SearchGroup[];
  searchState: SearchStateType;
  secondaryQuery: string;
}

function SearchAutocomplete({
  activeInputType,
  focusOnMount = false,
  inputValue = CONSTANTS.DEFAULT_VALUE,
  isCustomerServiceEnabled,
  isLoadingResults,
  noExactMatches,
  onCancelSelection,
  onCloseSearchClick,
  onInputChange,
  onInputFocus,
  onToggleRearTire,
  onValueSelection,
  query,
  results,
  searchState,
  secondaryQuery,
}: Props) {
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const [activeModal, setActiveModal] = useState<SearchModalEnum | null>(null);
  const primaryInput = useRef<HTMLInputElement>(null);
  const secondaryInput = useRef<HTMLInputElement>(null);
  const {
    selectNextItemIndex,
    selectPrevItemIndex,
    selectedItemIndex,
    setSelectedItemIndex,
  } = useAutocompleteSelectedItem(results);

  const isInputEmpty = query.length < 1;
  const hasResults = results.length > 0;
  const hasNoMatchingResults =
    noExactMatches && !isInputEmpty && !isLoadingResults;
  const hasActiveSearchState = searchState !== SearchState.FREE_SEARCH;
  const isRearTireState = searchState === SearchStateEnum.REAR_TIRE;
  const isSearchInProgress = !!query || hasActiveSearchState;

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
      hasResults && (!isInputEmpty || searchState !== SearchState.FREE_SEARCH),
    );
  }, [hasResults, isInputEmpty, results, searchState]);

  useEffect(() => {
    focusOnInput();
  }, [focusOnInput, searchState]);

  const handleCancelSelection = () => {
    onInputChange(CONSTANTS.DEFAULT_VALUE);
    setSelectedItemIndex([0, -1]);
    focusOnInput();

    onCancelSelection();
  };

  const handleConfirmSelection = () => {
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const selectedItem =
      results[currentResultIndex].siteSearchResultList[currentResultItemIndex];
    onValueSelection(selectedItem);
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    onValueSelection(searchResult);
    focusOnInput();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;

    setSelectedItemIndex([0, -1]);
    onInputChange(targetValue);
  };

  const handleBackspace = () => {
    if (hasActiveSearchState && !query && !isRearTireState) {
      handleCancelSelection();
    }
  };

  const handleRemoveSecondaryInput = () => {
    onToggleRearTire(false);
  };

  const handleAddRearTire = () => {
    onToggleRearTire(true);
  };

  const handleSetActiveModal = (modalType: SearchModalEnum | null) => () => {
    setActiveModal(modalType);
  };

  useEffect(() => {
    if (inputValue) {
      onInputChange(inputValue);
      focusOnInput();
    }
  }, [inputValue, onInputChange, focusOnInput]);

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
    <div css={[typography.smallCopyTight, styles.clearSecondaryInput]}>
      {ui('search.removeRearTire')}
    </div>
  );

  return (
    <div>
      <div css={styles.header}>
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
            ]}
          >
            <div css={styles.searchIconWrapper}>
              <Icon name={ICONS.MAIN_SEARCH} css={styles.searchIcon} />
            </div>
          </GridItem>
          <GridItem
            css={[
              styles.autocompleteGridItem,
              isRearTireState && styles.autocompleteGridItemRearTireState,
            ]}
            gridColumnS="2/6"
            gridColumnM="2/8"
            gridColumnL="3/14"
            gridColumnXL="3/14"
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
              value={query}
            />
          </GridItem>
          {isRearTireState && (
            <GridItem
              css={[
                styles.autocompleteGridItem,
                isRearTireState && styles.autocompleteGridItemRearTireState,
              ]}
              gridColumnS="2/6"
              gridColumnM="2/8"
              gridColumnL="3/14"
              gridColumnXL="3/14"
            >
              <SearchInput
                activeInputType={activeInputType}
                clearInputComponent={clearSecondaryInputComponent}
                onChange={handleOnChange}
                onClearInputClick={handleRemoveSecondaryInput}
                onFocus={onInputFocus}
                onKeyDown={handleKeyDown}
                ref={secondaryInput}
                searchStateLabel={ui('search.rearTire')}
                type={SearchInputEnum.SECONDARY}
                value={secondaryQuery}
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
        {hasNoMatchingResults && (
          <Grid>
            <GridItem
              gridColumnS="2/6"
              gridColumnM="2/8"
              gridColumnL="3/14"
              gridColumnXL="3/14"
            >
              <div css={styles.errorMessage}>
                <span css={styles.errorLabel}>{ui('search.searchError')}</span>
              </div>
            </GridItem>
          </Grid>
        )}
        <Transition
          appear
          mountOnEnter
          unmountOnExit
          in={shouldShowListbox}
          timeout={0}
        >
          {(searchTransitionState: TransitionStatus) => {
            const animationStyles = [
              styles.listboxRoot,
              hasActiveSearchState &&
                styles[`listbox_${searchTransitionState}`],
            ];

            return (
              <ul css={animationStyles}>
                {results.map((searchGroup: SearchGroup, index) => {
                  const SearchResults = getSearchResultComponent(
                    searchGroup.type,
                  );
                  return (
                    <li css={styles.searchResultsGridItem} key={index}>
                      <SearchResults
                        label={searchGroup.label}
                        onClick={handleValueSelection}
                        searchResults={searchGroup.siteSearchResultList}
                        sectionIndex={index}
                        selectedItemIndex={selectedItemIndex}
                      />
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Transition>
      </div>
      <AdditionalInfoModals
        activeModal={activeModal}
        isCustomerServiceEnabled={isCustomerServiceEnabled}
        onClose={handleSetActiveModal(null)}
      />
    </div>
  );
}

export default SearchAutocomplete;
