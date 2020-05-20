import { RefObject, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';

import InitialSearch from './InitialSearch';
import styles from './Search.styles';
import SearchAutocomplete from './SearchAutocomplete';

export interface Results {
  siteSearchGroupList: SearchGroup[];
}

export interface SearchGroup {
  label?: string;
  labelFragments?: Array<{ highlighted: boolean; value: string }>;
  siteSearchResultList: SearchResult[];
  type: string;
}

export interface SearchResult {
  additionalDisplayValue?: string;
  displayValue: string;
  type: string;
  value: string;
}

interface Props {
  forwardedRef?: RefObject<HTMLDivElement>;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  pastSearches: SearchResult[];
  results: Results;
}

function Search({
  onClearSearchesClick,
  onCloseSearchClick,
  pastSearches,
  forwardedRef,
  results,
}: Props) {
  const [query, setQuery] = useState('');

  const handleClearSearchesClick = () => {
    onClearSearchesClick();
    scrollTo(0, TIME.MS300 / 1000);
  };

  const onChange = (input: string) => {
    setQuery(input);
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    setQuery(searchResult.displayValue);
  };
  const handleSearchClick = () => {};

  return (
    <div css={styles.container} ref={forwardedRef}>
      <SearchAutocomplete
        focusOnMount
        onChange={onChange}
        onCloseSearchClick={onCloseSearchClick}
        onValueSelection={handleValueSelection}
        results={results.siteSearchGroupList}
        query={query}
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
