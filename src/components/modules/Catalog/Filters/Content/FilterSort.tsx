import { useEffect, useRef, useState } from 'react';

import Radio from '~/components/global/Radio/Radio';

import { CatalogFilterSort } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterSort.styles';

export default function FilterSort({
  applyFilters,
  isLarge,
  items,
  label,
}: CatalogFilterSort & Pick<ChildProps, 'applyFilters' | 'isLarge'>) {
  const [activeValue, setActiveValue] = useState('');
  const { createToggleFilterHandler } = useFiltersContext();
  function updateValue(id: string) {
    return () => {
      setActiveValue(id);
      createToggleFilterHandler({
        group: label,
        id,
        value: true,
        overwrite: true,
      })();
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
      <h3 css={styles.title}>{label}</h3>
      <ul>
        {items.map(({ title, description, flair, id }) => (
          <li key={id}>
            {!isLarge ? (
              <Radio
                onChange={updateValue(id)}
                name={title}
                value={id}
                activeValue={activeValue}
                css={styles.radio}
              >
                <span>
                  <span>
                    <p css={styles.label}>{title}</p>
                    {flair && <p css={styles.flair}>{flair}</p>}
                  </span>
                  <p css={styles.description}>{description}</p>
                </span>
              </Radio>
            ) : (
              <button onClick={updateValue(id)} css={styles.button}>
                <span>
                  <p css={styles.label}>{title}</p>
                  {flair && <p css={styles.flair}>{flair}</p>}
                </span>
                <p css={styles.description}>{description}</p>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
