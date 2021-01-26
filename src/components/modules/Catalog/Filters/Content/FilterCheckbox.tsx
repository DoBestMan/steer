import { useEffect, useState } from 'react';

import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import {
  SiteCatalogFilterItem,
  SiteCatalogFilterItemStateEnum,
} from '~/data/models/SiteCatalogFilterItem';

import { hasActiveValue } from '../Filters.utils';

interface Props {
  filtersToApply: Record<string, string>;
  handleChange: (val: Record<string, string>) => void;
  isLoading: boolean;
  item: SiteCatalogFilterItem;
}
export default function FilterCheckbox({
  filtersToApply,
  isLoading,
  handleChange,
  item,
}: Props) {
  const [isChecked, setIsChecked] = useState(
    hasActiveValue(item, filtersToApply),
  );
  function onChange(filter: SiteCatalogFilterItem) {
    return async () => {
      setIsChecked(!isChecked);
      await handleChange(filter.value);
    };
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!hasActiveValue(item, filtersToApply)) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [isLoading, filtersToApply, item, isChecked]);

  return (
    <TitleCheckbox
      label={item.title}
      description={item.description}
      count={item.count}
      flair={item.flair}
      isDisabled={
        item.state === SiteCatalogFilterItemStateEnum.Disabled || isLoading
      }
      handleChange={onChange(item)}
      checked={isChecked}
    />
  );
}
