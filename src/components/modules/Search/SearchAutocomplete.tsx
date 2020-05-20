import {
  ChangeEvent,
  KeyboardEvent,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from 'react';

import { generateIDs } from '~/components/global/Autocomplete/Autocomplete.utils';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  COLORS,
  KEYCODES,
  LINK_SIZE,
  LINK_THEME,
  LINK_TYPES,
} from '~/lib/constants';
import { getScroll, subscribeScroll } from '~/lib/helpers/scroll';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { SearchGroup, SearchResult } from './Search';
import { useAutocompleteSelectedItem } from './Search.hooks';
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
  onChange: (value: string) => void;
  onCloseSearchClick: () => void;
  onValueSelection: (value: SearchResult) => void;
  query: string;
  results: SearchGroup[];
}

function SearchAutocomplete({
  focusOnMount = false,
  inputValue = CONSTANTS.DEFAULT_VALUE,
  isLoadingResults,
  onChange,
  onCloseSearchClick,
  onValueSelection,
  results,
  query,
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
    setShouldShowListbox(!isInvalidInput && hasResults && !isInputEmpty);
  }, [hasResults, isInputEmpty, ids.invalidID, isInvalidInput, results]);

  const cancelSelection = () => {
    onChange(CONSTANTS.DEFAULT_VALUE);
    setSelectedItemIndex([0, -1]);
    setShouldShowListbox(false);
  };

  const confirmSelection = () => {
    const [currentResultIndex, currentResultItemIndex] = selectedItemIndex;
    const selectedItem =
      results[currentResultIndex].siteSearchResultList[currentResultItemIndex];
    onValueSelection(selectedItem);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;

    setSelectedItemIndex([0, -1]);
    onChange(targetValue);
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
        confirmSelection();
        break;
      case KEYCODES.ESCAPE:
        cancelSelection();
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
            <label
              id={ids.labelID}
              css={[styles.label, !!query && styles.labelHidden]}
            >
              {lessThan.L
                ? ui('search.searchAutocompleteLabelSM')
                : ui('search.searchAutocompleteLabelLG')}
            </label>

            <div css={styles.comboboxWrapper}>
              <input
                aria-labelledby={ids.labelID}
                css={styles.input}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                ref={textInput}
                type="text"
                value={query}
              />
            </div>

            {query && (
              <button
                aria-label={ui('search.cancelButtonClear')}
                onClick={cancelSelection}
              >
                <Icon name={ICONS.CLEAR_INPUT} css={styles.clearSearch} />
              </button>
            )}
          </div>
          <div css={styles.closeSearchWrapper}>
            <Link
              as={LINK_TYPES.BUTTON}
              css={styles.closeSearchButton}
              onClick={onCloseSearchClick}
              size={LINK_SIZE.SM}
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
          <ul css={styles.listbox} id={ids.listboxID}>
            {shouldShowListbox &&
              results.map((searchGroup: SearchGroup, index) => (
                <li css={styles.searchResultsGridItem} key={index}>
                  <SearchSection
                    label={searchGroup.label}
                    labelFragments={searchGroup.labelFragments}
                    onClick={onValueSelection}
                    query={query}
                    searchResults={searchGroup.siteSearchResultList}
                    sectionIndex={index}
                    selectedItemIndex={selectedItemIndex}
                  />
                </li>
              ))}

            {isInvalidInput && (
              <li
                css={[styles.errorMessage, styles.searchResultsGridItem]}
                id={ids.invalidID}
              >
                <span css={styles.errorLabel}>{ui('search.searchError')}</span>
              </li>
            )}
          </ul>
        </GridItem>
      </Grid>
    </div>
  );
}

export default SearchAutocomplete;
