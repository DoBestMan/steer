import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import { filterTypeMap } from '../Filters.mocks';
import FilterChecklist from './FilterChecklist';

export default {
  component: FilterContentChecklist,
  title: 'Catalog Filter Content',
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
