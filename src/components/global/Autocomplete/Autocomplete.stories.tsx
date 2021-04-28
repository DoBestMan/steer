import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import React, { SetStateAction, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { COLORS, StylesMap } from '~/lib/constants';

import Autocomplete from './Autocomplete';
import { AutocompleteResult } from './AutocompleteResultItem';

export default {
  component: Autocomplete,
  title: 'Global/Autocomplete',
};

const styles: StylesMap = {
  clearSearch: {
    color: COLORS.LIGHT.GRAY_70,
  },
  errorLine: {
    display: 'block',
  },
};

const ZIP_CODES = [
  { id: '08203', main: '08203', secondary: 'secondary text for 08203' },
  { id: '10019', main: '10019', secondary: 'secondary text for 10019' },
  { id: '11208', main: '11208', secondary: 'secondary text for 11208' },
  { id: '11223', main: '11223', secondary: 'secondary text for 11223' },
  { id: '19111', main: '19111', secondary: 'secondary text for 19111' },
  { id: '20854', main: '20854', secondary: 'secondary text for 20854' },
  { id: '21012', main: '21012', secondary: 'secondary text for 21012' },
  { id: '21750', main: '21750', secondary: 'secondary text for 21750' },
  { id: '30102', main: '30102', secondary: 'secondary text for 30102' },
  { id: '32439', main: '32439', secondary: 'secondary text for 32439' },
  { id: '32801', main: '32801', secondary: 'secondary text for 32801' },
  { id: '34237', main: '34237', secondary: 'secondary text for 34237' },
  { id: '38103', main: '38103', secondary: 'secondary text for 38103' },
  { id: '40245', main: '40245', secondary: 'secondary text for 40245' },
  { id: '43017', main: '43017', secondary: 'secondary text for 43017' },
  { id: '53015', main: '53015', secondary: 'secondary text for 53015' },
  { id: '55386', main: '55386', secondary: 'secondary text for 55386' },
  { id: '71485', main: '71485', secondary: 'secondary text for 71485' },
  { id: '73170', main: '73170', secondary: 'secondary text for 73170' },
  { id: '74072', main: '74072', secondary: 'secondary text for 74072' },
  { id: '75229', main: '75229', secondary: 'secondary text for 75229' },
  { id: '78602', main: '78602', secondary: 'secondary text for 78602' },
  { id: '85249', main: '85249', secondary: 'secondary text for 85249' },
  { id: '89101', main: '89101', secondary: 'secondary text for 89101' },
  { id: '89506', main: '89506', secondary: 'secondary text for 89506' },
  { id: '92128', main: '92128', secondary: 'secondary text for 92128' },
  { id: '94502', main: '94502', secondary: 'secondary text for 94502' },
];

// Simple hook to reuse autocomplete funcitonality across multiple stories
interface UseAutocompleteProps {
  onChange: (value: string) => void;
  results: AutocompleteResult[];
}

const useAutocompleteProps = (): UseAutocompleteProps => {
  const [results, setResults] = useState([]);
  const onChange = (value: string) => {
    setResults(startsWith(ZIP_CODES, value) as SetStateAction<never[]>);
  };

  return {
    onChange,
    results,
  };
};

const startsWith = (list: AutocompleteResult[], comparisonString: string) =>
  comparisonString
    ? list.filter((item: AutocompleteResult) =>
        item.main.startsWith(comparisonString),
      )
    : [];

const handleSelectionSuccess = action('selection-success');

const errorLabel = (
  <>
    <span css={styles.errorLine}>Oops.</span>
    <span css={styles.errorLine}>Please enter a valid zip code.</span>
  </>
);
const handleInputResultMatch = action('input-result-match');

export function AutocompleteWithKnobs() {
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  const label = text('Label', 'Search...');
  const clearSearchComponent = text('Clear search label', 'Clear');
  const { results, onChange } = useAutocompleteProps();

  return (
    <Autocomplete
      clearSearchComponent={clearSearchComponent}
      errorLabel={errorLabel}
      icon={icon}
      label={label}
      onChange={onChange}
      onIsLoadingValueSelection={() => {}}
      onInputResultMatch={handleInputResultMatch}
      onValueSelectionSuccess={handleSelectionSuccess}
      results={results}
    />
  );
}

export function AutocompleteWithClearIcon() {
  const { results, onChange } = useAutocompleteProps();

  const clearSearchComponent = (
    <Icon name={ICONS.CLEAR_INPUT} css={styles.clearSearch} />
  );

  return (
    <Autocomplete
      clearSearchComponent={clearSearchComponent}
      errorLabel={errorLabel}
      label="Type to see icon"
      onChange={onChange}
      onIsLoadingValueSelection={() => {}}
      onInputResultMatch={handleInputResultMatch}
      onValueSelectionSuccess={handleSelectionSuccess}
      results={results}
    />
  );
}

export function LocationSpecificAutocomplete() {
  const { results, onChange } = useAutocompleteProps();

  return (
    <Autocomplete
      errorLabel={errorLabel}
      icon={ICONS.SEARCH}
      label="Enter ZIP Code"
      onChange={onChange}
      onIsLoadingValueSelection={() => {}}
      onInputResultMatch={handleInputResultMatch}
      onValueSelectionSuccess={handleSelectionSuccess}
      results={results}
    />
  );
}
