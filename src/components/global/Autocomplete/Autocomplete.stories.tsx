import { SetStateAction, useState } from 'react';
import { css } from '@emotion/core';

import Autocomplete from './Autocomplete';

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
  '08203',
  '10019',
  '11208',
  '11223',
  '19111',
  '20854',
  '21012',
  '21750',
  '30102',
  '32439',
  '32801',
  '34237',
  '38103',
  '40245',
  '43017',
  '53015',
  '55386',
  '71485',
  '73170',
  '74072',
  '75229',
  '78602',
  '85249',
  '89101',
  '89506',
  '92128',
  '94502',
];

const startsWith = (list: string[], string: string) =>
  string ? list.filter((data) => data.startsWith(string)) : [];

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
