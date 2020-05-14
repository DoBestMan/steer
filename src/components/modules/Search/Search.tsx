import { useState } from 'react';

import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { searchAutocomplete } from '~/components/global/Autocomplete/Autocomplete.styles';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { LINK_SIZE, LINK_THEME, LINK_TYPES, TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';
import { ui } from '~/lib/utils/ui-dictionary';

import InitialSearch from './InitialSearch';
import styles from './Search.styles';
import { SearchItem } from './SearchSection';

interface Props {
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  pastSearches: SearchItem[];
}

function Search({
  onClearSearchesClick,
  onCloseSearchClick,
  pastSearches,
}: Props) {
  const [query, setQuery] = useState('');

  const handleClearSearchesClick = () => {
    onClearSearchesClick();
    scrollTo(0, TIME.MS300 / 1000);
  };

  const errorLabel = (
    <span css={styles.errorLabel}>Sorry, no matching results found.</span>
  );

  const clearSearchComponent = (
    <Icon name={ICONS.CLEAR_SEARCH} css={styles.clearSearch} />
  );

  const onChange = (input: string) => {
    setQuery(input);
  };
  const handleInputResultMatch = () => {};
  const handleSelectionSuccess = () => {};
  const results: AutocompleteResult[] = [];
  const handleSearchClick = () => {};

  return (
    <div css={styles.container}>
      <Grid css={styles.autocompleteGrid}>
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
          <Autocomplete
            css={searchAutocomplete}
            clearSearchComponent={clearSearchComponent}
            errorLabel={errorLabel}
            label="Search by vehicle"
            onChange={onChange}
            onInputResultMatch={handleInputResultMatch}
            onValueSelectionSuccess={handleSelectionSuccess}
            results={results}
          />
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
      <Grid>
        {query.length === 0 && (
          <InitialSearch
            onClearSearchesClick={handleClearSearchesClick}
            onSearchClick={handleSearchClick}
            pastSearches={pastSearches}
          />
        )}
      </Grid>
    </div>
  );
}

export default Search;
