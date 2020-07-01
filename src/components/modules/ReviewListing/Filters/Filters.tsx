import { useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import FilterPopup from '~/components/modules/ReviewListing/Filters/FilterPopup';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Filters.styles';
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
      <span css={styles.label}>{ui('reviews.searchBy')}</span>
      <div
        css={[styles.container, activeFilter !== null && styles.disableEvents]}
      >
        <Carousel slideClass="filter-button" freeScroll>
          {filters.map(({ label }) => {
            const isDropdownOpen = activeFilter === label && isOpen;
            return (
              <FilterButton
                key={label}
                isDropdownOpen={isDropdownOpen}
                isActive={false}
                label={label}
                onClick={handleOnClick(label)}
                theme={THEME.ORANGE}
                aria-expanded={isDropdownOpen}
                css={[styles.button, isDropdownOpen && styles.disableEvents]}
              />
            );
          })}
        </Carousel>
      </div>
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
