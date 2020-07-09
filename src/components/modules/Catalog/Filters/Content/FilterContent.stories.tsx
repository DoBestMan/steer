import { CSSObject } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { COLORS, MQ } from '~/lib/constants';

import { filterChecklist, warrantyFilter } from '../Filters.mocks';
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
        {...filterChecklist}
        isPreviewLoading={boolean('Loading', false)}
        filtersToApply={{}}
        onChange={onChange()}
      />
    </>
  );
}

export function FilterContentRange() {
  return (
    <FilterRange
      {...warrantyFilter}
      isPreviewLoading={boolean('Loading', false)}
      filtersToApply={{}}
      onChange={onChange()}
    />
  );
}
