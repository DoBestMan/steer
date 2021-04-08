import { Fragment } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BaseLink from '~/components/global/Link/BaseLink';
import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import useIsClient from '~/hooks/useIsClient';
import { StylesMap } from '~/lib/constants';
import { THEME } from '~/lib/constants/theme';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  CLASS_NAMES,
  filterContainerStyles,
  styles,
} from './FilterButtonItems.styles';
import FilterDropdown from './FilterDropdown';
import { FilterGroup } from './Filters.types';

interface FilterButtonItemsProps {
  filterContainerName: string;
  filterGroups: FilterGroup[];
  isActive?: boolean;
  isDropdownOpen: boolean;
  label: string;
  onFilterClose: () => void;
  onFilterOpen: (label?: string) => void;
}

function FilterButtonItems({
  filterContainerName,
  filterGroups,
  isActive = false,
  isDropdownOpen,
  label,
  onFilterClose,
  onFilterOpen,
}: FilterButtonItemsProps) {
  const { isClient } = useIsClient();
  const { lessThan } = useBreakpoints();
  const contentLabel = ui('reviews.chooseFilter', { filter: label });
  const inputId = `filter_${filterContainerName}--checkbox`;
  const filterDdlContainer = `${filterContainerName}--dropdown`;
  const checkedStyles: StylesMap = {
    input: {
      [`&:checked~#${filterContainerName}`]: {
        ...filterContainerStyles.input,
      },
    },
  };
  const shouldAddOverflow = isClient && lessThan.L;

  function onButtonClick() {
    if (shouldAddOverflow) {
      document.body.style.overflow = 'hidden';
    }
    onFilterOpen(label);
  }

  function onButtonClose() {
    if (shouldAddOverflow) {
      document.body.style.overflow = '';
    }
    onFilterClose();
  }

  function renderDropDownTemplate() {
    return (
      <div
        css={[
          styles.listContainer,
          isDropdownOpen && styles.filterDropdownActive,
        ]}
        id={filterContainerName}
      >
        <div className={`${filterDdlContainer} ${CLASS_NAMES.DROPDOWN}`}>
          <div css={styles.filterTitleContainer}>
            <p css={styles.filterTitle}>{contentLabel}</p>
            {isClient ? (
              <div
                css={styles.closeLabel}
                onClick={onButtonClose}
                role="button"
                tabIndex={0}
              >
                <Icon name={ICONS.CLOSE} ssWidth={18} ssr />
              </div>
            ) : (
              <label htmlFor={inputId} css={styles.closeLabel}>
                <Icon name={ICONS.CLOSE} ssWidth={18} ssr />
              </label>
            )}
          </div>
          {filterGroups.map(({ title, items }, filterGroupIdx) => (
            <Fragment key={filterGroupIdx}>
              {title && <p css={styles.label}>{title}</p>}
              <ul css={styles.filterGroup}>
                {items.map(
                  (
                    { link, count, description, flair, title },
                    filterGroupItemIdx,
                  ) => (
                    <li key={filterGroupItemIdx} css={styles.item}>
                      <BaseLink href={link.href} isExternal={link.isExternal}>
                        <TitleSelectorLabel
                          count={count}
                          description={description}
                          flair={flair}
                          label={title}
                        />
                      </BaseLink>
                    </li>
                  ),
                )}
              </ul>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div css={[styles.filterServerContainer, checkedStyles]}>
        {isClient ? (
          <>
            <FilterButton
              isDropdownOpen={isDropdownOpen}
              isActive={isActive}
              label={label}
              onClick={onButtonClick}
              theme={THEME.ORANGE}
              aria-expanded={isDropdownOpen}
              css={styles.filterButton}
            />
          </>
        ) : (
          <>
            <input id={inputId} type="checkbox" name="filter-menu" />
            <label
              htmlFor={inputId}
              css={[styles.labelAsButton, isActive && styles.isButtonActive]}
              className={isActive ? 'isActiveLabel' : ''}
            >
              {label}
              <span className="chevron-down">
                <Icon
                  name={ICONS.CHEVRON_SMALL_DOWN}
                  css={styles.filterIcon}
                  ssWidth={10}
                  ssr
                  theme={THEME.DARK}
                />
              </span>
              <span className="chevron-up">
                <Icon
                  name={ICONS.CHEVRON_SMALL_UP}
                  css={styles.filterIcon}
                  ssWidth={10}
                  ssr
                  theme={THEME.DARK}
                />
              </span>
            </label>
          </>
        )}
        {isClient ? (
          <FilterDropdown isOpen={isDropdownOpen} onFilterClose={onFilterClose}>
            {renderDropDownTemplate()}
          </FilterDropdown>
        ) : (
          renderDropDownTemplate()
        )}
      </div>
    </>
  );
}

export default FilterButtonItems;
