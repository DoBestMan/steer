import {
  SiteCatalogFilterList,
  SiteCatalogFilterRange,
} from '~/data/models/SiteCatalogFilters';

import FilterChecklist from '../Content/FilterChecklist';
import FilterPopular from '../Content/FilterPopular';
import FilterRange from '../Content/FilterRange';
import FilterSort from '../Content/FilterSort';
import {
  CatalogFilterTypes,
  FilterContentTypes,
  SiteCatalogFilterPopular,
  SiteCatalogFilterSort,
} from '../Filter.types';
import { FiltersContextProps } from '../Filters.context';

/*
 * ChildProps interface will be used in the filter content components, and generally use the same props with some exceptions (marked with **)
 * @filter - the filter the component uses
 * @isLarge - ** if component relies on bk styles, we have to pass from the parent otherwise there will be a flash if used in the child component due to default bk being small
 * @onChange - used to update filter map as user applies filter values (NOT the `Apply` button)
 */
export interface ChildProps {
  filter: CatalogFilterTypes;
  filtersToApply: Record<string, string>;
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
  [FilterContentTypes.SiteCatalogFilterList]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterChecklist
        {...(filter as SiteCatalogFilterList)}
        filtersToApply={filtersToApply}
        onChange={onChange}
      />
    );
  },
  [FilterContentTypes.SiteCatalogFilterRange]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterRange
        {...(filter as SiteCatalogFilterRange)}
        onChange={onChange}
        filtersToApply={filtersToApply}
      />
    );
  },
  [FilterContentTypes.SiteCatalogFilterSort]({ filter, ...rest }: ChildProps) {
    return <FilterSort {...(filter as SiteCatalogFilterSort)} {...rest} />;
  },
  [FilterContentTypes.SiteCatalogFilterPopular]({
    filter,
    filtersToApply,
    onChange,
  }: ChildProps) {
    return (
      <FilterPopular
        {...(filter as SiteCatalogFilterPopular)}
        filtersToApply={filtersToApply}
        onChange={onChange}
      />
    );
  },
  [FilterContentTypes.SiteCatalogFilterToggle]() {
    return null;
  },
};
