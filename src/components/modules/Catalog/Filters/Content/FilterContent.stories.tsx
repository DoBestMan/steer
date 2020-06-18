import { CSSObject } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { COLORS, MQ } from '~/lib/constants';

import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import { filterRange, filterTypeMap } from '../Filters.mocks';
import FilterChecklist from './FilterChecklist';
import FilterRange from './FilterRange';

export default {
  component: FilterContentChecklist,
  title: 'Catalog/Header/Filter Content',
};

function onChange() {
  return () => action('Apply filter');
}

const closeStyles: CSSObject = {
  color: COLORS.LIGHT.GRAY_70,
  position: 'absolute',
  right: 0,
  top: 4,
  [MQ.L]: {
    display: 'none',
  },
};

export function FilterContentChecklist() {
  return (
    <>
      <Icon css={closeStyles} name={ICONS.CLOSE} />
      <FilterChecklist
        {...(filterTypeMap[
          FilterContentTypes.CatalogFilterChecklist
        ] as CatalogFilterChecklist)}
        filtersToApply={{}}
        onChange={onChange()}
      />
    </>
  );
}

export function FilterContentChecklistLarge() {
  return (
    <FilterChecklist
      {...(filterTypeMap[
        FilterContentTypes.CatalogFilterChecklistLarge
      ] as CatalogFilterChecklistLarge)}
      filtersToApply={{}}
      onChange={onChange()}
    />
  );
}

export function FilterContentRange() {
  return (
    <FilterRange {...filterRange} filtersToApply={{}} onChange={onChange()} />
  );
}
