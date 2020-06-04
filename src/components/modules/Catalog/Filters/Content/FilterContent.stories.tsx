import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  CatalogFilterRange,
  CatalogFilterSort,
  FilterContentTypes,
} from '../Filter.types';
import { filterTypeMap } from '../Filters.mocks';
import FilterChecklist from './FilterChecklist';
import FilterRange from './FilterRange';
import FilterSort from './FilterSort';

export default {
  component: FilterContentChecklist,
  title: 'Catalog/Grid/Filter Content',
};

export function FilterContentChecklist() {
  return (
    <FilterChecklist
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterChecklist
      ] as CatalogFilterChecklist)}
    />
  );
}

export function FilterContentChecklistLarge() {
  return (
    <FilterChecklist
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterChecklistLarge
      ] as CatalogFilterChecklistLarge)}
    />
  );
}

export function FilterContentRange() {
  return (
    <FilterRange
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterRange
      ] as CatalogFilterRange)}
    />
  );
}

export function FilterContentSort() {
  return (
    <FilterSort
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterSort
      ] as CatalogFilterSort)}
    />
  );
}
