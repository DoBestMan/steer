import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ui } from '~/lib/utils/ui-dictionary';

import { AUTOCOMPLETE_CONSTANTS } from './SearchAutocomplete';
import styles from './SearchAutocomplete.styles';

function SearchError({
  hasSearchResultsError,
}: {
  hasSearchResultsError: boolean;
}) {
  return (
    <Grid>
      <GridItem {...AUTOCOMPLETE_CONSTANTS.GRID_COLUMN_PROPS}>
        <div css={styles.errorMessage}>
          <span css={styles.errorLabel}>
            {hasSearchResultsError
              ? ui('search.searchError')
              : ui('search.searchNoResults')}
          </span>
        </div>
      </GridItem>
    </Grid>
  );
}

export default SearchError;
