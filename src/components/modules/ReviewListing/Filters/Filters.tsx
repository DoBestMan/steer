import { useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import styles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import FilterPopup from './FilterPopup';
import { FilterItem } from './Filters.types';

interface Props {
  filters: FilterItem[];
}

function Filters({ filters }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleOnClick = (label: string) => () => {
    if (!isOpen) {
      setIsOpen(true);
      setActiveFilter(label);
    } else {
      handleOnClose();
    }
  };

  function handleOnClose() {
    setIsOpen(false);
    setActiveFilter(null);
  }

  return (
    <>
      <FiltersCarousel
        activeFilter={activeFilter}
        label={ui('reviews.searchBy')}
      >
        {filters.map(({ label, isActive = false }) => {
          const isDropdownOpen = activeFilter === label && isOpen;
          return (
            <FilterButton
              key={label}
              isDropdownOpen={isDropdownOpen}
              isActive={isActive}
              label={label}
              onClick={handleOnClick(label)}
              theme={THEME.ORANGE}
              aria-expanded={isDropdownOpen}
              css={[
                styles.filterButton,
                isDropdownOpen && styles.disableEvents,
              ]}
            />
          );
        })}
      </FiltersCarousel>
      {filters.map(({ label, filterGroups }) => (
        <FilterPopup
          key={label}
          isOpen={label === activeFilter && isOpen}
          onClose={handleOnClose}
          filterGroups={filterGroups}
          label={label}
        />
      ))}
    </>
  );
}

export default Filters;
