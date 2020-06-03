import Checkbox from '~/components/global/Checkbox/Checkbox';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import styles from './FilterChecklist.styles';
import largeStyles from './FilterChecklistLarge.styles';

export default function FilterChecklist({
  filterGroups,
  label,
  type,
}: CatalogFilterChecklist | CatalogFilterChecklistLarge) {
  const { greaterThan } = useBreakpoints();
  const lgStyles =
    greaterThan.M && type === FilterContentTypes.CatalogFilterChecklistLarge
      ? largeStyles
      : styles;
  return (
    <div>
      <h2 css={lgStyles.title}>{label}</h2>
      {filterGroups?.map(({ id, items, title }) => (
        <div css={lgStyles.group} key={id}>
          <h3 css={lgStyles.groupTitle}>{title}</h3>
          {items.map(({ count, description, id, isSelected, flair, title }) => (
            <div css={styles.container} key={id}>
              <Checkbox defaultChecked={isSelected}>
                <span css={styles.checkboxLabel}>
                  <span css={styles.containerLabel}>
                    <p css={lgStyles.label}>{title}</p>
                    <p css={styles.count}>({count})</p>
                    {flair && <p css={styles.flair}>{flair}</p>}
                  </span>
                  <p css={styles.description}>{description}</p>
                </span>
              </Checkbox>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
