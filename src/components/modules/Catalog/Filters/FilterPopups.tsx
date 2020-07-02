import { SiteCatalogFilterToggleTypeEnum } from '~/data/models/SiteCatalogFilterToggle';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { useFiltersContext } from './Filters.context';
import FilterPopup from './Popup/FilterPopup';

interface Props {
  filters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}

export default function FilterPopups({ filters, popularFilters }: Props) {
  const { clearSelectingFilter, selectingFilter } = useFiltersContext();

  return (
    <>
      {!!popularFilters.length && (
        <FilterPopup
          isOpen={selectingFilter === 0}
          onClose={clearSelectingFilter}
          filter={{
            type: FilterContentTypes.SiteCatalogFilterPopular,
            items: popularFilters,
          }}
        />
      )}
      {filters.map((filter, idx) => {
        if (
          filter.type ===
          SiteCatalogFilterToggleTypeEnum.SiteCatalogFilterToggle
        ) {
          return null;
        }
        return (
          <FilterPopup
            key={idx}
            isOpen={selectingFilter === idx + 1}
            onClose={clearSelectingFilter}
            filter={filter}
          />
        );
      })}
    </>
  );
}
