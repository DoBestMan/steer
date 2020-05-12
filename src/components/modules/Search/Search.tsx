import Autocomplete from '~/components/global/Autocomplete/Autocomplete';
import { searchAutocomplete } from '~/components/global/Autocomplete/Autocomplete.styles';
import { AutocompleteResult } from '~/components/global/Autocomplete/AutocompleteResultItem';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { LINK_SIZE, LINK_THEME, LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Search.styles';

interface Props {
  onCloseSearchClick: () => void;
}

function Search({ onCloseSearchClick }: Props) {
  const clearSearchComponent = (
    <Icon name={ICONS.CLEAR_SEARCH} css={styles.clearSearch} />
  );

  const errorLabel = (
    <span css={styles.errorLabel}>Sorry, no matching results found.</span>
  );

  const onChange = () => {};
  const handleInputResultMatch = () => {};
  const handleSelectionSuccess = () => {};
  const results: AutocompleteResult[] = [];

  return (
    <div css={styles.container}>
      <Grid css={styles.autocompleteGrid}>
        <GridItem
          gridColumnL="2/3"
          gridColumnXL="2/3"
          css={styles.searchIconGridItem}
        >
          <Icon name={ICONS.MAIN_SEARCH} css={styles.searchIcon} />
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
          <div css={styles.linkWrapper}>
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
    </div>
  );
}

export default Search;
