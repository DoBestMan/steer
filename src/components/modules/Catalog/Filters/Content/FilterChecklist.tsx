import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import {
  SiteCatalogFilterList,
  SiteCatalogFilterListStyle,
} from '~/data/models/SiteCatalogFilters';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { hasActiveValue } from '../Filters.utils';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';
import largeStyles from './FilterChecklistLarge.styles';

export default function FilterChecklist({
  filterGroups,
  filtersToApply,
  header,
  onChange,
  presentationStyle,
}: SiteCatalogFilterList & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const label = header?.title;
  const { greaterThan } = useBreakpoints();
  const lgStyles =
    greaterThan.M && presentationStyle === SiteCatalogFilterListStyle.Large
      ? largeStyles
      : styles;

  function handleChange(value: Record<string, string>) {
    return onChange({ value });
  }

  return (
    <div css={styles.root}>
      <div css={styles.labelContainer}>
        <h2 css={lgStyles.title}>{label}</h2>
        {header?.tooltip && <p css={styles.tooltip}>{header.tooltip.label}</p>}
      </div>
      {filterGroups?.map(({ header, items }, idx) => (
        <div css={lgStyles.group} key={idx}>
          {header?.title && <h3 css={lgStyles.groupTitle}>{header.title}</h3>}
          {items.map((item, idx) => {
            return (
              <div css={styles.container} key={idx}>
                <TitleCheckbox
                  label={item.title}
                  description={item.description}
                  count={item.count}
                  flair={item.flair}
                  handleChange={handleChange(item.value)}
                  defaultChecked={hasActiveValue(item, filtersToApply)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
