import TitleRadio from '~/components/global/Radio/TitleRadio';
import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';
import { SiteCatalogSortListItem } from '~/data/models/SiteCatalogSortListItem';
import { isObjectEqual } from '~/lib/utils/object';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './FilterSort.styles';

interface FilterSortProps {
  filtersToApply: Record<string, string>;
  isLarge?: boolean;
  items: SiteCatalogSortListItem[];
  onUpdate: (value: Record<string, string>) => () => void;
}
export default function FilterSort({
  onUpdate,
  filtersToApply,
  isLarge,
  items,
}: FilterSortProps) {
  return (
    <div>
      <h3 css={styles.title}>{ui('catalog.filters.sortBy')}</h3>
      <ul>
        {items.map(({ title, description, value }, idx) => {
          const isSelected = isObjectEqual(value, filtersToApply);
          return (
            <li css={styles.listItem} key={idx}>
              {isLarge ? (
                <button
                  onClick={onUpdate(value)}
                  css={isSelected && styles.selected}
                >
                  <TitleSelectorLabel description={description} label={title} />
                </button>
              ) : (
                <TitleRadio
                  name="sort"
                  onChange={onUpdate(value)}
                  value={title}
                  description={description}
                  label={title}
                  activeValue={isSelected ? title : undefined}
                  css={styles.radio}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
