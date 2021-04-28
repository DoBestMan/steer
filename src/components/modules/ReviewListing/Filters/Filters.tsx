import React, { Fragment, useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import styles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { THEME } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import FilterButtonItems from './FilterButtonItems';
import FilterPopup from './FilterPopup';
import { FilterItem } from './Filters.types';

interface Props {
  filters: FilterItem[];
  ssr?: boolean;
}

function Filters({ filters, ssr }: Props) {
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

  const onFilterBtnItemClick = (label: string) => (
    nextActiveLabel?: string,
  ) => {
    const mapKey = !isOpen ? 'open' : 'close';
    const actionMap: Record<string, () => void> = {
      open: () => {
        setIsOpen(true);
        setActiveFilter(label);
      },
      close: () => {
        handleOnClose();
        if (nextActiveLabel) {
          setIsOpen(nextActiveLabel !== activeFilter);
          setActiveFilter(nextActiveLabel);
        }
      },
    };

    actionMap[mapKey]();
  };

  function renderServerTemplate() {
    return (
      <>
        <p css={styles.label}>{ui('reviews.searchBy')}</p>
        <div css={styles.filterContainerServerSide}>
          {filters.map(
            ({ filterGroups, id, isActive = false, label }, index) => {
              const isDropdownOpen = activeFilter === label && isOpen;
              return (
                <Fragment key={`filters_SSR--${id}`}>
                  <FilterButtonItems
                    filterGroups={filterGroups}
                    filterContainerName={`filter__${id}${randomString(
                      10,
                    )}${index}`}
                    isActive={isActive}
                    isDropdownOpen={isDropdownOpen}
                    label={label}
                    onFilterClose={handleOnClose}
                    onFilterOpen={onFilterBtnItemClick(label)}
                  />
                </Fragment>
              );
            },
          )}
        </div>
      </>
    );
  }

  function renderClientTemplate() {
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

  return <>{ssr ? renderServerTemplate() : renderClientTemplate()}</>;
}

export default Filters;
