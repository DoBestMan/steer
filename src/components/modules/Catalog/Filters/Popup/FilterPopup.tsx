import { MouseEvent } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';

import FilterChecklist from '../Content/FilterChecklist';
import FilterChecklistLarge from '../Content/FilterChecklistLarge';
import FilterRange from '../Content/FilterRange';
import FilterSort from '../Content/FilterSort';
import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  CatalogFilterRange,
  CatalogFilterSort,
  CatalogFilterTypes,
  FilterContentTypes,
} from '../Filter.types';
import FilterDropdown from './Dropdown';
import FilterModal from './FilterModal';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFilter: (e: MouseEvent) => void;
}

interface Props extends PopupProps {
  filter: CatalogFilterTypes;
}

const mapTypeToContent: Record<
  FilterContentTypes,
  (props: CatalogFilterTypes) => JSX.Element | null
> = {
  [FilterContentTypes.CatalogFilterChecklist](props: CatalogFilterTypes) {
    return <FilterChecklist {...(props as CatalogFilterChecklist)} />;
  },
  [FilterContentTypes.CatalogFilterChecklistLarge](props: CatalogFilterTypes) {
    return <FilterChecklistLarge {...(props as CatalogFilterChecklistLarge)} />;
  },
  [FilterContentTypes.CatalogFilterRange](props: CatalogFilterTypes) {
    return <FilterRange {...(props as CatalogFilterRange)} />;
  },
  [FilterContentTypes.CatalogFilterSort](props: CatalogFilterTypes) {
    return <FilterSort {...(props as CatalogFilterSort)} />;
  },
  [FilterContentTypes.CatalogFilterToggle]() {
    return null;
  },
};

export default function FilterPopup({ filter, ...props }: Props) {
  const { greaterThan } = useBreakpoints();
  if (filter.type === FilterContentTypes.CatalogFilterToggle) {
    return null;
  }

  if (
    filter.type !== FilterContentTypes.CatalogFilterChecklistLarge &&
    greaterThan.M
  ) {
    return (
      <FilterDropdown {...props}>
        {mapTypeToContent[filter.type](filter)}
      </FilterDropdown>
    );
  }

  return (
    <FilterModal contentLabel={filter.label} {...props}>
      {mapTypeToContent[filter.type](filter)}
    </FilterModal>
  );
}
