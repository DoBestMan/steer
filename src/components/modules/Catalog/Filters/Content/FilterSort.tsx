import { useEffect, useRef, useState } from 'react';

import TitleRadio from '~/components/global/Radio/TitleRadio';
import { SiteCatalogFilterState } from '~/data/models/SiteCatalogFilters';
import { ui } from '~/lib/utils/ui-dictionary';

import { SiteCatalogFilterSort } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterSort.styles';

export default function FilterSort({
  applyFilters,
  items,
}: SiteCatalogFilterSort & Pick<ChildProps, 'applyFilters'>) {
  const [activeValue, setActiveValue] = useState('');
  const { createToggleFilterHandler } = useFiltersContext();
  function updateValue(value: Record<string, string>, title: string) {
    return () => {
      setActiveValue(title);
      createToggleFilterHandler(value)();
    };
  }

  const prevActiveFilter = useRef(activeValue);
  useEffect(() => {
    if (activeValue !== prevActiveFilter.current) {
      applyFilters();
    }
    prevActiveFilter.current = activeValue;
  }, [activeValue, applyFilters]);

  return (
    <div>
      <h3 css={styles.title}>{ui('catalog.filters.sortBy')}</h3>
      <ul>
        {items.map(({ title, description, state, value }, idx) => (
          <li key={idx}>
            <TitleRadio
              name="sort"
              onChange={updateValue(value, title)}
              value={title}
              description={description}
              label={title}
              activeValue={
                state === SiteCatalogFilterState.Selected ? title : undefined
              }
              css={styles.radio}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
