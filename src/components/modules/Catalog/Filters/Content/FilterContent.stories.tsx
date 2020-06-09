import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import { filterRange, filterSort, filterTypeMap } from '../Filters.mocks';
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
  return <FilterRange {...filterRange} />;
}

export function FilterContentSort() {
  return <FilterSort {...filterSort} />;
}
