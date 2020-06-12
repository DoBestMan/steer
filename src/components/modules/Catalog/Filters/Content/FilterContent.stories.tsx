import { action } from '@storybook/addon-actions';

import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import { filterRange, filterTypeMap } from '../Filters.mocks';
import FilterChecklist from './FilterChecklist';
import FilterRange from './FilterRange';

export default {
  component: FilterContentChecklist,
  title: 'Catalog/Header/Filter Content',
};

export function FilterContentChecklist() {
  return (
    <FilterChecklist
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterChecklist
      ] as CatalogFilterChecklist)}
      filtersToApply={{}}
      onChange={action('Add filter')}
    />
  );
}

export function FilterContentChecklistLarge() {
  return (
    <FilterChecklist
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterChecklistLarge
      ] as CatalogFilterChecklistLarge)}
      filtersToApply={{}}
      onChange={action('Add filter')}
    />
  );
}

export function FilterContentRange() {
  return (
    <FilterRange
      {...filterRange}
      filtersToApply={{}}
      onChange={action('Add filter')}
    />
  );
}
