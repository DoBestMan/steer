import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { ReactNode } from 'react';

import styles from '../Header.styles';
import Filters from './Filters';

export default {
  component: FiltersWithKnobs,
  title: 'Catalog/Header/Main Filters',
};

function FilterContainer({
  children,
  isAdvancedView,
}: {
  children: ReactNode;
  isAdvancedView: boolean;
}) {
  return (
    <div css={[styles.root, isAdvancedView && styles.rootAdvanced]}>
      {children}
    </div>
  );
}
export function FiltersWithKnobs() {
  const isAdvancedView = boolean('Advanced View', false);
  return (
    <FilterContainer isAdvancedView={isAdvancedView}>
      <Filters
        {...{
          activeFilters: [],
          isAdvancedView,
          onClose: action('Close filter select'),
          onOpen: () => action('Open filter select'),
          selectingFilter: '',
          toggleFilter: () => action('Apply filter'),
        }}
      />
    </FilterContainer>
  );
}

export function FitlersAdvancedView() {
  return (
    <FilterContainer isAdvancedView>
      <Filters
        {...{
          activeFilters: [],
          isAdvancedView: true,
          onClose: action('Close filter select'),
          onOpen: () => action('Open filter select'),
          selectingFilter: '',
          toggleFilter: () => action('Apply filter'),
        }}
      />
    </FilterContainer>
  );
}
