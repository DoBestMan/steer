import { css } from '@emotion/core';
import { SetStateAction, useState } from 'react';

import Autocomplete from './Autocomplete';
import { AutocompleteResult } from './AutocompleteResultItem';

export default {
  component: Autocomplete,
  title: 'Autocomplete',
};

const styles = {
  errorLine: css({
    display: 'block',
  }),
};

const ZIP_CODES = [
  { main: '08203', secondary: 'secondary text for 08203' },
  { main: '10019', secondary: 'secondary text for 10019' },
  { main: '11208', secondary: 'secondary text for 11208' },
  { main: '11223', secondary: 'secondary text for 11223' },
  { main: '19111', secondary: 'secondary text for 19111' },
  { main: '20854', secondary: 'secondary text for 20854' },
  { main: '21012', secondary: 'secondary text for 21012' },
  { main: '21750', secondary: 'secondary text for 21750' },
  { main: '30102', secondary: 'secondary text for 30102' },
  { main: '32439', secondary: 'secondary text for 32439' },
  { main: '32801', secondary: 'secondary text for 32801' },
  { main: '34237', secondary: 'secondary text for 34237' },
  { main: '38103', secondary: 'secondary text for 38103' },
  { main: '40245', secondary: 'secondary text for 40245' },
  { main: '43017', secondary: 'secondary text for 43017' },
  { main: '53015', secondary: 'secondary text for 53015' },
  { main: '55386', secondary: 'secondary text for 55386' },
  { main: '71485', secondary: 'secondary text for 71485' },
  { main: '73170', secondary: 'secondary text for 73170' },
  { main: '74072', secondary: 'secondary text for 74072' },
  { main: '75229', secondary: 'secondary text for 75229' },
  { main: '78602', secondary: 'secondary text for 78602' },
  { main: '85249', secondary: 'secondary text for 85249' },
  { main: '89101', secondary: 'secondary text for 89101' },
  { main: '89506', secondary: 'secondary text for 89506' },
  { main: '92128', secondary: 'secondary text for 92128' },
  { main: '94502', secondary: 'secondary text for 94502' },
];

const startsWith = (list: AutocompleteResult[], comparisonString: string) =>
  comparisonString
    ? list.filter((item: AutocompleteResult) =>
        item.main.startsWith(comparisonString),
      )
    : [];

export function AutocompleteDefault() {
  const [results, setResults] = useState([]);
  const onChange = (value: string) => {
    setResults(startsWith(ZIP_CODES, value) as SetStateAction<never[]>);
  };
  const errorLabel = (
    <>
      <span css={styles.errorLine}>Oops.</span>
      <span css={styles.errorLine}>Please enter a valid zip code.</span>
    </>
  );

  return (
    <Autocomplete
      onChange={onChange}
      results={results}
      label="Enter ZIP Code"
      errorLabel={errorLabel}
    />
  );
}
