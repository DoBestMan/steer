import {
  ChangeEvent,
  KeyboardEvent,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import { generateIDs } from '~/components/global/Autocomplete/Autocomplete.utils';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, KEYCODES, LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { getScroll, subscribeScroll } from '~/lib/helpers/scroll';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { SearchGroup, SearchResult } from './Search';
import { SearchState, SearchStateType } from './Search.constants';
import { useAutocompleteSelectedItem } from './Search.hooks';
import { initialSearchCategories } from './Search.mocks';
import styles from './SearchAutocomplete.styles';
import SearchSection from './SearchSection';

const CONSTANTS = {
  DEFAULT_SELECTED_ITEM_INDEX: [0, -1],
  DEFAULT_VALUE: '',
};

export interface Props {
  children?: ReactChild;
  focusOnMount?: boolean;
  inputValue?: string;
  isLoadingResults?: boolean;
  onCancelSelection: () => void;
  onChange: (value: string) => void;
  onCloseSearchClick: () => void;
  onValueSelection: (value: SearchResult) => void;
  query: string;
  results: SearchGroup[];
  searchState: SearchStateType;
}

function SearchAutocomplete({
  focusOnMount = false,
  inputValue = CONSTANTS.DEFAULT_VALUE,
  isLoadingResults,
  onCancelSelection,
  onChange,
  onCloseSearchClick,
  onValueSelection,
  results,
  query,
  searchState,
  ...rest
}: Props) {
  const [ids, setIds] = useState({
    invalidID: '',
    labelID: '',
    listboxID: '',
    listboxItemID: '',
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [shouldShowListbox, setShouldShowListbox] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const {
    selectNextItemIndex,
    selectPrevItemIndex,
    selectedItemIndex,
    setSelectedItemIndex,
  } = useAutocompleteSelectedItem(results);
  const { lessThan } = useBreakpoints();

  const isInputEmpty = query.length < 1;
  const hasResults = results.length > 0;
  const isInvalidInput = !hasResults && !isInputEmpty && !isLoadingResults;
  const hasActiveSearchState = searchState !== SearchState.FREE_SEARCH;
  const isSearchInProgress = !!query || hasActiveSearchState;

  const focusOnInput = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
  };

  useEffect(() => {
    if (focusOnMount) {
      focusOnInput();
    }
  }, [focusOnMount]);

  useEffect(() => {
    setIds(generateIDs(randomString(10)));
  }, []);

  useEffect(() => {
    setShouldShowListbox(
      !isInvalidInput &&
        hasResults &&
        (!isInputEmpty || searchState !== SearchState.FREE_SEARCH),
    );
  }, [
    hasResults,
    isInputEmpty,
    ids.invalidID,
    isInvalidInput,
    results,
    searchState,
  ]);

  useEffect(() => {
    focusOnInput();
  }, [searchState]);

  const handleCancelSelection = () => {
    onChange(CONSTANTS.DEFAULT_VALUE);
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
    onChange(targetValue);
  };

  const handleBackspace = () => {
    if (hasActiveSearchState && !query) {
      handleCancelSelection();
    }
  };

  useEffect(() => {
    if (inputValue) {
      onChange(inputValue);
      focusOnInput();
    }
  }, [inputValue, onChange]);

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

  // We use scroll to add conditional styles
  subscribeScroll(() => {
    const yScroll = getScroll().y;
    if (yScroll > 0 && !hasScrolled) {
      setHasScrolled(true);
    } else if (yScroll <= 0 && hasScrolled) {
      setHasScrolled(false);
    }
  });

  const autocompleteGridStyles = {
    borderColor: hasScrolled ? COLORS.LIGHT.GRAY_20 : '',
  };

  const getSearchStateLabel = () => {
    const currentCategory = initialSearchCategories.find(
      (category) => searchState === category.value,
    );
    return currentCategory && `${currentCategory.displayValue}:`;
  };

  return (
    <div {...rest}>
      <Grid css={[styles.autocompleteGrid, autocompleteGridStyles]}>
        <GridItem
          gridColumnL="2/3"
          gridColumnXL="2/3"
          css={styles.searchIconGridItem}
        >
          <div css={styles.searchIconWrapper}>
            <Icon name={ICONS.MAIN_SEARCH} css={styles.searchIcon} />
          </div>
        </GridItem>
        <GridItem
          css={styles.autocompleteGridItem}
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="3/14"
          gridColumnXL="3/14"
        >
          <div css={styles.inputContainer}>
            {hasActiveSearchState && (
              <div css={[styles.inputText, styles.searchState]}>
                {getSearchStateLabel()}
              </div>
            )}
            <label
              id={ids.labelID}
              css={[styles.label, isSearchInProgress && styles.labelHidden]}
            >
              {lessThan.L
                ? ui('search.searchAutocompleteLabelSM')
                : ui('search.searchAutocompleteLabelLG')}
            </label>

            <div css={styles.comboboxWrapper}>
              <input
                aria-labelledby={ids.labelID}
                css={[styles.input, styles.inputText]}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                ref={textInput}
                type="text"
                value={query}
              />
            </div>

            {isSearchInProgress && (
              <button
                aria-label={ui('search.cancelButtonClear')}
                css={styles.clearSearchButton}
                onClick={handleCancelSelection}
              >
                <Icon name={ICONS.CLEAR_INPUT} css={styles.clearSearch} />
              </button>
            )}
          </div>
          <div css={styles.closeSearchWrapper}>
            <Link
              as={LINK_TYPES.BUTTON}
              css={[typography.smallCopy, styles.closeSearchButton]}
              onClick={onCloseSearchClick}
              theme={LINK_THEME.LIGHT}
            >
              {ui('search.cancelButtonLabel')}
            </Link>
          </div>
        </GridItem>
      </Grid>
      <Grid css={styles.searchResultsGrid}>
        <GridItem
          gridColumnS="2/6"
          gridColumnM="2/8"
          gridColumnL="3/14"
          gridColumnXL="3/14"
        >
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
                <ul
                  css={animationStyles}
                  id={ids.listboxID}
                  role="region"
                  aria-live="polite"
                >
                  {results.map((searchGroup: SearchGroup, index) => (
                    <li css={styles.searchResultsGridItem} key={index}>
                      <SearchSection
                        label={searchGroup.label}
                        labelFragments={searchGroup.labelFragments}
                        onClick={handleValueSelection}
                        query={query}
                        searchResults={searchGroup.siteSearchResultList}
                        sectionIndex={index}
                        selectedItemIndex={selectedItemIndex}
                      />
                    </li>
                  ))}
                </ul>
              );
            }}
          </Transition>
          {isInvalidInput && (
            <div
              css={[styles.errorMessage, styles.searchResultsGridItem]}
              id={ids.invalidID}
            >
              <span css={styles.errorLabel}>{ui('search.searchError')}</span>
            </div>
          )}
        </GridItem>
      </Grid>
    </div>
  );
}

export default SearchAutocomplete;
