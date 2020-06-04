import { useState } from 'react';

import Radio from '~/components/global/Radio/Radio';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { CatalogFilterSort } from '../Filter.types';
import styles from './FilterSort.styles';

export default function FilterSort({ items, label }: CatalogFilterSort) {
  const { lessThan } = useBreakpoints();
  const [activeValue, setActiveValue] = useState('');
  function updateValue(value: string) {
    setActiveValue(value);
  }
  return (
    <>
      <h3 css={styles.title}>{label}</h3>
      <ul>
        {items.map(({ title, description, flair, id }) => (
          <li key={id}>
            {lessThan.L ? (
              <Radio
                onChange={updateValue}
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
              <button css={styles.button}>
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
    </>
  );
}
