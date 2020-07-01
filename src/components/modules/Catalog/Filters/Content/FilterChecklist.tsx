import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import {
  SiteCatalogFilterGroup,
  SiteCatalogFilterGroupType,
  SiteCatalogFilterList,
  SiteCatalogFilterListStyle,
  SiteCatalogFilterState,
} from '~/data/models/SiteCatalogFilters';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { hasActiveValue, strictEqualsValue } from '../Filters.utils';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';
import largeStyles from './FilterChecklistLarge.styles';

interface GroupProps {
  filtersToApply: Record<string, string>;
  group: SiteCatalogFilterGroup;
  handleChange: (
    value: Record<string, string>,
    overwrite?: boolean,
  ) => () => void;
}
const mapGroupTypeToInput: Record<
  SiteCatalogFilterGroupType,
  (props: GroupProps) => JSX.Element[]
> = {
  [SiteCatalogFilterGroupType.Checklist]({
    group,
    filtersToApply,
    handleChange,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleCheckbox
          key={idx}
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={item.state === SiteCatalogFilterState.Disabled}
          handleChange={handleChange(item.value)}
          defaultChecked={hasActiveValue(item, filtersToApply)}
        />
      </div>
    ));
  },
  [SiteCatalogFilterGroupType.Radio]({
    group,
    handleChange,
    filtersToApply,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleRadio
          name={`group-${idx}`}
          key={idx}
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={item.state === SiteCatalogFilterState.Disabled}
          onChange={handleChange(item.value, true)}
          value={item.title}
          activeValue={
            strictEqualsValue(item.value, filtersToApply)
              ? item.title
              : undefined
          }
        />
      </div>
    ));
  },
};

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

  function handleChange(value: Record<string, string>, overwrite?: boolean) {
    return onChange({ value, overwrite });
  }

  return (
    <div css={styles.root}>
      <div css={styles.labelContainer}>
        <h2 css={lgStyles.title}>{label}</h2>
        {header?.tooltip && <p css={styles.tooltip}>{header.tooltip.label}</p>}
      </div>
      {filterGroups?.map((group: SiteCatalogFilterGroup, idx) => (
        <div css={lgStyles.group} key={idx}>
          {header?.title && <h3 css={lgStyles.groupTitle}>{header.title}</h3>}
          {mapGroupTypeToInput[group.groupType]({
            group,
            handleChange,
            filtersToApply,
          })}
        </div>
      ))}
    </div>
  );
}
