import FilterSort from '~/components/global/FilterSort/FilterSort';

import { SiteCatalogFilterSort } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { ChildProps } from '../Popup/FilterPopup.utils';

export default function FilterSortCatalog({
  filtersToApply,
  isLarge,
  items,
}: SiteCatalogFilterSort & Pick<ChildProps, 'filtersToApply' | 'isLarge'>) {
  const {
    createToggleFilterHandler,
    clearSelectingFilter,
  } = useFiltersContext();
  function updateValue(value: Record<string, string>) {
    return () => {
      createToggleFilterHandler(value)();
      clearSelectingFilter();
    };
  }
  return (
    <FilterSort
      items={items}
      isLarge={isLarge}
      filtersToApply={filtersToApply}
      onUpdate={updateValue}
    />
  );
}
