import { ModalContextProps } from '~/context/Modal.context';
import { SiteCatalogFilterList } from '~/data/models/SiteCatalogFilterList';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';

import FilterChecklist from '../Content/FilterChecklist';
import FilterPopular from '../Content/FilterPopular';
import FilterRange from '../Content/FilterRange';
import FilterSort from '../Content/FilterSortCatalog';
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
  isPreviewLoading: boolean;
  onChange: FiltersContextProps['createUpdateFilterGroup'];
  openStaticModal: ModalContextProps['openStaticModal'];
}

/*
 * `mapTypeToContent` returns the component that correlates to the filter content type
 */

export const mapTypeToContent: Record<
  FilterContentTypes,
  (props: ChildProps) => JSX.Element | null
> = {
  [FilterContentTypes.SiteCatalogFilterList]({
    isLarge,
    filter,
    filtersToApply,
    isPreviewLoading,
    onChange,
    openStaticModal,
  }: ChildProps) {
    return (
      <FilterChecklist
        {...(filter as SiteCatalogFilterList)}
        filtersToApply={filtersToApply}
        onChange={onChange}
        openStaticModal={openStaticModal}
        isLarge={isLarge}
        isPreviewLoading={isPreviewLoading}
      />
    );
  },
  [FilterContentTypes.SiteCatalogFilterRange]({
    filter,
    filtersToApply,
    isLarge,
    isPreviewLoading,
    onChange,
    openStaticModal,
  }: ChildProps) {
    return (
      <FilterRange
        {...(filter as SiteCatalogFilterRange)}
        onChange={onChange}
        openStaticModal={openStaticModal}
        isLarge={isLarge}
        isPreviewLoading={isPreviewLoading}
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
    isPreviewLoading,
    onChange,
  }: ChildProps) {
    return (
      <FilterPopular
        {...(filter as SiteCatalogFilterPopular)}
        filtersToApply={filtersToApply}
        onChange={onChange}
        isPreviewLoading={isPreviewLoading}
      />
    );
  },
  [FilterContentTypes.SiteCatalogFilterToggle]() {
    return null;
  },
};
