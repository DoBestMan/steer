import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';

import InitialSearch from './InitialSearch';
import styles from './Search.styles';
import SearchAutocomplete, { SearchResult } from './SearchAutocomplete';
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

  const onChange = (input: string) => {
    setQuery(input);
  };

  const handleSelectionSuccess = () => {};
  const results: SearchResult[] = [];
  const handleSearchClick = () => {};

  return (
    <div css={styles.container}>
      <SearchAutocomplete
        onChange={onChange}
        onCloseSearchClick={onCloseSearchClick}
        onValueSelection={handleSelectionSuccess}
        results={results}
      />
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
