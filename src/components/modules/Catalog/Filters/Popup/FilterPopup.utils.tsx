import FilterChecklist from '../Content/FilterChecklist';
import FilterPopular from '../Content/FilterPopular';
import FilterRange from '../Content/FilterRange';
import FilterSort from '../Content/FilterSort';
import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  CatalogFilterPopular,
  CatalogFilterRange,
  CatalogFilterSort,
  CatalogFilterTypes,
  FilterContentTypes,
} from '../Filter.types';
import { FilterMap, FiltersContextProps } from '../Filters.context';

/*
 * ChildProps interface will be used in the filter content components, and generally use the same props with some exceptions (marked with **)
 * @applyFilter - ** used in `FilterSort`, although it uses a popup it is technically a toggle filter and should apply immediately when clicked
 * @filter - the filter the component uses
 * @isLarge - ** if component relies on bk styles, we have to pass from the parent otherwise there will be a flash if used in the child component due to default bk being small
 * @onChange - used to update filter map as user applies filter values (NOT the `Apply` button)
 */
export interface ChildProps {
  applyFilters: () => void;
  filter: CatalogFilterTypes;
  filtersToApply: FilterMap;
  isLarge?: boolean;
  onChange: FiltersContextProps['createUpdateFilterGroup'];
}

/*
 * `mapTypeToContent` returns the component that correlates to the filter content type
 */

export const mapTypeToContent: Record<
  FilterContentTypes,
  (props: ChildProps) => JSX.Element | null
> = {
  [FilterContentTypes.CatalogFilterChecklist]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterChecklist
        {...(filter as CatalogFilterChecklist)}
        onChange={onChange}
        filtersToApply={filtersToApply}
      />
    );
  },
  [FilterContentTypes.CatalogFilterChecklistLarge]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterChecklist
        {...(filter as CatalogFilterChecklistLarge)}
        filtersToApply={filtersToApply}
        onChange={onChange}
      />
    );
  },
  [FilterContentTypes.CatalogFilterRange]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterRange
        {...(filter as CatalogFilterRange)}
        onChange={onChange}
        filtersToApply={filtersToApply}
      />
    );
  },
  [FilterContentTypes.CatalogFilterSort]({
    applyFilters,
    filter,
    ...rest
  }: ChildProps) {
    return (
      <FilterSort
        {...(filter as CatalogFilterSort)}
        {...rest}
        applyFilters={applyFilters}
      />
    );
  },
  [FilterContentTypes.CatalogFilterPopular]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterPopular
        {...(filter as CatalogFilterPopular)}
        filtersToApply={filtersToApply}
        onChange={onChange}
      />
    );
  },
  [FilterContentTypes.CatalogFilterToggle]() {
    return null;
  },
};
