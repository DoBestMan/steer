import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { useFiltersContext } from './Filters.context';
import FilterPopup from './Popup/FilterPopup';

interface Props {
  filters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}

export default function FilterPopups({ filters, popularFilters }: Props) {
  const { clearSelectingFilter, selectingFilter } = useFiltersContext();
  const popularLabel = ui('catalog.filters.popularFilters');
  return (
    <>
      {!!popularFilters.length && (
        <FilterPopup
          isOpen={popularLabel === selectingFilter}
          onClose={clearSelectingFilter}
          filter={{
            label: popularLabel,
            type: FilterContentTypes.CatalogFilterPopular,
            items: popularFilters,
          }}
        />
      )}
      {filters.map((filter, idx) => {
        if (filter.type === FilterContentTypes.CatalogFilterToggle) {
          return null;
        }
        return (
          <FilterPopup
            key={idx}
            isOpen={filter.label === selectingFilter}
            onClose={clearSelectingFilter}
            filter={filter}
          />
        );
      })}
    </>
  );
}
